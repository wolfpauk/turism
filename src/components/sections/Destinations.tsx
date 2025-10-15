export function Destinations() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Популярные направления
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Исследуйте самые красивые места Дагестана
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Дербент', 'Гуниб', 'Карадахская теснина', 'Сулакский каньон', 'Аул Чох', 'Бархан Сарыкум'].map((destination, index) => (
            <div key={destination} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <div className="h-64 bg-gray-200 group-hover:scale-105 transition-transform duration-300"></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-xl font-semibold">{destination}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}