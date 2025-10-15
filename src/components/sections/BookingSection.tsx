'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  Phone,
  Mail,
  User,
  MessageSquare
} from 'lucide-react'

interface BookingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  participants: number
  preferredDate: string
  tourType: string
  specialRequests: string
}

export function BookingSection() {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    participants: 2,
    preferredDate: '',
    tourType: '',
    specialRequests: ''
  })

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Симуляция отправки данных
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setStep(3) // Переход к подтверждению
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-green-50 to-primary-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Забронировать тур
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Заполните форму и наши специалисты свяжутся с вами для подтверждения бронирования
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Шаги процесса */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber
                      ? 'bg-primary-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? 'bg-primary-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Шаг 1: Выбор тура */}
            {step === 1 && (
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">Выберите тип тура</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'excursion',
                      title: 'Экскурсионные туры',
                      description: 'Знакомство с достопримечательностями',
                      price: 'от 15 000 ₽',
                      popular: true
                    },
                    {
                      id: 'active',
                      title: 'Активный отдых',
                      description: 'Джиппинг, треккинг, рафтинг',
                      price: 'от 25 000 ₽',
                      popular: true
                    },
                    {
                      id: 'cultural',
                      title: 'Культурные туры',
                      description: 'Традиции и быт Дагестана',
                      price: 'от 18 000 ₽',
                      popular: false
                    },
                    {
                      id: 'combined',
                      title: 'Комбинированные туры',
                      description: 'Сочетание всех видов отдыха',
                      price: 'от 30 000 ₽',
                      popular: false
                    }
                  ].map((tour) => (
                    <div
                      key={tour.id}
                      onClick={() => handleInputChange('tourType', tour.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.tourType === tour.id
                          ? 'border-primary-green-500 bg-primary-green-50'
                          : 'border-gray-200 hover:border-primary-green-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{tour.title}</h4>
                        {tour.popular && (
                          <Badge className="bg-accent-gold-100 text-accent-gold-800">
                            Популярный
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{tour.description}</p>
                      <p className="text-lg font-semibold text-primary-green-600">{tour.price}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!formData.tourType}
                    className="bg-primary-green-600 hover:bg-primary-green-700"
                  >
                    Продолжить
                  </Button>
                </div>
              </div>
            )}

            {/* Шаг 2: Данные для бронирования */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="p-8">
                <h3 className="text-2xl font-bold mb-6">Данные для бронирования</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Личные данные */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Личные данные
                    </h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Имя *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500"
                          placeholder="Иван"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Фамилия *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500"
                          placeholder="Иванов"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500"
                        placeholder="ivan@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                  </div>

                  {/* Детали поездки */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Детали поездки
                    </h4>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Количество участников
                      </label>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleInputChange('participants', Math.max(1, formData.participants - 1))}
                        >
                          -
                        </Button>
                        <span className="w-16 text-center font-medium">{formData.participants}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleInputChange('participants', formData.participants + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Предпочитаемая дата начала
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Специальные пожелания
                      </label>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500"
                        placeholder="Расскажите о ваших пожеланиях к туру..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Назад
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.firstName || !formData.email || !formData.phone}
                    className="bg-primary-green-600 hover:bg-primary-green-700"
                  >
                    {isSubmitting ? 'Отправляем...' : 'Забронировать'}
                  </Button>
                </div>
              </form>
            )}

            {/* Шаг 3: Подтверждение */}
            {step === 3 && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Заявка отправлена!
                </h3>
                <p className="text-gray-600 mb-6">
                  Спасибо за ваше обращение! Наши специалисты свяжутся с вами в течение 30 минут для подтверждения деталей.
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold mb-2">Что дальше?</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>✓ Подтверждение деталей тура по телефону</p>
                    <p>✓ Согласование окончательной стоимости</p>
                    <p>✓ Подтверждение дат и состава группы</p>
                    <p>✓ Оплата и получение документов</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      setStep(1)
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        participants: 2,
                        preferredDate: '',
                        tourType: '',
                        specialRequests: ''
                      })
                    }}
                    variant="outline"
                  >
                    Забронировать еще
                  </Button>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>+7 (XXX) XXX-XX-XX</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Контактная информация */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-primary-green-600" />
              </div>
              <h4 className="font-semibold mb-1">Телефон</h4>
              <p className="text-gray-600 text-sm">+7 (XXX) XXX-XX-XX</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-primary-green-600" />
              </div>
              <h4 className="font-semibold mb-1">Email</h4>
              <p className="text-gray-600 text-sm">info@dagestan-tours.ru</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-primary-green-600" />
              </div>
              <h4 className="font-semibold mb-1">Онлайн консультация</h4>
              <p className="text-gray-600 text-sm">Ответим за 5 минут</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}