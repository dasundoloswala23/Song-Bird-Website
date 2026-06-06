import type { Metadata } from 'next'
import { getServiceBySlug, getAllServices } from '@/lib/firestorePublic'
import { SERVICES } from '@/lib/services'
import { ServiceDetailClient } from '@/components/services/ServiceDetailClient'

interface Props { params: { slug: string } }

export const dynamicParams = true

export async function generateStaticParams() {
  // Merge hardcoded slugs with any stored in Firestore
  const stored = await getAllServices().catch(() => [])
  const firestoreSlugs = stored.map(s => s.slug).filter(Boolean)
  const hardcodedSlugs = SERVICES.map(s => s.slug)
  const allSlugs = Array.from(new Set([...hardcodedSlugs, ...firestoreSlugs]))
  return allSlugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug.toLowerCase())
  if (!service) return {}
  return {
    title: service.detailTitle || service.frontTitle,
    description: service.detailIntro || service.frontSubtitle,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const slug = params.slug.toLowerCase()
  const service = await getServiceBySlug(slug)

  // Pass pre-fetched data as prop; client component handles runtime fetch for new slugs
  return <ServiceDetailClient slug={slug} initial={service} />
}
