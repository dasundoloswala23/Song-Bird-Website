'use client'

import { useEffect, useState } from 'react'
import { TopUtilityBar } from './TopUtilityBar'
import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingActions } from './FloatingActions'
import { ExitIntentModal } from './ExitIntentModal'
import { ConsultationModal } from './ConsultationModal'
import { WhatsAppPickerModal } from './WhatsAppPickerModal'
import { ComingSoon } from './ComingSoon'

type Status = 'live' | 'down'

export function SiteDownGuard({ children }: { children: React.ReactNode }) {
  // Default to 'live' so the full page is server-rendered into the static HTML
  // (crawlers must see real content — a loading shell here breaks SEO entirely).
  const [status, setStatus] = useState<Status>('live')

  useEffect(() => {
    async function check() {
      try {
        const { getSiteDown } = await import('@/lib/firestorePublic')
        const isDown = await getSiteDown()
        if (isDown) setStatus('down')
      } catch {
        // Firestore unreachable — keep serving the site.
      }
    }
    check()
  }, [])

  if (status === 'down') {
    return <ComingSoon />
  }

  return (
    <>
      <TopUtilityBar />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingActions />
      <ExitIntentModal />
      <ConsultationModal />
      <WhatsAppPickerModal />
    </>
  )
}
