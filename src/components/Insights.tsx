'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { EyebrowTag } from './EyebrowTag'
import type { InsightsDoc, InsightItem } from '@/types/firestore'

const CATEGORY_COLORS: Record<string, string> = {
  'Visa Update': 'bg-teal/10 text-teal',
  'Advisory':   'bg-gold-brushed/15 text-gold-brushed',
  'Market':     'bg-emerald/10 text-emerald',
}

export function hrefForInsight(item: InsightItem): string {
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

export function Insights({ fallback }: { fallback?: InsightsDoc | null }) {
  const [content, setContent] = useState<InsightsDoc | null>(fallback ?? null)

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getInsights }) =>
      getInsights().then(d => setContent(d))
    )
  }, [])

  const articles = content?.items ?? []
  if (articles.length === 0) return null

  const featured = articles[0]
  const rest = articles.slice(1, 4)
  const showMore = articles.length > 4

  return (
    <section className="py-24 bg-cream" aria-labelledby="insights-heading">
      <div className="mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-14">
          <EyebrowTag>From Our Desk</EyebrowTag>
          <h2 id="insights-heading" className="font-serif font-normal text-[38px] md:text-[48px] leading-tight text-ink">
            Insights
          </h2>
          <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Side list */}
          <div className="lg:col-span-1 flex flex-col divide-y divide-cloud order-2 lg:order-1">
            {rest.map(item => (
              <Link
                key={item.slug || item.title}
                href={hrefForInsight(item)}
                className="group flex gap-4 py-5 first:pt-0 focus-visible:outline-none"
              >
                <div className="w-24 h-20 shrink-0 rounded-lg overflow-hidden bg-navy-card/10 border border-cloud">
                  {item.image && (
                    <span aria-hidden="true" className="block w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${item.image})` }} />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-serif font-normal text-[15px] text-ink leading-snug mb-1 group-hover:text-emerald transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                  {item.date && <span className="text-[11px] font-sans text-slate/60 mt-auto">{item.date}</span>}
                </div>
              </Link>
            ))}
          </div>

          {/* Featured */}
          <Link
            href={hrefForInsight(featured)}
            className="group lg:col-span-2 order-1 lg:order-2 flex flex-col rounded-2xl border border-cloud bg-white overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(4,38,28,.12)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            <div className="aspect-[16/9] w-full bg-navy-card/10 overflow-hidden">
              {featured.image && (
                <span aria-hidden="true" className="block w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${featured.image})` }} />
              )}
            </div>
            <div className="flex flex-col flex-1 p-7">
              <CategoryDate item={featured} />
              <h3 className="font-serif font-normal text-[26px] md:text-[30px] text-ink leading-tight mb-3">
                {featured.title}
              </h3>
              <p className="text-[14px] font-sans text-slate leading-relaxed mb-5 line-clamp-3">
                {featured.excerpt}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 text-[12px] font-sans font-semibold uppercase tracking-[0.1em] text-teal group-hover:gap-2 group-hover:text-emerald transition-all">
                Read more <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        </div>

        {showMore && (
          <div className="flex justify-center mt-12">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-teal/40 text-[13px] font-sans font-semibold uppercase tracking-[0.08em] text-teal hover:bg-teal hover:text-white transition-colors"
            >
              More insights <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
