import Image from 'next/image'
import { MessageCircle, MapPin } from 'lucide-react'
import Link from 'next/link'
import { EyebrowTag } from './EyebrowTag'
import { buildWhatsAppUrl } from '@/lib/utils'
import { WHATSAPP_NUMBER, OFFICE_ADDRESS } from '@/lib/constants'

export function FinalCTA() {
  const waUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, 'Hello Songbird, I am ready to begin my application.')

  return (
    <section
      className="relative py-28 overflow-hidden bg-navy"
      aria-labelledby="final-cta-heading"
    >
      {/* Full-bleed city image */}
      <Image
        src="/images/city1.png"
        alt=""
        fill
        className="object-cover opacity-[0.12]"
        sizes="100vw"
        aria-hidden="true"
      />
      {/* Navy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/90 to-navy" />

      <div className="relative z-10 mx-auto px-6 md:px-12 max-w-3xl text-center">
        <EyebrowTag>Take the First Step</EyebrowTag>
        <h2
          id="final-cta-heading"
          className="font-serif font-semibold text-[40px] md:text-[54px] leading-tight text-white mb-5"
        >
          Ready to Begin<br />Your Journey?
        </h2>
        <p className="text-[16px] font-sans text-cream/65 mb-10 max-w-lg mx-auto leading-relaxed">
          Connect with a Songbird advisor today and take the first step towards your global future — with complete confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white text-[14px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(31,169,104,.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            style={{ background: 'linear-gradient(95deg, #1FA968 0%, #0E5C54 100%)' }}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Consultation
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold-brushed/50 text-gold-brushed hover:bg-gold-brushed/10 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-brushed"
          >
            Contact Us
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
