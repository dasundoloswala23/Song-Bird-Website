import type { Metadata } from 'next'
import Link from 'next/link'
import { HelpCircle } from 'lucide-react'
import { getFaqPage } from '@/lib/firestorePublic'
import { FaqPageClient } from '@/components/FaqPageClient'
import { DEFAULT_FAQ_PAGE } from '@/lib/faqContent'
import { FinalCTA } from '@/components/FinalCTA'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, faqSchema, pageOpenGraph } from '@/lib/structuredData'

export const dynamic = 'force-static'

const TITLE = 'Immigration & Visa FAQ — Songbird Immigration Consultants'
const DESCRIPTION =
  'Answers to the most common questions about the UAE Golden Visa, residency, eligibility, costs, timelines, and immigration to Canada, Australia, the UK, Europe, and the USA.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/faq/' },
  openGraph: pageOpenGraph({ title: TITLE, description: DESCRIPTION, path: '/faq/' }),
}

export default async function FaqPage() {
  // Build-time fetch (falls back to the drafted default when Firestore is empty/offline).
  const doc = (await getFaqPage()) ?? DEFAULT_FAQ_PAGE
  const allFaqs = (doc.groups ?? []).flatMap(g => g.items ?? [])

  return (
    <>
      {allFaqs.length > 0 && <JsonLd data={faqSchema(allFaqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq/' },
        ])}
      />

      {/* Hero */}
      <section className="relative pt-[160px] pb-16 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy to-navy pointer-events-none" />
        <div className="relative z-10 mx-auto px-6 md:px-12 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-brushed">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h1 className="font-serif font-normal text-[44px] md:text-[60px] leading-tight text-white mb-4">
            Your Immigration Questions, Answered
          </h1>
          <p className="text-[17px] font-sans text-cream/80 leading-relaxed max-w-2xl mx-auto">
            {DESCRIPTION}
          </p>
        </div>
      </section>

      {/* FAQ content */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto px-6 md:px-12 max-w-3xl">
          <FaqPageClient fallback={doc} />

          <div className="mt-16 pt-10 border-t border-gold-brushed/15 text-center">
            <p className="text-[16px] font-sans text-slate mb-6">
              Still have a question? Our advisors are happy to help.
            </p>
            <Link
              href="/book-a-consultation"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(31,169,104,.4)]"
              style={{ background: 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)' }}
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
