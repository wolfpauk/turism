#!/bin/bash

# Скрипт настройки базы данных для проекта "Туры в Дагестан"

echo "🚀 Настройка базы данных для проекта Туры в Дагестан"
echo "=================================================="

# Проверка наличия Node.js и npm
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Пожалуйста, установите Node.js 18+"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm не установлен. Пожалуйста, установите npm"
    exit 1
fi

echo "✅ Node.js и npm найдены"

# Проверка наличия Prisma CLI
if ! npx prisma --version &> /dev/null; then
    echo "❌ Prisma CLI не найден. Устанавливаю..."
    npm install prisma -g
fi

echo "✅ Prisma CLI доступен"

# Генерация Prisma клиента
echo "🔄 Генерация Prisma клиента..."
npx prisma generate

if [ $? -eq 0 ]; then
    echo "✅ Prisma клиент успешно сгенерирован"
else
    echo "❌ Ошибка при генерации Prisma клиента"
    exit 1
fi

# Создание базы данных и применение миграций
echo "🔄 Создание базы данных и применение миграций..."
npx prisma db push

if [ $? -eq 0 ]; then
    echo "✅ База данных успешно создана"
else
    echo "❌ Ошибка при создании базы данных"
    exit 1
fi

# Заполнение базы данных тестовыми данными
echo "🔄 Заполнение базы данных тестовыми данными..."
npx tsx prisma/seed.ts

if [ $? -eq 0 ]; then
    echo "✅ База данных успешно заполнена тестовыми данными"
else
    echo "❌ Ошибка при заполнении базы данных"
    exit 1
fi

echo ""
echo "🎉 Настройка базы данных завершена успешно!"
echo ""
echo "📊 Что создано:"
echo "   • 4 туристических направления"
echo "   • 4 готовых тура"
echo "   • 6 видов услуг"
echo "   • Связи между турами и услугами"
echo "   • Тестовые отзывы клиентов"
echo ""
echo "🚀 Следующие шаги:"
echo "   1. Настройте переменные окружения в .env.local"
echo "   2. Зарегистрируйтесь в сервисах: Resend, ЮKassa"
echo "   3. Получите API ключи и добавьте их в .env.local"
echo "   4. Запустите проект: npm run dev"
echo ""
echo "💡 Для продакшена используйте PostgreSQL сервер вместо SQLite"