# 🚀 Подробная инструкция по деплою на Vercel

## 📋 Шаг 1: Подготовка репозитория

### Вариант 1: Подключение существующего репозитория
1. Перейдите на [GitHub](https://github.com)
2. Создайте новый репозиторий (не инициализируйте README)
3. Скопируйте код в репозиторий:
```bash
cd dagestan-tours
git init
git add .
git commit -m "Initial commit: Туристический сайт Дагестан"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Вариант 2: Если репозиторий уже создан
Просто загрузите код через GitHub Desktop или командную строку.

## 📋 Шаг 2: Деплой на Vercel

### Автоматический деплой через GitHub интеграцию
1. Зайдите на [vercel.com](https://vercel.com)
2. Войдите в аккаунт
3. Нажмите "Add New..." → "Project"
4. Выберите "Import Git Repository"
5. Найдите ваш репозиторий и нажмите "Import"
6. Vercel автоматически предложит настройки:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./dagestan-tours (если проект в подпапке)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

### Ручная настройка проекта
Если автоматическая настройка не сработала:

1. **Настройки проекта:**
   - **Name:** dagestan-tours
   - **Framework:** Next.js
   - **Root Directory:** ./ (оставьте пустым)

2. **Environment Variables** (самое важное!):
```bash
# База данных
DATABASE_URL=your_vercel_postgres_url

# Email сервис (Resend)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# NextAuth (если будете использовать)
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_secret_here

# Другие переменные
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## 📋 Шаг 3: Настройка базы данных

### Через Vercel Postgres (рекомендуется)
1. В панели Vercel перейдите в ваш проект
2. Зайдите в "Storage" → "Postgres"
3. Нажмите "Create Database"
4. Скопируйте DATABASE_URL в переменные окружения

### Альтернатива: Supabase (бесплатно)
1. Создайте проект на [supabase.com](https://supabase.com)
2. В настройках проекта найдите DATABASE_URL
3. Добавьте в переменные окружения Vercel

## 📋 Шаг 4: Настройка email уведомлений

### Через Resend (рекомендуется)
1. Зарегистрируйтесь на [resend.com](https://resend.com)
2. Создайте API ключ в настройках
3. Добавьте домен для отправки писем (можно использовать ваш домен с Vercel)
4. Добавьте переменные в Vercel:
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

## 📋 Шаг 5: Кастомный домен (опционально)

### Подключение домена
1. Купите домен (например, dagestan-tours.ru на reg.ru)
2. В Vercel: Project Settings → Domains
3. Нажмите "Add Domain" и введите ваш домен
4. Следуйте инструкциям для настройки DNS записей

### Бесплатная альтернатива
Используйте поддомен Vercel: `dagestan-tours.vercel.app`

## 📋 Шаг 6: Проверка деплоя

### Что проверить после деплоя:
1. ✅ Сайт открывается по ссылке
2. ✅ Все страницы работают
3. ✅ Калькулятор цен функционирует
4. ✅ Форма бронирования отправляет данные
5. ✅ Email уведомления приходят
6. ✅ База данных сохраняет заявки

### Возможные проблемы и решения:

**Проблема:** "DATABASE_URL не настроена"
- Решение: Создайте базу данных в Vercel Postgres

**Проблема:** Email не отправляются
- Решение: Проверьте RESEND_API_KEY и домен в настройках

**Проблема:** Стили не загружаются
- Решение: Убедитесь что Tailwind настроен правильно

## 📋 Шаг 7: Мониторинг и обновления

### Мониторинг:
- **Vercel Analytics:** Встроенная аналитика трафика
- **Logs:** Просмотр логов в реальном времени
- **Deployments:** История всех деплойментов

### Обновления сайта:
```bash
# Локальные изменения
git add .
git commit -m "Описание изменений"
git push

# Vercel автоматически пересоберет проект
```

## 🛠️ Команды для отладки:

```bash
# Проверка логов в терминале
cd dagestan-tours
npm run build        # Сборка проекта
npm run start        # Локальный запуск

# Проверка переменных окружения
echo $DATABASE_URL   # Должна быть установлена
echo $RESEND_API_KEY # Должна быть установлена
```

## 📞 Поддержка:

Если возникнут проблемы:
1. Проверьте логи в панели Vercel (Deployments → конкретный деплой)
2. Убедитесь что все переменные окружения установлены
3. Проверьте настройки базы данных и email сервиса

**Готов к запуску! 🚀**