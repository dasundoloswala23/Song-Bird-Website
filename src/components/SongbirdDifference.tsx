import Image from 'next/image'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import type { ComponentType } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { EyebrowTag } from './EyebrowTag'
import type { WhyChooseUsDoc } from '@/types/firestore'

const BRAND_GRADIENT = 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)'

function getIcon(name: string): ComponentType<{ className?: string }> {
  const Icon = (LucideIcons as Record<string, unknown>)[name]
  if (typeof Icon === 'function') return Icon as ComponentType<{ className?: string }>
  return LucideIcons.Shield
}

const DEFAULT_FEATURES = [
  { icon: 'Layers',    title: 'Full-Spectrum Consultancy Services Under One Roof', description: 'Immigration, legal, business and HR advisory — handled by one accountable team.' },
  { icon: 'Award',     title: 'Over 15+ Years of Combined Professional Experience', description: 'Proven leadership across multiple international jurisdictions.' },
  { icon: 'Languages', title: 'Multilingual Team for Enhanced, Accurate Access', description: 'Guidance in your language, so nothing is lost in translation.' },
  { icon: 'UserCheck', title: 'Client-Centric Approach', description: 'Customised solutions built around your goals, timeline and budget.' },
  { icon: 'TrendingUp', title: 'Proven Track Record for a Higher Success Ratio', description: 'A 95% success ratio backed by thousands of successful steps.' },
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
    <section className="py-24 bg-white" aria-labelledby="difference-heading">
      <div className="mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-muted border border-hairline shadow-[0_24px_64px_rgba(4,38,28,.12)]">
              {image ? (
                <Image src={image} alt="Songbird team" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-slate/60 text-[13px] font-sans text-center px-8">Office / Team photo<br />Replace via Admin → Why Choose Us</p>
                </div>
              )}
            </div>
            {badge?.value && (
              <div className="absolute -bottom-5 -right-5 md:bottom-8 md:-right-8 bg-white border-2 border-teal/40 rounded-2xl px-6 py-4 shadow-[0_12px_32px_rgba(31,169,104,.18)]">
                <p
                  className="font-serif font-semibold text-[36px] leading-none"
                  style={{ background: BRAND_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  {badge.value}
                </p>
                <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-slate mt-0.5 whitespace-pre-line">{badge.label}</p>
              </div>
            )}
          </div>

          {/* Text side */}
          <div>
            <EyebrowTag>{eyebrow}</EyebrowTag>
            <h2 id="difference-heading" className="font-serif font-semibold text-[36px] md:text-[44px] leading-tight text-ink mb-4">
              {title}
            </h2>
            <div className="w-12 h-px bg-gold mb-6" />
            <p className="text-[15px] font-sans text-slate leading-relaxed mb-10">{intro}</p>

            {features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-10">
                {[col1, col2].map((col, ci) => (
                  <div key={ci} className="space-y-3">
                    {col.map(f => {
                      const Icon = getIcon(f.icon)
                      return (
                        <div key={f.title} className="flex items-start gap-3 group">
                          <CheckCircle2 className="w-5 h-5 text-emerald shrink-0 mt-0.5 group-hover:text-teal transition-colors" />
                          <div>
                            <p className="text-[14px] font-sans font-semibold text-ink">{f.title}</p>
                            <p className="text-[12px] font-sans text-slate leading-relaxed mt-0.5">{f.description}</p>
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
              className="inline-flex items-center gap-2 text-[13px] font-sans font-medium text-emerald hover:text-teal transition-colors"
            >
              Learn more about us →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
