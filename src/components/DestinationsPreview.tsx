'use client'

import React, { useEffect, useState } from 'react'
import { DestinationCard } from './DestinationCard'
import { EyebrowTag } from './EyebrowTag'
import { useT } from '@/context/LanguageContext'
import type { DestinationDoc } from '@/types/firestore'

interface Props {
  fallback?: DestinationDoc[]
}

export function DestinationsPreview({ fallback = [] }: Props) {
  const { t } = useT()
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
        <div className="text-center mb-12">
          <EyebrowTag>{t('dest.eyebrow')}</EyebrowTag>
          <h2
            id="destinations-preview-heading"
            className="font-serif font-normal text-[36px] md:text-[44px] leading-tight text-ink"
          >
            {t('dest.heading')}
          </h2>
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
