import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { ComponentType } from 'react'
import { EyebrowTag } from './EyebrowTag'
import type { ServiceDoc } from '@/types/firestore'

function getIcon(name: string): ComponentType<{ className?: string }> {
  const Icon = (LucideIcons as Record<string, unknown>)[name]
  if (typeof Icon === 'function') return Icon as ComponentType<{ className?: string }>
  return LucideIcons.Scale
}

interface ServicesBandProps {
  services: ServiceDoc[]
}

export function ServicesBand({ services }: ServicesBandProps) {
  return (
    <section className="py-24 bg-cream" aria-labelledby="services-heading">
      <div className="mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-14">
          <EyebrowTag>What We Offer</EyebrowTag>
          <h2 id="services-heading" className="font-serif font-semibold text-[38px] md:text-[48px] leading-tight text-ink">
            One firm. Every pathway.
          </h2>
          <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(service => {
            const Icon = getIcon(service.icon)
            const isLead = service.slug === 'immigration'
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug.toLowerCase()}`}
                className={[
                  'group flex flex-col p-6 rounded-2xl bg-white transition-all duration-300',
                  'hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(10,23,56,.09)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
                  isLead
                    ? 'border border-gold-brushed/40 hover:border-gold-brushed/70'
                    : 'border border-cloud hover:border-teal/30',
                ].join(' ')}
              >
                {/* Icon tile with hairline frame */}
                <div className="w-11 h-11 rounded-xl bg-cream border border-cloud flex items-center justify-center mb-4 group-hover:bg-navy group-hover:border-navy group-hover:text-teal-end transition-colors text-ink">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-semibold text-[18px] text-ink mb-2 leading-snug">
                  {service.frontTitle}
                </h3>
                <p className="font-sans text-[13px] text-slate leading-relaxed flex-1">
                  {service.frontSubtitle}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-sans font-semibold uppercase tracking-[0.1em] text-teal group-hover:gap-2 group-hover:text-teal-end transition-all">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
