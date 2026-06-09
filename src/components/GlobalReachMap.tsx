'use client'

import React, { useEffect, useState, useRef } from 'react'
import type { GlobalReachDoc, GlobalReachPin } from '@/types/firestore'

// Default pins if no CMS data — regions Songbird serves (shown as chips below the map)
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

        {/* World map */}
        <div
          className="relative mx-auto rounded-2xl overflow-hidden border border-gold-brushed/10 bg-[#0A2A20]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <img
            src="/images/world-map.png"
            alt="Map highlighting the regions Songbird Consultancy serves"
            className="block w-full h-auto select-none"
          />
          {/* Bottom fade for seamless blend into the section */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy-deep/70 to-transparent pointer-events-none" />
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
