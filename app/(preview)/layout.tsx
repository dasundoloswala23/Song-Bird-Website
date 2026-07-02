import { ConsultationModalProvider } from '@/context/ConsultationModalContext'
import { WhatsAppPickerProvider } from '@/context/WhatsAppPickerContext'
import { TopUtilityBar } from '@/components/TopUtilityBar'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ConsultationModal } from '@/components/ConsultationModal'
import { WhatsAppPickerModal } from '@/components/WhatsAppPickerModal'

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsultationModalProvider>
      <WhatsAppPickerProvider>
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
        <WhatsAppPickerModal />
      </WhatsAppPickerProvider>
    </ConsultationModalProvider>
  )
}
