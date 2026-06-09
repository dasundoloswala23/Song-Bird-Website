import type { Metadata } from 'next'
import { EyebrowTag } from '@/components/EyebrowTag'
import { getDestinations } from '@/lib/firestorePublic'
import { DestinationCard } from '@/components/DestinationCard'
import { FinalCTA } from '@/components/FinalCTA'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Explore immigration, residency, and visa pathways across our key destinations including Dubai, Abu Dhabi, and more.',
}

export default async function DestinationsPage() {
  const destinations = await getDestinations()

  return (
    <>
      <section className="pt-[160px] pb-20 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-4xl text-center">
          <EyebrowTag>Where We Operate</EyebrowTag>
          <h1 className="font-serif font-semibold text-[42px] md:text-[56px] leading-tight text-white mb-4">Destinations</h1>
          <div className="mx-auto w-16 h-px bg-gold-brushed mb-5" />
          <p className="text-[16px] font-sans text-cream/65 max-w-2xl mx-auto leading-relaxed">
            From UAE residency to investor pathways in top global cities — we provide expert guidance wherever your future takes you.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-7xl">
          {destinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map(dest => (
                <DestinationCard key={dest.id ?? dest.slug} destination={dest} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-[15px] font-sans text-slate">Destinations coming soon. Check back shortly.</p>
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
