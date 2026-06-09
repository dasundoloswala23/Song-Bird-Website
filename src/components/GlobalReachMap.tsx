'use client'

import React, { useEffect, useState, useRef } from 'react'
import type { GlobalReachDoc, GlobalReachPin } from '@/types/firestore'

const BRAND_GRADIENT = 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)'

// Default pins if no CMS data — regions Songbird serves
const DEFAULT_PINS: GlobalReachPin[] = [
  { label: 'Dubai',       lat: 25.2,  lng: 55.3  },
  { label: 'Abu Dhabi',   lat: 24.5,  lng: 54.4  },
  { label: 'Sharjah',     lat: 25.35, lng: 55.4  },
  { label: 'Riyadh',      lat: 24.7,  lng: 46.7  },
  { label: 'Colombo',     lat: 6.93,  lng: 79.85 },
  { label: 'New Delhi',   lat: 28.6,  lng: 77.2  },
  { label: 'Manila',      lat: 14.6,  lng: 121.0 },
  { label: 'Singapore',   lat: 1.35,  lng: 103.8 },
]

const DEFAULT_CONTENT: GlobalReachDoc = {
  headline: 'We serve clients across the UAE, South Asia and beyond',
  subline: 'From the GCC to Sri Lanka, India and the wider Asian region — local expertise with international reach.',
  pins: DEFAULT_PINS,
}

// Equirectangular projection: map lat/lng → SVG x/y (viewBox 0 0 1000 500)
function project(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 1000
  const y = ((90 - lat) / 180) * 500
  return { x, y }
}

function PulsingPin({ pin, delay }: { pin: GlobalReachPin; delay: number }) {
  const { x, y } = project(pin.lat, pin.lng)
  return (
    <g style={{ animationDelay: `${delay}ms` }}>
      {/* Pulse ring */}
      <circle cx={x} cy={y} r="8" fill="none" stroke="#5EEA8A" strokeWidth="1.5" opacity="0.4">
        <animate attributeName="r" values="4;14;4" dur="2.4s" begin={`${delay * 0.001}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" begin={`${delay * 0.001}s`} repeatCount="indefinite" />
      </circle>
      {/* Core dot */}
      <circle cx={x} cy={y} r="4" fill="#1FA968" stroke="#5EEA8A" strokeWidth="1" />
      {/* Label */}
      <text
        x={x}
        y={y - 9}
        textAnchor="middle"
        fontSize="11"
        fill="rgba(243,250,244,0.7)"
        fontFamily="sans-serif"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {pin.label}
      </text>
    </g>
  )
}

interface Props {
  fallback?: GlobalReachDoc | null
}

export function GlobalReachMap({ fallback }: Props) {
  const [content, setContent] = useState<GlobalReachDoc>(fallback ?? DEFAULT_CONTENT)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Client-side re-fetch
  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getGlobalReach }) =>
      getGlobalReach().then(data => { if (data) setContent(data) })
    )
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const pins = content.pins?.length ? content.pins : DEFAULT_PINS

  return (
    <section className="py-24 bg-navy-deep overflow-hidden" aria-labelledby="reach-heading" ref={ref}>
      <div className="mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-gold-brushed mb-3">Global Reach</p>
          <h2
            id="reach-heading"
            className="font-serif font-semibold text-[36px] md:text-[48px] leading-tight text-white mb-4"
          >
            {content.headline}
          </h2>
          <p className="max-w-xl mx-auto text-[15px] font-sans text-cream/60 leading-relaxed">{content.subline}</p>
        </div>

        {/* SVG world map */}
        <div
          className="relative mx-auto rounded-2xl overflow-hidden border border-gold-brushed/10"
          style={{
            background: 'radial-gradient(ellipse at 50% 80%, rgba(31,169,104,0.06) 0%, transparent 70%), #0F3225',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <svg
            viewBox="0 0 1000 500"
            className="w-full"
            aria-hidden="true"
            style={{ display: 'block' }}
          >
            {/* Simplified world landmass silhouette via low-res path — aesthetic backdrop */}
            <rect width="1000" height="500" fill="transparent" />
            {/* Grid lines */}
            {[-60, -30, 0, 30, 60].map(lat => {
              const { y } = project(lat, 0)
              return <line key={lat} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(198,163,90,0.06)" strokeWidth="0.5" />
            })}
            {[-120, -60, 0, 60, 120].map(lng => {
              const { x } = project(0, lng)
              return <line key={lng} x1={x} y1="0" x2={x} y2="500" stroke="rgba(198,163,90,0.06)" strokeWidth="0.5" />
            })}

            {/* Pins */}
            {pins.map((pin, i) => (
              <PulsingPin key={pin.label} pin={pin} delay={i * 200} />
            ))}
          </svg>

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy-deep/80 to-transparent pointer-events-none" />
        </div>

        {/* Country chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {pins.map(pin => (
            <span
              key={pin.label}
              className="px-3 py-1 rounded-full text-[11px] font-sans font-medium text-cream/60 border border-gold-brushed/15 bg-white/[0.03]"
            >
              {pin.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
