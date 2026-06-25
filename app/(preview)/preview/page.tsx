'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { ServiceDetailClient } from '@/components/services/ServiceDetailClient'
import { DestinationDetailClient } from '@/components/destinations/DestinationDetailClient'

function PreviewContent() {
  const params = useSearchParams()
  const type  = params.get('type')
  const slug  = params.get('slug') ?? ''

  if (!type || !slug) {
    return (
      <div className="min-h-[60vh] bg-navy flex items-center justify-center">
        <p className="text-cream/50 font-sans text-sm">Missing preview parameters.</p>
      </div>
    )
  }

  if (type === 'service') {
    return <ServiceDetailClient slug={slug} initial={null} />
  }

  if (type === 'destination') {
    return <DestinationDetailClient initialSlug={slug} initial={null} />
  }

  return (
    <div className="min-h-[60vh] bg-navy flex items-center justify-center">
      <p className="text-cream/50 font-sans text-sm">Unknown preview type: {type}</p>
    </div>
  )
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] bg-navy flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-gold-brushed animate-spin" />
      </div>
    }>
      <PreviewContent />
    </Suspense>
  )
}
