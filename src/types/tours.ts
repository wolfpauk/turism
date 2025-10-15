// Типы данных для каталога туров

export interface TourCard {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string

  // Ценообразование
  basePrice: number
  currency: string
  priceFrom: number

  // Характеристики
  duration: number
  difficulty: TourDifficulty
  tourType: TourType
  maxPeople: number
  minPeople: number

  // Статус
  isActive: boolean
  isPopular: boolean

  // Медиа
  mainImage: string
  images: string[]

  // Связи
  destination: DestinationInfo
  rating: number
  reviewCount: number

  // Даты
  nextAvailableDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface DestinationInfo {
  id: string
  name: string
  region: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export type TourType = 'EXCURSION' | 'ACTIVE' | 'CULTURAL' | 'COMBINED'

export type TourDifficulty = 'EASY' | 'MEDIUM' | 'HARD'

export interface TourFilters {
  tourTypes?: TourType[]
  difficulty?: TourDifficulty[]
  destinations?: string[]
  priceRange?: {
    min: number
    max: number
  }
  duration?: {
    min: number
    max: number
  }
  rating?: number
  availableFrom?: Date
  participants?: number
  features?: string[]
}

export interface TourSearchParams {
  query?: string
  filters?: TourFilters
  sortBy?: TourSortOption
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export type TourSortOption = 'price' | 'rating' | 'duration' | 'popularity' | 'date'

// Предустановленные туры для демонстрации
export const SAMPLE_TOURS: TourCard[] = [
  {
    id: 'excursion-derbent',
    title: 'Древний Дербент и цитадель',
    slug: 'excursion-derbent',
    description: 'Путешествие в самый древний город России, включенный в список всемирного наследия ЮНЕСКО.',
    shortDescription: 'Знакомство с древнейшей крепостью и историей Дербента',
    basePrice: 8500,
    currency: 'RUB',
    priceFrom: 8500,
    duration: 2,
    difficulty: 'EASY',
    tourType: 'EXCURSION',
    maxPeople: 15,
    minPeople: 2,
    isActive: true,
    isPopular: true,
    mainImage: '/images/tours/derbent-citadel.jpg',
    images: ['/images/tours/derbent-1.jpg', '/images/tours/derbent-2.jpg'],
    destination: {
      id: 'derbent',
      name: 'Дербент',
      region: 'Южный Дагестан',
      coordinates: { latitude: 42.0678, longitude: 48.2899 }
    },
    rating: 4.8,
    reviewCount: 127,
    nextAvailableDate: new Date('2024-02-15'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'active-gunib',
    title: 'Горный Гуниб и окрестности',
    slug: 'active-gunib',
    description: 'Активный отдых в одном из самых живописных горных районов Дагестана.',
    shortDescription: 'Горные тропы, каньоны и панорамные виды',
    basePrice: 12000,
    currency: 'RUB',
    priceFrom: 12000,
    duration: 3,
    difficulty: 'MEDIUM',
    tourType: 'ACTIVE',
    maxPeople: 12,
    minPeople: 3,
    isActive: true,
    isPopular: true,
    mainImage: '/images/tours/gunib-mountains.jpg',
    images: ['/images/tours/gunib-1.jpg', '/images/tours/gunib-2.jpg'],
    destination: {
      id: 'gunib',
      name: 'Гуниб',
      region: 'Горный Дагестан',
      coordinates: { latitude: 42.3867, longitude: 46.9328 }
    },
    rating: 4.9,
    reviewCount: 89,
    nextAvailableDate: new Date('2024-02-20'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'cultural-village',
    title: 'Этно-тур по аулам Дагестана',
    slug: 'cultural-village',
    description: 'Погружение в традиционную культуру и быт дагестанского народа.',
    shortDescription: 'Посещение традиционных аулов и знакомство с культурой',
    basePrice: 15000,
    currency: 'RUB',
    priceFrom: 15000,
    duration: 4,
    difficulty: 'EASY',
    tourType: 'CULTURAL',
    maxPeople: 10,
    minPeople: 2,
    isActive: true,
    isPopular: false,
    mainImage: '/images/tours/dagestan-village.jpg',
    images: ['/images/tours/village-1.jpg', '/images/tours/village-2.jpg'],
    destination: {
      id: 'chokh',
      name: 'Аул Чох',
      region: 'Горный Дагестан',
      coordinates: { latitude: 42.3583, longitude: 47.3583 }
    },
    rating: 4.7,
    reviewCount: 64,
    nextAvailableDate: new Date('2024-03-01'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'combined-sulak',
    title: 'Сулакский каньон и окрестности',
    slug: 'combined-sulak',
    description: 'Комбинированный тур с посещением самого глубокого каньона Европы.',
    shortDescription: 'Каньон, горы и культурные достопримечательности',
    basePrice: 18000,
    currency: 'RUB',
    priceFrom: 18000,
    duration: 3,
    difficulty: 'MEDIUM',
    tourType: 'COMBINED',
    maxPeople: 8,
    minPeople: 2,
    isActive: true,
    isPopular: true,
    mainImage: '/images/tours/sulak-canyon.jpg',
    images: ['/images/tours/sulak-1.jpg', '/images/tours/sulak-2.jpg'],
    destination: {
      id: 'sulak',
      name: 'Сулакский каньон',
      region: 'Центральный Дагестан',
      coordinates: { latitude: 43.0167, longitude: 46.8333 }
    },
    rating: 4.9,
    reviewCount: 156,
    nextAvailableDate: new Date('2024-02-25'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'active-rafting',
    title: 'Рафтинг в Дагестане',
    slug: 'active-rafting',
    description: 'Экстремальный сплав по горным рекам с опытными инструкторами.',
    shortDescription: 'Адреналин и красивые горные пейзажи',
    basePrice: 8000,
    currency: 'RUB',
    priceFrom: 8000,
    duration: 2,
    difficulty: 'HARD',
    tourType: 'ACTIVE',
    maxPeople: 10,
    minPeople: 4,
    isActive: true,
    isPopular: false,
    mainImage: '/images/tours/rafting-dagestan.jpg',
    images: ['/images/tours/rafting-1.jpg', '/images/tours/rafting-2.jpg'],
    destination: {
      id: 'karakoysu',
      name: 'Река Каракойсу',
      region: 'Горный Дагестан',
      coordinates: { latitude: 42.5, longitude: 47.0 }
    },
    rating: 4.6,
    reviewCount: 43,
    nextAvailableDate: new Date('2024-04-15'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'cultural-crafts',
    title: 'Ремесла и традиции Дагестана',
    slug: 'cultural-crafts',
    description: 'Мастер-классы по традиционным ремеслам и знакомство с местными мастерами.',
    shortDescription: 'Изготовление ковров, керамики и национальных блюд',
    basePrice: 9500,
    currency: 'RUB',
    priceFrom: 9500,
    duration: 3,
    difficulty: 'EASY',
    tourType: 'CULTURAL',
    maxPeople: 8,
    minPeople: 2,
    isActive: true,
    isPopular: false,
    mainImage: '/images/tours/dagestan-crafts.jpg',
    images: ['/images/tours/crafts-1.jpg', '/images/tours/crafts-2.jpg'],
    destination: {
      id: 'untzukul',
      name: 'Аул Унцукуль',
      region: 'Горный Дагестан',
      coordinates: { latitude: 42.7167, longitude: 46.7833 }
    },
    rating: 4.8,
    reviewCount: 72,
    nextAvailableDate: new Date('2024-03-10'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  }
]

// Фильтры для каталога
export const TOUR_FILTERS = {
  tourTypes: [
    { value: 'EXCURSION', label: 'Экскурсионные туры' },
    { value: 'ACTIVE', label: 'Активный отдых' },
    { value: 'CULTURAL', label: 'Культурные туры' },
    { value: 'COMBINED', label: 'Комбинированные туры' }
  ],
  difficulty: [
    { value: 'EASY', label: 'Легкий' },
    { value: 'MEDIUM', label: 'Средний' },
    { value: 'HARD', label: 'Сложный' }
  ],
  destinations: [
    { value: 'derbent', label: 'Дербент' },
    { value: 'gunib', label: 'Гуниб' },
    { value: 'chokh', label: 'Аул Чох' },
    { value: 'sulak', label: 'Сулакский каньон' },
    { value: 'karakoysu', label: 'Река Каракойсу' },
    { value: 'untzukul', label: 'Аул Унцукуль' }
  ]
}

// Опции сортировки
export const SORT_OPTIONS = [
  { value: 'popularity', label: 'По популярности' },
  { value: 'price', label: 'По цене' },
  { value: 'rating', label: 'По рейтингу' },
  { value: 'duration', label: 'По длительности' },
  { value: 'date', label: 'По дате' }
]