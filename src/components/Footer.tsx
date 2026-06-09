'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'
import { WHATSAPP_NUMBER, OFFICE_ADDRESS, OFFICE_PHONE, CONTACT_EMAIL, SOCIAL } from '@/lib/constants'
import { SERVICES } from '@/lib/services'

const QUICK_LINKS = [
  { label: 'Home',           href: '/' },
  { label: 'About Us',       href: '/#about' },
  { label: 'Our Process',    href: '/#process' },
  { label: 'Testimonials',   href: '/#testimonials' },
  { label: 'Insights',       href: '/insights' },
  { label: 'Contact',        href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
]

function NewsletterRow() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <div className="border-b border-gold-brushed/10 pb-10 mb-10">
      <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
        <div>
          <p className="text-[13px] font-sans font-semibold text-cream/80 mb-0.5">Stay informed</p>
          <p className="text-[12px] font-sans text-cream/45">UAE immigration updates and advisory insights, straight to your inbox.</p>
        </div>
        {submitted ? (
          <p className="text-[13px] font-sans text-teal-end">Thank you — you&apos;re subscribed.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 md:w-60 px-3.5 py-2.5 bg-navy/50 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/25 focus:outline-none focus:ring-2 focus:ring-gold-brushed/40"
            />
            <button
              type="submit"
              className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 border border-gold-brushed/50 text-gold-brushed hover:bg-gold-brushed/10 text-[12px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors"
            >
              Subscribe <ArrowRight className="w-3 h-3" />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export function Footer() {
  const waUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, 'Hello Songbird, I would like to enquire about your services.')

  return (
    <footer className="bg-navy-deep border-t border-gold-brushed/25">
      <div className="mx-auto px-6 md:px-12 pt-14 pb-8">
        <NewsletterRow />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Songbird Consultancy"
                width={140}
                height={48}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-[13px] font-sans text-cream/60 leading-relaxed mb-5">
              Dubai&apos;s premier multi-service advisory firm — your gateway to global residency, done right.
            </p>
            <div className="flex gap-3">
              <SocialIcon href={SOCIAL.facebook} label="Facebook" Icon={Facebook} />
              <SocialIcon href={SOCIAL.instagram} label="Instagram" Icon={Instagram} />
              <SocialIcon href={SOCIAL.linkedin} label="LinkedIn" Icon={Linkedin} />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-gold-brushed mb-4">Our Services</h3>
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
            <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-gold-brushed mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] font-sans text-cream/60 hover:text-teal-end transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-gold-brushed mb-4">Contact Us</h3>
            <ul className="space-y-3 mb-5">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-brushed shrink-0 mt-0.5" />
                <span className="text-[13px] font-sans text-cream/60 leading-snug">{OFFICE_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-brushed shrink-0" />
                <a href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`} className="text-[13px] font-sans text-cream/60 hover:text-teal-end transition-colors">{OFFICE_PHONE}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-brushed shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[13px] font-sans text-cream/60 hover:text-teal-end transition-colors">{CONTACT_EMAIL}</a>
              </li>
            </ul>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-white text-[12px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(31,169,104,.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              style={{ background: 'linear-gradient(95deg, #22B877 0%, #0E7C5A 100%)' }}
            >
              WhatsApp Us Now
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold-brushed/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] font-sans text-cream/35">
            &copy; {new Date().getFullYear()} Songbird Consultancy LLC. All rights reserved. UAE Licensed.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-[12px] font-sans text-cream/35 hover:text-gold-brushed transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="text-[12px] font-sans text-cream/35 hover:text-gold-brushed transition-colors">Terms of Service</Link>
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
