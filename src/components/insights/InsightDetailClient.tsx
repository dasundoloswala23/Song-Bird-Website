'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, Loader2 } from 'lucide-react'
import { FinalCTA } from '@/components/FinalCTA'
import { renderRichHtml } from '@/lib/richText'
import type { InsightItem } from '@/types/firestore'

const CATEGORY_COLORS: Record<string, string> = {
  'Visa Update': 'bg-teal/10 text-teal',
  'Advisory':   'bg-gold-brushed/15 text-gold-brushed',
  'Market':     'bg-emerald/10 text-emerald',
}

export function InsightDetailClient({ initialSlug, initial }: { initialSlug: string; initial: InsightItem | null }) {
  const pathname = usePathname()
  const [article, setArticle] = useState<InsightItem | null>(initial)
  const [loading, setLoading] = useState(!initial)

  // Read the real slug from the URL (this page is served via a hosting rewrite for any
  // slug, so the build-time prop may not match), then fetch the matching article.
  useEffect(() => {
    const segs = pathname.split('/').filter(Boolean)
    const slug = decodeURIComponent(segs[segs.length - 1] || initialSlug)
    import('@/lib/firestorePublic').then(({ getInsights }) =>
      getInsights()
        .then(d => setArticle(d?.items?.find(i => i.slug === slug) ?? null))
        .finally(() => setLoading(false)),
    )
  }, [pathname, initialSlug])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold-brushed animate-spin" />
      </div>
    )
  }

  if (!article) {
    return (
      <section className="min-h-screen pt-[160px] pb-24 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-3xl text-center">
          <h1 className="font-serif font-normal text-[32px] text-ink mb-4">Article not found</h1>
          <p className="text-[15px] font-sans text-slate mb-8">This insight doesn&apos;t exist or may have been removed.</p>
          <Link href="/insights" className="inline-flex items-center gap-2 text-[13px] font-sans font-semibold uppercase tracking-[0.08em] text-teal hover:text-emerald transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <article className="pt-[140px] pb-8 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-3xl">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-[12px] font-sans font-medium text-slate hover:text-emerald transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Insights
          </Link>

          <div className="flex items-center gap-3 mb-5">
            {article.category && (
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-[0.1em] ${CATEGORY_COLORS[article.category] ?? 'bg-cloud text-slate'}`}>
                {article.category}
              </span>
            )}
            {article.date && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold uppercase tracking-[0.1em] text-slate/60">
                <CalendarDays className="w-3 h-3 text-gold-brushed" />
                {article.date}
              </span>
            )}
          </div>

          <h1 className="font-serif font-normal text-[34px] md:text-[46px] leading-tight text-ink mb-6">
            {article.title}
          </h1>

          {article.image && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-cloud mb-8">
              <Image src={article.image} alt={article.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
            </div>
          )}
        </div>
      </article>

      <section className="pb-24 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-3xl">
          {article.body
            ? <div className="sb-prose" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: renderRichHtml(article.body) }} />
            : article.excerpt
              ? <p className="text-[15px] font-sans text-slate leading-relaxed">{article.excerpt}</p>
              : null}
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
