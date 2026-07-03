import type { Metadata } from 'next'
import { Ubuntu, Jost } from 'next/font/google'
import '../src/styles/index.css'
import { DirectionProvider } from '@/context/DirectionContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { JsonLd } from '@/components/JsonLd'
import { organizationSchema, webSiteSchema } from '@/lib/structuredData'
import { BRAND_KEYWORDS, PRIMARY_KEYWORDS, LOCAL_KEYWORDS, TRAVEL_BUSINESS_KEYWORDS, LONG_TAIL_KEYWORDS } from '@/lib/seoKeywords'

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
    default: 'Immigration Consultants in UAE | Visa & Migration Experts | Songbird Immigration Consultants',
    template: '%s | Songbird Immigration Consultants',
  },
  description:
    'Songbird Immigration Consultants provides trusted immigration, student visa, visit visa, business migration, and global mobility services across the UAE. Expert guidance for Canada, Australia, New Zealand, the UK, the USA, and Europe.',
  metadataBase: new URL('https://songbird.ae'),
  keywords: [
    ...BRAND_KEYWORDS,
    ...PRIMARY_KEYWORDS,
    ...LOCAL_KEYWORDS,
    ...TRAVEL_BUSINESS_KEYWORDS,
    ...LONG_TAIL_KEYWORDS,
    // Residency & citizenship
    'residency by investment',
    'citizenship by investment',
    'second passport',
    'skilled worker visa',
    'family visa UAE',
    // Other service lines
    'business advisory Dubai',
    'patent and IP advisory UAE',
    'maritime advisory Dubai',
    'HR advisory Dubai',
    'commercial brokering UAE',
    'concierge services Dubai',
    'global residency advisory',
  ],
  applicationName: 'Songbird Immigration Consultants',
  authors: [{ name: 'Songbird Immigration Consultants', url: 'https://songbird.ae' }],
  creator: 'Songbird Immigration Consultants',
  publisher: 'Songbird Immigration Consultants',
  category: 'Immigration & Residency Advisory',
  alternates: { canonical: '/' },
  openGraph: {
    siteName: 'Songbird Immigration Consultants',
    title: 'Immigration Consultants in UAE | Visa & Migration Experts | Songbird Immigration Consultants',
    description:
      'Trusted immigration, student visa, visit visa, business migration, and global mobility services across the UAE. Expert guidance for Canada, Australia, New Zealand, the UK, the USA, and Europe.',
    url: '/',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Songbird Immigration Consultants logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Immigration Consultants in UAE | Visa & Migration Experts | Songbird Immigration Consultants',
    description:
      'Trusted immigration, visa, business migration, and global mobility services across the UAE for Canada, Australia, New Zealand, the UK, the USA, and Europe.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${heading.variable} ${sans.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream font-sans antialiased">
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
        <DirectionProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </DirectionProvider>
      </body>
    </html>
  )
}
