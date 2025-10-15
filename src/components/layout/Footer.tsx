import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, MessageCircle, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary-green-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О компании */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Туры в Дагестан</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Организуем незабываемые путешествия по Республике Дагестан с 2010 года.
              Экскурсии, активный отдых, культурные туры от местных экспертов.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent-gold-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-gold-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-gold-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Туры */}
          <div className="space-y-4">
            <h4 className="font-semibold">Туры</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/tours/excursion" className="text-gray-300 hover:text-white transition-colors text-sm">
                Экскурсионные туры
              </Link>
              <Link href="/tours/active" className="text-gray-300 hover:text-white transition-colors text-sm">
                Активный отдых
              </Link>
              <Link href="/tours/cultural" className="text-gray-300 hover:text-white transition-colors text-sm">
                Культурные туры
              </Link>
              <Link href="/tours/combined" className="text-gray-300 hover:text-white transition-colors text-sm">
                Комбинированные туры
              </Link>
            </nav>
          </div>

          {/* Информация */}
          <div className="space-y-4">
            <h4 className="font-semibold">Информация</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                О компании
              </Link>
              <Link href="/guides" className="text-gray-300 hover:text-white transition-colors text-sm">
                Наши гиды
              </Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">
                Блог
              </Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Контакты */}
          <div className="space-y-4">
            <h4 className="font-semibold">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-accent-gold-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Республика Дагестан,<br />
                  г. Махачкала,<br />
                  ул. Туристическая, 1
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent-gold-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+7 (XXX) XXX-XX-XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent-gold-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@dagestan-tours.ru</span>
              </div>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-primary-green-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © 2024 Туры в Дагестан. Все права защищены.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}