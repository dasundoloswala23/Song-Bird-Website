'use client'

import React, { useState, useEffect, useRef } from 'react'
import { CheckCircle, Play, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useConsultationModal } from '@/context/ConsultationModalContext'
import { useT } from '@/context/LanguageContext'
import type { HeroSettingsDoc } from '@/types/firestore'
import type { MessageKey } from '@/i18n'

const BRAND_GRADIENT = 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)'

// Hardcoded looping background video (Dubai skyline). Reliable, no CMS dependency.
const HERO_VIDEO = '/hero-dubai.mp4'
const HERO_POSTER = '/images/city1.png'

const TRUST_KEYS: MessageKey[] = [
  'hero.trust.licensed',
  'hero.trust.counsel',
  'hero.trust.success',
  'hero.trust.confidential',
]

// Built-in rotating taglines (translated via these keys). Used unless the admin has
// set non-empty taglines in /admin/hero.
const DEFAULT_TAGLINE_KEYS: MessageKey[] = [
  'hero.slide1', 'hero.slide2', 'hero.slide3', 'hero.slide4', 'hero.slide5',
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
  const { t } = useT()
  const [videoModal, setVideoModal] = useState(false)
  const [liveSettings, setLiveSettings] = useState<HeroSettingsDoc | null | undefined>(heroSettings)
  const [idx, setIdx] = useState(0)

  // Client-side re-fetch for freshness
  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getHeroSettings }) =>
      getHeroSettings().then(s => { if (s) setLiveSettings(s) })
    )
  }, [])

  // Taglines: admin-set non-empty taglines, else the built-in (translated) defaults.
  const taglines = (() => {
    const fromCms = (liveSettings?.slides ?? []).map(s => s.tagline?.trim()).filter(Boolean) as string[]
    return fromCms.length > 0 ? fromCms : DEFAULT_TAGLINE_KEYS.map(k => t(k))
  })()

  // Rotate the headline every 6s
  useEffect(() => {
    setIdx(0)
    if (taglines.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % taglines.length), 6000)
    return () => clearInterval(t)
  }, [taglines.length])

  const fullVideoUrl = liveSettings?.heroVideoFullUrl?.trim() ?? ''
  const activeTagline = taglines[idx] ?? taglines[0]

  return (
    <section className="relative min-h-screen overflow-hidden" aria-label="Hero">
      {/* Background — hardcoded looping Dubai skyline video */}
      <div className="absolute inset-0 overflow-hidden bg-navy">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
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
                {t('hero.eyebrow')}
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
                className="font-serif font-normal text-[40px] md:text-[56px] lg:text-[68px] leading-[1.08] text-white max-w-4xl"
              >
                {activeTagline}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Slide indicators */}
          {taglines.length > 1 && (
            <div className="flex gap-2 mb-10" role="tablist" aria-label="Hero slides">
              {taglines.map((_, i) => (
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
              {t('cta.bookFreeConsultation')}
            </button>
            {fullVideoUrl && (
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
            {TRUST_KEYS.map(k => (
              <div key={k} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold-brushed shrink-0" />
                <span className="text-[13px] font-sans text-cream/70">{t(k)}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Video modal */}
      {videoModal && fullVideoUrl && (
        <VideoModal src={fullVideoUrl} onClose={() => setVideoModal(false)} />
      )}
    </section>
  )
}
