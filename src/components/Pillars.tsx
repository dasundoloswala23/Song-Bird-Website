'use client'

import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { useConsultationModal } from '@/context/ConsultationModalContext'
import { EyebrowTag } from './EyebrowTag'

const BRAND_GRADIENT = 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)'

const PILLARS = [
  {
    title: 'Residency & Immigration',
    desc: 'Golden Visas, investor, work and family residency — handled end-to-end.',
    chips: ['Golden Visa', 'Investor Visa', 'Family Sponsorship', 'Long-Term Residency'],
  },
  {
    title: 'Business & Corporate',
    desc: 'Company formation, corporate structuring and HR advisory across the UAE.',
    chips: ['Business Setup', 'Free Zones', 'Corporate Structuring', 'HR & Management'],
  },
]

export function Pillars() {
  const { open } = useConsultationModal()

  return (
    <section className="py-24 bg-white" aria-labelledby="pillars-heading">
      <div className="mx-auto px-6 md:px-12 max-w-6xl">
        <div className="text-center mb-14">
          <EyebrowTag>What We Do</EyebrowTag>
          <h2 id="pillars-heading" className="font-serif font-normal text-[34px] md:text-[44px] leading-tight text-ink">
            Two pillars, one accountable team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map(p => (
            <div key={p.title} className="rounded-2xl border border-hairline bg-surface-soft p-8 flex flex-col">
              <h3 className="font-serif font-normal text-[24px] text-ink mb-2">{p.title}</h3>
              <p className="text-[14px] font-sans text-slate leading-relaxed mb-5">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-7">
                {p.chips.map(c => (
                  <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-hairline text-[12px] font-sans text-ink">
                    <Check className="w-3.5 h-3.5 text-emerald" /> {c}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap gap-3">
                <button
                  onClick={open}
                  className="inline-flex items-center gap-2 px-5 py-3 text-white text-[13px] font-sans font-semibold uppercase tracking-[0.07em] rounded-[6px] transition-all hover:-translate-y-px"
                  style={{ background: BRAND_GRADIENT }}
                >
                  Get Started
                </button>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-hairline text-ink hover:text-emerald text-[13px] font-sans font-semibold uppercase tracking-[0.07em] rounded-[6px] transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
