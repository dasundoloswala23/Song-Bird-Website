'use client'

import { useEffect, useState } from 'react'
import type { ServicesIntroDoc } from '@/types/firestore'

export const DEFAULT_SERVICES_INTRO: ServicesIntroDoc = {
  title: 'One Firm. Every Path.',
  body:
    'Songbird delivers an integrated ecosystem of immigration, legal, financial, and lifestyle advisory services tailored for global executives and high-net-worth individuals. Operating out of hubs like Dubai and Abu Dhabi, Fujairah, Sharjah and Ajman in the UAE, our multidisciplinary team coordinates nine specialized verticals to provide a seamless, 360-degree approach to international mobility, asset and business structuring, and corporate growth.\n\n' +
    'We organize our integrated services into specific foundational pillars to support your international expansion.',
}

export const DEFAULT_SERVICES_PAGE_INTRO: ServicesIntroDoc = {
  title: 'Our Firm. One Path',
  body:
    'Songbird provides comprehensive legal and consulting services to help individuals and corporations navigate global relocation, visa procurement, and compliance. By streamlining complex bureaucratic processes, we ensure accurate applications, mitigate rejection risks, and facilitate seamless international mobility for professionals, students, investors, and families.\n\n' +
    'At Songbird, based in the UAE, the firm guides clients worldwide with a full range of immigration and related commercial, legal, financial, and management services to achieve complex global mobility challenges. Their professional duty is to identify every possible opportunity to optimize worldwide entry with maximum success.',
}

interface Props {
  fallback?: ServicesIntroDoc | null
  /** 'light' for dark backgrounds (navy), 'dark' for cream backgrounds. */
  tone?: 'light' | 'dark'
  className?: string
  /** Which Firestore doc drives this block. */
  source?: 'servicesIntro' | 'servicesPageIntro'
}

export function ServicesIntro({ fallback, tone = 'dark', className = '', source = 'servicesIntro' }: Props) {
  const fallbackDefault = source === 'servicesPageIntro' ? DEFAULT_SERVICES_PAGE_INTRO : DEFAULT_SERVICES_INTRO
  const [content, setContent] = useState<ServicesIntroDoc>(fallback ?? fallbackDefault)

  useEffect(() => {
    import('@/lib/firestorePublic').then(api => {
      const get = source === 'servicesPageIntro' ? api.getServicesPageIntro : api.getServicesIntro
      get().then(d => { if (d) setContent(d) })
    })
  }, [source])

  if (!content.title && !content.body) return null

  const titleColor = tone === 'light' ? 'text-white' : 'text-ink'
  const bodyColor = tone === 'light' ? 'text-cream/70' : 'text-slate'

  const paragraphs = content.body.split(/\n{2,}/).filter(Boolean)

  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      {content.title && (
        <h3 className={`font-serif font-medium text-[26px] md:text-[32px] leading-tight ${titleColor}`}>
          {content.title}
        </h3>
      )}
      <div className="mx-auto mt-4 mb-6 w-16 h-px bg-gold-brushed" />
      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className={`text-[15px] font-sans leading-relaxed ${bodyColor}`}>{p}</p>
        ))}
      </div>
    </div>
  )
}
