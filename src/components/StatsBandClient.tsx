'use client'

import { useEffect, useState } from 'react'
import { getSiteStats } from '@/lib/firestorePublic'
import { StatsBand } from './StatsBand'
import type { StatsDoc } from '@/types/firestore'

export function StatsBandClient({ fallback }: { fallback: StatsDoc | null }) {
  const [stats, setStats] = useState<StatsDoc | null>(fallback)

  useEffect(() => {
    getSiteStats().then(data => { if (data) setStats(data) }).catch(() => {})
  }, [])

  return <StatsBand stats={stats} />
}
