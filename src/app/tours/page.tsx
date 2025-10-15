import { ToursCatalog } from '@/components/sections/ToursCatalog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Каталог туров в Дагестан | Все экскурсии и путешествия',
  description: 'Полный каталог туристических туров в Дагестане. Экскурсии, активный отдых, культурные туры с фильтрацией и поиском.',
  keywords: 'туры в Дагестан каталог, экскурсии Дагестан, активный отдых, культурные туры',
}

export default function ToursPage() {
  return (
    <div className="min-h-screen pt-16">
      <ToursCatalog showTitle={true} showFilters={true} />
    </div>
  )
}