import { CONTACT_EMAIL, OFFICE_PHONE, OFFICES, SOCIAL, DESTINATIONS } from '@/lib/constants'

export const SITE_URL = 'https://songbird.ae'
export const SITE_NAME = 'Songbird Immigration Consultants'

const mainOffice = OFFICES.find(o => o.isMain) ?? OFFICES[0]

/** Organization + LocalBusiness (ProfessionalService) — emitted once from the root layout. */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ['Songbird', 'Songbird Consultancy', 'Songbird Consulting', 'Songbird Immigration Consultancy'],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  description:
    'Songbird Consultancy is a UAE-licensed immigration and multi-service advisory firm. Expert visa, residency, citizenship, business, and lifestyle services for individuals and families pursuing global residency.',
  email: CONTACT_EMAIL,
  telephone: OFFICE_PHONE,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: OFFICE_PHONE,
    email: CONTACT_EMAIL,
    contactType: 'customer service',
    areaServed: 'AE',
    availableLanguage: ['English', 'Arabic', 'Hindi'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: mainOffice.city,
    addressCountry: 'AE',
    streetAddress: mainOffice.address,
  },
  areaServed: DESTINATIONS.map(d => d.keyword),
  sameAs: Object.values(SOCIAL),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '08:00',
      closes: '23:00',
    },
  ],
  knowsAbout: [
    'Immigration consultancy',
    'UAE Golden Visa',
    'Residency by investment',
    'Citizenship by investment',
    'Skilled worker visas',
    'Business setup in UAE',
    'Patent and IP advisory',
    'Maritime advisory',
    'HR advisory',
    'Concierge services',
  ],
}

/** WebSite entity — helps Google associate the brand name with the domain. */
export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: 'Songbird Immigration Consultancy',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en',
}

/**
 * Per-page Open Graph config. Next.js replaces (not merges) the parent
 * `openGraph` object, so pages must re-state siteName/locale/type/images.
 */
export function pageOpenGraph(opts: {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}) {
  return {
    siteName: SITE_NAME,
    locale: 'en_AE',
    type: opts.type ?? ('website' as const),
    title: opts.title,
    description: opts.description,
    url: opts.path,
    images: [{ url: opts.image || '/logo.png', alt: opts.title }],
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function serviceSchema(opts: { name: string; description: string; path: string; image?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    ...(opts.image ? { image: opts.image } : {}),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: DESTINATIONS.map(d => d.keyword),
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function articleSchema(opts: {
  title: string
  description: string
  path: string
  image?: string
  datePublished?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}
