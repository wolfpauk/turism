import { Button } from '@/components/ui/Button'
import { Phone, ArrowRight } from 'lucide-react'

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-green-600 to-primary-blue-600">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Готовы к путешествию в Дагестан?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Забронируйте тур прямо сейчас и получите консультацию от наших экспертов
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="xl"
              className="bg-accent-gold-500 hover:bg-accent-gold-600 text-white font-semibold shadow-strong"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Забронировать тур
            </Button>

            <div className="flex items-center gap-2 text-white">
              <Phone className="w-5 h-5" />
              <span className="text-lg">+7 (XXX) XXX-XX-XX</span>
            </div>
          </div>

          <div className="mt-8 text-green-100 text-sm">
            <p>✓ Бесплатная консультация • ✓ Гибкие условия оплаты • ✓ Поддержка 24/7</p>
          </div>
        </div>
      </div>
    </section>
  )
}