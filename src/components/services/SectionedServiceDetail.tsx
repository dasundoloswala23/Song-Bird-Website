'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { EyebrowTag } from '@/components/EyebrowTag'
import { ServiceCTABand } from '@/components/ServiceCTABand'
import type { ServiceDoc, ServiceSection } from '@/types/firestore'

const CONTACT_ID = 'contact-adviser'

export function SectionedServiceDetail({ service }: { service: ServiceDoc }) {
  // An optional rich-text Overview renders as the first block, above the authored sections.
  const overviewSection: ServiceSection[] = service.overview?.trim()
    ? [{ id: 'overview', title: 'Overview', body: service.overview }]
    : []
  const sections: ServiceSection[] = [...overviewSection, ...(service.sections ?? [])]
  const hasStats = service.statStrip?.some(s => s.value)
  const showContact = service.showContactNav !== false
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '')

  // Scroll-spy: highlight the section currently in the reading zone.
  useEffect(() => {
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
  }

  const navItems = [
    ...sections.map(s => ({ id: s.id, title: s.title })),
    ...(showContact ? [{ id: CONTACT_ID, title: 'Contact an adviser' }] : []),
  ]

  return (
    <>
      {/* 1. Hero */}
      <section className="relative pt-[120px] min-h-[60vh] flex items-end">
        {service.heroImage ? (
          <Image src={service.heroImage} alt={service.frontTitle} fill className="object-cover" priority sizes="100vw" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-card to-navy-deep" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/45 to-navy/10" />
        <div className="relative z-10 mx-auto px-6 md:px-12 max-w-4xl pb-16 w-full">
          <EyebrowTag>{service.heroEyebrow || 'Advisory Services'}</EyebrowTag>
          <h1 className="font-serif font-medium text-[42px] md:text-[58px] leading-tight text-white mb-4">
            {service.detailTitle || service.frontTitle}
          </h1>
          <p className="text-[16px] font-sans text-cream/75 max-w-2xl leading-relaxed">
            {service.detailIntro || service.frontSubtitle}
          </p>
        </div>
      </section>

      {/* 2. Stat Strip */}
      {hasStats && (
        <section className="bg-surface-muted border-y border-hairline py-10">
          <div className="mx-auto px-6 md:px-12 max-w-5xl">
            <div className="flex flex-wrap justify-center gap-y-6">
              {service.statStrip.filter(s => s.value).map(s => (
                <div key={s.label} className="flex flex-col items-center gap-2 px-6 sm:px-8 border-r border-hairline last:border-r-0">
                  <span className="font-serif font-medium text-gold leading-none text-[30px] sm:text-[40px] md:text-[44px]">{s.label}</span>
                  <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-slate text-center">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Sectioned body */}
      {sections.length > 0 && (
        <section className="bg-cream py-16">
          {/* Mobile tab bar */}
          <div className="lg:hidden sticky top-[88px] z-20 -mt-16 mb-8 bg-cream/95 backdrop-blur-sm border-b border-hairline">
            <div className="flex gap-2 overflow-x-auto px-6 py-3 no-scrollbar">
              {navItems.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] font-sans font-medium whitespace-nowrap transition-colors ${
                    activeId === item.id ? 'bg-navy text-white' : 'bg-white text-slate border border-hairline'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-auto px-6 md:px-12 max-w-6xl flex flex-col lg:flex-row gap-12">
            {/* Left: content */}
            <div className="flex-1 min-w-0">
              {sections.map(s => (
                <section key={s.id} id={s.id} className="scroll-mt-32 py-12 border-b border-cloud last:border-b-0 first:pt-0">
                  <h2 className="font-serif font-medium text-[30px] md:text-[34px] text-ink mb-5">{s.title}</h2>
                  <div className="sb-prose" dangerouslySetInnerHTML={{ __html: s.body }} />
                  {s.stats?.some(st => st.label || st.value) && (
                    <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
                      {s.stats.filter(st => st.label || st.value).map((st, i) => (
                        <div key={`${st.label}-${i}`} className="flex flex-col">
                          <span className="font-serif font-medium text-gold leading-none text-[30px] md:text-[36px] whitespace-nowrap">{st.label}</span>
                          <span className="mt-1.5 text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-slate">{st.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Right: sticky scroll-spy nav */}
            <nav className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-32 border-l border-hairline">
                <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-gold-deep pl-5 mb-4">On this page</p>
                <ul className="space-y-1">
                  {navItems.map(item => {
                    const active = activeId === item.id
                    return (
                      <li key={item.id} className="relative">
                        {active && <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-gold" />}
                        <button
                          type="button"
                          onClick={() => scrollTo(item.id)}
                          className={`block w-full text-left pl-5 pr-2 py-1.5 text-[13px] font-sans transition-colors ${
                            active ? 'text-ink font-semibold' : 'text-slate hover:text-ink'
                          }`}
                        >
                          {item.title}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </nav>
          </div>
        </section>
      )}

      <div id={CONTACT_ID}>
        <ServiceCTABand serviceTitle={service.frontTitle} />
      </div>
    </>
  )
}
