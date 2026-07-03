'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'
import { useT } from '@/context/LanguageContext'
import { WHATSAPP_NUMBER_INDIA, WHATSAPP_NUMBER_INDIA_DISPLAY, OFFICES, OFFICE_PHONE, CONTACT_EMAIL, SOCIAL } from '@/lib/constants'
import { SERVICES } from '@/lib/services'
import { useWhatsAppPicker } from '@/context/WhatsAppPickerContext'

const QUICK_LINKS = [
  { key: 'footer.link.home',           href: '/' },
  { key: 'footer.link.about',          href: '/about' },
  { key: 'footer.link.eligibility',    href: '/#eligibility' },
  { key: 'footer.link.process',        href: '/#process' },
  { key: 'footer.link.testimonials',   href: '/#testimonials' },
  { key: 'footer.link.collaborations', href: '/collaborations' },
  { key: 'footer.link.insights',       href: '/insights' },
  { key: 'footer.link.contact',        href: '/contact' },
  { key: 'footer.link.privacy',        href: '/privacy' },
] as const

function NewsletterRow() {
  const { t } = useT()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'saving') return
    setStatus('saving')
    try {
      const { saveNewsletterSignup } = await import('@/lib/firestorePublic')
      await saveNewsletterSignup(email)
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="border-b border-gold-brushed/10 pb-10 mb-10">
      <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
        <div>
          <p className="text-[15px] font-serif font-normal text-cream mb-0.5">{t('footer.stayInformed')}</p>
          <p className="text-[12px] font-sans text-cream/45">{t('footer.stayInformedSub')}</p>
        </div>
        {status === 'done' ? (
          <p className="text-[13px] font-sans text-teal-end">{t('footer.subscribed')}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t('footer.emailPlaceholder')}
              required
              disabled={status === 'saving'}
              className="flex-1 md:w-72 px-4 py-2.5 bg-white/[0.07] border border-gold-brushed/40 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/45 focus:outline-none focus:ring-2 focus:ring-gold-brushed/60 focus:border-gold-brushed/60 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === 'saving'}
              className="shrink-0 flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gold hover:bg-gold-deep disabled:opacity-60 text-navy text-[12px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors"
            >
              {status === 'saving' ? 'Subscribing…' : t('cta.subscribe')}
              {status !== 'saving' && <ArrowRight className="w-3 h-3" />}
            </button>
          </form>
        )}
      </div>
      {status === 'error' && (
        <p className="mt-2 text-[12px] font-sans text-red-400">Something went wrong. Please try again.</p>
      )}
    </div>
  )
}

export function Footer() {
  const { t } = useT()
  const { openPicker } = useWhatsAppPicker()
  const waUrlIndia = buildWhatsAppUrl(WHATSAPP_NUMBER_INDIA, 'Hello Songbird, I would like to enquire about your services.')

  return (
    <footer className="bg-navy-deep border-t border-gold-brushed/25">
      <div className="mx-auto px-6 md:px-12 pt-14 pb-8">
        <NewsletterRow />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo2.png"
                alt="Songbird Immigration Consultants UAE — Songbird Consultancy"
                width={140}
                height={140}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-[13px] font-sans text-cream/60 leading-relaxed mb-5">
              {t('footer.brandLine')}
            </p>
            <div className="flex gap-3">
              <SocialIcon href={SOCIAL.facebook} label="Facebook" Icon={Facebook} />
              <SocialIcon href={SOCIAL.instagram} label="Instagram" Icon={Instagram} />
              <SocialIcon href={SOCIAL.linkedin} label="LinkedIn" Icon={Linkedin} />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-gold-brushed mb-4">{t('footer.ourServices')}</h3>
            <ul className="space-y-2">
              {SERVICES.map(s => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-[13px] font-sans text-cream/60 hover:text-teal-end transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-gold-brushed mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] font-sans text-cream/60 hover:text-teal-end transition-colors">
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-gold-brushed mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-3 mb-5">
              {OFFICES.map(office => (
                <li key={office.city} className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold-brushed shrink-0 mt-0.5" />
                  <span className="text-[13px] font-sans text-cream/60 leading-snug">
                    {office.address}
                  </span>
                </li>
              ))}
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-brushed shrink-0" />
                <a href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`} className="text-[13px] font-sans text-cream/60 hover:text-teal-end transition-colors">{OFFICE_PHONE}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-brushed shrink-0" />
                <a href={waUrlIndia} target="_blank" rel="noopener noreferrer" className="text-[13px] font-sans text-cream/60 hover:text-teal-end transition-colors">{WHATSAPP_NUMBER_INDIA_DISPLAY} (WhatsApp)</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-brushed shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[13px] font-sans text-cream/60 hover:text-teal-end transition-colors">{CONTACT_EMAIL}</a>
              </li>
            </ul>
            <button
              onClick={() => openPicker('Hello Songbird, I would like to enquire about your services.')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-white text-[12px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(31,169,104,.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              style={{ background: 'linear-gradient(95deg, #22B877 0%, #0E7C5A 100%)' }}
            >
              {t('cta.whatsappNow')}
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold-brushed/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] font-sans text-cream/35">
            &copy; {new Date().getFullYear()} Songbird Consultancy LLC. {t('footer.rights')}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-[12px] font-sans text-cream/35 hover:text-gold-brushed transition-colors">{t('footer.link.privacy')}</Link>
            <Link href="/terms"   className="text-[12px] font-sans text-cream/35 hover:text-gold-brushed transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ href, label, Icon }: { href: string; label: string; Icon: React.ElementType }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-full border border-gold-brushed/30 flex items-center justify-center text-cream/50 hover:text-teal-end hover:border-teal/50 transition-colors"
    >
      <Icon className="w-3.5 h-3.5" />
    </a>
  )
}
