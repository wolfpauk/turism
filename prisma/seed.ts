import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Начинаем заполнение базы данных...')

  // Создаем тестовые направления
  const destinations = await Promise.all([
    prisma.destination.upsert({
      where: { slug: 'derbent' },
      update: {},
      create: {
        name: 'Дербент',
        slug: 'derbent',
        description: 'Самый древний город России, включенный в список всемирного наследия ЮНЕСКО',
        region: 'Южный Дагестан',
        latitude: 42.0678,
        longitude: 48.2899,
        isPopular: true,
        mainImage: '/images/destinations/derbent.jpg'
      }
    }),
    prisma.destination.upsert({
      where: { slug: 'gunib' },
      update: {},
      create: {
        name: 'Гуниб',
        slug: 'gunib',
        description: 'Живописное горное село с богатой историей',
        region: 'Горный Дагестан',
        latitude: 42.3867,
        longitude: 46.9328,
        isPopular: true,
        mainImage: '/images/destinations/gunib.jpg'
      }
    }),
    prisma.destination.upsert({
      where: { slug: 'karadakh' },
      update: {},
      create: {
        name: 'Карадахская теснина',
        slug: 'karadakh',
        description: 'Узкий каньон с отвесными скалами',
        region: 'Центральный Дагестан',
        latitude: 42.5,
        longitude: 47.0,
        isPopular: true,
        mainImage: '/images/destinations/karadakh.jpg'
      }
    }),
    prisma.destination.upsert({
      where: { slug: 'sulak' },
      update: {},
      create: {
        name: 'Сулакский каньон',
        slug: 'sulak',
        description: 'Самый глубокий каньон в Европе',
        region: 'Центральный Дагестан',
        latitude: 43.0167,
        longitude: 46.8333,
        isPopular: true,
        mainImage: '/images/destinations/sulak.jpg'
      }
    })
  ])

  console.log(`✅ Создано ${destinations.length} направлений`)

  // Создаем тестовые туры
  const tours = await Promise.all([
    prisma.tour.upsert({
      where: { slug: 'derbent-citadel-tour' },
      update: {},
      create: {
        title: 'Древний Дербент и цитадель',
        slug: 'derbent-citadel-tour',
        description: 'Путешествие в самый древний город России с посещением крепости Нарын-Кала и других исторических достопримечательностей.',
        shortDescription: 'Знакомство с древнейшей крепостью и историей Дербента',
        basePrice: 8500,
        duration: 2,
        difficulty: 'EASY',
        tourType: 'EXCURSION',
        maxPeople: 15,
        minPeople: 2,
        isActive: true,
        isPopular: true,
        destinationId: destinations[0].id,
        mainImage: '/images/tours/derbent-citadel.jpg'
      }
    }),
    prisma.tour.upsert({
      where: { slug: 'gunib-mountain-tour' },
      update: {},
      create: {
        title: 'Горный Гуниб и окрестности',
        slug: 'gunib-mountain-tour',
        description: 'Активный отдых в одном из самых живописных горных районов Дагестана с посещением мемориала и природных достопримечательностей.',
        shortDescription: 'Горные тропы, каньоны и панорамные виды',
        basePrice: 12000,
        duration: 3,
        difficulty: 'MEDIUM',
        tourType: 'ACTIVE',
        maxPeople: 12,
        minPeople: 3,
        isActive: true,
        isPopular: true,
        destinationId: destinations[1].id,
        mainImage: '/images/tours/gunib-mountains.jpg'
      }
    }),
    prisma.tour.upsert({
      where: { slug: 'karadakh-gorge-tour' },
      update: {},
      create: {
        title: 'Карадахская теснина',
        slug: 'karadakh-gorge-tour',
        description: 'Экстремальное путешествие через узкий каньон с отвесными скалами высотой до 150 метров.',
        shortDescription: 'Прогулка по знаменитой Карадахской теснине',
        basePrice: 6500,
        duration: 1,
        difficulty: 'MEDIUM',
        tourType: 'ACTIVE',
        maxPeople: 10,
        minPeople: 2,
        isActive: true,
        isPopular: false,
        destinationId: destinations[2].id,
        mainImage: '/images/tours/karadakh-gorge.jpg'
      }
    }),
    prisma.tour.upsert({
      where: { slug: 'sulak-canyon-tour' },
      update: {},
      create: {
        title: 'Сулакский каньон и окрестности',
        slug: 'sulak-canyon-tour',
        description: 'Комбинированный тур с посещением самого глубокого каньона Европы и знакомством с местной культурой.',
        shortDescription: 'Каньон, горы и культурные достопримечательности',
        basePrice: 18000,
        duration: 3,
        difficulty: 'MEDIUM',
        tourType: 'COMBINED',
        maxPeople: 8,
        minPeople: 2,
        isActive: true,
        isPopular: true,
        destinationId: destinations[3].id,
        mainImage: '/images/tours/sulak-canyon.jpg'
      }
    })
  ])

  console.log(`✅ Создано ${tours.length} туров`)

  // Создаем услуги
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: 'Трансфер автобусом',
        description: 'Комфортабельный автобус с кондиционером',
        serviceType: 'TRANSPORT',
        basePrice: 1500,
        unit: 'маршрут'
      }
    }),
    prisma.service.create({
      data: {
        name: 'Джиппинг тур',
        description: 'Внедорожник с водителем для горных маршрутов',
        serviceType: 'TRANSPORT',
        basePrice: 5000,
        unit: 'день'
      }
    }),
    prisma.service.create({
      data: {
        name: 'Трансфер из аэропорта',
        description: 'Встреча в аэропорту Махачкалы',
        serviceType: 'TRANSPORT',
        basePrice: 2000,
        unit: 'поездка'
      }
    }),
    prisma.service.create({
      data: {
        name: 'Горный гид',
        description: 'Профессиональный гид для горных маршрутов',
        serviceType: 'GUIDE',
        basePrice: 4000,
        unit: 'день'
      }
    }),
    prisma.service.create({
      data: {
        name: 'Проживание в отеле',
        description: 'Комфортабельный номер в отеле',
        serviceType: 'ACCOMMODATION',
        basePrice: 3500,
        unit: 'ночь'
      }
    }),
    prisma.service.create({
      data: {
        name: 'Национальный завтрак',
        description: 'Традиционный дагестанский завтрак',
        serviceType: 'FOOD',
        basePrice: 500,
        unit: 'человек/день'
      }
    })
  ])

  console.log(`✅ Создано ${services.length} услуг`)

  // Создаем связи тур-услуга
  await Promise.all([
    prisma.tourService.createMany({
      data: [
        { tourId: tours[0].id, serviceId: services[0].id, quantity: 1 },
        { tourId: tours[0].id, serviceId: services[3].id, quantity: 2 },
        { tourId: tours[1].id, serviceId: services[1].id, quantity: 2 },
        { tourId: tours[1].id, serviceId: services[3].id, quantity: 3 },
        { tourId: tours[1].id, serviceId: services[4].id, quantity: 2 },
        { tourId: tours[2].id, serviceId: services[1].id, quantity: 1 },
        { tourId: tours[3].id, serviceId: services[1].id, quantity: 2 },
        { tourId: tours[3].id, serviceId: services[3].id, quantity: 3 },
        { tourId: tours[3].id, serviceId: services[4].id, quantity: 2 },
        { tourId: tours[3].id, serviceId: services[5].id, quantity: 3 }
      ]
    })
  ])

  console.log('✅ Созданы связи тур-услуга')

  // Создаем тестового пользователя
  const testUser = await prisma.user.upsert({
    where: { email: 'guest@example.com' },
    update: {},
    create: {
      email: 'guest@example.com',
      name: 'Гостевой пользователь',
      role: 'TOURIST'
    }
  })

  // Создаем тестовые отзывы
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        userId: testUser.id,
        tourId: tours[0].id,
        rating: 5,
        title: 'Незабываемое путешествие!',
        comment: 'Прекрасно организованный тур. Гид очень профессиональный и увлекательно рассказывает об истории Дербента. Всем рекомендую!',
        photos: JSON.stringify([]),
        isVerified: true,
        isVisible: true
      }
    }),
    prisma.review.create({
      data: {
        userId: testUser.id,
        tourId: tours[1].id,
        rating: 5,
        title: 'Потрясающие виды!',
        comment: 'Гуниб покорил нас своей красотой. Организация на высшем уровне, все очень понравилось.',
        photos: JSON.stringify([]),
        isVerified: true,
        isVisible: true
      }
    }),
    prisma.review.create({
      data: {
        userId: testUser.id,
        tourId: tours[3].id,
        rating: 5,
        title: 'Лучший тур в жизни!',
        comment: 'Сулакский каньон - это что-то невероятное! Спасибо организаторам за такой опыт.',
        photos: JSON.stringify([]),
        isVerified: true,
        isVisible: true
      }
    })
  ])

  console.log(`✅ Создано ${reviews.length} отзывов`)

  console.log('🎉 База данных успешно заполнена!')
  console.log(`
📊 Статистика:
  • Направлений: ${destinations.length}
  • Туров: ${tours.length}
  • Услуг: ${services.length}
  • Отзывов: ${reviews.length}

🚀 Проект готов к использованию!
 `)
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при заполнении базы данных:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })