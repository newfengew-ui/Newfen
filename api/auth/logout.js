const {
  SESSION_COOKIE,
  getAllowedOrigin,
  isOriginAllowed,
  setSecurityCorsHeaders,
  serializeCookie
} = require('../_lib/security');

module.exports = async function handler(req, res) {
  setSecurityCorsHeaders(req, res);
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!isOriginAllowed(req)) {
    res.status(403).json({ error: 'Forbidden origin' });
    return;
  }
  const secureCookie = getAllowedOrigin(req).startsWith('https://');
  res.setHeader('Set-Cookie', serializeCookie(SESSION_COOKIE, '', {
    maxAge: 0,
    httpOnly: true,
    secure: secureCookie,
    sameSite: 'Lax'
  }));
  res.status(200).json({ ok: true });
};
