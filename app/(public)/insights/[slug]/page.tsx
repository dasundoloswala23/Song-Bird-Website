import type { Metadata } from 'next'
import { getInsights } from '@/lib/firestorePublic'
import { InsightDetailClient } from '@/components/insights/InsightDetailClient'
import type { InsightItem } from '@/types/firestore'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema, breadcrumbSchema, pageOpenGraph } from '@/lib/structuredData'

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
  const canonical = `/insights/${params.slug}/`
  const article = await findArticle(params.slug)
  if (!article) return { title: 'Insights — Songbird Consultancy', alternates: { canonical } }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical },
    openGraph: pageOpenGraph({
      title: `${article.title} | Songbird Consultancy`,
      description: article.excerpt,
      path: canonical,
      type: 'article',
      image: article.image || undefined,
    }),
  }
}

export default async function InsightDetailPage({ params }: { params: { slug: string } }) {
  const initial = await findArticle(params.slug)
  const path = `/insights/${params.slug}/`
  return (
    <>
      {initial && (
        <>
          <JsonLd
            data={articleSchema({
              title: initial.title,
              description: initial.excerpt,
              path,
              image: initial.image || undefined,
              datePublished: initial.date || undefined,
            })}
          />
          <JsonLd
            data={breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Insights', path: '/insights/' },
              { name: initial.title, path },
            ])}
          />
        </>
      )}
      <InsightDetailClient initialSlug={params.slug} initial={initial} />
    </>
  )
}
