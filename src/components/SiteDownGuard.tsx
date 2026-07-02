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

type Status = 'loading' | 'live' | 'down'

export function SiteDownGuard({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    async function check() {
      try {
        const { getSiteDown } = await import('@/lib/firestorePublic')
        const isDown = await getSiteDown()
        setStatus(isDown ? 'down' : 'live')
      } catch {
        setStatus('live')
      }
    }
    check()
  }, [])

  if (status === 'loading') {
    return <div className="min-h-screen" style={{ background: '#06241B' }} />
  }

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
