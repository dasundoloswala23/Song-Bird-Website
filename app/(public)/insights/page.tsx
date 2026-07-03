import type { Metadata } from 'next'
import { EyebrowTag } from '@/components/EyebrowTag'
import { FinalCTA } from '@/components/FinalCTA'
import { getInsights } from '@/lib/firestorePublic'
import { InsightsList } from '@/components/InsightsList'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Insights — Immigration News & Advisory Guidance',
  description: 'Immigration updates, visa news, advisory guidance and market insights from the Songbird Consultancy team in the UAE.',
  keywords: ['Immigration News UAE', 'Visa updates UAE', 'Canada Express Entry Latest Updates', 'Immigration guides UAE', 'Visa requirements UAE'],
  alternates: { canonical: '/insights/' },
}

export default async function InsightsPage() {
  const content = await getInsights()

  return (
    <>
      <section className="pt-[160px] pb-20 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-4xl text-center">
          <EyebrowTag light>From Our Desk</EyebrowTag>
          <h1 className="font-serif font-normal text-[42px] md:text-[56px] leading-tight text-white mb-4">
            Insights
          </h1>
          <div className="mx-auto w-16 h-px bg-gold-brushed mb-5" />
          <p className="text-[16px] font-sans text-cream/65 max-w-2xl mx-auto leading-relaxed">
            Immigration updates, advisory guidance and market analysis from our team.
          </p>
        </div>
      </section>

      <InsightsList fallback={content} />

      <FinalCTA />
    </>
  )
}
