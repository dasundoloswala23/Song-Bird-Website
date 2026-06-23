'use client'

import { useEffect, useState } from 'react'
import { DestinationCard } from './DestinationCard'
import type { DestinationDoc } from '@/types/firestore'

export function DestinationsGrid({ fallback }: { fallback: DestinationDoc[] }) {
  const [destinations, setDestinations] = useState<DestinationDoc[]>(fallback)

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getDestinations }) =>
      getDestinations().then(data => { if (data.length) setDestinations(data) })
    )
  }, [])

  if (destinations.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-[15px] font-sans text-slate">Destinations coming soon. Check back shortly.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map(dest => (
        <DestinationCard key={dest.id ?? dest.slug} destination={dest} />
      ))}
    </div>
  )
}
