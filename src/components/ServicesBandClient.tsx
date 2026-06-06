'use client'

import { useEffect, useState } from 'react'
import { getPublishedServices } from '@/lib/firestorePublic'
import { ServicesBand } from './ServicesBand'
import type { ServiceDoc } from '@/types/firestore'

export function ServicesBandClient({ fallback }: { fallback: ServiceDoc[] }) {
  const [services, setServices] = useState<ServiceDoc[]>(fallback)

  useEffect(() => {
    getPublishedServices().then(setServices).catch(() => {/* keep fallback */})
  }, [])

  return <ServicesBand services={services} />
}
