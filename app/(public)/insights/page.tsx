import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { EyebrowTag } from '@/components/EyebrowTag'
import { FinalCTA } from '@/components/FinalCTA'
import { getInsights } from '@/lib/firestorePublic'
import type { InsightItem } from '@/types/firestore'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Immigration updates, advisory guidance and market insights from the Songbird Consultancy team.',
}

const CATEGORY_COLORS: Record<string, string> = {
  'Visa Update': 'bg-teal/10 text-teal',
  'Advisory':   'bg-gold-brushed/15 text-gold-brushed',
  'Market':     'bg-emerald/10 text-emerald',
}

function hrefFor(item: InsightItem): string {
  return item.slug ? `/insights/${item.slug}` : item.href || '/insights'
}

function CategoryDate({ item }: { item: InsightItem }) {
  return (
    <div className="flex items-center justify-between mb-3">
      {item.category && (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-[0.1em] ${CATEGORY_COLORS[item.category] ?? 'bg-cloud text-slate'}`}>
          {item.category}
        </span>
      )}
      {item.date && (
        <div className="flex items-center gap-1.5 text-[11px] font-sans font-semibold uppercase tracking-[0.1em] text-slate/60">
          <CalendarDays className="w-3 h-3 text-gold-brushed" />
          {item.date}
        </div>
      )}
    </div>
  )
}

export default async function InsightsPage() {
  const content = await getInsights()
  const articles = content?.items ?? []
  const topVideoUrl = content?.topVideoUrl
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <>
      <section className="pt-[160px] pb-20 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-4xl text-center">
          <EyebrowTag light>From Our Desk</EyebrowTag>
          <h1 className="font-serif font-medium text-[42px] md:text-[56px] leading-tight text-white mb-4">
            Insights
          </h1>
          <div className="mx-auto w-16 h-px bg-gold-brushed mb-5" />
          <p className="text-[16px] font-sans text-cream/65 max-w-2xl mx-auto leading-relaxed">
            Immigration updates, advisory guidance and market analysis from our team.
          </p>
        </div>
      </section>

      {topVideoUrl && (
        <section className="bg-navy-deep pb-12">
          <div className="mx-auto px-6 md:px-12 max-w-5xl">
            <div className="rounded-2xl overflow-hidden border border-gold-brushed/15 bg-black aspect-video">
              <video src={topVideoUrl} controls playsInline className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-7xl">
          {articles.length > 0 ? (
            <>
              {/* Featured */}
              <Link
                href={hrefFor(featured)}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl border border-cloud bg-white overflow-hidden hover:shadow-[0_20px_48px_rgba(4,38,28,.12)] transition-all duration-300 mb-12"
              >
                <div className="aspect-[16/10] lg:aspect-auto lg:min-h-[320px] bg-navy-card/10 overflow-hidden">
                  {featured.image && (
                    <span aria-hidden="true" className="block w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${featured.image})` }} />
                  )}
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <CategoryDate item={featured} />
                  <h2 className="font-serif font-medium text-[28px] md:text-[36px] text-ink leading-tight mb-4">
                    {featured.title}
                  </h2>
                  <p className="text-[15px] font-sans text-slate leading-relaxed mb-6 line-clamp-4">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[12px] font-sans font-semibold uppercase tracking-[0.1em] text-teal group-hover:gap-2 group-hover:text-emerald transition-all">
                    Read more <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>

              {/* Rest grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {rest.map(item => (
                    <Link
                      key={item.slug || item.title}
                      href={hrefFor(item)}
                      className="group flex flex-col rounded-2xl border border-cloud bg-white overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(4,38,28,.12)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                    >
                      <div className="aspect-[16/9] bg-navy-card/10 overflow-hidden">
                        {item.image && (
                          <span aria-hidden="true" className="block w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${item.image})` }} />
                        )}
                      </div>
                      <div className="flex flex-col flex-1 p-6">
                        <CategoryDate item={item} />
                        <h3 className="font-serif font-medium text-[18px] text-ink leading-snug mb-3 flex-1">
                          {item.title}
                        </h3>
                        <p className="text-[13px] font-sans text-slate leading-relaxed mb-5 line-clamp-3">
                          {item.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[12px] font-sans font-semibold uppercase tracking-[0.1em] text-teal group-hover:gap-2 group-hover:text-emerald transition-all">
                          Read more <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center rounded-2xl border border-dashed border-hairline bg-white py-20 px-6">
              <p className="text-[15px] font-sans text-slate">New insights are on the way. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
