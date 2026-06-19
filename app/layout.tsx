import type { Metadata } from 'next'
import { Ubuntu, Jost } from 'next/font/google'
import '../src/styles/index.css'
import { DirectionProvider } from '@/context/DirectionContext'
import { LanguageProvider } from '@/context/LanguageContext'

const heading = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--heading-font',
  display: 'swap',
})

const sans = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--body-font',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Songbird Consultancy — Global Residency & Advisory Services, Dubai',
    template: '%s | Songbird Consultancy',
  },
  description:
    'Dubai\'s premier multi-service advisory firm. Expert immigration, legal, business, and lifestyle services for individuals and families pursuing global residency.',
  metadataBase: new URL('https://songbird.ae'),
  openGraph: {
    siteName: 'Songbird Consultancy',
    locale: 'en_AE',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${heading.variable} ${sans.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream font-sans antialiased">
        <DirectionProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </DirectionProvider>
      </body>
    </html>
  )
}
