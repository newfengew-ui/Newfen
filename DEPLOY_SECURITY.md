# Безопасный деплой Fox AI v7.0 на Vercel

## 1. Обновите настройки в Яндекс ID (oauth.yandex.ru)
1. Откройте ваше приложение **Fox AI** -> **Редактировать**.
2. В поле **Redirect URI** добавьте:
   `https://foxai-sepia.vercel.app/api/auth/callback`
3. Нажмите **Сгенерировать новый Client secret** (поскольку старый секрет был отправлен в чат) и скопируйте новый секрет.

## 2. Добавьте переменные окружения в Vercel
Откройте проект на Vercel -> **Settings** -> **Environment Variables** и добавьте:

| Переменная | Что вписать |
| :--- | :--- |
| `YANDEX_CLIENT_ID` | `37f22e14615d4365b65355b6bd692259` |
| `YANDEX_CLIENT_SECRET` | Новый `Client secret` из Яндекс ID |
| `SESSION_SECRET` | Случайная длинная строка (32+ символов, например пароль из генератора) |
| `ALLOWED_ORIGIN` | `https://foxai-sepia.vercel.app` |
| `PRIMARY_API_KEY` | Ваш основной API-ключ ИИ |
| `BACKUP_API_KEY` | Ваш резервный API-ключ ИИ |

## 3. Загрузите файлы на Vercel
Загрузите все файлы из архива `Fox_AI_v7_Vercel.zip` в корень репозитория/проекта (сохраняя папку `api/`, `vercel.json`, `index.html`, `sw.js`) и сделайте **Redeploy**.
