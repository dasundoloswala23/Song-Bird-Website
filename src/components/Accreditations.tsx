'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { EyebrowTag } from './EyebrowTag'
import type { AccreditationsDoc } from '@/types/firestore'

const DEFAULT: AccreditationsDoc = {
  title: 'Accreditations & Licenses',
  subline: 'Recognised and regulated by leading professional bodies.',
  items: [
    { name: 'MARN',  logo: '' },
    { name: 'ICCRC', logo: '' },
    { name: 'BASL',  logo: '' },
    { name: 'IBA',   logo: '' },
  ],
}

export function Accreditations({ fallback }: { fallback?: AccreditationsDoc | null }) {
  const [content, setContent] = useState<AccreditationsDoc>(fallback ?? DEFAULT)

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getAccreditations }) =>
      getAccreditations().then(d => { if (d) setContent(d) })
    )
  }, [])

  const items = content.items?.length ? content.items : DEFAULT.items

  return (
    <section className="py-20 bg-surface-muted border-y border-hairline" aria-labelledby="accreditations-heading">
      <div className="mx-auto px-6 md:px-12 max-w-5xl text-center">
        <EyebrowTag>Trust & Compliance</EyebrowTag>
        <h2 id="accreditations-heading" className="font-serif font-semibold text-[30px] md:text-[40px] leading-tight text-ink mb-3">
          {content.title}
        </h2>
        <p className="text-[15px] font-sans text-slate max-w-xl mx-auto mb-12">{content.subline}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-center h-28 rounded-xl bg-white border border-hairline">
              {item.logo ? (
                <Image src={item.logo} alt={item.name} width={120} height={60} className="object-contain max-h-16 w-auto" unoptimized />
              ) : (
                <span className="font-serif font-semibold text-[22px] text-slate/70">{item.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
