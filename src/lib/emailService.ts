// Сервис для отправки email уведомлений

interface EmailTemplate {
  to: string
  subject: string
  html: string
  text?: string
}

interface BookingEmailData {
  customerName: string
  customerEmail: string
  customerPhone: string
  tourType: string
  participants: number
  preferredDate?: string
  totalPrice: number
  specialRequests?: string
  bookingId: string
}

export class EmailService {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.RESEND_API_KEY || 'your-resend-key'
  }

  // Отправка подтверждения бронирования клиенту
  async sendBookingConfirmation(data: BookingEmailData): Promise<boolean> {
    try {
      const template = this.generateCustomerConfirmationTemplate(data)

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Dagestan Tours <booking@dagestan-tours.ru>',
          to: [data.customerEmail],
          subject: template.subject,
          html: template.html,
          text: template.text,
        }),
      })

      if (!response.ok) {
        throw new Error(`Email API error: ${response.statusText}`)
      }

      console.log('Email подтверждения отправлен клиенту')
      return true

    } catch (error) {
      console.error('Ошибка при отправке email подтверждения:', error)
      return false
    }
  }

  // Отправка уведомления администратору
  async sendAdminNotification(data: BookingEmailData): Promise<boolean> {
    try {
      const template = this.generateAdminNotificationTemplate(data)

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Система бронирования <system@dagestan-tours.ru>',
          to: ['admin@dagestan-tours.ru'],
          subject: template.subject,
          html: template.html,
          text: template.text,
        }),
      })

      if (!response.ok) {
        throw new Error(`Email API error: ${response.statusText}`)
      }

      console.log('Email уведомление отправлено администратору')
      return true

    } catch (error) {
      console.error('Ошибка при отправке email администратору:', error)
      return false
    }
  }

  private generateCustomerConfirmationTemplate(data: BookingEmailData): EmailTemplate {
    const tourTypeNames = {
      EXCURSION: 'Экскурсионный тур',
      ACTIVE: 'Активный отдых',
      CULTURAL: 'Культурный тур',
      COMBINED: 'Комбинированный тур'
    }

    return {
      to: data.customerEmail,
      subject: `Подтверждение заявки на тур в Дагестан №${data.bookingId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Подтверждение бронирования</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2D5A27; text-align: center; margin-bottom: 30px;">
              Туры в Дагестан
            </h1>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #2D5A27; margin-top: 0;">Спасибо за заявку!</h2>
              <p>Здравствуйте, ${data.customerName}!</p>
              <p>Ваша заявка на тур принята в обработку. Наши специалисты свяжутся с вами в течение 30 минут для подтверждения деталей.</p>
            </div>

            <div style="background: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #2D5A27;">Детали заявки</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;"><strong>Тип тура:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">${tourTypeNames[data.tourType as keyof typeof tourTypeNames]}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;"><strong>Количество участников:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">${data.participants}</td>
                </tr>
                ${data.preferredDate ? `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;"><strong>Предпочитаемая дата:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">${data.preferredDate}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;"><strong>Общая стоимость:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; color: #2D5A27; font-weight: bold;">
                    ${new Intl.NumberFormat('ru-RU').format(data.totalPrice)} ₽
                  </td>
                </tr>
              </table>

              ${data.specialRequests ? `
              <div style="margin-top: 20px;">
                <h4>Специальные пожелания:</h4>
                <p style="background: #f8f9fa; padding: 10px; border-radius: 4px; font-style: italic;">
                  ${data.specialRequests}
                </p>
              </div>
              ` : ''}
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <h3 style="color: #2D5A27;">Что дальше?</h3>
              <div style="display: inline-block; text-align: left;">
                <p>✓ Подтверждение деталей тура по телефону</p>
                <p>✓ Согласование окончательной стоимости</p>
                <p>✓ Подтверждение дат и состава группы</p>
                <p>✓ Оплата и получение документов</p>
              </div>
            </div>

            <div style="background: #2D5A27; color: white; padding: 20px; border-radius: 8px; text-align: center;">
              <h3>Свяжитесь с нами</h3>
              <p>Телефон: +7 (XXX) XXX-XX-XX</p>
              <p>Email: info@dagestan-tours.ru</p>
              <p>Мы работаем ежедневно с 9:00 до 21:00</p>
            </div>

            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
              <p>© 2024 Туры в Дагестан. Все права защищены.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Туры в Дагестан - Подтверждение заявки

        Здравствуйте, ${data.customerName}!

        Ваша заявка на тур принята в обработку.

        Детали заявки:
        Тип тура: ${tourTypeNames[data.tourType as keyof typeof tourTypeNames]}
        Количество участников: ${data.participants}
        ${data.preferredDate ? `Предпочитаемая дата: ${data.preferredDate}` : ''}
        Общая стоимость: ${new Intl.NumberFormat('ru-RU').format(data.totalPrice)} ₽

        Наши специалисты свяжутся с вами в течение 30 минут.

        Контакты:
        Телефон: +7 (XXX) XXX-XX-XX
        Email: info@dagestan-tours.ru

        © 2024 Туры в Дагестан
      `
    }
  }

  private generateAdminNotificationTemplate(data: BookingEmailData): EmailTemplate {
    return {
      to: 'admin@dagestan-tours.ru',
      subject: `Новая заявка на бронирование №${data.bookingId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Новая заявка на бронирование</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2D5A27; text-align: center;">Новая заявка на бронирование</h1>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #2D5A27; margin-top: 0;">№${data.bookingId}</h2>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;"><strong>Клиент:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">${data.customerName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">${data.customerEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;"><strong>Телефон:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">${data.customerPhone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;"><strong>Тип тура:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">${data.tourType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;"><strong>Участники:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">${data.participants}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;"><strong>Стоимость:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; color: #2D5A27; font-weight: bold;">
                    ${new Intl.NumberFormat('ru-RU').format(data.totalPrice)} ₽
                  </td>
                </tr>
              </table>

              ${data.specialRequests ? `
              <div style="margin-top: 20px;">
                <h4>Специальные пожелания:</h4>
                <p style="background: white; padding: 10px; border-radius: 4px; font-style: italic; border: 1px solid #e9ecef;">
                  ${data.specialRequests}
                </p>
              </div>
              ` : ''}
            </div>

            <div style="text-align: center;">
              <p style="color: #2D5A27; font-weight: bold;">
                Требуется срочно связаться с клиентом для подтверждения деталей!
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Новая заявка на бронирование №${data.bookingId}

        Клиент: ${data.customerName}
        Email: ${data.customerEmail}
        Телефон: ${data.customerPhone}
        Тип тура: ${data.tourType}
        Участники: ${data.participants}
        Стоимость: ${new Intl.NumberFormat('ru-RU').format(data.totalPrice)} ₽

        ${data.specialRequests ? `Специальные пожелания: ${data.specialRequests}` : ''}

        Требуется срочно связаться с клиентом!
      `
    }
  }

  // Метод для тестирования отправки email (используйте с осторожностью)
  async testEmail(): Promise<boolean> {
    try {
      const testData: BookingEmailData = {
        customerName: 'Тестовый Клиент',
        customerEmail: 'test@example.com',
        customerPhone: '+7 (999) 999-99-99',
        tourType: 'EXCURSION',
        participants: 2,
        totalPrice: 30000,
        bookingId: 'TEST-' + Date.now()
      }

      return await this.sendBookingConfirmation(testData)
    } catch (error) {
      console.error('Ошибка при тестировании email:', error)
      return false
    }
  }
}

// Экспорт singleton instance
export const emailService = new EmailService()