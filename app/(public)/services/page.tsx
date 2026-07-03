import type { Metadata } from 'next'
import { EyebrowTag } from '@/components/EyebrowTag'
import { getPublishedServices, getServicesPageIntro } from '@/lib/firestorePublic'
import { ServicesGrid } from '@/components/ServicesGrid'
import { ServicesIntro } from '@/components/ServicesIntro'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Our Services — Immigration, Legal, Business & Lifestyle Advisory',
  description: 'Explore Songbird Consultancy\'s nine service lines: immigration and visa consultancy, patent & IP, maritime, management, HR advisory, commercial brokering, concierge, lifestyle, and hospitality services in the UAE.',
  keywords: ['Immigration Services UAE', 'Visa Services Dubai', 'Immigration and Visa Services', 'Business Setup UAE', 'Global Mobility Services UAE', 'Professional visa services UAE'],
  alternates: { canonical: '/services/' },
}

export default async function ServicesPage() {
  const [services, servicesPageIntro] = await Promise.all([
    getPublishedServices(),
    getServicesPageIntro(),
  ])

  return (
    <>
      <section className="pt-[160px] pb-20 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-4xl text-center">
          <EyebrowTag>What We Offer</EyebrowTag>
          <h1 className="font-serif font-normal text-[42px] md:text-[56px] leading-tight text-white mb-4">Our Services</h1>
          <div className="mx-auto w-16 h-px bg-gold-brushed mb-5" />
          <p className="text-[16px] font-sans text-cream/65 max-w-2xl mx-auto leading-relaxed">
            Nine specialist verticals. One integrated team. Songbird combines legal expertise, business acumen, and lifestyle mastery to support every dimension of your global journey.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-6xl">
          <ServicesIntro fallback={servicesPageIntro} source="servicesPageIntro" tone="dark" className="mb-16" />
          <ServicesGrid fallback={services} />
        </div>
      </section>
    </>
  )
}
