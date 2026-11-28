const {
  hasRedis,
  redisCmd,
  isOriginAllowed,
  setSecurityCorsHeaders,
  getSessionFromReqAsync,
  logSecurityEvent
} = require('./_lib/security');

const MAX_SYNC_BYTES = 4 * 1024 * 1024; // 4 MB per user

module.exports = async function handler(req, res) {
  setSecurityCorsHeaders(req, res);
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
    return;
  }
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (req.method === 'POST' && !isOriginAllowed(req)) {
    res.status(403).json({ error: 'Forbidden origin' });
    return;
  }

  const sess = await getSessionFromReqAsync(req);
  if (!sess) {
    res.status(401).json({ error: 'UNAUTHORIZED', message: 'Требуется вход через Яндекс ID.' });
    return;
  }

  if (!hasRedis()) {
    res.status(503).json({
      available: false,
      error: 'SYNC_NOT_CONFIGURED',
      message: 'Облачная синхронизация пока не подключена (добавьте UPSTASH_REDIS_REST_URL и UPSTASH_REDIS_REST_TOKEN в Vercel).'
    });
    return;
  }

  const key = `fox:sync:${sess.user.id}`;
  if (req.method === 'GET') {
    try {
      const raw = await redisCmd(['GET', key]);
      if (!raw) {
        res.status(200).json({ available: true, snapshot: null });
        return;
      }
      const snapshot = typeof raw === 'string' ? JSON.parse(raw) : raw;
      res.status(200).json({ available: true, snapshot });
    } catch {
      logSecurityEvent('sync_get_failed', { userId: sess.user.id });
      res.status(502).json({ error: 'SYNC_READ_ERROR', message: 'Не удалось прочитать облачную копию.' });
    }
    return;
  }

  // POST: save snapshot
  const contentLen = Number(req.headers['content-length'] || 0);
  if (contentLen > MAX_SYNC_BYTES) {
    res.status(413).json({ error: 'SYNC_TOO_LARGE', message: 'Резервная копия превышает лимит 4 МБ.' });
    return;
  }
  const body = req.body && typeof req.body === 'object' ? req.body : null;
  if (!body || !Array.isArray(body.chats)) {
    res.status(400).json({ error: 'INVALID_SNAPSHOT', message: 'Некорректный формат данных.' });
    return;
  }
  try {
    const serialized = JSON.stringify(body);
    if (Buffer.byteLength(serialized, 'utf8') > MAX_SYNC_BYTES) {
      res.status(413).json({ error: 'SYNC_TOO_LARGE', message: 'Резервная копия превышает лимит 4 МБ.' });
      return;
    }
    await redisCmd(['SET', key, serialized, 'EX', String(60 * 60 * 24 * 90)]);
    res.status(200).json({ ok: true, savedAt: Date.now() });
  } catch {
    logSecurityEvent('sync_set_failed', { userId: sess.user.id });
    res.status(502).json({ error: 'SYNC_WRITE_ERROR', message: 'Не удалось сохранить данные в облако.' });
  }
};
