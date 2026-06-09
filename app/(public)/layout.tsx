import { ConsultationModalProvider } from '@/context/ConsultationModalContext'
import { TopUtilityBar } from '@/components/TopUtilityBar'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FloatingActions } from '@/components/FloatingActions'
import { ExitIntentModal } from '@/components/ExitIntentModal'
import { ConsultationModal } from '@/components/ConsultationModal'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsultationModalProvider>
      <TopUtilityBar />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingActions />
      <ExitIntentModal />
      <ConsultationModal />
    </ConsultationModalProvider>
  )
}
