'use client'

import { Mail, MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from '@/lib/constants'
import { buildWhatsAppUrl } from '@/lib/utils'

/**
 * Vertical right-side floating action stack (reference: globalmobilityadvisory.com).
 * Email · WhatsApp — WhatsApp in its distinct green with the pulse animation.
 */
export function FloatingActions() {
  const waUrl = buildWhatsAppUrl(
    WHATSAPP_NUMBER,
    'Hello Songbird, I would like to enquire about your services.',
  )

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        aria-label="Email us"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-navy text-cream shadow-[0_6px_18px_rgba(4,38,28,.3)] hover:-translate-y-0.5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-brushed"
      >
        <Mail className="w-5 h-5" />
      </a>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect via WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgba(37,211,102,.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2"
        style={{ animation: 'whatsapp-pulse 2.4s ease-in-out infinite' }}
      >
        <MessageCircle className="w-7 h-7" fill="white" stroke="none" />
      </a>
    </div>
  )
}
