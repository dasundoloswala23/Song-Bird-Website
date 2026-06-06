'use client'

import { useEffect, useState } from 'react'
import { getProcessSection } from '@/lib/firestorePublic'
import { ProcessSection } from './ProcessSection'
import type { ProcessSectionDoc } from '@/types/firestore'

export function ProcessSectionClient({ fallback }: { fallback: ProcessSectionDoc | null }) {
  const [content, setContent] = useState<ProcessSectionDoc | null>(fallback)

  useEffect(() => {
    getProcessSection().then(data => { if (data) setContent(data) }).catch(() => {})
  }, [])

  return <ProcessSection content={content} />
}
