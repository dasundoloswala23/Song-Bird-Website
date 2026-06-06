'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { StatsDoc, StatEntry } from '@/types/firestore'

const GRADIENT = 'linear-gradient(95deg, #1A6B7E 0%, #3FB68A 100%)'

function useCountUp(target: string, active: boolean) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!active) return
    const match = target.match(/^(\d+)(.*)$/)
    if (!match) { setDisplay(target); return }

    const end = parseInt(match[1], 10)
    const suffix = match[2]
    const duration = 1800
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = Math.min(now - start, duration)
      const progress = 1 - Math.pow(1 - elapsed / duration, 3)
      const current = Math.round(progress * end)
      setDisplay(`${current}${suffix}`)
      if (elapsed < duration) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, active])

  return display
}

function StatItem({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const display = useCountUp(value, active)

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span
        className="font-serif font-semibold text-[48px] md:text-[58px] leading-none"
        style={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
      >
        {active ? display : value}
      </span>
      <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-cream/50">
        {label}
      </span>
    </div>
  )
}

interface StatsBandProps {
  stats: StatsDoc | null
}

export function StatsBand({ stats }: StatsBandProps) {
  if (!stats) return null

  const entries: StatEntry[] = [
    stats.applications,
    stats.successRate,
    stats.destinations,
    stats.serviceLines,
  ].filter(s => s?.value?.trim())

  if (entries.length === 0) return null

  return (
    <section
      className="py-14 bg-navy border-t border-gold-brushed/25"
      aria-label="Key statistics"
    >
      <div className="mx-auto px-6 md:px-12 max-w-5xl">
        <div
          className="grid gap-10"
          style={{ gridTemplateColumns: `repeat(${Math.min(entries.length, 4)}, 1fr)` }}
        >
          {entries.map(s => (
            <StatItem key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
