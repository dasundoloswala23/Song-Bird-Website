import type { Metadata } from 'next'
import { getDestinations, getDestinationBySlug } from '@/lib/firestorePublic'
import { DestinationDetailClient } from '@/components/destinations/DestinationDetailClient'
import { slugify } from '@/lib/utils'

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
  const dest = await getDestinationBySlug(params.slug)
  if (!dest) return { title: 'Destinations — Songbird Consultancy' }
  return { title: `${dest.name} — Songbird Consultancy`, description: dest.blurb }
}

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const initial = await getDestinationBySlug(params.slug)
  return <DestinationDetailClient initialSlug={params.slug} initial={initial} />
}
