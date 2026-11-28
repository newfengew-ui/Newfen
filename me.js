const { setSecurityCorsHeaders, getSessionFromReqAsync, getQuotaStatusAsync } = require('../_lib/security');

module.exports = async function handler(req, res) {
  setSecurityCorsHeaders(req, res);
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const sess = await getSessionFromReqAsync(req);
  if (!sess) {
    res.status(401).json({ authenticated: false });
    return;
  }
  res.status(200).json({
    authenticated: true,
    user: sess.user,
    quota: await getQuotaStatusAsync(sess.user.id)
  });
};
