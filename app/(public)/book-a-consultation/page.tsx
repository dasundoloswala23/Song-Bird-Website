import type { Metadata } from 'next'
import { EyebrowTag } from '@/components/EyebrowTag'
import { BookingFlow } from '@/components/BookingFlow'
import { CheckCircle2 } from 'lucide-react'
import { OFFICE_PHONE } from '@/lib/constants'
import { WhatsAppTriggerButton } from '@/components/WhatsAppTriggerButton'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Book a Free Immigration Consultation',
  description: 'Schedule a complimentary consultation with a Songbird Consultancy immigration advisor in the UAE. Choose your date, time, and duration.',
  keywords: ['Free immigration consultation UAE', 'Visa consultation Dubai', 'Immigration Consultant Near Me', 'Book immigration consultant UAE'],
  alternates: { canonical: '/book-a-consultation/' },
}

const BENEFITS = [
  'Complimentary initial session',
  'Choose your session length (15–60 min)',
  'Speak with a licensed advisor',
  'Free and fully confidential',
]

export default function BookConsultationPage() {
  return (
    <>
      <section className="pt-[140px] pb-10 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-4xl text-center">
          <EyebrowTag>Schedule a Call</EyebrowTag>
          <h1 className="font-serif font-normal text-[44px] md:text-[58px] leading-tight text-white mb-4">
            Book a Consultation
          </h1>
          <p className="text-[16px] font-sans text-cream/60 max-w-xl mx-auto">
            Select a date and time that works for you. Our advisors are available Monday – Friday 10am – 7pm, and weekends 8am – 11pm.
          </p>
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
            {/* Booking flow */}
            <div className="bg-navy-card border border-gold-brushed/15 rounded-2xl p-8">
              <BookingFlow />
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6">
                <h3 className="font-serif font-normal text-[18px] text-white mb-4">What to expect</h3>
                <ul className="space-y-3">
                  {BENEFITS.map(b => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                      <span className="text-[13px] font-sans text-cream/70">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6">
                <h3 className="font-serif font-normal text-[16px] text-white mb-2">Prefer another channel?</h3>
                <p className="text-[12px] font-sans text-cream/50 mb-4">Reach us directly:</p>
                <a
                  href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-[13px] font-sans font-medium text-gold-brushed hover:text-gold transition-colors mb-2"
                >
                  📞 {OFFICE_PHONE}
                </a>
                <WhatsAppTriggerButton
                  message="Hi, I'd like to book a consultation."
                  className="flex items-center gap-2 text-[13px] font-sans font-medium text-whatsapp hover:opacity-80 transition-opacity"
                >
                  💬 WhatsApp us
                </WhatsAppTriggerButton>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
