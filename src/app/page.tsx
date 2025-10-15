import { HeroSection } from '@/components/sections/HeroSection'
import { PopularTours } from '@/components/sections/PopularTours'
import { TourCalculator } from '@/components/sections/TourCalculator'
import { Destinations } from '@/components/sections/Destinations'
import { ReviewsSection } from '@/components/sections/ReviewsSection'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { BookingSection } from '@/components/sections/BookingSection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <main>
        <PopularTours />
        <TourCalculator />
        <Destinations />
        <WhyChooseUs />
        <ReviewsSection />
        <BookingSection />
      </main>
    </div>
  )
}