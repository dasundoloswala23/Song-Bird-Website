'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { StatsDoc, StatEntry } from '@/types/firestore'

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

function StatItem({ value, label, isLast }: { value: string; label: string; isLast: boolean }) {
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
    <div
      ref={ref}
      className={`flex flex-col items-center gap-2 px-2 sm:px-6 ${!isLast ? 'md:border-r md:border-hairline' : ''}`}
    >
      <span className="font-serif font-medium text-[28px] sm:text-[40px] md:text-[46px] leading-none text-gold whitespace-nowrap">
        {active ? display : value}
      </span>
      <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-slate text-center">
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
    <section className="py-8 md:py-10 bg-surface-muted border-y border-hairline" aria-label="Key statistics">
      <div className="mx-auto px-6 md:px-12 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6">
          {entries.map((s, i) => (
            <StatItem key={s.label} value={s.value} label={s.label} isLast={i === entries.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
