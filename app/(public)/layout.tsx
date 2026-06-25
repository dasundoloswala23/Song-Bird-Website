import { ConsultationModalProvider } from '@/context/ConsultationModalContext'
import { SiteDownGuard } from '@/components/SiteDownGuard'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsultationModalProvider>
      <SiteDownGuard>
        {children}
      </SiteDownGuard>
    </ConsultationModalProvider>
  )
}
