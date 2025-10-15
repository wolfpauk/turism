'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Menu, X, Phone, MapPin } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Д</span>
            </div>
            <span className="text-xl font-bold text-primary-green-800">Туры в Дагестан</span>
          </Link>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-green-600 transition-colors">
              Главная
            </Link>
            <Link href="/tours" className="text-gray-700 hover:text-primary-green-600 transition-colors">
              Туры
            </Link>
            <Link href="/calculator" className="text-gray-700 hover:text-primary-green-600 transition-colors">
              Калькулятор
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-primary-green-600 transition-colors">
              Галерея
            </Link>
            <Link href="/reviews" className="text-gray-700 hover:text-primary-green-600 transition-colors">
              Отзывы
            </Link>
            <Link href="/contacts" className="text-gray-700 hover:text-primary-green-600 transition-colors">
              Контакты
            </Link>
          </nav>

          {/* Контакты и кнопки */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+7 (XXX) XXX-XX-XX</span>
            </div>
            <Button size="sm" className="bg-primary-green-600 hover:bg-primary-green-700">
              Забронировать
            </Button>
          </div>

          {/* Мобильное меню */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Мобильная навигация */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="py-4 space-y-4">
              <Link
                href="/"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Главная
              </Link>
              <Link
                href="/tours"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Туры
              </Link>
              <Link
                href="/calculator"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Калькулятор
              </Link>
              <Link
                href="/gallery"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Галерея
              </Link>
              <Link
                href="/reviews"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Отзывы
              </Link>
              <Link
                href="/contacts"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Контакты
              </Link>
              <div className="px-4 py-2">
                <Button className="w-full bg-primary-green-600 hover:bg-primary-green-700">
                  Забронировать
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}