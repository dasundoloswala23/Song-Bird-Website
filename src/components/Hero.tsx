'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { CheckCircle, Play, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useConsultationModal } from '@/context/ConsultationModalContext'
import Link from 'next/link'
import type { HeroSettingsDoc } from '@/types/firestore'

const BRAND_GRADIENT = 'linear-gradient(135deg, #1FA968 0%, #0E5C54 50%, #0A3A52 100%)'

const TRUST_POINTS = [
  'UAE Licensed',
  'Regulated Counsel',
  '98% Visa Success',
  'Confidential Process',
]

// Fallback Ken-Burns slide images (when no video configured)
const FALLBACK_IMAGES = [
  '/images/city1.png',
  '/images/city2.png',
  '/images/immigration.png',
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
        <video
          src={src}
          controls
          autoPlay
          className="w-full h-full rounded-xl object-contain bg-black"
        />
      </div>
    </div>
  )
}

function KenBurnsCarousel() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % FALLBACK_IMAGES.length), 8000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {FALLBACK_IMAGES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover opacity-40 animate-ken-burns"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}
      {/* Dot grid decorative overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #E6D9A8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  )
}

export function Hero({ heroSettings }: { heroSettings?: HeroSettingsDoc | null }) {
  const { open: openConsultation } = useConsultationModal()
  const [videoModal, setVideoModal] = useState(false)
  const [liveSettings, setLiveSettings] = useState<HeroSettingsDoc | null | undefined>(heroSettings)

  // Client-side re-fetch for freshness
  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getHeroSettings }) =>
      getHeroSettings().then(s => { if (s) setLiveSettings(s) })
    )
  }, [])

  const videoUrl     = liveSettings?.heroVideoUrl?.trim()     ?? ''
  const fullVideoUrl = liveSettings?.heroVideoFullUrl?.trim() ?? ''
  const fallbackImg  = liveSettings?.heroImage?.trim()        ?? ''

  return (
    <section className="relative min-h-screen overflow-hidden" aria-label="Hero">
      {/* Background — video or Ken-Burns fallback */}
      {videoUrl ? (
        <video
          key={videoUrl}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          aria-hidden="true"
        />
      ) : fallbackImg ? (
        <div className="absolute inset-0 overflow-hidden">
          <Image src={fallbackImg} alt="" fill className="object-cover opacity-40 animate-ken-burns" priority sizes="100vw" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #E6D9A8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
      ) : (
        <KenBurnsCarousel />
      )}

      {/* Dark emerald gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-navy to-transparent pointer-events-none" />

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

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <h1 className="font-serif font-semibold text-[48px] md:text-[62px] lg:text-[76px] leading-[1.08] text-white mb-2">
              Your gateway to life in the Emirates,
            </h1>
            <h1
              className="font-serif font-semibold text-[48px] md:text-[62px] lg:text-[76px] leading-[1.08] mb-6"
              style={{ background: BRAND_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              done right.
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            className="max-w-xl text-[17px] font-sans text-cream/75 leading-relaxed mb-10"
          >
            UAE Golden Visas, Global-Talent, work, investor and student permits — plus long-term residency, handled end-to-end by a full-service Dubai advisory firm serving Dubai, Abu Dhabi and Sharjah.
          </motion.p>

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
              Book a Consultation
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
