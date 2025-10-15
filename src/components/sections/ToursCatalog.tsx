'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  MapPin,
  Calendar,
  SlidersHorizontal,
  X
} from 'lucide-react'
import { TourCard, SAMPLE_TOURS, TOUR_FILTERS, SORT_OPTIONS, TourFilters, TourSortOption } from '@/types/tours'

interface ToursCatalogProps {
  showTitle?: boolean
  limit?: number
  showFilters?: boolean
}

const difficultyLabels = {
  EASY: 'Легкий',
  MEDIUM: 'Средний',
  HARD: 'Сложный'
}

const difficultyColors = {
  EASY: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HARD: 'bg-red-100 text-red-800'
}

const tourTypeLabels = {
  EXCURSION: 'Экскурсионный',
  ACTIVE: 'Активный отдых',
  CULTURAL: 'Культурный',
  COMBINED: 'Комбинированный'
}

const tourTypeColors = {
  EXCURSION: 'bg-blue-100 text-blue-800',
  ACTIVE: 'bg-orange-100 text-orange-800',
  CULTURAL: 'bg-purple-100 text-purple-800',
  COMBINED: 'bg-pink-100 text-pink-800'
}

export function ToursCatalog({ showTitle = true, limit, showFilters = true }: ToursCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [sortBy, setSortBy] = useState<TourSortOption>('popularity')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Фильтры
  const [filters, setFilters] = useState<TourFilters>({})

  // Фильтрация и сортировка туров
  const filteredAndSortedTours = useMemo(() => {
    let tours = [...SAMPLE_TOURS]

    // Поиск по тексту
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      tours = tours.filter(tour =>
        tour.title.toLowerCase().includes(query) ||
        tour.description.toLowerCase().includes(query) ||
        tour.destination.name.toLowerCase().includes(query)
      )
    }

    // Применение фильтров
    if (filters.tourTypes?.length) {
      tours = tours.filter(tour => filters.tourTypes!.includes(tour.tourType))
    }

    if (filters.difficulty?.length) {
      tours = tours.filter(tour => filters.difficulty!.includes(tour.difficulty))
    }

    if (filters.destinations?.length) {
      tours = tours.filter(tour => filters.destinations!.includes(tour.destination.id))
    }

    if (filters.priceRange) {
      tours = tours.filter(tour =>
        tour.priceFrom >= filters.priceRange!.min &&
        tour.priceFrom <= filters.priceRange!.max
      )
    }

    if (filters.duration) {
      tours = tours.filter(tour =>
        tour.duration >= filters.duration!.min &&
        tour.duration <= filters.duration!.max
      )
    }

    if (filters.rating) {
      tours = tours.filter(tour => tour.rating >= filters.rating!)
    }

    // Сортировка
    tours.sort((a, b) => {
      let aValue: number | string | Date
      let bValue: number | string | Date

      switch (sortBy) {
        case 'price':
          aValue = a.priceFrom
          bValue = b.priceFrom
          break
        case 'rating':
          aValue = a.rating
          bValue = b.rating
          break
        case 'duration':
          aValue = a.duration
          bValue = b.duration
          break
        case 'popularity':
          aValue = a.reviewCount
          bValue = b.reviewCount
          break
        case 'date':
          aValue = a.nextAvailableDate || new Date()
          bValue = b.nextAvailableDate || new Date()
          break
        default:
          aValue = a.title
          bValue = b.title
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortOrder === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime()
      }

      return sortOrder === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    })

    return limit ? tours.slice(0, limit) : tours
  }, [searchQuery, filters, sortBy, sortOrder, limit])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long'
    }).format(date)
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Каталог туров
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Выберите тур своей мечты из нашего разнообразного каталога
            </p>
          </div>
        )}

        {showFilters && (
          <>
            {/* Поиск и фильтры */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                {/* Поиск */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Поиск туров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500"
                  />
                </div>

                {/* Сортировка */}
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as TourSortOption)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500"
                  >
                    {SORT_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </Button>
                </div>

                {/* Мобильная кнопка фильтров */}
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowMobileFilters(true)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Фильтры
                </Button>
              </div>

              {/* Быстрые фильтры */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Button
                  variant={filters.tourTypes?.length === 0 ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, tourTypes: undefined }))}
                >
                  Все типы
                </Button>

                {TOUR_FILTERS.tourTypes.map(type => {
                  const isActive = filters.tourTypes?.includes(type.value as any)
                  return (
                    <Button
                      key={type.value}
                      variant={isActive ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        const currentTypes = filters.tourTypes || []
                        const newTypes = isActive
                          ? currentTypes.filter(t => t !== type.value)
                          : [...currentTypes, type.value as any]
                        setFilters(prev => ({ ...prev, tourTypes: newTypes.length ? newTypes : undefined }))
                      }}
                    >
                      {type.label}
                    </Button>
                  )
                })}
              </div>

              {/* Активные фильтры */}
              {(filters.tourTypes?.length || filters.difficulty?.length || filters.priceRange) && (
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-gray-600">Активные фильтры:</span>
                  {filters.tourTypes?.map(type => (
                    <Badge key={type} variant="secondary" className="gap-1">
                      {tourTypeLabels[type]}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => {
                          const newTypes = filters.tourTypes!.filter(t => t !== type)
                          setFilters(prev => ({ ...prev, tourTypes: newTypes.length ? newTypes : undefined }))
                        }}
                      />
                    </Badge>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilters({})}
                    className="text-primary-green-600"
                  >
                    Сбросить все
                  </Button>
                </div>
              )}
            </div>

            {/* Мобильные фильтры */}
            <AnimatePresence>
              {showMobileFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="fixed inset-0 z-50 bg-white lg:hidden"
                >
                  <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Фильтры</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="p-4 max-h-[calc(100vh-80px)] overflow-y-auto">
                    {/* Здесь можно добавить дополнительные фильтры для мобильной версии */}
                    <div className="text-center py-8">
                      <p className="text-gray-500">Расширенные фильтры появятся здесь</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Результаты */}
        <div className="mb-6">
          <p className="text-gray-600">
            Найдено туров: <span className="font-semibold">{filteredAndSortedTours.length}</span>
          </p>
        </div>

        {/* Сетка туров */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredAndSortedTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                {/* Изображение */}
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-300" />
                  {tour.isPopular && (
                    <Badge className="absolute top-3 left-3 bg-accent-gold-500 text-white">
                      Популярный
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-sm opacity-90">{tour.destination.name}</p>
                  </div>
                </div>

                {/* Контент */}
                <div className="p-6">
                  {/* Заголовок и тип */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary-green-600 transition-colors">
                      {tour.title}
                    </h3>
                  </div>

                  {/* Описание */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {tour.shortDescription}
                  </p>

                  {/* Характеристики */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration} дн.</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>до {tour.maxPeople}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{tour.destination.region}</span>
                    </div>
                  </div>

                  {/* Рейтинг */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{tour.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({tour.reviewCount} отзывов)</span>
                  </div>

                  {/* Бейджи */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className={tourTypeColors[tour.tourType]}>
                      {tourTypeLabels[tour.tourType]}
                    </Badge>
                    <Badge className={difficultyColors[tour.difficulty]}>
                      {difficultyLabels[tour.difficulty]}
                    </Badge>
                  </div>

                  {/* Цена и дата */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary-green-600">
                        от {formatPrice(tour.priceFrom)}
                      </div>
                      {tour.nextAvailableDate && (
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(tour.nextAvailableDate)}</span>
                        </div>
                      )}
                    </div>
                    <Button className="bg-primary-green-600 hover:bg-primary-green-700">
                      Подробнее
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Пустое состояние */}
        {filteredAndSortedTours.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Туры не найдены
            </h3>
            <p className="text-gray-500 mb-4">
              Попробуйте изменить параметры поиска или фильтры
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setFilters({})
              }}
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}