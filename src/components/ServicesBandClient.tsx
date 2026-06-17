'use client'

import { useEffect, useState } from 'react'
import { getPublishedServices } from '@/lib/firestorePublic'
import { ServicesBand } from './ServicesBand'
import type { ServiceDoc, ServicesIntroDoc } from '@/types/firestore'

export function ServicesBandClient({ fallback, intro }: { fallback: ServiceDoc[]; intro?: ServicesIntroDoc | null }) {
  const [services, setServices] = useState<ServiceDoc[]>(fallback)
  const [introContent, setIntroContent] = useState<ServicesIntroDoc | null>(intro ?? null)

  useEffect(() => {
    getPublishedServices().then(setServices).catch(() => {/* keep fallback */})
    import('@/lib/firestorePublic').then(({ getServicesIntro }) =>
      getServicesIntro().then(d => { if (d) setIntroContent(d) }).catch(() => {/* keep fallback */}),
    )
  }, [])

  return <ServicesBand services={services} intro={introContent} />
}
