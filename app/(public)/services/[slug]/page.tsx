import type { Metadata } from 'next'
import { getServiceBySlug, getAllServices } from '@/lib/firestorePublic'
import { SERVICES } from '@/lib/services'
import { ServiceDetailClient } from '@/components/services/ServiceDetailClient'
import { slugify } from '@/lib/utils'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, serviceSchema, faqSchema, pageOpenGraph } from '@/lib/structuredData'
import { serviceKeywords, PRIMARY_KEYWORDS } from '@/lib/seoKeywords'

interface Props { params: { slug: string } }

export const dynamicParams = true

export async function generateStaticParams() {
  // Merge hardcoded slugs with any stored in Firestore
  const stored = await getAllServices().catch(() => [])
  const firestoreSlugs = stored.map(s => s.slug).filter(Boolean)
  const hardcodedSlugs = SERVICES.map(s => s.slug)
  // Slugify so every generated path is clean/hyphenated (no spaced folders).
  const allSlugs = Array.from(new Set([...hardcodedSlugs, ...firestoreSlugs].map(s => slugify(s)).filter(Boolean)))
  return allSlugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = slugify(params.slug.toLowerCase())
  const canonical = `/services/${slug}/`
  const service = await getServiceBySlug(params.slug.toLowerCase())
  if (!service) return { alternates: { canonical } }
  const title = service.detailTitle || service.frontTitle
  const description = service.detailIntro || service.frontSubtitle
  return {
    title,
    description,
    keywords: Array.from(new Set(
      slug === 'immigration'
        ? [...serviceKeywords(service.frontTitle), ...PRIMARY_KEYWORDS]
        : serviceKeywords(service.frontTitle),
    )),
    alternates: { canonical },
    openGraph: pageOpenGraph({
      title: `${title} | Songbird Consultancy`,
      description,
      path: canonical,
      image: service.heroImage || undefined,
    }),
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const slug = params.slug.toLowerCase()
  const service = await getServiceBySlug(slug)
  const path = `/services/${slugify(slug)}/`
  const title = service ? service.detailTitle || service.frontTitle : ''

  // Pass pre-fetched data as prop; client component handles runtime fetch for new slugs
  return (
    <>
      {service && (
        <>
          <JsonLd
            data={serviceSchema({
              name: title,
              description: service.detailIntro || service.frontSubtitle,
              path,
              image: service.heroImage || undefined,
            })}
          />
          <JsonLd
            data={breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services/' },
              { name: title, path },
            ])}
          />
          {(service.faqs?.length ?? 0) > 0 && <JsonLd data={faqSchema(service.faqs)} />}
        </>
      )}
      <ServiceDetailClient slug={slug} initial={service} />
    </>
  )
}
