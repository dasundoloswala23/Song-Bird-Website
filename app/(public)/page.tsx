import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { pageOpenGraph, faqSchema } from '@/lib/structuredData'
import { BRAND_KEYWORDS, PRIMARY_KEYWORDS, LOCAL_KEYWORDS } from '@/lib/seoKeywords'
import { getPublishedServices, getWhyChooseUs, getSiteStats, getProcessSection, getTestimonials, getHeroSettings, getGlobalReach, getDestinations, getAccreditations, getInsights, getServicesIntro, getFaqPage } from '@/lib/firestorePublic'
import { JsonLd } from '@/components/JsonLd'
import { FaqAccordion } from '@/components/FaqAccordion'
import { DEFAULT_FAQ_PAGE } from '@/lib/faqContent'
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
  const [services, whyChooseUs, stats, processSection, testimonials, heroSettings, globalReach, destinations, accreditations, insights, servicesIntro, faqDoc] = await Promise.all([
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
    getFaqPage(),
  ])

  // Homepage FAQ preview — first question of each category (up to 6) for a
  // concise "Common questions" block. Emits FAQPage JSON-LD for AI Overviews.
  const homeFaqs = ((faqDoc ?? DEFAULT_FAQ_PAGE).groups ?? [])
    .map(g => g.items?.[0])
    .filter((f): f is NonNullable<typeof f> => !!f?.question && !!f?.answer)
    .slice(0, 6)

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

      {/* Common questions — AEO answer block */}
      {homeFaqs.length > 0 && (
        <section className="bg-cream py-16 md:py-20">
          <JsonLd data={faqSchema(homeFaqs)} />
          <div className="mx-auto px-6 md:px-12 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="font-serif font-normal text-[34px] md:text-[44px] leading-tight text-ink">
                Frequently Asked Questions
              </h2>
              <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
            </div>
            <FaqAccordion items={homeFaqs} />
            <div className="mt-10 text-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-[13px] font-sans font-semibold uppercase tracking-[0.08em] text-teal hover:text-emerald transition-colors"
              >
                View all FAQs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  )
}
