import type { Metadata } from 'next'
import { pageOpenGraph } from '@/lib/structuredData'
import { BRAND_KEYWORDS, PRIMARY_KEYWORDS, LOCAL_KEYWORDS } from '@/lib/seoKeywords'
import { getPublishedServices, getWhyChooseUs, getSiteStats, getProcessSection, getTestimonials, getHeroSettings, getGlobalReach, getDestinations, getAccreditations, getInsights, getServicesIntro } from '@/lib/firestorePublic'
import { Hero } from '@/components/Hero'
import { UaeLicensedBadge } from '@/components/UaeLicensedBadge'
import { StatsBandClient } from '@/components/StatsBandClient'
import { GlobalReachMap } from '@/components/GlobalReachMap'
import { ServicesBandClient } from '@/components/ServicesBandClient'
import { SongbirdDifferenceClient } from '@/components/SongbirdDifferenceClient'
import { PowerBand } from '@/components/PowerBand'
import { Accreditations } from '@/components/Accreditations'
import { ProcessSectionClient } from '@/components/ProcessSectionClient'
import { CombinedCTA } from '@/components/CombinedCTA'
import { DestinationsPreview } from '@/components/DestinationsPreview'
import { TestimonialsClient } from '@/components/TestimonialsClient'
import { Insights } from '@/components/Insights'
import { FinalCTA } from '@/components/FinalCTA'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: { absolute: 'Immigration Consultants in UAE | Visa & Migration Experts | Songbird Immigration Consultants' },
  description:
    'Songbird Immigration Consultants provides trusted immigration, student visa, visit visa, business migration, and global mobility services across the UAE. Expert guidance for Canada, Australia, New Zealand, the UK, the USA, and Europe.',
  keywords: [...BRAND_KEYWORDS, ...PRIMARY_KEYWORDS, ...LOCAL_KEYWORDS],
  alternates: { canonical: '/' },
  openGraph: pageOpenGraph({
    title: 'Immigration Consultants in UAE | Visa & Migration Experts | Songbird Immigration Consultants',
    description:
      'Trusted immigration, student visa, visit visa, business migration, and global mobility services across the UAE. Expert guidance for Canada, Australia, New Zealand, the UK, the USA, and Europe.',
    path: '/',
  }),
}

export default async function HomePage() {
  const [services, whyChooseUs, stats, processSection, testimonials, heroSettings, globalReach, destinations, accreditations, insights, servicesIntro] = await Promise.all([
    getPublishedServices(),
    getWhyChooseUs(),
    getSiteStats(),
    getProcessSection(),
    getTestimonials(),
    getHeroSettings(),
    getGlobalReach(),
    getDestinations(),
    getAccreditations(),
    getInsights(),
    getServicesIntro(),
  ])

  return (
    <>
      <Hero heroSettings={heroSettings} />
      <UaeLicensedBadge />
      <StatsBandClient fallback={stats} />
      <SongbirdDifferenceClient fallback={whyChooseUs} />
      <GlobalReachMap fallback={globalReach} />
      <ServicesBandClient fallback={services} intro={servicesIntro} />
      <PowerBand />
      <Accreditations fallback={accreditations} />
      <ProcessSectionClient fallback={processSection} />
      <CombinedCTA />
      <DestinationsPreview fallback={destinations} />
      <Insights fallback={insights} />
      <TestimonialsClient fallback={testimonials} />
      <FinalCTA />
    </>
  )
}
