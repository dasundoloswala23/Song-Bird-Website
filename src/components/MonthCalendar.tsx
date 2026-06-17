'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BRAND_GRADIENT = 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
export function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}
export function isoDate(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function Grid({
  year, month, selectedDate, onSelect,
}: {
  year: number; month: number; selectedDate: string | null; onSelect: (d: string) => void
}) {
  const days = getDaysInMonth(year, month)
  const first = getFirstDayOfMonth(year, month)
  const today = new Date()
  const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayLabels.map(d => (
          <div key={d} className="text-center text-[10px] font-sans font-semibold uppercase tracking-[0.1em] text-cream/30 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: first }).map((_, i) => <div key={`blank-${i}`} />)}
        {Array.from({ length: days }).map((_, i) => {
          const day = i + 1
          const date = isoDate(year, month, day)
          const isPast = new Date(date) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
          const sel = date === selectedDate
          return (
            <button
              type="button"
              key={day}
              disabled={isPast}
              onClick={() => onSelect(date)}
              className={`aspect-square rounded-lg text-[13px] font-sans font-medium transition-all ${
                sel ? 'text-white scale-105' : isPast ? 'text-cream/20 cursor-not-allowed' : 'text-cream/70 hover:bg-white/10 hover:text-white'
              }`}
              style={sel ? { background: BRAND_GRADIENT } : {}}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Self-contained month calendar with prev/next navigation. DB-free — emits the
 * selected ISO date (YYYY-MM-DD) via `onSelect`.
 */
export function MonthCalendar({
  selectedDate, onSelect,
}: {
  selectedDate: string | null; onSelect: (d: string) => void
}) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  const prevMonth = () => { if (month === 0) { setYear(y => y - 1); setMonth(11) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setYear(y => y + 1); setMonth(0) } else setMonth(m => m + 1) }

  return (
    <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="p-1.5 rounded hover:bg-white/5 text-cream/60 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <p className="text-[14px] font-sans font-semibold text-white">{MONTHS[month]} {year}</p>
        <button type="button" onClick={nextMonth} className="p-1.5 rounded hover:bg-white/5 text-cream/60 hover:text-white transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <Grid year={year} month={month} selectedDate={selectedDate} onSelect={onSelect} />
    </div>
  )
}
