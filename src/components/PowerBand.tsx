'use client'

import { useConsultationModal } from '@/context/ConsultationModalContext'
import { useT } from '@/context/LanguageContext'

const BRAND_GRADIENT = 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)'

/** "Power Your Next Step Abroad" headline band. */
export function PowerBand() {
  const { open } = useConsultationModal()
  const { t } = useT()
  return (
    <section className="py-20 bg-navy" aria-labelledby="power-heading">
      <div className="mx-auto px-6 md:px-12 max-w-4xl text-center">
        <h2 id="power-heading" className="font-serif font-normal text-[34px] md:text-[48px] leading-tight text-white mb-6">
          {t('power.heading')}
          <span className="block text-gold-brushed text-[24px] md:text-[30px] mt-2">{t('power.sub')}</span>
        </h2>
        <button
          onClick={open}
          className="inline-flex items-center gap-2 px-8 py-4 text-white text-[14px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(31,169,104,.45)]"
          style={{ background: BRAND_GRADIENT }}
        >
          {t('cta.reserveConsultation')}
        </button>
      </div>
    </section>
  )
}
