import { Shield, Users, Clock, Award } from 'lucide-react'

export function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: 'Надежность',
      description: 'Работаем с 2010 года, тысячи довольных клиентов'
    },
    {
      icon: Users,
      title: 'Опытные гиды',
      description: 'Локальные эксперты с многолетним стажем'
    },
    {
      icon: Clock,
      title: 'Оперативность',
      description: 'Быстрое бронирование и подтверждение'
    },
    {
      icon: Award,
      title: 'Качество',
      description: 'Лучшие маршруты и проверенные партнеры'
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Мы создаем незабываемые путешествия уже более 10 лет
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}