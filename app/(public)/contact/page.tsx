import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { EyebrowTag } from '@/components/EyebrowTag'
import { buildWhatsAppUrl } from '@/lib/utils'
import { WHATSAPP_NUMBER, OFFICE_ADDRESS, OFFICE_PHONE, CONTACT_EMAIL, OFFICE_HOURS, MAPS_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Songbird Consultancy. Visit our Dubai office or reach us by phone, email, or WhatsApp.',
}

const CONTACT_DETAILS = [
  { Icon: MapPin,  label: 'Office Address', value: OFFICE_ADDRESS },
  { Icon: Phone,   label: 'Phone',          value: OFFICE_PHONE, href: `tel:${OFFICE_PHONE.replace(/\s/g, '')}` },
  { Icon: MessageCircle, label: 'WhatsApp',  value: WHATSAPP_NUMBER, href: buildWhatsAppUrl(WHATSAPP_NUMBER, 'Hello Songbird') },
  { Icon: Mail,    label: 'Email',           value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { Icon: Clock,   label: 'Office Hours',   value: OFFICE_HOURS },
]

export default function ContactPage() {
  const waUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, 'Hello Songbird, I would like to reach out.')

  return (
    <>
      {/* Hero — top padding accounts for 40px utility bar + 80px header */}
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

      {/* Two-column card */}
      <section className="py-16 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Left — Office details */}
            <div className="bg-white rounded-2xl border border-cloud p-8 shadow-[0_4px_24px_rgba(10,23,56,.06)]">
              <h2 className="font-serif font-semibold text-[22px] text-ink mb-6">Office Details</h2>
              <ul className="space-y-5 mb-8">
                {CONTACT_DETAILS.map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold-brushed/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-gold-brushed" />
                    </div>
                    <div>
                      <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-slate mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-[14px] font-sans text-ink hover:text-gold-brushed transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-[14px] font-sans text-ink">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* WhatsApp card */}
              <div className="rounded-xl bg-navy p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[12px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-0.5">Prefer WhatsApp?</p>
                  <p className="text-[13px] font-sans text-cream/65">Chat with an advisor instantly</p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-gold hover:bg-gold-deep text-navy text-[12px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat Now
                </a>
              </div>
            </div>

            {/* Right — Contact form */}
            <div className="bg-white rounded-2xl border border-cloud p-8 shadow-[0_4px_24px_rgba(10,23,56,.06)]">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map embed */}
      <section aria-label="Office location map">
        <div className="bg-navy px-6 md:px-12 py-3 flex items-center justify-between max-w-none">
          <p className="text-[13px] font-sans text-cream/70 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold-brushed" />
            {OFFICE_ADDRESS}
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-sans font-semibold uppercase tracking-[0.08em] text-gold-brushed hover:text-gold transition-colors"
          >
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
