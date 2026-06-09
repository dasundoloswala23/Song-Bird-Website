import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { EyebrowTag } from '@/components/EyebrowTag'
import { buildWhatsAppUrl } from '@/lib/utils'
import { WHATSAPP_NUMBER, OFFICE_ADDRESS, OFFICE_PHONE, CONTACT_EMAIL, OFFICE_HOURS, MAPS_URL } from '@/lib/constants'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Songbird Consultancy. Visit our Dubai office or reach us by phone, email, or WhatsApp.',
}

const BRAND_GRADIENT = 'linear-gradient(135deg, #1FA968 0%, #0E5C54 50%, #0A3A52 100%)'
const WA_GREEN = '#25D366'

export default function ContactPage() {
  const waUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, 'Hello Songbird, I would like to reach out.')

  return (
    <>
      {/* Hero */}
      <section className="pt-[160px] pb-20 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-4xl text-center">
          <EyebrowTag>Reach Out</EyebrowTag>
          <h1 className="font-serif font-semibold text-[42px] md:text-[56px] leading-tight text-white mb-4">
            Get in Touch
          </h1>
          <div className="mx-auto w-16 h-px bg-gold-brushed mb-5" />
          <p className="text-[16px] font-sans text-cream/65 max-w-xl mx-auto leading-relaxed">
            Whether you have a specific question or want to explore your options, our advisors are ready to listen.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="py-16 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-start">

            {/* Left (60%) — Message form */}
            <div className="bg-white rounded-2xl border border-cloud p-8 shadow-[0_4px_24px_rgba(4,38,28,.07)]">
              <h2 className="font-serif font-semibold text-[24px] text-ink mb-1">Send us a message</h2>
              <p className="text-[13px] font-sans text-slate mb-7">We reply within one business day.</p>
              <ContactForm />
            </div>

            {/* Right (40%) — Speak to an advisor */}
            <div className="space-y-4">
              <div className="bg-navy rounded-2xl p-8">
                <h2 className="font-serif font-semibold text-[22px] text-white mb-2">Speak to an advisor now</h2>
                <p className="text-[13px] font-sans text-cream/55 mb-7">Connect instantly — no forms, no waiting.</p>

                {/* Call CTA */}
                <a
                  href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-3 w-full py-4 text-[15px] font-sans font-semibold text-white rounded-[10px] mb-3 transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(31,169,104,.4)]"
                  style={{ background: BRAND_GRADIENT }}
                >
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </a>

                {/* WhatsApp CTA */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 text-[15px] font-sans font-semibold text-white rounded-[10px] transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(37,211,102,.3)] mb-6"
                  style={{ background: WA_GREEN }}
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us Now
                </a>

                {/* Contact details */}
                <div className="space-y-4 pt-4 border-t border-gold-brushed/15">
                  {[
                    { Icon: Phone, label: 'Phone', value: OFFICE_PHONE, href: `tel:${OFFICE_PHONE.replace(/\s/g,'')}` },
                    { Icon: Mail, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
                    { Icon: Clock, label: 'Hours', value: OFFICE_HOURS, href: undefined },
                    { Icon: MapPin, label: 'Address', value: OFFICE_ADDRESS, href: MAPS_URL },
                  ].map(({ Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-gold-brushed/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-gold-brushed" />
                      </div>
                      <div>
                        <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed/70 mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                            className="text-[13px] font-sans text-cream/75 hover:text-white transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-[13px] font-sans text-cream/75">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section aria-label="Office location map">
        <div className="bg-navy px-6 md:px-12 py-3 flex items-center justify-between">
          <p className="text-[13px] font-sans text-cream/70 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold-brushed" />
            {OFFICE_ADDRESS}
          </p>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
            className="text-[12px] font-sans font-semibold uppercase tracking-[0.08em] text-gold-brushed hover:text-gold transition-colors">
            Open in Maps →
          </a>
        </div>
        <div className="h-80 bg-navy-card">
          <iframe
            title="Songbird Consultancy office location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.0098743742287!2d55.27838!3d25.21777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f434d5e9e2c3b%3A0x8b7c9a5b2b7e4e0!2sEmirates%20Towers%2C%20Dubai!5e0!3m2!1sen!2sae!4v1699000000000"
            className="w-full h-full border-0 grayscale opacity-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  )
}
