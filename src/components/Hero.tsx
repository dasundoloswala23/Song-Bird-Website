'use client'

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useConsultationModal } from '@/context/ConsultationModalContext'
import { DESTINATIONS } from '@/lib/constants'
import Link from 'next/link'

const TRUST_POINTS = [
  'UAE Licensed',
  'Regulated Counsel',
  '98% Visa Success',
  'Confidential Process',
]

// First 3 slides use real photos; last 3 fall back to gradients
const SLIDE_IMAGES: (string | null)[] = [
  '/images/city1.png',
  '/images/city2.png',
  '/images/immigration.png',
  null,
  null,
  null,
]

const SLIDE_GRADIENTS = [
  'from-[#0B1B38] via-[#142850] to-[#0a1a35]',
  'from-[#0d1e3a] via-[#1a2e4a] to-[#0B1B38]',
  'from-[#0a1c36] via-[#122644] to-[#0B1B38]',
  'from-[#0c1d38] via-[#162c46] to-[#0B1B38]',
  'from-[#0B1B38] via-[#152840] to-[#0a1c35]',
  'from-[#0d1e3a] via-[#182e48] to-[#0B1B38]',
]

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selected, setSelected] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const interval = setInterval(() => emblaApi.scrollNext(), 5000)
    return () => {
      clearInterval(interval)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const { open: openConsultation } = useConsultationModal()

  return (
    <section className="relative min-h-screen overflow-hidden" aria-label="Hero">
      {/* Carousel */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {DESTINATIONS.map((dest, i) => (
            <div key={dest.label} className={`relative min-w-full h-full bg-gradient-to-br ${SLIDE_GRADIENTS[i]}`}>
              {SLIDE_IMAGES[i] && (
                <Image
                  src={SLIDE_IMAGES[i]!}
                  alt={dest.keyword}
                  fill
                  className="object-cover opacity-40"
                  priority={i === 0}
                  sizes="100vw"
                />
              )}
              {/* Decorative overlay pattern */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #C6A35A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Dark gradient for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-navy to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center">
        <div className="mx-auto px-6 md:px-12 w-full max-w-7xl pt-32 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-brushed/40 bg-gold-brushed/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-brushed animate-pulse" />
              <span className="text-[12px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-brushed">
                UAE-Licensed · Immigration &amp; Global Mobility
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <h1 className="font-serif font-semibold text-[48px] md:text-[62px] lg:text-[76px] leading-[1.08] text-white mb-2">
              Your gateway to life in the Emirates,
            </h1>
            <h1 className="font-serif font-semibold text-[48px] md:text-[62px] lg:text-[76px] leading-[1.08] mb-6"
              style={{ background: 'linear-gradient(95deg, #1A6B7E 0%, #3FB68A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              done right.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            className="max-w-xl text-[17px] font-sans text-cream/75 leading-relaxed mb-10"
          >
            UAE Golden Visas, Global-Talent, work, investor and student permits — plus long-term residency, handled end-to-end by a full-service Dubai advisory firm serving Dubai, Abu Dhabi and Sharjah.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button
              onClick={openConsultation}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-[14px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(26,107,126,.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              style={{ background: 'linear-gradient(95deg, #1A6B7E 0%, #3FB68A 100%)' }}
            >
              Book a Consultation
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-brushed"
              style={{ color: '#C9A961', background: 'transparent' }}
            >
              Free Eligibility Check →
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            {TRUST_POINTS.map(p => (
              <div key={p} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold-brushed shrink-0" />
                <span className="text-[13px] font-sans text-cream/70">{p}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Carousel controls */}
      <div className="absolute bottom-8 right-6 md:right-12 z-10 flex items-center gap-3">
        <div className="flex gap-1.5">
          {DESTINATIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-brushed',
                i === selected ? 'w-6 h-1.5 bg-gold-brushed' : 'w-1.5 h-1.5 bg-cream/30',
              )}
            />
          ))}
        </div>
        <button
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous slide"
          className="w-9 h-9 rounded-full border border-gold-brushed/30 flex items-center justify-center text-cream/60 hover:text-gold-brushed hover:border-gold-brushed/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-brushed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next slide"
          className="w-9 h-9 rounded-full border border-gold-brushed/30 flex items-center justify-center text-cream/60 hover:text-gold-brushed hover:border-gold-brushed/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-brushed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}
