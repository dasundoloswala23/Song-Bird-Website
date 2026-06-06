import { ConsultationModalProvider } from '@/context/ConsultationModalContext'
import { TopUtilityBar } from '@/components/TopUtilityBar'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
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
      <WhatsAppButton />
      <ExitIntentModal />
      <ConsultationModal />
    </ConsultationModalProvider>
  )
}
