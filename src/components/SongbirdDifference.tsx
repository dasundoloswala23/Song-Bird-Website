import Image from 'next/image'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import type { ComponentType } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { EyebrowTag } from './EyebrowTag'
import type { WhyChooseUsDoc } from '@/types/firestore'

const BRAND_GRADIENT = 'linear-gradient(135deg, #1FA968 0%, #0E5C54 50%, #0A3A52 100%)'

function getIcon(name: string): ComponentType<{ className?: string }> {
  const Icon = (LucideIcons as Record<string, unknown>)[name]
  if (typeof Icon === 'function') return Icon as ComponentType<{ className?: string }>
  return LucideIcons.Shield
}

const DEFAULT_FEATURES = [
  { icon: 'Shield',    title: 'Dubai-Based & Licensed', description: 'Fully licensed advisory firm operating under UAE regulatory frameworks.' },
  { icon: 'Eye',       title: 'Transparent Process', description: 'No hidden fees, no surprises — every step, cost, and timeline laid out upfront.' },
  { icon: 'Globe2',    title: 'Multi-Destination Expertise', description: 'UAE residency to citizenship programmes in Europe, North America, and Oceania.' },
  { icon: 'UserCheck', title: 'Dedicated Case Manager', description: 'A single point of contact who knows your file inside and out.' },
]

interface SongbirdDifferenceProps {
  content: WhyChooseUsDoc | null
}

export function SongbirdDifference({ content }: SongbirdDifferenceProps) {
  const eyebrow  = content?.eyebrow  || 'Why Choose Us'
  const title    = content?.title    || 'The Songbird Difference'
  const intro    = content?.intro    || 'We combine legal rigour with genuine care — treating every client\'s future as if it were our own.'
  const image    = content?.image    || ''
  const badge    = content?.badge
  const features = content?.features?.length ? content.features : DEFAULT_FEATURES

  const half = Math.ceil(features.length / 2)
  const col1 = features.slice(0, half)
  const col2 = features.slice(half)

  return (
    <section className="py-24 bg-navy" aria-labelledby="difference-heading">
      <div className="mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-navy-card border border-gold-brushed/20 shadow-[0_0_0_1px_rgba(198,163,90,0.08),_0_24px_64px_rgba(4,38,28,.6)]">
              {image ? (
                <Image src={image} alt="Songbird team" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-cream/20 text-[13px] font-sans text-center px-8">Office / Team photo<br />Replace via Admin → Why Choose Us</p>
                </div>
              )}
            </div>
            {badge?.value && (
              <div className="absolute -bottom-5 -right-5 md:bottom-8 md:-right-8 bg-navy-card border-2 border-teal/60 rounded-2xl px-6 py-4 shadow-[0_12px_32px_rgba(31,169,104,.25)]">
                <p
                  className="font-serif font-semibold text-[36px] leading-none"
                  style={{ background: BRAND_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  {badge.value}
                </p>
                <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-cream/60 mt-0.5 whitespace-pre-line">{badge.label}</p>
              </div>
            )}
          </div>

          {/* Text side */}
          <div>
            <EyebrowTag>{eyebrow}</EyebrowTag>
            <h2 id="difference-heading" className="font-serif font-semibold text-[36px] md:text-[44px] leading-tight text-white mb-4">
              {title}
            </h2>
            <div className="w-12 h-px bg-gold-brushed mb-6" />
            <p className="text-[15px] font-sans text-cream/65 leading-relaxed mb-10">{intro}</p>

            {features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-10">
                {[col1, col2].map((col, ci) => (
                  <div key={ci} className="space-y-3">
                    {col.map(f => {
                      const Icon = getIcon(f.icon)
                      return (
                        <div key={f.title} className="flex items-start gap-3 group">
                          <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5 group-hover:text-mint transition-colors" />
                          <div>
                            <p className="text-[14px] font-sans font-semibold text-white">{f.title}</p>
                            <p className="text-[12px] font-sans text-cream/50 leading-relaxed mt-0.5">{f.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            )}

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[13px] font-sans font-medium text-gold-brushed hover:text-gold transition-colors"
            >
              Learn more about us →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
