'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useConsultationModal } from '@/context/ConsultationModalContext'
import { SERVICE_CLUSTERS } from '@/lib/services'

const BRAND_GRADIENT = 'linear-gradient(135deg, #1FA968 0%, #0E5C54 50%, #0A3A52 100%)'

const DESTINATION_LINKS = [
  { label: 'Dubai',      href: '/destinations/dubai',      desc: 'Golden Visa · Business Setup' },
  { label: 'Abu Dhabi',  href: '/destinations/abu-dhabi',   desc: 'Investor Visa · Residency' },
  { label: 'Sharjah',    href: '/destinations/sharjah',     desc: 'Residence Permit · Free Zones' },
  { label: 'All Destinations', href: '/destinations',       desc: 'Explore every pathway' },
]

const TOP_LINKS = [
  { label: 'About',    href: '/about' },
  { label: 'Process',  href: '/#process' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact',  href: '/contact' },
]

function ServicesMegaPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] max-w-[95vw] bg-navy-deep/95 backdrop-blur-xl border border-gold-brushed/10 rounded-2xl shadow-[0_24px_64px_rgba(4,38,28,.7)] p-6 z-50">
      <div className="grid grid-cols-3 gap-6">
        {SERVICE_CLUSTERS.map(cluster => (
          <div key={cluster.key}>
            <div className="space-y-1">
              {cluster.services.map(s => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={onClose}
                  className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <p className="text-[13px] font-sans font-medium text-cream/90 group-hover:text-white">{s.title}</p>
                  <p className="text-[11px] font-sans text-cream/40 leading-tight mt-0.5 line-clamp-1">{s.shortDesc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gold-brushed/10 flex justify-between items-center">
        <Link
          href="/services"
          onClick={onClose}
          className="text-[12px] font-sans text-gold-brushed hover:text-gold transition-colors"
        >
          View all services →
        </Link>
        <Link
          href="/book-a-consultation"
          onClick={onClose}
          className="px-4 py-2 text-[12px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] transition-all hover:-translate-y-px"
          style={{ background: BRAND_GRADIENT }}
        >
          Book Consultation
        </Link>
      </div>
    </div>
  )
}

function DestinationsMegaPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-navy-deep/95 backdrop-blur-xl border border-gold-brushed/10 rounded-2xl shadow-[0_24px_64px_rgba(4,38,28,.7)] p-4 z-50">
      <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-brushed mb-3 px-2">Our Locations</p>
      <div className="space-y-1">
        {DESTINATION_LINKS.map(d => (
          <Link
            key={d.href}
            href={d.href}
            onClick={onClose}
            className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <div>
              <p className="text-[13px] font-sans font-medium text-cream/90 group-hover:text-white">{d.label}</p>
              <p className="text-[11px] font-sans text-cream/40 mt-0.5">{d.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function Header() {
  const [scrolled, setScrolled]           = useState(false)
  const [mobileOpen, setMobileOpen]       = useState(false)
  const [activePanel, setActivePanel]     = useState<'services' | 'destinations' | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const { open: openConsultation } = useConsultationModal()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close mega panel on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActivePanel(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setActivePanel(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const togglePanel = (panel: 'services' | 'destinations') =>
    setActivePanel(prev => prev === panel ? null : panel)

  const navLinkCls = 'px-3 py-2 text-[13px] font-sans font-medium uppercase tracking-[0.06em] text-cream/80 hover:text-gold-brushed transition-colors rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-brushed inline-flex items-center gap-1'

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-10 inset-x-0 z-40 transition-all duration-300 border-b',
        scrolled
          ? 'bg-navy/95 backdrop-blur-md shadow-[0_4px_32px_rgba(4,38,28,.5)] border-white/10 h-16'
          : 'bg-navy/90 backdrop-blur-sm border-white/5 h-20',
      )}
    >
      <div className="h-full mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-brushed rounded">
          <Image src="/logo.png" alt="Songbird Consultancy" width={56} height={56} className="h-12 w-auto" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 relative" aria-label="Main navigation">
          {/* Services mega */}
          <div className="relative">
            <button
              onClick={() => togglePanel('services')}
              aria-expanded={activePanel === 'services'}
              aria-haspopup="true"
              className={cn(navLinkCls, activePanel === 'services' && 'text-gold-brushed')}
            >
              Services
              <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', activePanel === 'services' && 'rotate-180')} />
            </button>
            {activePanel === 'services' && <ServicesMegaPanel onClose={() => setActivePanel(null)} />}
          </div>

          {/* Destinations mega */}
          <div className="relative">
            <button
              onClick={() => togglePanel('destinations')}
              aria-expanded={activePanel === 'destinations'}
              aria-haspopup="true"
              className={cn(navLinkCls, activePanel === 'destinations' && 'text-gold-brushed')}
            >
              Destinations
              <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', activePanel === 'destinations' && 'rotate-180')} />
            </button>
            {activePanel === 'destinations' && <DestinationsMegaPanel onClose={() => setActivePanel(null)} />}
          </div>

          {TOP_LINKS.map(link => (
            <Link key={link.label} href={link.href} className={navLinkCls}>
              {link.label}
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
            Book a Consultation
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-cream/80 hover:text-gold-brushed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-brushed rounded"
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-navy z-30 flex flex-col pt-28 overflow-y-auto">
          <nav className="flex flex-col px-6 mb-6">
            {/* Services accordion */}
            <button
              onClick={() => setMobileExpanded(p => p === 'services' ? null : 'services')}
              className="flex items-center justify-between py-4 border-b border-gold-brushed/10 text-[18px] font-serif font-medium text-cream hover:text-gold-brushed transition-colors"
            >
              Services
              <ChevronDown className={cn('w-5 h-5 transition-transform', mobileExpanded === 'services' && 'rotate-180')} />
            </button>
            {mobileExpanded === 'services' && (
              <div className="py-2 pl-4 space-y-0">
                {SERVICE_CLUSTERS.map(cluster => (
                  <div key={cluster.key} className="mb-3">
                    {cluster.services.map(s => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-[15px] font-sans text-cream/80 hover:text-gold-brushed"
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
              className="flex items-center justify-between py-4 border-b border-gold-brushed/10 text-[18px] font-serif font-medium text-cream hover:text-gold-brushed transition-colors"
            >
              Destinations
              <ChevronDown className={cn('w-5 h-5 transition-transform', mobileExpanded === 'destinations' && 'rotate-180')} />
            </button>
            {mobileExpanded === 'destinations' && (
              <div className="py-2 pl-4">
                {DESTINATION_LINKS.map(d => (
                  <Link
                    key={d.href}
                    href={d.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-[15px] font-sans text-cream/80 hover:text-gold-brushed"
                  >
                    {d.label}
                  </Link>
                ))}
              </div>
            )}

            {TOP_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 border-b border-gold-brushed/10 text-[18px] font-serif font-medium text-cream hover:text-gold-brushed transition-colors block"
              >
                {link.label}
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
        </div>
      )}
    </header>
  )
}
