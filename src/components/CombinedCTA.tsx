'use client'

import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'
import { EligibilityQuiz } from './EligibilityQuiz'
import { buildWhatsAppUrl } from '@/lib/utils'
import { WHATSAPP_NUMBER, OFFICE_PHONE } from '@/lib/constants'

/**
 * Merged "Are You Eligible?" + "Connect With Us" block — a single combined CTA
 * (eligibility quiz on the left, direct connect options on the right).
 */
export function CombinedCTA() {
  const waUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, 'Hello Songbird, I would like to check my eligibility and connect.')

  return (
    <section className="py-24 bg-navy-deep" aria-labelledby="combined-cta-heading">
      <div className="mx-auto px-6 md:px-12 max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-gold-brushed mb-3">Free Assessment</p>
          <h2 id="combined-cta-heading" className="font-serif font-semibold text-[34px] md:text-[46px] leading-tight text-white mb-4">
            Are You Eligible? Connect With Us
          </h2>
          <p className="text-[16px] font-sans text-cream/55 max-w-xl mx-auto">
            Answer four quick questions for a personalised pathway — or reach us directly. We respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
          {/* Eligibility quiz */}
          <div>
            <EligibilityQuiz />
          </div>

          {/* Connect options */}
          <div className="bg-navy-card border border-gold-brushed/20 rounded-2xl p-7">
            <h3 className="font-serif font-semibold text-[22px] text-white mb-2">Prefer to talk now?</h3>
            <p className="text-[14px] font-sans text-cream/55 mb-6">Connect with a Songbird advisor directly.</p>
            <div className="flex flex-col gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-[6px] bg-whatsapp text-white text-[13px] font-sans font-semibold uppercase tracking-[0.08em] transition-all hover:-translate-y-px"
              >
                <MessageCircle className="w-4 h-4" /> Connect via WhatsApp
              </a>
              <a
                href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-[6px] border border-gold-brushed/40 text-gold-brushed hover:bg-gold-brushed/10 text-[13px] font-sans font-semibold uppercase tracking-[0.08em] transition-colors"
              >
                <Phone className="w-4 h-4" /> {OFFICE_PHONE}
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-[6px] border border-gold-brushed/40 text-cream/80 hover:text-white hover:bg-white/5 text-[13px] font-sans font-semibold uppercase tracking-[0.08em] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
