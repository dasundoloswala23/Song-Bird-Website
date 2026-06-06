'use client'

import Link from 'next/link'
import { useConsultationModal } from '@/context/ConsultationModalContext'

interface ServiceCTABandProps {
  serviceTitle: string
}

export function ServiceCTABand({ serviceTitle }: ServiceCTABandProps) {
  const { open: openConsultation } = useConsultationModal()

  return (
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto bg-navy rounded-3xl p-10 text-center shadow-[0_24px_60px_rgba(10,23,56,.18)]">
        <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-gold-brushed mb-3">
          <span className="inline-block w-5 h-px bg-gold-brushed align-middle mr-2" />
          Take the First Step
        </p>
        <h2 className="font-serif font-semibold text-[30px] md:text-[38px] text-white leading-tight mb-2">
          Ready to Start Your Journey?
        </h2>
        <div className="w-12 h-px bg-gold-brushed mx-auto mb-5" />
        <p className="text-[14px] font-sans text-cream/60 max-w-sm mx-auto mb-8">
          Schedule a consultation with our advisors to discuss your personalised plan.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={openConsultation}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-full transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(26,107,126,.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            style={{ background: 'linear-gradient(95deg, #1A6B7E 0%, #3FB68A 100%)' }}
          >
            Book Consultation
          </button>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3 border border-gold-brushed/50 text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-full transition-colors hover:bg-gold-brushed/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-brushed"
            style={{ color: '#C9A961' }}
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
