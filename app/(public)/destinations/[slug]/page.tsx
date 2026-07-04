import type { Metadata } from 'next'
import { getDestinations, getDestinationBySlug } from '@/lib/firestorePublic'
import { DestinationDetailClient } from '@/components/destinations/DestinationDetailClient'
import { slugify } from '@/lib/utils'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, serviceSchema, faqSchema, pageOpenGraph } from '@/lib/structuredData'
import { DESTINATION_KEYWORDS, genericDestinationKeywords } from '@/lib/seoKeywords'

export const dynamic = 'force-static'
export const dynamicParams = true

// Hardcoded fallback slugs ensure static export succeeds even when Firestore is empty.
const FALLBACK_SLUGS = ['dubai', 'abu-dhabi', 'sharjah']

export async function generateStaticParams() {
  const destinations = await getDestinations().catch(() => [])
  const firestoreSlugs = destinations.map(d => d.slug).filter(Boolean)
  // Slugify so every generated path is clean/hyphenated (no spaced folders).
  const allSlugs = Array.from(new Set([...FALLBACK_SLUGS, ...firestoreSlugs].map(s => slugify(s)).filter(Boolean)))
  return allSlugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const canonical = `/destinations/${slugify(params.slug)}/`
  const dest = await getDestinationBySlug(params.slug)
  if (!dest) return { title: 'Destinations — Songbird Consultancy', alternates: { canonical } }
  const title = `${dest.name} Immigration & Residency`
  return {
    title,
    description: dest.blurb,
    keywords: DESTINATION_KEYWORDS[slugify(params.slug)] ?? genericDestinationKeywords(dest.name),
    alternates: { canonical },
    openGraph: pageOpenGraph({
      title: `${title} | Songbird Consultancy`,
      description: dest.blurb,
      path: canonical,
      image: dest.image || undefined,
    }),
  }
}

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const initial = await getDestinationBySlug(params.slug)
  const path = `/destinations/${slugify(params.slug)}/`
  return (
    <>
      {initial && (
        <>
          <JsonLd
            data={serviceSchema({
              name: `${initial.name} Immigration & Residency Advisory`,
              description: initial.blurb,
              path,
              image: initial.image || undefined,
            })}
          />
          <JsonLd
            data={breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Destinations', path: '/destinations/' },
              { name: initial.name, path },
            ])}
          />
          {(initial.faqs?.length ?? 0) > 0 && <JsonLd data={faqSchema(initial.faqs!)} />}
        </>
      )}
      <DestinationDetailClient initialSlug={params.slug} initial={initial} />
    </>
  )
}
