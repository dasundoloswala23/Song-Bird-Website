'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { EyebrowTag } from './EyebrowTag'
import { useT } from '@/context/LanguageContext'
import type { AccreditationsDoc } from '@/types/firestore'

export function Accreditations({ fallback }: { fallback?: AccreditationsDoc | null }) {
  const { t } = useT()
  const [content, setContent] = useState<AccreditationsDoc | null>(fallback ?? null)

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getAccreditations }) =>
      getAccreditations().then(d => setContent(d))
    )
  }, [])

  const items = content?.items ?? []

  // Hide the entire section when there are no accreditations to show.
  if (!content || items.length === 0) return null

  return (
    <section className="py-20 bg-surface-muted border-y border-hairline" aria-labelledby="accreditations-heading">
      <div className="mx-auto px-6 md:px-12 max-w-5xl text-center">
        <EyebrowTag>{t('accred.eyebrow')}</EyebrowTag>
        <h2 id="accreditations-heading" className="font-serif font-normal text-[30px] md:text-[40px] leading-tight text-ink mb-3">
          {content.title}
        </h2>
        <p className="text-[15px] font-sans text-slate max-w-xl mx-auto mb-12">{content.subline}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-center h-28 rounded-xl bg-white border border-hairline">
              {item.logo ? (
                <Image src={item.logo} alt={item.name} width={120} height={60} className="object-contain max-h-16 w-auto" unoptimized />
              ) : (
                <span className="font-serif font-normal text-[22px] text-slate/70">{item.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
