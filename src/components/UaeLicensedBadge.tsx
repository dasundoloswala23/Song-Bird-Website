'use client'

import { BadgeCheck } from 'lucide-react'
import { useT } from '@/context/LanguageContext'

/** UAE-Licensed trust strip — mirrors the proposal document's licensed badge. */
export function UaeLicensedBadge() {
  const { t } = useT()
  return (
    <section className="bg-navy py-4" aria-label="UAE Licensed">
      <div className="mx-auto px-6 md:px-12 max-w-7xl flex items-center justify-center gap-3 text-center">
        <BadgeCheck className="w-5 h-5 text-gold-brushed shrink-0" />
        <p className="text-[12px] md:text-[13px] font-sans font-semibold uppercase tracking-[0.18em] text-cream">
          {t('uae.licensed')}
          <span className="text-cream/55 font-medium tracking-[0.12em]"> {t('uae.licensedDetail')}</span>
        </p>
      </div>
    </section>
  )
}
