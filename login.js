const crypto = require('node:crypto');
const { STATE_COOKIE, getAllowedOrigin, serializeCookie } = require('../_lib/security');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const clientId = process.env.YANDEX_CLIENT_ID;
  if (!clientId) {
    res.status(500).send('Server misconfigured: YANDEX_CLIENT_ID is missing');
    return;
  }
  const origin = getAllowedOrigin(req);
  const redirectUri = `${origin}/api/auth/callback`;
  const state = crypto.randomBytes(24).toString('hex');

  res.setHeader('Set-Cookie', serializeCookie(STATE_COOKIE, state, {
    maxAge: 600,
    httpOnly: true,
    secure: origin.startsWith('https://'),
    sameSite: 'Lax'
  }));
  res.setHeader('Cache-Control', 'no-store');

  const authUrl = 'https://oauth.yandex.ru/authorize'
    + '?response_type=code'
    + '&client_id=' + encodeURIComponent(clientId)
    + '&redirect_uri=' + encodeURIComponent(redirectUri)
    + '&state=' + encodeURIComponent(state);

  res.writeHead(302, { Location: authUrl });
  res.end();
};
