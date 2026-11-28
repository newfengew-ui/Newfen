# Деплой Fox AI v9.0 на Vercel

## Что нового в структуре
- `index.html` (~60 КБ) — чистая разметка без inline-скриптов (строгий CSP `script-src 'self' https://cdn.jsdelivr.net` без `'unsafe-inline'`).
- `styles.css` — все стили и темы.
- `app.js` — вся клиентская логика.
- `api/sync.js` — облачная синхронизация чатов между устройствами.
- `api/_lib/security.js` — единый серверный rate limiter и серверный отзыв сессий при выходе (7-дневные `HttpOnly` сессии).

## Новые опциональные переменные в Vercel (для Redis: единые лимиты + отзыв сессий + облачная синхронизация)
1. Создайте бесплатную базу на https://upstash.com (Redis).
2. Скопируйте `UPSTASH_REDIS_REST_URL` и `UPSTASH_REDIS_REST_TOKEN` и добавьте их в Vercel -> **Settings -> Environment Variables** (тип: Секрет).
3. Если Redis пока не подключать — сайт всё равно полностью работает (на локальном хранении и in-memory лимитах).
