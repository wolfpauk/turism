'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  CalculatorState,
  SelectedService,
  PriceCalculation,
  ServiceOption,
  DEFAULT_SERVICES,
  TOUR_TYPES,
  DISCOUNT_RULES,
  TourType
} from '@/types/calculator'

const initialState: CalculatorState = {
  tourType: null,
  participants: 2,
  duration: 3,
  startDate: null,
  services: [],
  totalPrice: 0,
  currency: 'RUB'
}

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState)

  // Обновление типа тура
  const updateTourType = useCallback((tourType: TourType) => {
    setState(prev => ({ ...prev, tourType }))
  }, [])

  // Обновление количества участников
  const updateParticipants = useCallback((participants: number) => {
    setState(prev => ({ ...prev, participants: Math.max(1, participants) }))
  }, [])

  // Обновление длительности
  const updateDuration = useCallback((duration: number) => {
    setState(prev => ({ ...prev, duration: Math.max(1, duration) }))
  }, [])

  // Обновление даты начала
  const updateStartDate = useCallback((startDate: Date | null) => {
    setState(prev => ({ ...prev, startDate }))
  }, [])

  // Добавление услуги
  const addService = useCallback((service: SelectedService) => {
    setState(prev => ({
      ...prev,
      services: [...prev.services, service]
    }))
  }, [])

  // Обновление услуги
  const updateService = useCallback((index: number, service: SelectedService) => {
    setState(prev => ({
      ...prev,
      services: prev.services.map((s, i) => i === index ? service : s)
    }))
  }, [])

  // Удаление услуги
  const removeService = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }))
  }, [])

  // Очистка всех услуг
  const clearServices = useCallback(() => {
    setState(prev => ({ ...prev, services: [] }))
  }, [])

  // Сброс калькулятора
  const resetCalculator = useCallback(() => {
    setState(initialState)
  }, [])

  // Расчет стоимости услуг
  const calculateServicesPrice = useCallback((services: SelectedService[]) => {
    let total = 0

    services.forEach(selectedService => {
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
  }, [])

  // Расчет скидок
  const calculateDiscount = useCallback((subtotal: number, participants: number, duration: number, tourType: TourType | null) => {
    let discount = 0

    DISCOUNT_RULES.forEach(rule => {
      // Проверяем условия скидки
      const conditions = rule.conditions

      if (conditions.minParticipants && participants < conditions.minParticipants) return
      if (conditions.minDuration && duration < conditions.minDuration) return
      if (conditions.minAmount && subtotal < conditions.minAmount) return
      if (conditions.tourTypes && tourType && !conditions.tourTypes.includes(tourType)) return

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
  }, [])

  // Основной расчет стоимости
  const calculatePrice = useCallback((): PriceCalculation => {
    const servicesPrice = calculateServicesPrice(state.services)

    // Базовая стоимость тура
    const tourBasePrice = state.tourType
      ? TOUR_TYPES.find(t => t.id === state.tourType)?.basePrice || 0
      : 0

    // Стоимость за количество дней
    const durationPrice = tourBasePrice * state.duration

    // Стоимость за количество участников
    const participantsPrice = durationPrice * state.participants

    // Общая сумма
    const subtotal = participantsPrice + servicesPrice

    // Скидки
    const discount = calculateDiscount(subtotal, state.participants, state.duration, state.tourType)

    // Итоговая сумма
    const total = Math.max(0, subtotal - discount)

    // Разбивка по категориям
    const breakdown = generatePriceBreakdown(state.services, participantsPrice)

    return {
      subtotal,
      discount,
      total,
      currency: state.currency,
      breakdown
    }
  }, [state, calculateServicesPrice, calculateDiscount])

  // Генерация разбивки по категориям
  const generatePriceBreakdown = useCallback((services: SelectedService[], tourPrice: number) => {
    const breakdown = []

    // Добавляем стоимость базового тура
    breakdown.push({
      category: 'TRANSPORT' as const,
      name: 'Базовый тур',
      quantity: state.duration,
      unitPrice: TOUR_TYPES.find(t => t.id === state.tourType)?.basePrice || 0,
      totalPrice: tourPrice
    })

    // Группируем услуги по категориям
    const servicesByCategory = services.reduce((acc, selectedService) => {
      const service = DEFAULT_SERVICES.find(s => s.id === selectedService.serviceId)
      if (!service) return acc

      if (!acc[service.category]) {
        acc[service.category] = []
      }

      acc[service.category].push({ service, selectedService })
      return acc
    }, {} as Record<string, Array<{ service: ServiceOption; selectedService: SelectedService }>>)

    // Создаем элементы разбивки
    Object.entries(servicesByCategory).forEach(([category, items]) => {
      items.forEach(({ service, selectedService }) => {
        const price = selectedService.customPrice || service.price
        const variant = selectedService.variantId && service.options
          ? service.options.find(opt => opt.id === selectedService.variantId)
          : null

        breakdown.push({
          category: category as any,
          name: service.name,
          quantity: selectedService.quantity,
          unitPrice: variant ? variant.price : price,
          totalPrice: (variant ? variant.price : price) * selectedService.quantity
        })
      })
    })

    return breakdown
  }, [state.tourType, state.duration])

  // Вычисляемая стоимость
  const priceCalculation = useMemo(() => calculatePrice(), [calculatePrice])

  // Обновление общей стоимости в состоянии
  const updateTotalPrice = useCallback(() => {
    setState(prev => ({ ...prev, totalPrice: priceCalculation.total }))
  }, [priceCalculation.total])

  return {
    // Состояние
    state,
    priceCalculation,

    // Действия
    updateTourType,
    updateParticipants,
    updateDuration,
    updateStartDate,
    addService,
    updateService,
    removeService,
    clearServices,
    resetCalculator,
    updateTotalPrice,

    // Вычисляемые значения
    availableServices: DEFAULT_SERVICES,
    tourTypes: TOUR_TYPES
  }
}