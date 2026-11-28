const crypto = require('node:crypto');

const SESSION_COOKIE = 'fox_session';
const STATE_COOKIE = 'fox_oauth_state';
const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days
const DAILY_LIMIT = Number(process.env.FOX_DAILY_LIMIT || 50);
const MINUTE_LIMIT = Number(process.env.FOX_MINUTE_LIMIT || 12);
const MAX_BODY_BYTES = Number(process.env.FOX_MAX_BODY_BYTES || 6 * 1024 * 1024);

// Local fallbacks when Upstash Redis is not configured
const dailyStore = new Map();
const minuteStore = new Map();
const revokedSessionsLocal = new Map();
let lastSweepTs = Date.now();

function hasRedis() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

async function redisCmd(args) {
  if (!hasRedis()) return null;
  const base = process.env.UPSTASH_REDIS_REST_URL.replace(/\/+$/, '');
  const res = await fetch(base, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(args),
    signal: AbortSignal.timeout(4000)
  });
  if (!res.ok) throw new Error('REDIS_HTTP_' + res.status);
  const data = await res.json();
  return data ? data.result : null;
}

function logSecurityEvent(event, meta = {}) {
  try {
    console.log(JSON.stringify({ ts: new Date().toISOString(), app: 'fox-ai', event, ...meta }));
  } catch {}
}

function todayKey() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

function sweepStoresIfNeeded(now) {
  if (now - lastSweepTs < 300_000 && dailyStore.size < 2000 && minuteStore.size < 2000 && revokedSessionsLocal.size < 2000) return;
  lastSweepTs = now;
  const today = todayKey();
  for (const [k] of dailyStore) {
    if (!k.endsWith(':' + today)) dailyStore.delete(k);
  }
  for (const [k, arr] of minuteStore) {
    const fresh = arr.filter(ts => now - ts < 60_000);
    if (fresh.length) minuteStore.set(k, fresh);
    else minuteStore.delete(k);
  }
  for (const [sid, exp] of revokedSessionsLocal) {
    if (now > exp) revokedSessionsLocal.delete(sid);
  }
}

function getAllowedOrigin() {
  const raw = (process.env.ALLOWED_ORIGIN || 'https://foxai-sepia.vercel.app').trim().replace(/\/+$/, '');
  try {
    const u = new URL(raw);
    if (u.protocol === 'https:' || u.hostname === 'localhost' || u.hostname === '127.0.0.1') return u.origin;
  } catch {}
  return 'https://foxai-sepia.vercel.app';
}

function isOriginAllowed(req) {
  const fetchSite = String(req.headers['sec-fetch-site'] || '').toLowerCase();
  if (fetchSite && fetchSite !== 'same-origin' && fetchSite !== 'none') return false;
  const allowed = getAllowedOrigin();
  const origin = req.headers.origin;
  if (origin) return origin.replace(/\/+$/, '') === allowed;
  const referer = req.headers.referer;
  if (referer) {
    try { return new URL(referer).origin === allowed; } catch { return false; }
  }
  return false;
}

function setSecurityCorsHeaders(req, res) {
  const allowed = getAllowedOrigin();
  res.setHeader('Access-Control-Allow-Origin', allowed);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Cache-Control', 'no-store, private');
}

function parseCookies(req) {
  const header = req.headers.cookie || '';
  const out = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) {
      try { out[k] = decodeURIComponent(v); } catch { out[k] = v; }
    }
  }
  return out;
}

function serializeCookie(name, value, opts = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  parts.push(`Path=${opts.path || '/'}`);
  if (opts.maxAge !== undefined) parts.push(`Max-Age=${Math.max(0, Math.floor(opts.maxAge))}`);
  if (opts.httpOnly !== false) parts.push('HttpOnly');
  if (opts.secure !== false) parts.push('Secure');
  parts.push(`SameSite=${opts.sameSite || 'Lax'}`);
  return parts.join('; ');
}

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) throw new Error('SESSION_SECRET_MISSING');
  return secret;
}

