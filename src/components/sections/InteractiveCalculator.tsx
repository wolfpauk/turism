'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCalculator } from '@/hooks/useCalculator'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Plus,
  Minus,
  Trash2,
  Calendar,
  Users,
  Clock,
  Calculator as CalculatorIcon,
  Car,
  Home,
  Utensils,
  User,
  Activity,
  MapPin
} from 'lucide-react'

const categoryIcons = {
  TRANSPORT: Car,
  ACCOMMODATION: Home,
  FOOD: Utensils,
  GUIDE: User,
  ACTIVITY: Activity,
  ENTRANCE: MapPin,
  OTHER: CalculatorIcon
}

const categoryColors = {
  TRANSPORT: 'bg-blue-100 text-blue-800',
  ACCOMMODATION: 'bg-green-100 text-green-800',
  FOOD: 'bg-orange-100 text-orange-800',
  GUIDE: 'bg-purple-100 text-purple-800',
  ACTIVITY: 'bg-pink-100 text-pink-800',
  ENTRANCE: 'bg-yellow-100 text-yellow-800',
  OTHER: 'bg-gray-100 text-gray-800'
}

export function InteractiveCalculator() {
  const [isExpanded, setIsExpanded] = useState(false)
  const {
    state,
    priceCalculation,
    updateTourType,
    updateParticipants,
    updateDuration,
    updateStartDate,
    addService,
    updateService,
    removeService,
    availableServices,
    tourTypes
  } = useCalculator()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-green-50 to-primary-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Интерактивный калькулятор цен
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Рассчитайте стоимость вашего путешествия по Дагестану
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Левая колонка - настройки тура */}
            <div className="space-y-6">
              {/* Тип тура */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CalculatorIcon className="w-5 h-5 text-primary-green-600" />
                  Выберите тип тура
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {tourTypes.map(tour => (
                    <button
                      key={tour.id}
                      onClick={() => updateTourType(tour.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        state.tourType === tour.id
                          ? 'border-primary-green-500 bg-primary-green-50 text-primary-green-800'
                          : 'border-gray-200 hover:border-primary-green-300 hover:bg-primary-green-25'
                      }`}
                    >
                      <div className="text-sm font-medium">{tour.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{tour.description}</div>
                      <div className="text-sm font-semibold mt-2">{formatPrice(tour.basePrice)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Базовые параметры */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Параметры тура</h3>

                <div className="space-y-4">
                  {/* Количество участников */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Количество участников
                    </label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateParticipants(state.participants - 1)}
                        disabled={state.participants <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                        <Users className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">{state.participants}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateParticipants(state.participants + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Длительность */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Длительность (дней)
                    </label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateDuration(state.duration - 1)}
                        disabled={state.duration <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">{state.duration}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateDuration(state.duration + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Дата начала */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Предпочитаемая дата начала
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500"
                      onChange={(e) => updateStartDate(e.target.value ? new Date(e.target.value) : null)}
                    />
                  </div>
                </div>
              </div>

              {/* Дополнительные услуги */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Дополнительные услуги</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? 'Скрыть' : 'Показать все'}
                  </Button>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {availableServices.map(service => {
                          const Icon = categoryIcons[service.category]
                          const existingServiceIndex = state.services.findIndex(s => s.serviceId === service.id)

                          return (
                            <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Icon className="w-4 h-4 text-primary-green-600" />
                                    <Badge className={categoryColors[service.category]}>
                                      {service.category}
                                    </Badge>
                                  </div>
                                  <h4 className="font-medium">{service.name}</h4>
                                  {service.description && (
                                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                  )}
                                  <p className="text-sm text-gray-500 mt-1">
                                    {formatPrice(service.price)} за {service.unit}
                                  </p>
                                </div>

                                {existingServiceIndex === -1 ? (
                                  <Button
                                    size="sm"
                                    onClick={() => addService({
                                      serviceId: service.id,
                                      quantity: 1
                                    })}
                                  >
                                    Добавить
                                  </Button>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => {
                                        const currentQuantity = state.services[existingServiceIndex].quantity
                                        if (currentQuantity > 1) {
                                          updateService(existingServiceIndex, {
                                            ...state.services[existingServiceIndex],
                                            quantity: currentQuantity - 1
                                          })
                                        } else {
                                          removeService(existingServiceIndex)
                                        }
                                      }}
                                    >
                                      <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="w-12 text-center font-medium">
                                      {state.services[existingServiceIndex].quantity}
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => {
                                        const currentQuantity = state.services[existingServiceIndex].quantity
                                        updateService(existingServiceIndex, {
                                          ...state.services[existingServiceIndex],
                                          quantity: currentQuantity + 1
                                        })
                                      }}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                )}
                              </div>

                              {/* Варианты услуги */}
                              {service.options && (
                                <div className="ml-6 space-y-2">
                                  <p className="text-sm font-medium text-gray-700">Варианты:</p>
                                  {service.options.map(option => (
                                    <label key={option.id} className="flex items-center gap-2">
                                      <input
                                        type="radio"
                                        name={`service-${service.id}`}
                                        className="text-primary-green-600"
                                        onChange={() => {
                                          if (existingServiceIndex !== -1) {
                                            updateService(existingServiceIndex, {
                                              ...state.services[existingServiceIndex],
                                              variantId: option.id,
                                              customPrice: option.price
                                            })
                                          }
                                        }}
                                      />
                                      <span className="text-sm">{option.name} - {formatPrice(option.price)}</span>
                                    </label>
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Правая колонка - результат расчета */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-6 text-center">Стоимость тура</h3>

                {/* Разбивка стоимости */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Базовая стоимость:</span>
                    <span className="font-medium">{formatPrice(priceCalculation.subtotal)}</span>
                  </div>

                  {priceCalculation.discount > 0 && (
                    <div className="flex justify-between items-center py-2 border-b text-green-600">
                      <span>Скидка:</span>
                      <span className="font-medium">-{formatPrice(priceCalculation.discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-3 border-t-2 border-gray-200">
                    <span className="text-xl font-bold">Итого:</span>
                    <span className="text-2xl font-bold text-primary-green-600">
                      {formatPrice(priceCalculation.total)}
                    </span>
                  </div>
                </div>

                {/* Детальная разбивка */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Детальная разбивка:</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {priceCalculation.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} ({item.quantity} {item.quantity === 1 ? 'шт' : 'шт'})
                        </span>
                        <span className="font-medium">{formatPrice(item.totalPrice)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-primary-green-600 hover:bg-primary-green-700"
                    size="lg"
                    disabled={priceCalculation.total === 0}
                  >
                    Забронировать тур
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      Поделиться
                    </Button>
                    <Button variant="outline" size="sm">
                      Сохранить
                    </Button>
                  </div>
                </div>

                {/* Информация о скидках */}
                {state.participants >= 4 && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">
                      🎉 Применена групповая скидка 15% за поездку от 4 человек!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}