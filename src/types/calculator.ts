// Типы данных для калькулятора туров

export interface ServiceOption {
  id: string
  name: string
  description?: string
  price: number
  unit: string
  category: ServiceCategory
  maxQuantity?: number
  options?: ServiceOptionVariant[]
}

export interface ServiceOptionVariant {
  id: string
  name: string
  price: number
  description?: string
}

export type ServiceCategory = 'TRANSPORT' | 'ACCOMMODATION' | 'FOOD' | 'GUIDE' | 'ACTIVITY' | 'ENTRANCE' | 'OTHER'

export interface SelectedService {
  serviceId: string
  quantity: number
  variantId?: string
  customPrice?: number
  notes?: string
}

export interface CalculatorState {
  tourType: TourType | null
  participants: number
  duration: number
  startDate: Date | null
  services: SelectedService[]
  totalPrice: number
  currency: 'RUB'
}

export type TourType = 'EXCURSION' | 'ACTIVE' | 'CULTURAL' | 'COMBINED'

export interface PriceCalculation {
  subtotal: number
  discount: number
  total: number
  currency: string
  breakdown: PriceBreakdown[]
}

export interface PriceBreakdown {
  category: ServiceCategory
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

// Предустановленные услуги для калькулятора
export const DEFAULT_SERVICES: ServiceOption[] = [
  // Транспорт
  {
    id: 'bus_transfer',
    name: 'Трансфер автобусом',
    description: 'Комфортабельный автобус с кондиционером',
    price: 1500,
    unit: 'маршрут',
    category: 'TRANSPORT',
    maxQuantity: 10
  },
  {
    id: 'jeep_tour',
    name: 'Джиппинг тур',
    description: 'Внедорожник с водителем',
    price: 5000,
    unit: 'день',
    category: 'TRANSPORT',
    maxQuantity: 5
  },
  {
    id: 'airport_transfer',
    name: 'Трансфер из аэропорта',
    description: 'Встреча в аэропорту Махачкалы',
    price: 2000,
    unit: 'поездка',
    category: 'TRANSPORT',
    options: [
      { id: 'economy', name: 'Эконом', price: 1500 },
      { id: 'comfort', name: 'Комфорт', price: 2000 },
      { id: 'premium', name: 'Премиум', price: 3000 }
    ]
  },

  // Экскурсии и активности
  {
    id: 'city_tour',
    name: 'Обзорная экскурсия по Махачкале',
    description: 'Знакомство со столицей Дагестана',
    price: 2500,
    unit: 'группа',
    category: 'GUIDE',
    maxQuantity: 1
  },
  {
    id: 'mountain_guide',
    name: 'Горный гид',
    description: 'Профессиональный гид для горных маршрутов',
    price: 4000,
    unit: 'день',
    category: 'GUIDE',
    maxQuantity: 3
  },
  {
    id: 'karadakh_gorge',
    name: 'Карадахская теснина',
    description: 'Экскурсия к знаменитой теснине',
    price: 1800,
    unit: 'человек',
    category: 'ENTRANCE',
    maxQuantity: 20
  },

  // Проживание
  {
    id: 'hotel_standard',
    name: 'Стандартный номер',
    description: 'Комфортабельный номер в отеле',
    price: 3500,
    unit: 'ночь',
    category: 'ACCOMMODATION',
    maxQuantity: 10
  },
  {
    id: 'guesthouse',
    name: 'Гостевой дом',
    description: 'Традиционное дагестанское гостеприимство',
    price: 2500,
    unit: 'ночь',
    category: 'ACCOMMODATION',
    maxQuantity: 8
  },

  // Питание
  {
    id: 'breakfast',
    name: 'Завтрак',
    description: 'Традиционный дагестанский завтрак',
    price: 500,
    unit: 'человек/день',
    category: 'FOOD',
    maxQuantity: 30
  },
  {
    id: 'lunch',
    name: 'Обед',
    description: 'Национальная кухня Дагестана',
    price: 800,
    unit: 'человек/день',
    category: 'FOOD',
    maxQuantity: 30
  },
  {
    id: 'dinner',
    name: 'Ужин',
    description: 'Вечерняя трапеза с местными блюдами',
    price: 1000,
    unit: 'человек/день',
    category: 'FOOD',
    maxQuantity: 30
  },

  // Активности
  {
    id: 'rafting',
    name: 'Рафтинг',
    description: 'Спуск по горным рекам',
    price: 3000,
    unit: 'человек',
    category: 'ACTIVITY',
    maxQuantity: 12
  },
  {
    id: 'trekking',
    name: 'Треккинг',
    description: 'Пешие маршруты по горам',
    price: 2000,
    unit: 'день/человек',
    category: 'ACTIVITY',
    maxQuantity: 15
  },
  {
    id: 'master_class',
    name: 'Мастер-класс',
    description: 'Изготовление традиционных изделий',
    price: 1500,
    unit: 'человек',
    category: 'ACTIVITY',
    options: [
      { id: 'carpet', name: 'Ковроткачество', price: 1500 },
      { id: 'pottery', name: 'Гончарное дело', price: 1200 },
      { id: 'cooking', name: 'Дагестанская кухня', price: 1800 }
    ]
  }
]

// Предустановленные типы туров
export const TOUR_TYPES: { id: TourType; name: string; description: string; basePrice: number }[] = [
  {
    id: 'EXCURSION',
    name: 'Экскурсионные туры',
    description: 'Знакомство с достопримечательностями и историей Дагестана',
    basePrice: 15000
  },
  {
    id: 'ACTIVE',
    name: 'Активный отдых',
    description: 'Джиппинг, треккинг, рафтинг и экстремальные приключения',
    basePrice: 25000
  },
  {
    id: 'CULTURAL',
    name: 'Культурные туры',
    description: 'Погружение в традиции, кухню и быт дагестанского народа',
    basePrice: 18000
  },
  {
    id: 'COMBINED',
    name: 'Комбинированные туры',
    description: 'Сочетание экскурсий, активного отдыха и культурных программ',
    basePrice: 30000
  }
]

// Скидки и акции
export interface DiscountRule {
  id: string
  name: string
  type: 'PERCENTAGE' | 'FIXED'
  value: number
  conditions: {
    minParticipants?: number
    minDuration?: number
    minAmount?: number
    tourTypes?: TourType[]
  }
  validFrom: Date
  validTo: Date
}

export const DISCOUNT_RULES: DiscountRule[] = [
  {
    id: 'early_booking',
    name: 'Раннее бронирование',
    type: 'PERCENTAGE',
    value: 10,
    conditions: {
      minDuration: 3
    },
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2024-12-31')
  },
  {
    id: 'group_discount',
    name: 'Групповая скидка',
    type: 'PERCENTAGE',
    value: 15,
    conditions: {
      minParticipants: 4
    },
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2024-12-31')
  }
]