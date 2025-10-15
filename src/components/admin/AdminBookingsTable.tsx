'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table'
import {
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  Calendar,
  Users,
  DollarSign
} from 'lucide-react'

interface Booking {
  id: string
  contactName: string
  contactEmail: string
  contactPhone: string
  participants: number
  totalPrice: number
  status: 'PENDING' | 'CONFIRMED' | 'PAID' | 'CANCELLED'
  bookingDate: string
  specialRequests?: string
  tour?: {
    title: string
  }
}

const statusConfig = {
  PENDING: {
    label: 'Ожидает',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock
  },
  CONFIRMED: {
    label: 'Подтверждена',
    color: 'bg-blue-100 text-blue-800',
    icon: CheckCircle
  },
  PAID: {
    label: 'Оплачена',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle
  },
  CANCELLED: {
    label: 'Отменена',
    color: 'bg-red-100 text-red-800',
    icon: XCircle
  }
}

export function AdminBookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      const data = await response.json()

      if (data.success) {
        setBookings(data.data)
      }
    } catch (error) {
      console.error('Ошибка при загрузке заявок:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        await loadBookings() // Перезагружаем список
      }
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString))
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Загрузка заявок...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Заявки на бронирование</h2>
        <Button onClick={loadBookings} variant="outline">
          Обновить
        </Button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Заявок пока нет</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Клиент</TableHead>
                <TableHead>Контакты</TableHead>
                <TableHead>Детали</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => {
                const statusInfo = statusConfig[booking.status]
                const StatusIcon = statusInfo.icon

                return (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.contactName}</p>
                        <p className="text-sm text-gray-500">
                          ID: {booking.id.slice(-8)}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="w-3 h-3" />
                          <span>{booking.contactEmail}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="w-3 h-3" />
                          <span>{booking.contactPhone}</span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="w-3 h-3" />
                          <span>{booking.participants} чел.</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <DollarSign className="w-3 h-3" />
                          <span className="font-medium">{formatPrice(booking.totalPrice)}</span>
                        </div>
                        {booking.tour && (
                          <p className="text-xs text-gray-500">{booking.tour.title}</p>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className={statusInfo.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <p className="text-sm">{formatDate(booking.bookingDate)}</p>
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Детали
                        </Button>

                        {booking.status === 'PENDING' && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => updateBookingStatus(booking.id, 'CONFIRMED')}
                            >
                              Подтвердить
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => updateBookingStatus(booking.id, 'CANCELLED')}
                            >
                              Отменить
                            </Button>
                          </>
                        )}

                        {booking.status === 'CONFIRMED' && (
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => updateBookingStatus(booking.id, 'PAID')}
                          >
                            Оплачена
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Модальное окно с деталями заявки */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Детали заявки #{selectedBooking.id.slice(-8)}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedBooking(null)}
                >
                  ×
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Информация о клиенте</h4>
                  <div className="space-y-2">
                    <p><strong>Имя:</strong> {selectedBooking.contactName}</p>
                    <p><strong>Email:</strong> {selectedBooking.contactEmail}</p>
                    <p><strong>Телефон:</strong> {selectedBooking.contactPhone}</p>
                    <p><strong>Участники:</strong> {selectedBooking.participants}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Детали бронирования</h4>
                  <div className="space-y-2">
                    <p><strong>Стоимость:</strong> {formatPrice(selectedBooking.totalPrice)}</p>
                    <p><strong>Статус:</strong>
                      <Badge className={`ml-2 ${statusConfig[selectedBooking.status].color}`}>
                        {statusConfig[selectedBooking.status].label}
                      </Badge>
                    </p>
                    <p><strong>Дата заявки:</strong> {formatDate(selectedBooking.bookingDate)}</p>
                  </div>
                </div>
              </div>

              {selectedBooking.specialRequests && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Специальные пожелания</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm">{selectedBooking.specialRequests}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                  Закрыть
                </Button>
                <Button className="bg-primary-green-600 hover:bg-primary-green-700">
                  Связаться с клиентом
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}