'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useT } from '@/context/LanguageContext'
import type { GlobalReachDoc, GlobalReachPin } from '@/types/firestore'

// Default pins if no CMS data — countries Songbird serves. `chip: true` countries also
// appear as name pills below the map; every pin is drawn as a marker on the map itself.
const DEFAULT_PINS: GlobalReachPin[] = [
  // Curated name pills + markers
  { label: 'EU',          lat: 50.1,  lng: 8.7,    chip: true },
  { label: 'USA',         lat: 38.9,  lng: -77.0,  chip: true },
  { label: 'Canada',      lat: 56.1,  lng: -106.3, chip: true },
  { label: 'UK',          lat: 54.0,  lng: -2.0,   chip: true },
  { label: 'Australia',   lat: -25.3, lng: 133.8,  chip: true },
  { label: 'New Zealand', lat: -41.3, lng: 174.8,  chip: true },
  { label: 'Netherlands', lat: 52.4,  lng: 4.9,    chip: true },
  { label: 'Russia',      lat: 55.8,  lng: 37.6,   chip: true },
  // Extra markers only (broader EU coverage)
  { label: 'Germany',     lat: 51.2,  lng: 10.4  },
  { label: 'France',      lat: 46.6,  lng: 2.2   },
  { label: 'Spain',       lat: 40.4,  lng: -3.7  },
  { label: 'Italy',       lat: 41.9,  lng: 12.5  },
  { label: 'Ireland',     lat: 53.4,  lng: -8.2  },
  { label: 'Portugal',    lat: 39.4,  lng: -8.2  },
  { label: 'Poland',      lat: 52.2,  lng: 19.1  },
  { label: 'Finland',     lat: 61.9,  lng: 25.7  },
  { label: 'Sweden',      lat: 60.1,  lng: 18.6  },
  { label: 'UAE',         lat: 24.0,  lng: 54.0  },
]

// Equirectangular projection of a lat/lng onto world-map.png (percentage offsets).
function project(lat: number, lng: number) {
  return {
    left: `${((lng + 180) / 360) * 100}%`,
    top: `${((90 - lat) / 180) * 100}%`,
  }
}

const DEFAULT_CONTENT: GlobalReachDoc = {
  headline: 'We Serve Clients Across The UAE And Beyond',
  subline: 'From the GCC to Europe, North America and Australia — local expertise with international reach.',
  pins: DEFAULT_PINS,
}

interface Props {
  fallback?: GlobalReachDoc | null
}

export function GlobalReachMap({ fallback }: Props) {
  const { t } = useT()
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
          <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-gold-brushed mb-3">{t('reach.eyebrow')}</p>
          <h2
            id="reach-heading"
            className="font-serif font-normal text-[36px] md:text-[48px] leading-tight text-white mb-4"
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
          {/* Country markers */}
          {pins.map(pin => {
            const pos = project(pin.lat, pin.lng)
            return (
              <span
                key={pin.label}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: pos.left, top: pos.top }}
                aria-hidden="true"
              >
                <span className="absolute inset-0 -m-1 rounded-full bg-gold/40 animate-ping" />
                <span className="relative block w-2 h-2 rounded-full bg-gold ring-2 ring-gold/30" />
              </span>
            )
          })}
          {/* Bottom fade for seamless blend into the section */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy-deep/70 to-transparent pointer-events-none" />
        </div>

        {/* Country chips (curated subset) */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {pins.filter(p => p.chip).map(pin => (
            <span
              key={pin.label}
              className="px-3 py-1 rounded-full text-[11px] font-sans font-medium text-cream/60 border border-gold-brushed/15 bg-white/[0.03]"
            >
              {pin.label}
            </span>
          ))}
        </div>

        {/* Licensed-assurance line */}
        <p className="max-w-2xl mx-auto mt-8 text-center text-[14px] font-sans text-cream/70 leading-relaxed">
          Dubai-Based &amp; Fully-licensed Advisory Firm operating under UAE regulatory frameworks,
          offering you the assurance of professional accountability.
        </p>
      </div>
    </section>
  )
}
