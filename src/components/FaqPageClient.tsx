'use client'

import { useEffect, useState } from 'react'
import { FaqAccordion } from '@/components/FaqAccordion'
import { DEFAULT_FAQ_PAGE } from '@/lib/faqContent'
import type { FaqPageDoc } from '@/types/firestore'

interface Props {
  fallback?: FaqPageDoc | null
}

export function FaqPageClient({ fallback }: Props) {
  const [content, setContent] = useState<FaqPageDoc>(fallback ?? DEFAULT_FAQ_PAGE)

  // Client-hydration: re-fetch fresh content on mount (matches ServicesIntro).
  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getFaqPage }) =>
      getFaqPage().then(d => { if (d?.groups?.length) setContent(d) }),
    )
  }, [])

  const groups = content.groups?.filter(g => g.items?.length) ?? []
  if (!groups.length) return null

  return (
    <div className="space-y-14">
      {groups.map((group, gi) => (
        <div key={gi}>
          <h2 className="font-serif font-normal text-[26px] md:text-[30px] text-ink mb-6">
            {group.category}
          </h2>
          <FaqAccordion items={group.items} />
        </div>
      ))}
    </div>
  )
}
