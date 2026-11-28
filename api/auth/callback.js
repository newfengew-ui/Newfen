const crypto = require('node:crypto');
const {
  SESSION_COOKIE,
  STATE_COOKIE,
  getAllowedOrigin,
  parseCookies,
  serializeCookie,
  signPayload
} = require('../_lib/security');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const origin = getAllowedOrigin(req);
  const secureCookie = origin.startsWith('https://');
  const clearState = serializeCookie(STATE_COOKIE, '', { maxAge: 0, httpOnly: true, secure: secureCookie, sameSite: 'Lax' });

  const ALLOWED_AUTH_ERRORS = new Set([
    'access_denied', 'invalid_state', 'missing_code', 'server_config',
    'token_exchange_failed', 'no_access_token', 'profile_fetch_failed', 'auth_exception'
  ]);
  const failRedirect = (reason) => {
    const safeReason = ALLOWED_AUTH_ERRORS.has(String(reason)) ? String(reason) : 'auth_failed';
    res.setHeader('Set-Cookie', clearState);
    res.writeHead(302, { Location: `/?auth_error=${encodeURIComponent(safeReason)}` });
    res.end();
  };

  const { code, state, error } = req.query || {};
  if (error) return failRedirect(String(error));
  if (!code || !state) return failRedirect('missing_code');

  // Strict CSRF state verification
  const cookies = parseCookies(req);
  const expectedState = cookies[STATE_COOKIE] || '';
  const a = Buffer.from(String(state));
  const b = Buffer.from(String(expectedState));
  if (!expectedState || a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return failRedirect('invalid_state');
  }

  const clientId = process.env.YANDEX_CLIENT_ID;
  const clientSecret = process.env.YANDEX_CLIENT_SECRET;
  if (!clientId || !clientSecret) return failRedirect('server_config');

  try {
    const tokenRes = await fetch('https://oauth.yandex.ru/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(15_000),
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: String(code),
        client_id: clientId,
        client_secret: clientSecret
      })
    });
    if (!tokenRes.ok) return failRedirect('token_exchange_failed');
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) return failRedirect('no_access_token');

    const infoRes = await fetch('https://login.yandex.ru/info?format=json', {
      headers: { Authorization: `OAuth ${tokenData.access_token}` },
      signal: AbortSignal.timeout(15_000)
    });
    if (!infoRes.ok) return failRedirect('profile_fetch_failed');
    const d = await infoRes.json();

    const displayName = (d.display_name || [d.first_name, d.last_name].filter(Boolean).join(' ') || d.real_name || d.login || 'Пользователь').trim();
    const email = d.default_email || (Array.isArray(d.emails) ? d.emails[0] : '') || '';
    const avatarUrl = (!d.is_avatar_empty && d.default_avatar_id)
      ? `https://avatars.yandex.net/get-yapic/${encodeURIComponent(d.default_avatar_id)}/islands-200`
      : '';

    const user = {
      id: String(d.id || d.login || ''),
      login: String(d.login || ''),
      displayName,
      email,
      avatarUrl
    };

    const sessionMaxAge = 60 * 60 * 24 * 7; // 7 days
    const sid = crypto.randomBytes(16).toString('hex');
    const signedSession = signPayload({ sid, user, exp: Date.now() + sessionMaxAge * 1000 });

    res.setHeader('Set-Cookie', [
      clearState,
      serializeCookie(SESSION_COOKIE, signedSession, {
        maxAge: sessionMaxAge,
        httpOnly: true,
        secure: secureCookie,
        sameSite: 'Lax'
      })
    ]);
    res.setHeader('Cache-Control', 'no-store');
    res.writeHead(302, { Location: '/' });
    res.end();
  } catch {
    return failRedirect('auth_exception');
  }
};
