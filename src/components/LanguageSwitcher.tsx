'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useT } from '@/context/LanguageContext'
import { LOCALES } from '@/i18n'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useT()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const active = LOCALES.find(l => l.code === locale) ?? LOCALES[0]

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-[12px] font-sans text-cream/80 hover:text-gold-brushed transition-colors uppercase tracking-wider focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-brushed rounded px-1"
      >
        <Globe className="w-3.5 h-3.5" />
        {active.code.toUpperCase()}
        <ChevronDown className={cn('w-3 h-3 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-44 bg-navy-deep border border-gold-brushed/20 rounded-lg shadow-[0_16px_40px_rgba(4,38,28,.6)] py-1 z-50"
        >
          {LOCALES.map(l => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={l.code === locale}
                onClick={() => { setLocale(l.code); setOpen(false) }}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 text-[13px] font-sans hover:bg-white/5 transition-colors',
                  l.code === locale ? 'text-gold-brushed' : 'text-cream/80',
                )}
              >
                <span>{l.label}</span>
                <span className="text-cream/40">{l.native}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
