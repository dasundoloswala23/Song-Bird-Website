import { ConsultationModalProvider } from '@/context/ConsultationModalContext'
import { TopUtilityBar } from '@/components/TopUtilityBar'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ConsultationModal } from '@/components/ConsultationModal'

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsultationModalProvider>
      <div className="bg-amber-400 text-amber-900 text-center py-2 text-[11px] font-sans font-bold uppercase tracking-[0.2em]">
        Preview Mode — this content may not be published
      </div>
      <TopUtilityBar />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ConsultationModal />
    </ConsultationModalProvider>
  )
}
