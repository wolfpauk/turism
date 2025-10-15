// Базовые типы для сайта "Туры в Дагестан"

export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'TOURIST' | 'ADMIN' | 'MANAGER'

export interface Tour {
  id: string
  title: string
  slug: string
  description?: string
  shortDescription?: string

  // Ценообразование
  basePrice: number
  currency: string

  // Характеристики тура
  duration: number
  difficulty: Difficulty
  tourType: TourType
  maxPeople: number
  minPeople: number

  // Статус
  isActive: boolean
  isPopular: boolean

  // Медиа
  mainImage?: string

  // Даты
  createdAt: Date
  updatedAt: Date

  // Связи
  destination?: Destination
  services: TourService[]
  reviews: Review[]
  photos: Photo[]
}

export interface Destination {
  id: string
  name: string
  slug: string
  description?: string
  latitude?: number
  longitude?: number
  region?: string
  isPopular: boolean
  mainImage?: string
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  name: string
  description?: string
  serviceType: ServiceType
  basePrice: number
  unit: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TourService {
  id: string
  tourId: string
  serviceId: string
  quantity: number
  customPrice?: number
  tour: Tour
  service: Service
}

export interface Pricing {
  id: string
  serviceId: string
  priceType: PriceType
  price: number
  validFrom: Date
  validTo?: Date
  isActive: boolean
  createdAt: Date
  service: Service
}

export interface Booking {
  id: string
  userId: string
  tourId: string
  bookingDate: Date
  participants: number
  totalPrice: number
  currency: string
  status: BookingStatus
  contactName: string
  contactPhone: string
  contactEmail: string
  specialRequests?: string
  paymentId?: string
  createdAt: Date
  updatedAt: Date
  user: User
  tour: Tour
}

export interface Review {
  id: string
  userId: string
  tourId: string
  rating: number
  title?: string
  comment?: string
  photos: string[]
  isVerified: boolean
  isVisible: boolean
  createdAt: Date
  updatedAt: Date
  user: User
  tour: Tour
}

export interface Photo {
  id: string
  url: string
  alt?: string
  filename: string
  tourId?: string
  destinationId?: string
  isPrimary: boolean
  sortOrder: number
  width?: number
  height?: number
  fileSize?: number
  createdAt: Date
}

// Перечисления
export type TourType = 'EXCURSION' | 'ACTIVE' | 'CULTURAL' | 'COMBINED'

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

export type ServiceType = 'TRANSPORT' | 'ACCOMMODATION' | 'FOOD' | 'GUIDE' | 'ACTIVITY' | 'ENTRANCE' | 'OTHER'

export type PriceType = 'BASE' | 'SEASONAL' | 'PROMO'

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'PAID' | 'CANCELLED' | 'COMPLETED'

// API Response типы
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Формы
export interface TourFormData {
  title: string
  description?: string
  shortDescription?: string
  basePrice: number
  duration: number
  difficulty: Difficulty
  tourType: TourType
  maxPeople: number
  minPeople: number
  destinationId?: string
  services: {
    serviceId: string
    quantity: number
    customPrice?: number
  }[]
}

export interface BookingFormData {
  tourId: string
  bookingDate: Date
  participants: number
  contactName: string
  contactPhone: string
  contactEmail: string
  specialRequests?: string
}

export interface ReviewFormData {
  tourId: string
  rating: number
  title?: string
  comment?: string
  photos?: File[]
}

// Калькулятор
export interface CalculatorItem {
  service: Service
  quantity: number
  customPrice?: number
}

export interface CalculatorResult {
  items: CalculatorItem[]
  subtotal: number
  discount: number
  total: number
  currency: string
}

// Фильтры и поиск
export interface TourFilters {
  tourType?: TourType[]
  difficulty?: Difficulty[]
  destination?: string[]
  priceRange?: {
    min: number
    max: number
  }
  duration?: {
    min: number
    max: number
  }
  dateFrom?: Date
  dateTo?: Date
  participants?: number
}

export interface SearchParams {
  query?: string
  filters?: TourFilters
  sortBy?: 'price' | 'rating' | 'duration' | 'popularity'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}