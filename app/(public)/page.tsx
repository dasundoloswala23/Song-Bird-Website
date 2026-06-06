import { getPublishedServices, getWhyChooseUs, getSiteStats, getProcessSection, getTestimonials } from '@/lib/firestorePublic'
import { Hero } from '@/components/Hero'
import { StatsBandClient } from '@/components/StatsBandClient'
import { ServicesBandClient } from '@/components/ServicesBandClient'
import { SongbirdDifferenceClient } from '@/components/SongbirdDifferenceClient'
import { ProcessSectionClient } from '@/components/ProcessSectionClient'
import { TestimonialsClient } from '@/components/TestimonialsClient'
import { Insights } from '@/components/Insights'
import { SocialConnect } from '@/components/SocialConnect'
import { FinalCTA } from '@/components/FinalCTA'

export const dynamic = 'force-static'

export default async function HomePage() {
  const [services, whyChooseUs, stats, processSection, testimonials] = await Promise.all([
    getPublishedServices(),
    getWhyChooseUs(),
    getSiteStats(),
    getProcessSection(),
    getTestimonials(),
  ])

  return (
    <>
      <Hero />
      <StatsBandClient fallback={stats} />
      <ServicesBandClient fallback={services} />
      <SongbirdDifferenceClient fallback={whyChooseUs} />
      <ProcessSectionClient fallback={processSection} />
      <TestimonialsClient fallback={testimonials} />
      <Insights />
      <SocialConnect />
      <FinalCTA />
    </>
  )
}
