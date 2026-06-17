'use client'

import React, { useEffect, useRef, useState } from 'react'
import { EyebrowTag } from './EyebrowTag'
import { ApplicationCTA } from './ApplicationCTA'
import { useT } from '@/context/LanguageContext'
import type { ProcessSectionDoc } from '@/types/firestore'

const NODE_GRADIENT = 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)'
const LINE_GRADIENT_H = 'linear-gradient(90deg, transparent 2%, rgba(31,169,104,0.3) 10%, rgba(94,234,138,0.3) 90%, transparent 98%)'
const LINE_GRADIENT_V = 'linear-gradient(180deg, rgba(31,169,104,0.3) 0%, rgba(94,234,138,0.3) 100%)'

interface Props {
  content: ProcessSectionDoc | null
}

export function ProcessSection({ content }: Props) {
  const { t } = useT()
  if (!content || !content.steps || content.steps.length === 0) return null

  const steps = content.steps
  const sectionTitle = content.title || 'We Guide You Through 4 Simple Steps'
  const stepNums = steps.map((_, i) => String(i + 1).padStart(2, '0'))

  return (
    <section className="py-24 bg-cream" aria-labelledby="process-heading">
      <div className="mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-16">
          <EyebrowTag>{t('process.eyebrow')}</EyebrowTag>
          <h2 id="process-heading" className="font-serif font-medium text-[38px] md:text-[48px] leading-tight text-ink">
            {sectionTitle}
          </h2>
          <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative mb-14">
          <div
            className="absolute top-7 left-[calc(100%/var(--steps)/2)] right-[calc(100%/var(--steps)/2)] h-px"
            style={
              { background: LINE_GRADIENT_H, '--steps': String(steps.length) } as React.CSSProperties
            }
            aria-hidden="true"
          />

          <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {steps.map((step, idx) => (
              <StepCard key={idx} step={step} num={stepNums[idx]} />
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline — circle column centred on the line */}
        <div className="md:hidden relative mb-14">
          <div
            className="absolute top-3 bottom-3 left-5 w-px -translate-x-1/2"
            style={{ background: LINE_GRADIENT_V }}
            aria-hidden="true"
          />
          <div className="space-y-8">
            {steps.map((step, idx) => (
              <MobileStepCard key={idx} step={step} num={stepNums[idx]} />
            ))}
          </div>
        </div>

        <div className="text-center">
          <ApplicationCTA label="Reserve Your Consultation" />
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, num }: { step: { title: string; description: string }; num: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center px-2 group transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transitionDelay: '100ms' }}
    >
      <div
        className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-5 ring-4 ring-teal/10 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:shadow-[0_8px_24px_rgba(31,169,104,.35)]"
        style={{ background: NODE_GRADIENT }}
      >
        <span className="font-serif font-bold text-[18px] text-white select-none">{num}</span>
      </div>
      <h3 className="font-serif font-medium text-[17px] text-ink mb-2 leading-snug">{step.title}</h3>
      <p className="text-[13px] font-sans text-slate leading-relaxed">{step.description}</p>
    </div>
  )
}

function MobileStepCard({ step, num }: { step: { title: string; description: string }; num: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="relative flex gap-4 items-start transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-12px)', transitionDelay: '100ms' }}
    >
      <div
        className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-teal/10 shrink-0"
        style={{ background: NODE_GRADIENT }}
      >
        <span className="font-serif font-medium text-[14px] text-white select-none">{num}</span>
      </div>
      <div className="pt-1 flex-1 min-w-0">
        <h3 className="font-serif font-medium text-[17px] text-ink mb-1.5 leading-snug">{step.title}</h3>
        <p className="text-[13px] font-sans text-slate leading-relaxed">{step.description}</p>
      </div>
    </div>
  )
}
