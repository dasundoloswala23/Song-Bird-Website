import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import '../src/styles/index.css'
import { DirectionProvider } from '@/context/DirectionContext'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
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
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream font-sans antialiased">
        <DirectionProvider>
          {children}
        </DirectionProvider>
      </body>
    </html>
  )
}
