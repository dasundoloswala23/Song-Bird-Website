'use client'

import React, { useEffect, useState } from 'react'
import { EyebrowTag } from './EyebrowTag'
import type { WelcomeDoc } from '@/types/firestore'

const DEFAULT: WelcomeDoc = {
  eyebrow: 'Welcome to Songbird Consultancy',
  title: 'Who We Are',
  slogan: 'Uplift Your Status',
  body:
    'Since 2015, we have supported clients across different regions with expert legal leadership. ' +
    'With proven experience in different jurisdictions, we are responsible for your outcome in any arena.\n\n' +
    'From residency and immigration to foreign investment, corporate structuring and beyond, our multilingual ' +
    'team delivers tailored consultations grounded in a deep understanding of UAE and international laws.',
}

export function WelcomeSection({ fallback }: { fallback?: WelcomeDoc | null }) {
  const [content, setContent] = useState<WelcomeDoc>(fallback ?? DEFAULT)

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getWelcome }) =>
      getWelcome().then(d => { if (d) setContent(d) })
    )
  }, [])

  const paragraphs = (content.body || '').split(/\n\s*\n/).filter(Boolean)

  return (
    <section className="py-24 bg-cream" aria-labelledby="welcome-heading">
      <div className="mx-auto px-6 md:px-12 max-w-3xl text-center">
        <EyebrowTag>{content.eyebrow}</EyebrowTag>
        <h2 id="welcome-heading" className="font-serif font-normal text-[36px] md:text-[48px] leading-tight text-ink mb-2">
          {content.title}
        </h2>
        {content.slogan && (
          <p className="font-sans text-[13px] uppercase tracking-[0.24em] text-gold-deep mb-8">{content.slogan}</p>
        )}
        <div className="space-y-5">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[16px] font-sans text-slate leading-relaxed">{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
