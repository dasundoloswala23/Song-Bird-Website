'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { EyebrowTag } from './EyebrowTag'
import type { InsightsDoc } from '@/types/firestore'

const CATEGORY_COLORS: Record<string, string> = {
  'Visa Update': 'bg-teal/10 text-teal',
  'Advisory':   'bg-gold-brushed/15 text-gold-brushed',
  'Market':     'bg-emerald/10 text-emerald',
}

export function Insights({ fallback }: { fallback?: InsightsDoc | null }) {
  const [content, setContent] = useState<InsightsDoc | null>(fallback ?? null)

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getInsights }) =>
      getInsights().then(d => setContent(d))
    )
  }, [])

  const articles = content?.items ?? []

  // Hide the section entirely when there are no insights to show.
  if (articles.length === 0) return null

  return (
    <section className="py-24 bg-cream" aria-labelledby="insights-heading">
      <div className="mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-14">
          <EyebrowTag>From Our Desk</EyebrowTag>
          <h2 id="insights-heading" className="font-serif font-semibold text-[38px] md:text-[48px] leading-tight text-ink">
            Insights
          </h2>
          <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <Link
              key={idx}
              href={article.href || '/insights'}
              className="group flex flex-col rounded-2xl border border-cloud bg-white overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(4,38,28,.12)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              {/* Brand gradient top strip */}
              <div
                className="h-1.5 w-full shrink-0"
                style={{ background: 'linear-gradient(90deg, #1FA968 0%, #5EEA8A 100%)' }}
                aria-hidden="true"
              />

              <div className="flex flex-col flex-1 p-6">
                {/* Category chip + date */}
                <div className="flex items-center justify-between mb-4">
                  {article.category && (
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-[0.1em] ${CATEGORY_COLORS[article.category] ?? 'bg-cloud text-slate'}`}>
                      {article.category}
                    </span>
                  )}
                  {article.date && (
                    <div className="flex items-center gap-1.5 text-[11px] font-sans font-semibold uppercase tracking-[0.1em] text-slate/60">
                      <CalendarDays className="w-3 h-3 text-gold-brushed" />
                      {article.date}
                    </div>
                  )}
                </div>

                <h3 className="font-serif font-semibold text-[18px] text-ink leading-snug mb-3 flex-1">
                  {article.title}
                </h3>
                <p className="text-[13px] font-sans text-slate leading-relaxed mb-5">
                  {article.excerpt}
                </p>

                <span className="inline-flex items-center gap-1 text-[12px] font-sans font-semibold uppercase tracking-[0.1em] text-teal group-hover:gap-2 group-hover:text-emerald transition-all">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
