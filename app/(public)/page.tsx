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
