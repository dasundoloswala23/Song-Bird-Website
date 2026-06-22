'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight, Loader2 } from 'lucide-react'
import { FinalCTA } from '@/components/FinalCTA'
import { SectionBlock } from '@/components/services/SectionBlock'
import { decodeEntities, slugify } from '@/lib/utils'
import type { DestinationDoc, ServiceSection } from '@/types/firestore'

interface TocItem {
  id: string
  label: string
}

function OnThisPageSidebar({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    if (!items.length) return
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-10% 0px -75% 0px', threshold: 0 },
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
    }
  }

  if (!items.length) return null

  return (
    <aside className="hidden lg:block sticky top-32 self-start min-w-0">
      <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-gold-brushed mb-5">
        On This Page
      </p>
      <nav className="flex flex-col">
        {items.map(({ id, label }) => {
          const isActive = activeId === id
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-left px-3 py-2 text-[12px] font-sans uppercase tracking-[0.06em] leading-snug break-words transition-all border-l-2 ${
                isActive
                  ? 'border-gold-brushed text-ink font-bold'
                  : 'border-transparent text-slate hover:text-ink hover:border-slate/40'
              }`}
            >
              {decodeEntities(label)}
            </button>
          )
        })}
        <Link
          href="/contact"
          className="text-left px-3 py-2 mt-3 text-[12px] font-sans normal-case text-slate hover:text-emerald transition-colors border-l-2 border-transparent"
        >
          Contact an adviser
        </Link>
      </nav>
    </aside>
  )
}

export function DestinationDetailClient({ initialSlug, initial }: { initialSlug: string; initial: DestinationDoc | null }) {
  const pathname = usePathname()
  const [dest, setDest] = useState<DestinationDoc | null>(initial)
  const [loading, setLoading] = useState(!initial)

  useEffect(() => {
    const segs = pathname.split('/').filter(Boolean)
    const slug = slugify(decodeURIComponent(segs[segs.length - 1] || initialSlug))
    import('@/lib/firestorePublic').then(({ getDestinations }) =>
      getDestinations()
        .then(list => setDest(list.find(d => slugify(d.slug ?? '') === slug) ?? null))
        .finally(() => setLoading(false)),
    )
  }, [pathname, initialSlug])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold-brushed animate-spin" />
      </div>
    )
  }

  if (!dest) {
    return (
      <section className="min-h-screen pt-[160px] pb-24 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-3xl text-center">
          <h1 className="font-serif font-normal text-[32px] text-ink mb-4">Destination not found</h1>
          <p className="text-[15px] font-sans text-slate mb-8">This destination doesn&apos;t exist or may have been removed.</p>
          <Link href="/destinations" className="inline-flex items-center gap-2 text-[13px] font-sans font-semibold uppercase tracking-[0.08em] text-teal hover:text-emerald transition-colors">
            <ArrowRight className="w-4 h-4" /> All Destinations
          </Link>
        </div>
      </section>
    )
  }

  const overviewSection: ServiceSection[] = dest.overview?.trim()
    ? [{ id: 'overview', title: 'Overview', body: dest.overview }]
    : []
  const sections: ServiceSection[] = [...overviewSection, ...(dest.sections ?? [])]

  // Build TOC items
  const tocItems: TocItem[] = []
  if (dest.overview?.trim()) tocItems.push({ id: 'overview', label: 'Overview' })
  if (dest.routes?.length) tocItems.push({ id: 'available-pathways', label: 'Available Pathways' })
  ;(dest.sections ?? []).forEach(s => {
    if (s.title) tocItems.push({ id: s.id, label: s.title })
  })

  return (
    <>
      {/* Hero */}
      <section className="relative pt-[160px] pb-24 bg-navy overflow-hidden">
        {dest.image && (
          <Image src={dest.image} alt={dest.name} fill className="object-cover" sizes="100vw" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/70 to-navy/40 pointer-events-none" />
        <div className="relative z-10 mx-auto px-6 md:px-12 max-w-7xl">
          <div className="inline-flex items-center gap-2 mb-6 text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-brushed">
            <MapPin className="w-4 h-4" />
            Destination Guide
          </div>
          <h1 className="font-serif font-normal text-[52px] md:text-[68px] leading-tight text-white mb-4">{dest.name}</h1>
          {dest.blurb && <p className="text-[18px] font-sans text-cream/85 leading-relaxed max-w-2xl">{dest.blurb}</p>}
        </div>
      </section>

      {/* Main content + TOC sidebar */}
      <div className="bg-cream py-12">
        <div className="mx-auto px-6 md:px-12 max-w-7xl">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12 items-start">

            {/* Left: main content */}
            <div className="min-w-0">

              {/* Routes */}
              {dest.routes?.length > 0 && (
                <div id="available-pathways" className="scroll-mt-32 pb-12 mb-2 border-b border-cloud">
                  <h2 className="font-serif font-normal text-[32px] text-ink mb-8">Available Pathways</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {dest.routes.map(route => (
                      <div
                        key={route}
                        className="flex items-center gap-4 p-5 rounded-xl border border-gold-brushed/15 bg-white shadow-sm hover:border-gold-brushed/30 hover:shadow-md transition-all group"
                      >
                        <div className="w-2 h-2 rounded-full bg-teal shrink-0" />
                        <span className="text-[15px] font-sans font-medium text-ink">{decodeEntities(route)}</span>
                        <ArrowRight className="w-4 h-4 text-slate/50 ml-auto group-hover:text-teal transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sectioned content */}
              {sections.length > 0 && (
                <div>
                  {sections.map(s => <SectionBlock key={s.id} section={s} />)}
                </div>
              )}
            </div>

            {/* Right: sticky TOC */}
            <OnThisPageSidebar items={tocItems} />
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="relative py-20 bg-navy overflow-hidden">
        {dest.ctaImage && (
          <>
            <Image src={dest.ctaImage} alt="" fill className="object-cover opacity-30" sizes="100vw" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/80 to-navy pointer-events-none" />
          </>
        )}
        <div className="relative z-10 mx-auto px-6 md:px-12 max-w-3xl text-center">
          <h2 className="font-serif font-normal text-[36px] text-white mb-4">
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

      {/* Optional full-width bottom showcase banner */}
      {dest.bottomImage && (
        <section className="relative w-full h-[300px] md:h-[460px] bg-navy-deep overflow-hidden">
          <Image
            src={dest.bottomImage}
            alt={dest.name}
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Green shade — tints the image and fades its edges into the surrounding sections */}
          <div className="absolute inset-0 pointer-events-none bg-navy/25" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-navy-deep via-transparent to-navy-deep opacity-70" />
        </section>
      )}

      <FinalCTA />
    </>
  )
}
