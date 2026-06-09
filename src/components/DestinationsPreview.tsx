'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { DestinationCard } from './DestinationCard'
import { EyebrowTag } from './EyebrowTag'
import type { DestinationDoc } from '@/types/firestore'

interface Props {
  fallback?: DestinationDoc[]
}

export function DestinationsPreview({ fallback = [] }: Props) {
  const [destinations, setDestinations] = useState<DestinationDoc[]>(fallback)

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getDestinations }) =>
      getDestinations().then(data => { if (data.length) setDestinations(data) })
    )
  }, [])

  const preview = destinations.slice(0, 3)
  if (preview.length === 0) return null

  return (
    <section className="py-24 bg-cream" aria-labelledby="destinations-preview-heading">
      <div className="mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <EyebrowTag>Where We Operate</EyebrowTag>
            <h2
              id="destinations-preview-heading"
              className="font-serif font-semibold text-[36px] md:text-[44px] leading-tight text-ink"
            >
              Our Destinations
            </h2>
          </div>
          <Link
            href="/destinations"
            className="text-[13px] font-sans font-medium text-emerald hover:text-teal transition-colors shrink-0"
          >
            View all destinations →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preview.map(dest => (
            <DestinationCard key={dest.id ?? dest.slug} destination={dest} />
          ))}
        </div>
      </div>
    </section>
  )
}
