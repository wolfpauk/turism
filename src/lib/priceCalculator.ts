import { DEFAULT_SERVICES, TOUR_TYPES, DISCOUNT_RULES } from '@/types/calculator'

export interface PriceCalculationRequest {
  tourType: 'EXCURSION' | 'ACTIVE' | 'CULTURAL' | 'COMBINED'
  participants: number
  duration: number
  startDate?: string
  services?: Array<{
    serviceId: string
    quantity: number
    variantId?: string
    customPrice?: number
  }>
}

export interface PriceCalculation {
  subtotal: number
  discount: number
  total: number
  currency: string
  breakdown: Array<{
    category: string
    name: string
    quantity: number
    unitPrice: number
    totalPrice: number
  }>
}

export function calculateTourPrice(request: PriceCalculationRequest): PriceCalculation {
  const { tourType, participants, duration, services = [] } = request

  // Базовая стоимость тура
  const tourBasePrice = TOUR_TYPES.find(t => t.id === tourType)?.basePrice || 0

  // Стоимость за количество дней
  const durationPrice = tourBasePrice * duration

  // Стоимость за количество участников
  const participantsPrice = durationPrice * participants

  // Расчет стоимости услуг
  const servicesPrice = calculateServicesPrice(services)

  // Общая сумма до скидок
  const subtotal = participantsPrice + servicesPrice

  // Расчет скидок
  const discount = calculateDiscount(subtotal, participants, duration, tourType)

  // Итоговая сумма
  const total = Math.max(0, subtotal - discount)

  // Детальная разбивка
  const breakdown = generatePriceBreakdown(tourType, duration, participants, services, participantsPrice, servicesPrice)

  return {
    subtotal,
    discount,
    total,
    currency: 'RUB',
    breakdown
  }
}

function calculateServicesPrice(services: PriceCalculationRequest['services']) {
  let total = 0

  services?.forEach(selectedService => {
    const service = DEFAULT_SERVICES.find(s => s.id === selectedService.serviceId)
    if (!service) return

    const price = selectedService.customPrice || service.price
    const quantity = selectedService.quantity

    // Если есть варианты услуги
    if (selectedService.variantId && service.options) {
      const variant = service.options.find(opt => opt.id === selectedService.variantId)
      if (variant) {
        total += variant.price * quantity
      }
    } else {
      total += price * quantity
    }
  })

  return total
}

function calculateDiscount(subtotal: number, participants: number, duration: number, tourType: string): number {
  let discount = 0

  DISCOUNT_RULES.forEach(rule => {
    // Проверяем условия скидки
    const conditions = rule.conditions

    if (conditions.minParticipants && participants < conditions.minParticipants) return
    if (conditions.minDuration && duration < conditions.minDuration) return
    if (conditions.minAmount && subtotal < conditions.minAmount) return
    if (conditions.tourTypes && !conditions.tourTypes.includes(tourType as any)) return

    // Проверяем период действия скидки
    const now = new Date()
    if (now < rule.validFrom || now > rule.validTo) return

    // Применяем скидку
    if (rule.type === 'PERCENTAGE') {
      discount += subtotal * (rule.value / 100)
    } else {
      discount += rule.value
    }
  })

  return discount
}

function generatePriceBreakdown(
  tourType: string,
  duration: number,
  participants: number,
  services: PriceCalculationRequest['services'],
  participantsPrice: number,
  servicesPrice: number
) {
  const breakdown = []

  // Добавляем стоимость базового тура
  const tourBasePrice = TOUR_TYPES.find(t => t.id === tourType)?.basePrice || 0
  breakdown.push({
    category: 'Базовый тур',
    name: TOUR_TYPES.find(t => t.id === tourType)?.name || 'Неизвестный тур',
    quantity: duration,
    unitPrice: tourBasePrice,
    totalPrice: participantsPrice
  })

  // Группируем услуги по категориям
  const servicesByCategory: Record<string, Array<{ service: any; selectedService: any }>> = {}

  services?.forEach(selectedService => {
    const service = DEFAULT_SERVICES.find(s => s.id === selectedService.serviceId)
    if (!service) return

    if (!servicesByCategory[service.category]) {
      servicesByCategory[service.category] = []
    }

    servicesByCategory[service.category].push({ service, selectedService })
  })

  // Создаем элементы разбивки для услуг
  Object.entries(servicesByCategory).forEach(([category, items]) => {
    items.forEach(({ service, selectedService }) => {
      const price = selectedService.customPrice || service.price
      const variant = selectedService.variantId && service.options
        ? service.options.find((opt: any) => opt.id === selectedService.variantId)
        : null

      breakdown.push({
        category,
        name: service.name,
        quantity: selectedService.quantity,
        unitPrice: variant ? variant.price : price,
        totalPrice: (variant ? variant.price : price) * selectedService.quantity
      })
    })
  })

  return breakdown
}