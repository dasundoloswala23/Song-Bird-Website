import type { MetadataRoute } from 'next'
import { SERVICES } from '@/lib/services'
import { getPublishedServices, getDestinations, getInsights } from '@/lib/firestorePublic'
import { slugify } from '@/lib/utils'
import { SITE_URL } from '@/lib/structuredData'

export const dynamic = 'force-static'

// Static-export sitemap, generated at build time. URLs use trailing slashes to
// match `trailingSlash: true` in next.config.mjs. Firestore getters already
// swallow errors (they return [] / null), so the build never fails offline.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: '/', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/about/', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/services/', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/destinations/', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/insights/', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/contact/', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/book-a-consultation/', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/collaborations/', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/privacy/', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms/', priority: 0.3, changeFrequency: 'yearly' as const },
  ].map(({ path, ...rest }) => ({ url: `${SITE_URL}${path}`, lastModified: now, ...rest }))

  const [services, destinations, insights] = await Promise.all([
    getPublishedServices(),
    getDestinations(),
    getInsights(),
  ])

  // Mirror generateStaticParams: static SERVICES slugs merged with published Firestore slugs.
  const serviceSlugs = Array.from(
    new Set(
      [...SERVICES.map(s => s.slug), ...services.map(s => s.slug)]
        .map(s => slugify(s))
        .filter(Boolean),
    ),
  )

  const destinationSlugs = Array.from(
    new Set(destinations.map(d => slugify(d.slug)).filter(Boolean)),
  )

  const insightSlugs = Array.from(
    new Set((insights?.items ?? []).map(i => i.slug).filter(Boolean) as string[]),
  )

  return [
    ...staticRoutes,
    ...serviceSlugs.map(slug => ({
      url: `${SITE_URL}/services/${slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...destinationSlugs.map(slug => ({
      url: `${SITE_URL}/destinations/${slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...insightSlugs.map(slug => ({
      url: `${SITE_URL}/insights/${slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
