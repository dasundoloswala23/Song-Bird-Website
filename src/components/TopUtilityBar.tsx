'use client'

import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'
import { OFFICE_PHONE, CONTACT_EMAIL, OFFICE_ADDRESS, OFFICE_HOURS, SOCIAL } from '@/lib/constants'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export function TopUtilityBar() {
  return (
    <div className="fixed top-0 inset-x-0 z-50 h-10 bg-navy border-b border-gold-brushed/30">
      <div className="h-full mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Left — language switcher + address */}
        <div className="flex items-center gap-4 min-w-0">
          <LanguageSwitcher />
          <span className="hidden md:flex items-center gap-1.5 text-[11px] text-cream/70 font-sans truncate">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{OFFICE_ADDRESS}</span>
          </span>
        </div>

        {/* Right — hours, email, phone, social */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden xl:inline text-[12px] text-cream/70 font-sans">
            {OFFICE_HOURS.weekdays} &nbsp;·&nbsp; {OFFICE_HOURS.weekend}
          </span>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hidden lg:flex items-center gap-1.5 text-[11px] text-cream/70 hover:text-gold-brushed transition-colors font-sans"
          >
            <Mail className="w-3 h-3" />
            {CONTACT_EMAIL}
          </a>
          <a
            href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`}
            className="hidden sm:flex items-center gap-1.5 text-[14px] font-semibold text-cream hover:text-gold-brushed transition-colors font-sans"
          >
            <Phone className="w-3.5 h-3.5" />
            {OFFICE_PHONE}
          </a>
          <span className="hidden sm:block w-px h-3 bg-cream/20" />
          <div className="flex items-center gap-2.5">
            <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-cream/70 hover:text-gold-brushed transition-colors">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cream/70 hover:text-gold-brushed transition-colors">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-cream/70 hover:text-gold-brushed transition-colors">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
