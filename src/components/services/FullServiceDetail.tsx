import Image from 'next/image'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { EyebrowTag } from '@/components/EyebrowTag'
import { ServiceCTABand } from '@/components/ServiceCTABand'
import type { ServiceDoc } from '@/types/firestore'

export function FullServiceDetail({ service }: { service: ServiceDoc }) {
  const hasStats    = service.statStrip?.some(s => s.value)
  const hasBenefits = service.keyBenefits?.length > 0
  const hasProcedure = service.procedure?.length > 0
  const hasWhoFor   = service.whoIsThisFor?.length > 0
  const hasFaqs     = service.faqs?.length > 0

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
          <h1 className="font-serif font-semibold text-[42px] md:text-[58px] leading-tight text-white mb-4">
            {service.detailTitle || service.frontTitle}
          </h1>
          <p className="text-[16px] font-sans text-cream/75 max-w-2xl leading-relaxed">
            {service.detailIntro || service.frontSubtitle}
          </p>
        </div>
      </section>

      {/* 2. Stat Strip */}
      {hasStats && (
        <section className="bg-cream py-10">
          <div className="mx-auto px-6 md:px-12 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {service.statStrip.filter(s => s.value).map(s => (
                <div key={s.label}>
                  <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-brushed mb-1">{s.label}</p>
                  <p className="font-serif font-semibold text-[20px] text-ink leading-snug">{s.value}</p>
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
            <h2 className="font-serif font-semibold text-[32px] text-ink mb-6">Overview</h2>
            <div className="prose prose-slate max-w-none">
              {service.overview.split('\n\n').map((para, i) => (
                <p key={i} className="text-[15px] font-sans text-slate leading-relaxed mb-4">{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Key Benefits */}
      {hasBenefits && (
        <section className="py-16 bg-cream">
          <div className="mx-auto px-6 md:px-12 max-w-5xl">
            <h2 className="font-serif font-semibold text-[32px] text-ink mb-8">Key Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {service.keyBenefits.map(b => (
                <div key={b.title} className="flex items-start gap-3 p-5 rounded-xl border border-cloud bg-white">
                  <CheckCircle className="w-5 h-5 text-gold-brushed shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans font-semibold text-[14px] text-ink mb-1">{b.title}</p>
                    <p className="font-sans text-[13px] text-slate leading-relaxed">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. The Procedure */}
      {hasProcedure && (
        <section className="py-16 bg-cream">
          <div className="mx-auto px-6 md:px-12 max-w-4xl">
            <h2 className="font-serif font-semibold text-[32px] text-ink mb-8">The Procedure</h2>
            <div className="space-y-4">
              {service.procedure.map(step => (
                <div key={step.step} className="flex items-start gap-4 p-5 rounded-xl border border-cloud bg-white">
                  <div className="w-9 h-9 rounded-full bg-gold-brushed flex items-center justify-center shrink-0 text-[14px] font-sans font-semibold text-navy">
                    {step.step}
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-[16px] text-ink mb-1">{step.title}</p>
                    <p className="font-sans text-[13px] text-slate leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Who Is This For */}
      {hasWhoFor && (
        <section className="py-16 bg-cream">
          <div className="mx-auto px-6 md:px-12 max-w-4xl">
            <h2 className="font-serif font-semibold text-[32px] text-ink mb-8">Who Is This For?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.whoIsThisFor.map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <ArrowRight className="w-4 h-4 text-gold-brushed shrink-0" />
                  <span className="font-sans text-[14px] text-slate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. FAQs */}
      {hasFaqs && (
        <section className="py-16 bg-cream">
          <div className="mx-auto px-6 md:px-12 max-w-4xl">
            <h2 className="font-serif font-semibold text-[32px] text-ink mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {service.faqs.map(faq => (
                <div key={faq.question} className="border-l-2 border-gold-brushed pl-5 py-2 bg-white rounded-r-xl px-5 py-4">
                  <p className="font-sans font-semibold text-[14px] text-ink mb-1.5">{faq.question}</p>
                  <p className="font-sans text-[13px] text-slate leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ServiceCTABand serviceTitle={service.frontTitle} />
    </>
  )
}
