import { Suspense } from 'react'
import { AdminBookingsTable } from '@/components/admin/AdminBookingsTable'

export default function AdminBookingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Управление заявками</h1>
            <p className="mt-2 text-gray-600">
              Просмотр и управление заявками на бронирование туров
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-lg">
            <Suspense fallback={<div className="p-8 text-center">Загрузка...</div>}>
              <AdminBookingsTable />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}