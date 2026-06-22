'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MessageCircle, MapPin } from 'lucide-react'
import Link from 'next/link'
import { EyebrowTag } from './EyebrowTag'
import { buildWhatsAppUrl } from '@/lib/utils'
import { useT } from '@/context/LanguageContext'
import { WHATSAPP_NUMBER, OFFICE_ADDRESS } from '@/lib/constants'

const DEFAULT_FINAL_CTA_IMAGE = '/images/city1.png'

export function FinalCTA() {
  const { t } = useT()
  const waUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, 'Hello Songbird, I am ready to begin my application.')
  const [bgImage, setBgImage] = useState(DEFAULT_FINAL_CTA_IMAGE)

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getHeroSettings }) =>
      getHeroSettings().then(s => { if (s?.finalCtaImage) setBgImage(s.finalCtaImage) })
    )
  }, [])

  return (
    <section
      className="relative py-28 overflow-hidden bg-navy"
      aria-labelledby="final-cta-heading"
    >
      {/* Full-bleed background image */}
      <Image
        src={bgImage}
        alt=""
        fill
        className="object-cover opacity-[0.18]"
        sizes="100vw"
        aria-hidden="true"
      />
      {/* Navy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/90 to-navy" />

      <div className="relative z-10 mx-auto px-6 md:px-12 max-w-3xl text-center">
        <EyebrowTag>{t('final.eyebrow')}</EyebrowTag>
        <h2
          id="final-cta-heading"
          className="font-serif font-normal text-[40px] md:text-[54px] leading-tight text-white mb-5"
        >
          {t('final.heading')}
        </h2>
        <p className="text-[16px] font-sans text-cream/65 mb-10 max-w-lg mx-auto leading-relaxed">
          {t('final.body')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white text-[14px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(31,169,104,.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            style={{ background: 'linear-gradient(95deg, #22B877 0%, #0E7C5A 100%)' }}
          >
            <MessageCircle className="w-4 h-4" />
            {t('final.whatsapp')}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold-brushed/50 text-gold-brushed hover:bg-gold-brushed/10 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-brushed"
          >
            {t('cta.contactUs')}
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-[13px] font-sans text-cream/45">
          <MapPin className="w-3.5 h-3.5 text-gold-brushed" />
          {OFFICE_ADDRESS}
        </div>
      </div>
    </section>
  )
}
