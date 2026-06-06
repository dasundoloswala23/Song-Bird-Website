import Image from 'next/image'
import * as LucideIcons from 'lucide-react'
import type { ComponentType } from 'react'
import { EyebrowTag } from './EyebrowTag'
import type { WhyChooseUsDoc } from '@/types/firestore'

function getIcon(name: string): ComponentType<{ className?: string }> {
  const Icon = (LucideIcons as Record<string, unknown>)[name]
  if (typeof Icon === 'function') return Icon as ComponentType<{ className?: string }>
  return LucideIcons.Shield
}

const DEFAULT_FEATURES = [
  { icon: 'Shield',    title: 'Dubai-Based & Licensed', description: 'Fully licensed advisory firm operating under UAE regulatory frameworks, offering you the assurance of professional accountability.' },
  { icon: 'Eye',       title: 'Transparent Process', description: 'No hidden fees, no surprises. We lay out every step, every cost, and every timeline expectation before we begin.' },
  { icon: 'Globe2',    title: 'Multi-Destination Expertise', description: 'From UAE residency to citizenship programmes in Europe, North America, and Oceania — we cover 15+ jurisdictions.' },
  { icon: 'UserCheck', title: 'Dedicated Case Manager', description: 'A single point of contact throughout your entire journey — someone who knows your file inside and out.' },
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

  return (
    <section className="py-24 bg-navy" aria-labelledby="difference-heading">
      <div className="mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy-card border border-gold-brushed/15">
              {image ? (
                <Image src={image} alt="Songbird team" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-cream/20 text-[13px] font-sans text-center px-8">Office / Team photo<br />Replace via Admin → Why Choose Us</p>
                </div>
              )}
            </div>
            {/* Teal-bordered badge (not solid gold) */}
            {badge?.value && (
              <div className="absolute -bottom-5 -right-5 md:bottom-8 md:-right-8 bg-navy-card border-2 border-teal/60 rounded-2xl px-6 py-4 shadow-[0_12px_32px_rgba(26,107,126,.25)]">
                <p
                  className="font-serif font-semibold text-[36px] leading-none"
                  style={{ background: 'linear-gradient(95deg,#1A6B7E 0%,#3FB68A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {features.map(f => {
                  const Icon = getIcon(f.icon)
                  return (
                    <div
                      key={f.title}
                      className="p-5 rounded-xl border border-gold-brushed/15 border-l-2 border-l-teal/50 bg-navy-card hover:border-gold-brushed/25 hover:border-l-teal/80 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center mb-3 group-hover:bg-teal/20 transition-colors">
                        <Icon className="w-4 h-4 text-gold-brushed" />
                      </div>
                      <h3 className="font-serif font-semibold text-[15px] text-white mb-1.5">{f.title}</h3>
                      <p className="text-[12px] font-sans text-cream/55 leading-relaxed">{f.description}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
