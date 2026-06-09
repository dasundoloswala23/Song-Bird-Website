import { getPublishedServices, getWhyChooseUs, getSiteStats, getProcessSection, getTestimonials, getHeroSettings, getGlobalReach, getDestinations, getWelcome, getAccreditations } from '@/lib/firestorePublic'
import { Hero } from '@/components/Hero'
import { UaeLicensedBadge } from '@/components/UaeLicensedBadge'
import { BookFreeConsultation } from '@/components/BookFreeConsultation'
import { StatsBandClient } from '@/components/StatsBandClient'
import { WelcomeSection } from '@/components/WelcomeSection'
import { GlobalReachMap } from '@/components/GlobalReachMap'
import { Pillars } from '@/components/Pillars'
import { ServicesBandClient } from '@/components/ServicesBandClient'
import { QuickSupport } from '@/components/QuickSupport'
import { SongbirdDifferenceClient } from '@/components/SongbirdDifferenceClient'
import { PowerBand } from '@/components/PowerBand'
import { Accreditations } from '@/components/Accreditations'
import { ProcessSectionClient } from '@/components/ProcessSectionClient'
import { CombinedCTA } from '@/components/CombinedCTA'
import { DestinationsPreview } from '@/components/DestinationsPreview'
import { GoogleReviews } from '@/components/GoogleReviews'
import { TestimonialsClient } from '@/components/TestimonialsClient'
import { Insights } from '@/components/Insights'
import { FinalCTA } from '@/components/FinalCTA'

export const dynamic = 'force-static'

export default async function HomePage() {
  const [services, whyChooseUs, stats, processSection, testimonials, heroSettings, globalReach, destinations, welcome, accreditations] = await Promise.all([
    getPublishedServices(),
    getWhyChooseUs(),
    getSiteStats(),
    getProcessSection(),
    getTestimonials(),
    getHeroSettings(),
    getGlobalReach(),
    getDestinations(),
    getWelcome(),
    getAccreditations(),
  ])

  return (
    <>
      <Hero heroSettings={heroSettings} />
      <UaeLicensedBadge />
      <BookFreeConsultation />
      <StatsBandClient fallback={stats} />
      <WelcomeSection fallback={welcome} />
      <GlobalReachMap fallback={globalReach} />
      <Pillars />
      <ServicesBandClient fallback={services} />
      <QuickSupport />
      <SongbirdDifferenceClient fallback={whyChooseUs} />
      <PowerBand />
      <Accreditations fallback={accreditations} />
      <ProcessSectionClient fallback={processSection} />
      <CombinedCTA />
      <DestinationsPreview fallback={destinations} />
      <GoogleReviews />
      <TestimonialsClient fallback={testimonials} />
      <Insights />
      <FinalCTA />
    </>
  )
}
