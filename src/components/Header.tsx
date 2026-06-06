'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useConsultationModal } from '@/context/ConsultationModalContext'

const NAV_LINKS = [
  { label: 'Home',         href: '/' },
  { label: 'Services',     href: '/services' },
  { label: 'Destinations', href: '/#destinations' },
  { label: 'About',        href: '/#about' },
  { label: 'Process',      href: '/#process' },
  { label: 'Insights',     href: '/insights' },
  { label: 'Contact',      href: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
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

  return (
    <header
      className={cn(
        'fixed top-10 inset-x-0 z-40 transition-all duration-300 border-b',
        scrolled
          ? 'bg-navy/95 backdrop-blur-md shadow-[0_4px_32px_rgba(10,23,56,.5)] border-white/10 h-16'
          : 'bg-navy/90 backdrop-blur-sm border-white/5 h-20',
      )}
    >
      <div className="h-full mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-brushed rounded">
          <Image
            src="/logo.png"
            alt="Songbird Consultancy"
            width={56}
            height={56}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map(link =>
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-[13px] font-sans font-medium uppercase tracking-[0.06em] text-cream/80 hover:text-gold-brushed transition-colors rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-brushed"
            >
              {link.label}
            </Link>
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={openConsultation}
            className="px-4 py-2 text-[12px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(26,107,126,.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            style={{ background: 'linear-gradient(95deg, #1A6B7E 0%, #3FB68A 100%)' }}
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

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-navy z-30 flex flex-col pt-28 px-8 pb-8 overflow-y-auto">
          <nav className="flex flex-col gap-2 mb-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 border-b border-gold-brushed/10 text-[18px] font-serif font-medium text-cream hover:text-gold-brushed transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setMobileOpen(false); openConsultation() }}
              className="w-full py-3 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] transition-all hover:shadow-[0_6px_18px_rgba(26,107,126,.4)]"
              style={{ background: 'linear-gradient(95deg, #1A6B7E 0%, #3FB68A 100%)' }}
            >
              Book a Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
