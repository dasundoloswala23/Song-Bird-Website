import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { ComponentType } from 'react'
import { EyebrowTag } from './EyebrowTag'
import type { ServiceDoc, ServicesIntroDoc } from '@/types/firestore'

function getIcon(name: string): ComponentType<{ className?: string }> {
  const Icon = (LucideIcons as Record<string, unknown>)[name]
  if (typeof Icon === 'function') return Icon as ComponentType<{ className?: string }>
  return LucideIcons.Scale
}

interface ServicesBandProps {
  services: ServiceDoc[]
  intro?: ServicesIntroDoc | null
}

export function ServicesBand({ services, intro }: ServicesBandProps) {
  const title = intro?.title || 'One firm. Every pathway.'
  const paragraphs = (intro?.body ?? '').split(/\n{2,}/).map(p => p.trim()).filter(Boolean)

  return (
    <section className="py-24 bg-cream" aria-labelledby="services-heading">
      <div className="mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <EyebrowTag>What We Offer</EyebrowTag>
          <h2 id="services-heading" className="font-serif font-normal text-[38px] md:text-[48px] leading-tight text-ink">
            {title}
          </h2>
          <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
          {paragraphs.length > 0 && (
            <div className="mt-6 space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-[15px] font-sans text-slate leading-relaxed">{p}</p>
              ))}
            </div>
          )}
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
                  'group relative flex flex-col p-6 rounded-2xl overflow-hidden transition-all duration-300 min-h-[260px]',
                  service.cardImage ? 'text-white' : 'bg-white',
                  'hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(10,23,56,.09)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
                  isLead
                    ? 'border border-gold-brushed/40 hover:border-gold-brushed/70'
                    : 'border border-cloud hover:border-teal/30',
                ].join(' ')}
              >
                {/* Card background image + scrim for legibility */}
                {service.cardImage && (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${service.cardImage})` }}
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/65 to-navy-deep/35" />
                  </>
                )}
                <div className="relative flex flex-col flex-1">
                  {/* Icon tile with hairline frame */}
                  <div className={[
                    'w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors',
                    service.cardImage
                      ? 'bg-white/10 border border-white/25 text-white'
                      : 'bg-cream border border-cloud text-ink group-hover:bg-navy group-hover:border-navy group-hover:text-teal-end',
                  ].join(' ')}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`font-serif font-normal text-[18px] mb-2 leading-snug ${service.cardImage ? 'text-white' : 'text-ink'}`}>
                    {service.frontTitle}
                  </h3>
                  <p className={`font-sans text-[13px] leading-relaxed flex-1 ${service.cardImage ? 'text-white/80' : 'text-slate'}`}>
                    {service.homeSubtitle || service.frontSubtitle}
                  </p>
                  <span className={`mt-4 inline-flex items-center gap-1 text-[12px] font-sans font-semibold uppercase tracking-[0.1em] group-hover:gap-2 transition-all ${service.cardImage ? 'text-teal-end' : 'text-teal group-hover:text-teal-end'}`}>
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
