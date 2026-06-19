import type { Metadata } from 'next'
import { getDestinations, getDestinationBySlug } from '@/lib/firestorePublic'
import { DestinationDetailClient } from '@/components/destinations/DestinationDetailClient'

export const dynamic = 'force-static'
export const dynamicParams = true

// Hardcoded fallback slugs ensure static export succeeds even when Firestore is empty.
// Any other slug is served via the /destinations/** hosting rewrite and resolved client-side.
const FALLBACK_SLUGS = ['dubai', 'abu-dhabi', 'sharjah']

export async function generateStaticParams() {
  const destinations = await getDestinations().catch(() => [])
  const firestoreSlugs = destinations.map(d => d.slug).filter(Boolean)
  const allSlugs = Array.from(new Set([...FALLBACK_SLUGS, ...firestoreSlugs]))
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
