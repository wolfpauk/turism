import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { emailService } from '@/lib/emailService'

const prisma = new PrismaClient()

// Схема валидации для заявки на бронирование
const bookingSchema = z.object({
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа'),
  email: z.string().email('Неверный формат email'),
  phone: z.string().min(10, 'Неверный формат телефона'),
  participants: z.number().min(1).max(20),
  preferredDate: z.string().optional(),
  tourType: z.string().min(1, 'Выберите тип тура'),
  specialRequests: z.string().optional(),
  totalPrice: z.number().min(0),
  services: z.array(z.object({
    serviceId: z.string(),
    quantity: z.number(),
    customPrice: z.number().optional()
  })).optional()
})

// POST - Создание новой заявки на бронирование
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Валидация данных
    const validatedData = bookingSchema.parse(body)

    // Создание заявки в базе данных
    const booking = await prisma.booking.create({
      data: {
        userId: 'guest', // Для гостевых пользователей
        tourId: 'default-tour', // Свяжем с туром позже
        bookingDate: new Date(),
        participants: validatedData.participants,
        totalPrice: validatedData.totalPrice,
        status: 'PENDING',
        contactName: `${validatedData.firstName} ${validatedData.lastName}`,
        contactPhone: validatedData.phone,
        contactEmail: validatedData.email,
        specialRequests: validatedData.specialRequests
      }
    })

    // Отправка email уведомлений
    try {
      await Promise.all([
        emailService.sendBookingConfirmation({
          customerName: `${validatedData.firstName} ${validatedData.lastName}`,
          customerEmail: validatedData.email,
          customerPhone: validatedData.phone,
          tourType: validatedData.tourType,
          participants: validatedData.participants,
          preferredDate: validatedData.preferredDate,
          totalPrice: validatedData.totalPrice,
          specialRequests: validatedData.specialRequests,
          bookingId: booking.id
        }),
        emailService.sendAdminNotification({
          customerName: `${validatedData.firstName} ${validatedData.lastName}`,
          customerEmail: validatedData.email,
          customerPhone: validatedData.phone,
          tourType: validatedData.tourType,
          participants: validatedData.participants,
          preferredDate: validatedData.preferredDate,
          totalPrice: validatedData.totalPrice,
          specialRequests: validatedData.specialRequests,
          bookingId: booking.id
        })
      ])
    } catch (emailError) {
      console.error('Ошибка при отправке email уведомлений:', emailError)
      // Не прерываем выполнение, если email не отправился
    }

    return NextResponse.json({
      success: true,
      data: booking,
      message: 'Заявка на бронирование успешно отправлена!'
    })

  } catch (error) {
    console.error('Ошибка при создании бронирования:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Ошибка валидации данных',
        errors: error.errors
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      message: 'Произошла ошибка при обработке заявки'
    }, { status: 500 })
  }
}

// GET - Получение списка заявок (для админ панели)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    const where = status ? { status: status as any } : {}

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
          tour: true
        }
      }),
      prisma.booking.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Ошибка при получении заявок:', error)
    return NextResponse.json({
      success: false,
      message: 'Произошла ошибка при загрузке заявок'
    }, { status: 500 })
  }
}