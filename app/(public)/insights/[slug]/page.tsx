import type { Metadata } from 'next'
import { getInsights } from '@/lib/firestorePublic'
import { InsightDetailClient } from '@/components/insights/InsightDetailClient'
import type { InsightItem } from '@/types/firestore'

export const dynamic = 'force-static'
export const dynamicParams = true

// Ensures static export has at least one param to generate even when Firestore is empty.
// Any other slug is served via the /insights/** hosting rewrite and resolved client-side.
const FALLBACK_SLUGS = ['coming-soon']

async function findArticle(slug: string): Promise<InsightItem | null> {
  const content = await getInsights().catch(() => null)
  return content?.items?.find(i => i.slug === slug) ?? null
}

export async function generateStaticParams() {
  const content = await getInsights().catch(() => null)
  const slugs = (content?.items ?? []).map(i => i.slug).filter(Boolean) as string[]
  const all = Array.from(new Set([...FALLBACK_SLUGS, ...slugs]))
  return all.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await findArticle(params.slug)
  if (!article) return { title: 'Insights — Songbird Consultancy' }
  return { title: `${article.title} — Songbird Consultancy`, description: article.excerpt }
}

export default async function InsightDetailPage({ params }: { params: { slug: string } }) {
  const initial = await findArticle(params.slug)
  return <InsightDetailClient initialSlug={params.slug} initial={initial} />
}
