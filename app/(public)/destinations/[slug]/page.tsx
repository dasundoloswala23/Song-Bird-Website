import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getDestinations, getDestinationBySlug } from '@/lib/firestorePublic'
import { FinalCTA } from '@/components/FinalCTA'
import { MapPin, ArrowRight } from 'lucide-react'

export const dynamic = 'force-static'
export const dynamicParams = false

// Hardcoded fallback slugs ensure static export succeeds even when Firestore is empty
const FALLBACK_SLUGS = ['dubai', 'abu-dhabi', 'sharjah']

export async function generateStaticParams() {
  const destinations = await getDestinations().catch(() => [])
  const firestoreSlugs = destinations.map(d => d.slug).filter(Boolean)
  const allSlugs = Array.from(new Set([...FALLBACK_SLUGS, ...firestoreSlugs]))
  return allSlugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const dest = await getDestinationBySlug(params.slug)
  if (!dest) return {}
  return {
    title: `${dest.name} — Songbird Consulting`,
    description: dest.blurb,
  }
}

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const dest = await getDestinationBySlug(params.slug)
  if (!dest) notFound()

  return (
    <>
      {/* Hero */}
      <section className="relative pt-[160px] pb-24 bg-navy overflow-hidden">
        {dest.image && (
          <Image src={dest.image} alt={dest.name} fill className="object-cover opacity-25" sizes="100vw" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40 pointer-events-none" />
        <div className="relative z-10 mx-auto px-6 md:px-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6 text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-brushed">
            <MapPin className="w-4 h-4" />
            Destination Guide
          </div>
          <h1 className="font-serif font-medium text-[52px] md:text-[68px] leading-tight text-white mb-4">{dest.name}</h1>
          {dest.blurb && <p className="text-[18px] font-sans text-cream/70 leading-relaxed max-w-2xl">{dest.blurb}</p>}
        </div>
      </section>

      {/* Routes */}
      {dest.routes?.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="mx-auto px-6 md:px-12 max-w-4xl">
            <h2 className="font-serif font-medium text-[32px] text-ink mb-8">Available Pathways</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dest.routes.map(route => (
                <div
                  key={route}
                  className="flex items-center gap-4 p-5 rounded-xl border border-gold-brushed/15 bg-white shadow-sm hover:border-gold-brushed/30 hover:shadow-md transition-all group"
                >
                  <div className="w-2 h-2 rounded-full bg-teal shrink-0" />
                  <span className="text-[15px] font-sans font-medium text-ink">{route}</span>
                  <ArrowRight className="w-4 h-4 text-slate/50 ml-auto group-hover:text-teal transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-3xl text-center">
          <h2 className="font-serif font-medium text-[36px] text-white mb-4">
            Ready to explore {dest.name}?
          </h2>
          <p className="text-[16px] font-sans text-cream/60 mb-8">
            Book a complimentary consultation to find out which pathway is right for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-a-consultation"
              className="px-8 py-3.5 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(31,169,104,.4)]"
              style={{ background: 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)' }}
            >
              Book a Consultation
            </Link>
            <Link
              href="/destinations"
              className="px-8 py-3.5 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-gold-brushed border border-gold-brushed/30 rounded-[6px] hover:border-gold-brushed/60 transition-colors"
            >
              All Destinations
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
