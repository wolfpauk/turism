import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { calculateTourPrice } from '@/lib/priceCalculator'

// Схема валидации для расчета стоимости
const calculatorSchema = z.object({
  tourType: z.enum(['EXCURSION', 'ACTIVE', 'CULTURAL', 'COMBINED']),
  participants: z.number().min(1).max(20),
  duration: z.number().min(1).max(30),
  startDate: z.string().optional(),
  services: z.array(z.object({
    serviceId: z.string(),
    quantity: z.number().min(1),
    variantId: z.string().optional(),
    customPrice: z.number().optional()
  })).optional()
})

// POST - Расчет стоимости тура
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Валидация данных
    const validatedData = calculatorSchema.parse(body)

    // Расчет стоимости
    const priceCalculation = calculateTourPrice(validatedData)

    return NextResponse.json({
      success: true,
      data: priceCalculation
    })

  } catch (error) {
    console.error('Ошибка при расчете стоимости:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Ошибка валидации данных',
        errors: error.errors
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      message: 'Произошла ошибка при расчете стоимости'
    }, { status: 500 })
  }
}

// GET - Получение доступных услуг для калькулятора
export async function GET() {
  try {
    // Здесь можно получить актуальные данные из базы данных
    const services = [
      {
        id: 'transport',
        name: 'Транспорт',
        options: [
          { id: 'bus', name: 'Автобус', price: 1500 },
          { id: 'jeep', name: 'Джип', price: 5000 },
          { id: 'transfer', name: 'Трансфер', price: 2000 }
        ]
      },
      {
        id: 'accommodation',
        name: 'Проживание',
        options: [
          { id: 'hotel', name: 'Отель', price: 3500 },
          { id: 'guesthouse', name: 'Гостевой дом', price: 2500 }
        ]
      },
      {
        id: 'food',
        name: 'Питание',
        options: [
          { id: 'breakfast', name: 'Завтрак', price: 500 },
          { id: 'lunch', name: 'Обед', price: 800 },
          { id: 'dinner', name: 'Ужин', price: 1000 }
        ]
      }
    ]

    return NextResponse.json({
      success: true,
      data: {
        services,
        tourTypes: [
          { id: 'EXCURSION', name: 'Экскурсионные туры', basePrice: 15000 },
          { id: 'ACTIVE', name: 'Активный отдых', basePrice: 25000 },
          { id: 'CULTURAL', name: 'Культурные туры', basePrice: 18000 },
          { id: 'COMBINED', name: 'Комбинированные туры', basePrice: 30000 }
        ]
      }
    })

  } catch (error) {
    console.error('Ошибка при получении данных калькулятора:', error)
    return NextResponse.json({
      success: false,
      message: 'Произошла ошибка при загрузке данных'
    }, { status: 500 })
  }
}