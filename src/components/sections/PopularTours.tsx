import { ToursCatalog } from './ToursCatalog'

export function PopularTours() {
  return (
    <section className="py-20 bg-gray-50">
      <ToursCatalog
        showTitle={true}
        limit={3}
        showFilters={false}
      />
    </section>
  )
}