function signPayload(payloadObj) {
  const secret = getSessionSecret();
  const data = Buffer.from(JSON.stringify(payloadObj), 'utf8').toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${sig}`;
}

function verifyPayload(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [data, sig] = parts;
  let secret;
  try { secret = getSessionSecret(); } catch { return null; }
  const expected = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const obj = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (!obj || (obj.exp && Date.now() > obj.exp)) return null;
    return obj;
  } catch {
    return null;
  }
}

async function revokeSessionId(sid, expMs) {
  if (!sid || typeof sid !== 'string') return;
  const ttlSec = Math.max(60, Math.min(SESSION_MAX_AGE_SEC, Math.ceil(((expMs || (Date.now() + SESSION_MAX_AGE_SEC * 1000)) - Date.now()) / 1000)));
  revokedSessionsLocal.set(sid, Date.now() + ttlSec * 1000);
  if (hasRedis()) {
    try { await redisCmd(['SET', `fox:revoked:${sid}`, '1', 'EX', String(ttlSec)]); } catch {}
  }
}

async function isSessionRevoked(sid) {
  if (!sid) return false;
  const localExp = revokedSessionsLocal.get(sid);
  if (localExp && Date.now() < localExp) return true;
  if (hasRedis()) {
    try {
      const r = await redisCmd(['GET', `fox:revoked:${sid}`]);
      if (r === '1') {
        revokedSessionsLocal.set(sid, Date.now() + 600_000);
        return true;
      }
    } catch {}
  }
  return false;
}

function getSessionFromReq(req) {
  const cookies = parseCookies(req);
  const sess = verifyPayload(cookies[SESSION_COOKIE]);
  if (!sess || !sess.user || !sess.user.id) return null;
  if (sess.sid && revokedSessionsLocal.has(sess.sid) && Date.now() < revokedSessionsLocal.get(sess.sid)) return null;
  return sess;
}

async function getSessionFromReqAsync(req) {
  const sess = getSessionFromReq(req);
  if (!sess) return null;
  if (sess.sid && await isSessionRevoked(sess.sid)) return null;
  return sess;
}

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.trim()) return xff.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

async function getQuotaStatusAsync(userId) {
  const dk = `fox:rl:day:${userId}:${todayKey()}`;
  if (hasRedis()) {
    try {
      const val = Number(await redisCmd(['GET', dk])) || 0;
      return { used: val, limit: DAILY_LIMIT, remaining: Math.max(0, DAILY_LIMIT - val) };
    } catch {}
  }
  const used = dailyStore.get(`${userId}:${todayKey()}`) || 0;
  return { used, limit: DAILY_LIMIT, remaining: Math.max(0, DAILY_LIMIT - used) };
}

function getQuotaStatus(userId) {
  const used = dailyStore.get(`${userId}:${todayKey()}`) || 0;
  return { used, limit: DAILY_LIMIT, remaining: Math.max(0, DAILY_LIMIT - used) };
}

async function checkAndConsumeRateLimitAsync(userId, ip, consumeDaily = true) {
  if (hasRedis()) {
    try {
      const minBucket = Math.floor(Date.now() / 60_000);
      const mk = `fox:rl:min:${userId}:${ip}:${minBucket}`;
      const mCount = Number(await redisCmd(['INCR', mk])) || 1;
      if (mCount === 1) await redisCmd(['EXPIRE', mk, '90']);
      if (mCount > MINUTE_LIMIT) {
        return { allowed: false, code: 'MINUTE_LIMIT', message: 'Слишком много запросов подряд. Подождите минуту.' };
      }
      const dk = `fox:rl:day:${userId}:${todayKey()}`;
      let dCount = Number(await redisCmd(['GET', dk])) || 0;
      if (consumeDaily) {
        if (dCount >= DAILY_LIMIT) {
          return { allowed: false, code: 'DAILY_LIMIT', message: `Дневной лимит (${DAILY_LIMIT} запросов) исчерпан до завтра.` };
        }
        dCount = Number(await redisCmd(['INCR', dk])) || (dCount + 1);
        if (dCount === 1) await redisCmd(['EXPIRE', dk, '90000']);
      }
      return { allowed: true, quota: { used: dCount, limit: DAILY_LIMIT, remaining: Math.max(0, DAILY_LIMIT - dCount) } };
    } catch {
      // Fallback to local memory on transient Redis error
    }
  }
  return checkAndConsumeRateLimit(userId, ip, consumeDaily);
}

function checkAndConsumeRateLimit(userId, ip, consumeDaily = true) {
  const now = Date.now();
  sweepStoresIfNeeded(now);
  const minKey = `${userId}:${ip}`;
  const bucket = (minuteStore.get(minKey) || []).filter(ts => now - ts < 60_000);
  if (bucket.length >= MINUTE_LIMIT) {
    return { allowed: false, code: 'MINUTE_LIMIT', message: 'Слишком много запросов подряд. Подождите минуту.' };
  }
  const dk = `${userId}:${todayKey()}`;
  const used = dailyStore.get(dk) || 0;
  if (consumeDaily && used >= DAILY_LIMIT) {
    return { allowed: false, code: 'DAILY_LIMIT', message: `Дневной лимит (${DAILY_LIMIT} запросов) исчерпан до завтра.` };
  }
  bucket.push(now);
  minuteStore.set(minKey, bucket);
  if (consumeDaily) dailyStore.set(dk, used + 1);
  return { allowed: true, quota: { used: consumeDaily ? used + 1 : used, limit: DAILY_LIMIT, remaining: Math.max(0, DAILY_LIMIT - (consumeDaily ? used + 1 : used)) } };
}

module.exports = {
  SESSION_COOKIE,
  STATE_COOKIE,
  SESSION_MAX_AGE_SEC,
  DAILY_LIMIT,
  MAX_BODY_BYTES,
  hasRedis,
  redisCmd,
  logSecurityEvent,
  getAllowedOrigin,
  isOriginAllowed,
  setSecurityCorsHeaders,
  parseCookies,
  serializeCookie,
  signPayload,
  verifyPayload,
  revokeSessionId,
  isSessionRevoked,
  getSessionFromReq,
  getSessionFromReqAsync,
  getClientIp,
  getQuotaStatus,
  getQuotaStatusAsync,
  checkAndConsumeRateLimit,
  checkAndConsumeRateLimitAsync
};
