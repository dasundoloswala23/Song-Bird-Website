import { getPublishedServices, getWhyChooseUs, getSiteStats, getProcessSection, getTestimonials, getHeroSettings, getGlobalReach, getDestinations } from '@/lib/firestorePublic'
import { Hero } from '@/components/Hero'
import { StatsBandClient } from '@/components/StatsBandClient'
import { ServicesBandClient } from '@/components/ServicesBandClient'
import { EligibilityQuiz } from '@/components/EligibilityQuiz'
import { GlobalReachMap } from '@/components/GlobalReachMap'
import { SongbirdDifferenceClient } from '@/components/SongbirdDifferenceClient'
import { ProcessSectionClient } from '@/components/ProcessSectionClient'
import { DestinationsPreview } from '@/components/DestinationsPreview'
import { TestimonialsClient } from '@/components/TestimonialsClient'
import { Insights } from '@/components/Insights'
import { SocialConnect } from '@/components/SocialConnect'
import { FinalCTA } from '@/components/FinalCTA'

export const dynamic = 'force-static'

export default async function HomePage() {
  const [services, whyChooseUs, stats, processSection, testimonials, heroSettings, globalReach, destinations] = await Promise.all([
    getPublishedServices(),
    getWhyChooseUs(),
    getSiteStats(),
    getProcessSection(),
    getTestimonials(),
    getHeroSettings(),
    getGlobalReach(),
    getDestinations(),
  ])

  return (
    <>
      <Hero heroSettings={heroSettings} />
      <StatsBandClient fallback={stats} />
      <ServicesBandClient fallback={services} />
      {/* Eligibility Quiz */}
      <section className="py-24 bg-navy-deep">
        <div className="mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-gold-brushed mb-3">Free Assessment</p>
            <h2 className="font-serif font-semibold text-[36px] md:text-[48px] leading-tight text-white mb-4">
              Are you eligible?
            </h2>
            <p className="text-[16px] font-sans text-cream/55 max-w-xl mx-auto">
              Answer four quick questions and receive a personalised pathway recommendation — no obligation.
            </p>
          </div>
          <EligibilityQuiz />
        </div>
      </section>
      <GlobalReachMap fallback={globalReach} />
      <SongbirdDifferenceClient fallback={whyChooseUs} />
      <ProcessSectionClient fallback={processSection} />
      <DestinationsPreview fallback={destinations} />
      <TestimonialsClient fallback={testimonials} />
      <Insights />
      <SocialConnect />
      <FinalCTA />
    </>
  )
}
