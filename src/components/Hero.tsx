'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { CheckCircle, Play, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useConsultationModal } from '@/context/ConsultationModalContext'
import Link from 'next/link'
import type { HeroSettingsDoc, HeroSlide } from '@/types/firestore'

const BRAND_GRADIENT = 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)'

const TRUST_POINTS = [
  'UAE Licensed',
  'Regulated Counsel',
  '95% Success Ratio',
  'Confidential Process',
]

// Default slides — placeholder Dubai imagery + the 5 brief taglines (rotated).
// The client will supply 4 final images; slides are editable from /admin/hero.
const DEFAULT_SLIDES: HeroSlide[] = [
  { image: '/images/city1.png',      tagline: 'Supporting Your Business Investment & Migration Across the UAE' },
  { image: '/images/city2.png',      tagline: 'Reliable & Professional Legal Advisory Services for You & Your Businesses Abroad' },
  { image: '/images/immigration.png', tagline: 'Your Gateway to Life in the Emirates' },
  { image: '/images/city1.png',      tagline: 'Live Your Story in the UAE' },
  { image: '/images/city2.png',      tagline: 'Power & Inspire Your Next Step Abroad' },
]

function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
      ref={ref}
    >
      <div className="relative w-full max-w-4xl aspect-video" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
          aria-label="Close video"
        >
          <X className="w-7 h-7" />
        </button>
        <video src={src} controls autoPlay className="w-full h-full rounded-xl object-contain bg-black" />
      </div>
    </div>
  )
}

export function Hero({ heroSettings }: { heroSettings?: HeroSettingsDoc | null }) {
  const { open: openConsultation } = useConsultationModal()
  const [videoModal, setVideoModal] = useState(false)
  const [liveSettings, setLiveSettings] = useState<HeroSettingsDoc | null | undefined>(heroSettings)
  const [idx, setIdx] = useState(0)

  // Client-side re-fetch for freshness
  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getHeroSettings }) =>
      getHeroSettings().then(s => { if (s) setLiveSettings(s) })
    )
  }, [])

  const slides = (liveSettings?.slides && liveSettings.slides.length > 0)
    ? liveSettings.slides
    : DEFAULT_SLIDES

  // Rotate slides (image crossfade + tagline) every 6s
  useEffect(() => {
    if (slides.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [slides.length])

  const videoUrl     = liveSettings?.heroVideoUrl?.trim()     ?? ''
  const fullVideoUrl = liveSettings?.heroVideoFullUrl?.trim() ?? ''
  const activeTagline = slides[idx]?.tagline ?? slides[0].tagline

  return (
    <section className="relative min-h-screen overflow-hidden" aria-label="Hero">
      {/* Background — image slider (crossfade) */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={`${s.image}-${i}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={s.image}
              alt=""
              fill
              className="object-cover opacity-45 animate-ken-burns"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #E6D9A8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Lighter emerald/teal screen gradient — brighter than navy, still legible left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(105deg, rgba(14,92,84,0.88) 0%, rgba(15,124,90,0.58) 45%, rgba(31,169,104,0.22) 100%)' }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(11,61,46,0.65), transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center">
        <div className="mx-auto px-6 md:px-12 w-full max-w-7xl pt-32 pb-24">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-brushed/40 bg-gold-brushed/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-brushed animate-pulse" />
              <span className="text-[12px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-brushed">
                UAE-Licensed · Immigration &amp; Global Mobility
              </span>
            </div>
          </motion.div>

          {/* Rotating headline (driven by active slide) */}
          <div className="min-h-[180px] md:min-h-[230px] lg:min-h-[270px] mb-6 flex items-start">
            <AnimatePresence mode="wait">
              <motion.h1
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="font-serif font-semibold text-[40px] md:text-[56px] lg:text-[68px] leading-[1.08] text-white max-w-4xl"
              >
                {activeTagline}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Slide indicators */}
          {slides.length > 1 && (
            <div className="flex gap-2 mb-10" role="tablist" aria-label="Hero slides">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-selected={i === idx}
                  role="tab"
                  className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-8 bg-gold-brushed' : 'w-2 bg-cream/30 hover:bg-cream/50'}`}
                />
              ))}
            </div>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button
              onClick={openConsultation}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-[14px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(31,169,104,.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              style={{ background: BRAND_GRADIENT }}
            >
              Book Your Free Consultation
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-brushed"
              style={{ color: '#E6D9A8', background: 'transparent' }}
            >
              Free Eligibility Check →
            </Link>
            {(videoUrl || fullVideoUrl) && (
              <button
                onClick={() => setVideoModal(true)}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-[13px] font-sans font-medium text-cream/70 hover:text-white border border-white/15 hover:border-white/30 rounded-[6px] transition-all backdrop-blur-sm"
              >
                <Play className="w-4 h-4" />
                Play Brand Video
              </button>
            )}
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

      {/* Video modal */}
      {videoModal && (videoUrl || fullVideoUrl) && (
        <VideoModal src={fullVideoUrl || videoUrl} onClose={() => setVideoModal(false)} />
      )}
    </section>
  )
}
