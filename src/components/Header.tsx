'use client'

import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useConsultationModal } from '@/context/ConsultationModalContext'
import { useT } from '@/context/LanguageContext'
import { SERVICE_CLUSTERS } from '@/lib/services'

const BRAND_GRADIENT = 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)'

const DESTINATION_LINKS = [
  { label: 'Dubai',      href: '/destinations',  desc: 'Golden Visa · Business Setup' },
  { label: 'Abu Dhabi',  href: '/destinations',  desc: 'Investor Visa · Residency' },
  { label: 'Sharjah',    href: '/destinations',  desc: 'Residence Permit · Free Zones' },
  { label: 'All Destinations', href: '/destinations', desc: 'Explore every pathway' },
]

const TOP_LINKS = [
  { key: 'nav.about',          href: '/about' },
  { key: 'nav.collaborations', href: '/collaborations' },
  { key: 'nav.insights',       href: '/insights' },
  { key: 'nav.contact',        href: '/contact' },
] as const

export function Header() {
  const [scrolled, setScrolled]           = useState(false)
  const [mobileOpen, setMobileOpen]       = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const { open: openConsultation } = useConsultationModal()
  const { t } = useT()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinkCls ='px-3 py-2 text-[13px] font-sans font-medium uppercase tracking-[0.06em] text-ink/80 hover:text-emerald transition-colors rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald inline-flex items-center gap-1'

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-10 inset-x-0 z-40 transition-all duration-300 border-b',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_32px_rgba(4,38,28,.12)] border-hairline h-16'
          : 'bg-white/90 backdrop-blur-sm border-hairline/60 h-20',
      )}
    >
      <div className="h-full mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded">
          <Image src="/logo.png" alt="Songbird Consultancy" width={56} height={56} className="h-12 w-auto" priority />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-serif font-normal text-[18px] text-ink">Songbird Consultancy</span>
            <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold-deep mt-1">{t('brand.slogan')}</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 relative" aria-label="Main navigation">
          <Link href="/" className={navLinkCls}>{t('nav.home')}</Link>

          {/* Services — navigates straight to the services page (no dropdown) */}
          <Link href="/services" className={navLinkCls}>
            {t('nav.services')}
          </Link>

          {/* Destinations — navigates straight to the destinations page (no dropdown) */}
          <Link href="/destinations" className={navLinkCls}>
            {t('nav.destinations')}
          </Link>

          {TOP_LINKS.map(link => (
            <Link key={link.key} href={link.href} className={navLinkCls}>
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={openConsultation}
            className="px-4 py-2 text-[12px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(31,169,104,.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            style={{ background: BRAND_GRADIENT }}
          >
            {t('cta.bookConsultation')}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-ink/80 hover:text-emerald focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald rounded"
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile overlay — full-screen panel above the utility bar (z-50) with its own close */}
      {mobileOpen && typeof document !== 'undefined' && createPortal(
        <div className="lg:hidden fixed inset-0 z-[60] bg-white flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-4 h-20 border-b border-hairline shrink-0">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
              <Image src="/logo.png" alt="Songbird Consultancy" width={48} height={48} className="h-10 w-auto" />
              <span className="font-serif font-normal text-[16px] text-ink">Songbird Consultancy</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="p-2 text-ink hover:text-emerald focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald rounded"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="py-4 border-b border-hairline text-[18px] font-serif font-normal text-ink hover:text-emerald transition-colors block"
            >
              {t('nav.home')}
            </Link>

            {/* Services — label navigates, chevron expands the sub-list */}
            <div className="flex items-center justify-between border-b border-hairline">
              <Link
                href="/services"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-4 text-[18px] font-serif font-normal text-ink hover:text-emerald transition-colors"
              >
                {t('nav.services')}
              </Link>
              <button
                onClick={() => setMobileExpanded(p => p === 'services' ? null : 'services')}
                aria-label="Expand services"
                className="p-2 text-ink hover:text-emerald transition-colors"
              >
                <ChevronDown className={cn('w-5 h-5 transition-transform', mobileExpanded === 'services' && 'rotate-180')} />
              </button>
            </div>
            {mobileExpanded === 'services' && (
              <div className="py-2 pl-4 space-y-0">
                {SERVICE_CLUSTERS.map(cluster => (
                  <div key={cluster.key} className="mb-3">
                    {cluster.services.map(s => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-[15px] font-sans text-ink/80 hover:text-emerald"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Destinations accordion */}
            <button
              onClick={() => setMobileExpanded(p => p === 'destinations' ? null : 'destinations')}
              className="flex items-center justify-between py-4 border-b border-hairline text-[18px] font-serif font-normal text-ink hover:text-emerald transition-colors"
            >
              {t('nav.destinations')}
              <ChevronDown className={cn('w-5 h-5 transition-transform', mobileExpanded === 'destinations' && 'rotate-180')} />
            </button>
            {mobileExpanded === 'destinations' && (
              <div className="py-2 pl-4">
                {DESTINATION_LINKS.map(d => (
                  <Link
                    key={d.href}
                    href={d.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-[15px] font-sans text-ink/80 hover:text-emerald"
                  >
                    {d.label}
                  </Link>
                ))}
              </div>
            )}

            {TOP_LINKS.map(link => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 border-b border-hairline text-[18px] font-serif font-normal text-ink hover:text-emerald transition-colors block"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="px-6 pb-8">
            <button
              onClick={() => { setMobileOpen(false); openConsultation() }}
              className="w-full py-3 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] transition-all hover:shadow-[0_6px_18px_rgba(31,169,104,.4)]"
              style={{ background: BRAND_GRADIENT }}
            >
              Book a Consultation
            </button>
          </div>
        </div>,
        document.body
      )}
    </header>
  )
}
