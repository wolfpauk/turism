export function ReviewsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Отзывы туристов
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Что говорят наши путешественники
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((review) => (
            <div key={review} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Турист {review}</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Отличный тур! Организация на высшем уровне, гид очень профессиональный..."
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}