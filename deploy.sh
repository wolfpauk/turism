#!/bin/bash

echo "🚀 Деплой туристического сайта Дагестан на Vercel"
echo "================================================="

# Проверка наличия Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 Установка Vercel CLI..."
    npm i -g vercel
fi

# Проверка наличия Git репозитория
if [ ! -d .git ]; then
    echo "🔧 Инициализация Git репозитория..."
    git init
    git add .
    git commit -m "Initial commit: Туристический сайт Дагестан"
    echo "✅ Git репозиторий инициализирован"
else
    echo "✅ Git репозиторий найден"
fi

# Проверка переменных окружения
echo ""
echo "🔍 Проверка переменных окружения..."
if [ -f .env.local ]; then
    echo "✅ .env.local найден"
else
    echo "⚠️  .env.local не найден. Создайте его на основе .env.example"
fi

# Деплой на Vercel
echo ""
echo "🌐 Деплой на Vercel..."
echo "После деплоя вам нужно будет настроить следующие переменные окружения в панели Vercel:"
echo ""
echo "📋 Необходимые переменные окружения:"
echo "DATABASE_URL=your_vercel_postgres_url"
echo "RESEND_API_KEY=your_resend_api_key"
echo "RESEND_FROM_EMAIL=noreply@yourdomain.com"
echo "NEXTAUTH_URL=https://your-domain.vercel.app"
echo "NEXTAUTH_SECRET=your_secret_here"
echo "NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app"
echo ""

read -p "Готовы к деплою? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    vercel --prod
    echo ""
    echo "🎉 Деплой завершен!"
    echo ""
    echo "📋 Следующие шаги:"
    echo "1. Зайдите в панель Vercel и настройте переменные окружения"
    echo "2. Создайте базу данных PostgreSQL в разделе Storage"
    echo "3. Зарегистрируйтесь на Resend.com для email уведомлений"
    echo "4. Протестируйте сайт"
    echo ""
    echo "📖 Подробная инструкция в файле DEPLOY_GUIDE.md"
else
    echo "❌ Деплой отменен"
    echo "📖 Прочитайте DEPLOY_GUIDE.md для ручного деплоя"
fi