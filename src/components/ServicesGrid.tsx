'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Loader2 } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { ComponentType } from 'react'
import { getPublishedServices } from '@/lib/firestorePublic'
import type { ServiceDoc } from '@/types/firestore'

function getIcon(name: string): ComponentType<{ className?: string }> {
  const Icon = (LucideIcons as Record<string, unknown>)[name]
  if (typeof Icon === 'function') return Icon as ComponentType<{ className?: string }>
  return LucideIcons.Scale
}

export function ServicesGrid({ fallback }: { fallback: ServiceDoc[] }) {
  const [services, setServices] = useState<ServiceDoc[]>(fallback)
  const [loading, setLoading] = useState(fallback.length === 0)

  useEffect(() => {
    getPublishedServices()
      .then(setServices)
      .catch(() => {/* keep fallback */})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-6 h-6 text-teal animate-spin" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map(service => {
        const Icon = getIcon(service.icon)
        return (
          <Link key={service.slug} href={`/services/${service.slug.toLowerCase()}`}
            className="group flex flex-col p-6 rounded-2xl border border-cloud bg-white hover:border-teal/30 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(10,23,56,.09)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            <div className="w-11 h-11 rounded-xl bg-cream border border-cloud flex items-center justify-center mb-4 group-hover:bg-navy group-hover:text-teal-end transition-colors text-ink">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-[18px] text-ink mb-2">{service.frontTitle}</h3>
            <p className="font-sans text-[13px] text-slate leading-relaxed flex-1">{service.frontSubtitle}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-sans font-semibold uppercase tracking-[0.1em] text-teal group-hover:gap-2 group-hover:text-teal-end transition-all">
              Explore <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        )
      })}
    </div>
  )
}
