import Image from 'next/image'
import { EyebrowTag } from '@/components/EyebrowTag'
import { ServiceCTABand } from '@/components/ServiceCTABand'
import { UaeLicensedBadge } from '@/components/UaeLicensedBadge'
import type { ServiceDoc } from '@/types/firestore'

export function FullServiceDetail({ service }: { service: ServiceDoc }) {
  const hasStats    = service.statStrip?.some(s => s.value)

  return (
    <>
      {/* 1. Hero */}
      <section className="relative pt-[120px] min-h-[70vh] flex items-start">
        {service.heroImage ? (
          <Image src={service.heroImage} alt={`${service.frontTitle} — Songbird Consultancy UAE`} fill className="object-cover" priority sizes="100vw" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-card to-navy-deep" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/35 to-navy/10" />
        <div className="relative z-10 mx-auto px-6 md:px-12 max-w-4xl pt-10 w-full">
          <EyebrowTag>{service.heroEyebrow || 'Advisory Services'}</EyebrowTag>
          <h1 className="font-sans font-normal text-[40px] md:text-[56px] lg:text-[68px] leading-[1.08] text-white mb-4">
            {service.detailTitle || service.frontTitle}
          </h1>
          <p className="text-[18px] md:text-[20px] font-sans text-cream/75 max-w-2xl leading-relaxed">
            {service.detailIntro || service.frontSubtitle}
          </p>
        </div>
      </section>

      {service.showUaeBar && <UaeLicensedBadge text={service.uaeBarText} detail={service.uaeBarDetail} />}

      {/* 2. Stat Strip */}
      {hasStats && (
        <section className="bg-surface-muted border-y border-hairline py-10">
          <div className="mx-auto px-6 md:px-12 max-w-5xl">
            <div className="flex flex-nowrap justify-center">
              {service.statStrip.filter(s => s.value).map(s => (
                <div key={s.label} className="flex flex-col items-center gap-2 px-5 sm:px-7 border-r border-hairline last:border-r-0">
                  <span className="font-serif font-normal text-gold leading-none text-[28px] sm:text-[36px] md:text-[42px]">{s.label}</span>
                  <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-slate text-center">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Overview */}
      {service.overview && (
        <section className="py-16 bg-cream">
          <div className="mx-auto px-6 md:px-12 max-w-4xl">
            {service.showOverviewTitle !== false && (
              <h2 className="font-serif font-normal text-[32px] text-ink mb-6">
                {service.overviewTitle?.trim() || 'Overview'}
              </h2>
            )}
            <div className="prose prose-slate max-w-none">
              {service.overview.split('\n\n').map((para, i) => (
                <p key={i} className="text-[15px] font-sans text-slate leading-relaxed mb-4">{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <ServiceCTABand serviceTitle={service.frontTitle} />
    </>
  )
}
