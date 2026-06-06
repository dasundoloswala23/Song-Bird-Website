'use client'

import { Phone, Mail } from 'lucide-react'
import { useDirection } from '@/context/DirectionContext'
import { OFFICE_PHONE, CONTACT_EMAIL, OFFICE_HOURS } from '@/lib/constants'

export function TopUtilityBar() {
  const { dir, toggleDir } = useDirection()

  return (
    <div className="fixed top-0 inset-x-0 z-50 h-10 bg-navy border-b border-gold-brushed/30">
      <div className="h-full mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left — location + hours */}
        <p className="hidden md:block text-[11px] text-cream/70 font-sans tracking-wide">
          Dubai &bull; Abu Dhabi &bull; Sharjah &nbsp;&nbsp;|&nbsp;&nbsp;
          <span className="hidden lg:inline">{OFFICE_HOURS}</span>
        </p>
        <p className="block md:hidden text-[11px] text-cream/70 font-sans">
          Dubai, UAE
        </p>

        {/* Right — phone, email, language toggle */}
        <div className="flex items-center gap-4">
          <a
            href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`}
            className="hidden sm:flex items-center gap-1.5 text-[11px] text-cream/70 hover:text-gold-brushed transition-colors font-sans"
          >
            <Phone className="w-3 h-3" />
            {OFFICE_PHONE}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hidden lg:flex items-center gap-1.5 text-[11px] text-cream/70 hover:text-gold-brushed transition-colors font-sans"
          >
            <Mail className="w-3 h-3" />
            {CONTACT_EMAIL}
          </a>
          <span className="w-px h-3 bg-cream/20" />
          <button
            onClick={toggleDir}
            className="text-[11px] text-cream/70 hover:text-gold-brushed transition-colors font-sans uppercase tracking-widest focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-brushed"
            aria-label={dir === 'ltr' ? 'Switch to Arabic' : 'Switch to English'}
          >
            {dir === 'ltr' ? 'EN | عربي' : 'عربي | EN'}
          </button>
        </div>
      </div>
    </div>
  )
}
