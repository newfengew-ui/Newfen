const crypto = require('node:crypto');

const SESSION_COOKIE = 'fox_session';
const STATE_COOKIE = 'fox_oauth_state';
const DAILY_LIMIT = Number(process.env.FOX_DAILY_LIMIT || 50);
const MINUTE_LIMIT = Number(process.env.FOX_MINUTE_LIMIT || 12);
const MAX_BODY_BYTES = Number(process.env.FOX_MAX_BODY_BYTES || 6 * 1024 * 1024);

// In-memory rate-limit buckets per serverless instance (with automatic eviction)
const dailyStore = new Map();
const minuteStore = new Map();
let lastSweepTs = Date.now();

function sweepStoresIfNeeded(now) {
  if (now - lastSweepTs < 300_000 && dailyStore.size < 2000 && minuteStore.size < 2000) return;
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
}

function getAllowedOrigin(req) {
  if (process.env.ALLOWED_ORIGIN) return process.env.ALLOWED_ORIGIN.replace(/\/+$/, '');
  const host = (req.headers['x-forwarded-host'] || req.headers.host || 'foxai-sepia.vercel.app').split(',')[0].trim();
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim();
  return `${proto}://${host}`;
}

function isOriginAllowed(req) {
  const allowed = getAllowedOrigin(req);
  const origin = req.headers.origin;
  if (origin) return origin.replace(/\/+$/, '') === allowed;
  const referer = req.headers.referer;
  if (referer) {
    try { return new URL(referer).origin === allowed; } catch { return false; }
  }
  return false;
}

function setSecurityCorsHeaders(req, res) {
  const allowed = getAllowedOrigin(req);
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
  if (!secret || secret.length < 16) {
    throw new Error('SESSION_SECRET_MISSING');
  }
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

function getSessionFromReq(req) {
  const cookies = parseCookies(req);
  const sess = verifyPayload(cookies[SESSION_COOKIE]);
  if (!sess || !sess.user || !sess.user.id) return null;
  return sess;
}

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.trim()) return xff.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function todayKey() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

function getQuotaStatus(userId) {
  const dk = `${userId}:${todayKey()}`;
  const used = dailyStore.get(dk) || 0;
  return { used, limit: DAILY_LIMIT, remaining: Math.max(0, DAILY_LIMIT - used) };
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
  DAILY_LIMIT,
  MAX_BODY_BYTES,
  getAllowedOrigin,
  isOriginAllowed,
  setSecurityCorsHeaders,
  parseCookies,
  serializeCookie,
  signPayload,
  verifyPayload,
  getSessionFromReq,
  getClientIp,
  getQuotaStatus,
  checkAndConsumeRateLimit
};
