'use client'

import dynamic from 'next/dynamic'

const InteractiveCalculator = dynamic(() => import('./InteractiveCalculator').then(mod => ({ default: mod.InteractiveCalculator })), {
  ssr: false,
  loading: () => (
    <section className="py-20 bg-primary-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 animate-pulse">
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </section>
  )
})

export function TourCalculator() {
  return <InteractiveCalculator />
}