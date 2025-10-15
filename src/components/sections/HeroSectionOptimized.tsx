'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight, MapPin, Star, Users } from 'lucide-react'

let MotionDiv: any = null

export function HeroSection() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Динамический импорт framer-motion только на клиенте
    import('framer-motion').then(mod => {
      MotionDiv = mod.motion.div
    })
  }, [])

  // SSR версия без анимаций
  if (!isClient) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-primary-green-900/90 via-primary-blue-900/80 to-primary-brown-900/90" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center space-y-8">
            <Badge variant="secondary" className="bg-accent-gold-100 text-accent-gold-800 border-accent-gold-200">
              <Star className="w-4 h-4 fill-current" />
              Лучшие туры 2024
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              Незабываемые путешествия по Дагестану
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Откройте для себя древние традиции, величественные горы и гостеприимство Кавказа.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" className="bg-accent-gold-500 hover:bg-accent-gold-600 text-white font-semibold">
                Выбрать тур
              </Button>
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-green-800">
                Посмотреть видео
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Клиентская версия с анимациями
  const MotionComponent = MotionDiv || 'div'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновое изображение с оверлеем */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-primary-green-900/90 via-primary-blue-900/80 to-primary-brown-900/90" />
        <div className="absolute inset-0 bg-[url('/images/dagestan-hero.jpg')] bg-cover bg-center bg-no-repeat opacity-20" />
      </div>

      {/* Декоративные элементы */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-gold-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-orange-400/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка - контент */}
          <MotionComponent
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Бейдж */}
            <MotionComponent
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2"
            >
              <Badge variant="secondary" className="bg-accent-gold-100 text-accent-gold-800 border-accent-gold-200">
                <Star className="w-4 h-4 fill-current" />
                Лучшие туры 2024
              </Badge>
            </MotionComponent>

            {/* Главный заголовок */}
            <MotionComponent
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
            >
              Незабываемые{' '}
              <span className="bg-gradient-to-r from-accent-gold-400 to-accent-orange-400 bg-clip-text text-transparent">
                путешествия
              </span>{' '}
              по Дагестану
            </MotionComponent>

            {/* Описание */}
            <MotionComponent
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed"
            >
              Откройте для себя древние традиции, величественные горы и гостеприимство Кавказа.
              Экскурсии, активный отдых и культурные туры от местных экспертов.
            </MotionComponent>

            {/* Статистика */}
            <MotionComponent
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-8 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5 text-accent-gold-400" />
                <span className="font-semibold">50+ направлений</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5 text-accent-gold-400" />
                <span className="font-semibold">1000+ туристов</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Star className="w-5 h-5 text-accent-gold-400 fill-current" />
                <span className="font-semibold">4.9 рейтинг</span>
              </div>
            </MotionComponent>

            {/* Кнопки действий */}
            <MotionComponent
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="xl"
                className="bg-accent-gold-500 hover:bg-accent-gold-600 text-white font-semibold shadow-strong"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Выбрать тур
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-green-800"
              >
                Посмотреть видео
              </Button>
            </MotionComponent>

            {/* Дополнительная информация */}
            <MotionComponent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="pt-8 border-t border-white/20"
            >
              <p className="text-sm text-gray-300 text-center lg:text-left">
                ✓ Индивидуальные и групповые туры • ✓ Опытные гиды • ✓ Гарантия качества
              </p>
            </MotionComponent>
          </MotionComponent>

          {/* Правая колонка - карта */}
          <MotionComponent
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative">
              {/* Карта Дагестана */}
              <div className="w-full h-96 lg:h-[500px] bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary-green-100/20 to-primary-blue-100/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-accent-gold-400 rounded-full flex items-center justify-center mx-auto">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white font-semibold">Интерактивная карта</p>
                    <p className="text-gray-300 text-sm">Дагестан и популярные маршруты</p>
                  </div>
                </div>
              </div>

              {/* Популярные направления */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-strong">
                <h3 className="font-semibold text-primary-green-800 mb-2">Популярные направления</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent-gold-400 rounded-full" />
                    <span>Дербент</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent-orange-400 rounded-full" />
                    <span>Гуниб</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-blue-400 rounded-full" />
                    <span>Карадахская теснина</span>
                  </div>
                </div>
              </div>

              {/* Кнопка быстрого доступа */}
              <div className="absolute -top-4 -right-4">
                <Button
                  size="icon"
                  className="rounded-full bg-accent-gold-500 hover:bg-accent-gold-600 shadow-strong"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </MotionComponent>
        </div>
      </div>

      {/* Скролл индикатор */}
      <MotionComponent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-sm">Прокрутите вниз</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <MotionComponent
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </div>
        </div>
      </MotionComponent>
    </section>
  )
}