import { ConsultationModalProvider } from '@/context/ConsultationModalContext'
import { WhatsAppPickerProvider } from '@/context/WhatsAppPickerContext'
import { SiteDownGuard } from '@/components/SiteDownGuard'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsultationModalProvider>
      <WhatsAppPickerProvider>
        <SiteDownGuard>
          {children}
        </SiteDownGuard>
      </WhatsAppPickerProvider>
    </ConsultationModalProvider>
  )
}
