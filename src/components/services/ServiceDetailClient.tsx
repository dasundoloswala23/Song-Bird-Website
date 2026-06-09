'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { getServiceBySlug } from '@/lib/firestorePublic'
import { FullServiceDetail } from '@/components/services/FullServiceDetail'
import { MinimalServiceDetail } from '@/components/services/MinimalServiceDetail'
import type { ServiceDoc } from '@/types/firestore'

export function ServiceDetailClient({ slug, initial }: { slug: string; initial: ServiceDoc | null }) {
  const router = useRouter()
  const [service, setService] = useState<ServiceDoc | null>(initial)
  const [loading, setLoading] = useState(!initial)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (initial) return
    // Try exact slug, then lowercase fallback (handles case-sensitivity on Firebase Hosting)
    const lower = slug.toLowerCase()
    getServiceBySlug(slug)
      .then(s => s ?? getServiceBySlug(lower))
      .then(s => {
        if (!s) setNotFound(true)
        else setService(s)
      })
      .finally(() => setLoading(false))
  }, [slug, initial, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold-brushed animate-spin" />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-navy flex flex-col items-center justify-center gap-6 px-4 text-center">
        <p className="font-serif text-[32px] text-white">Service not found</p>
        <p className="font-sans text-[15px] text-cream/60">This service page doesn&apos;t exist or may have been removed.</p>
        <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px]" style={{ background: 'linear-gradient(95deg, #1FA968 0%, #0E5C54 100%)' }}>
          <ArrowLeft className="w-4 h-4" /> View All Services
        </Link>
      </div>
    )
  }

  if (!service) return null

  return (
    <>
      <div className="fixed top-[120px] left-4 z-30 hidden md:block">
        <Link href="/services" className="flex items-center gap-1.5 text-[12px] font-sans font-medium text-cream/50 hover:text-cream transition-colors bg-navy/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Services
        </Link>
      </div>
      {service.layout === 'full'
        ? <FullServiceDetail service={service} />
        : <MinimalServiceDetail service={service} />
      }
    </>
  )
}
