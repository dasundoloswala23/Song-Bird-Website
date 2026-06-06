'use client'

import { useEffect, useState } from 'react'
import { getWhyChooseUs } from '@/lib/firestorePublic'
import { SongbirdDifference } from './SongbirdDifference'
import type { WhyChooseUsDoc } from '@/types/firestore'

export function SongbirdDifferenceClient({ fallback }: { fallback: WhyChooseUsDoc | null }) {
  const [content, setContent] = useState<WhyChooseUsDoc | null>(fallback)

  useEffect(() => {
    getWhyChooseUs().then(data => { if (data) setContent(data) }).catch(() => {})
  }, [])

  return <SongbirdDifference content={content} />
}
