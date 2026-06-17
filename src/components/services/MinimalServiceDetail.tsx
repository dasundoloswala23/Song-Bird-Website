import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { EyebrowTag } from '@/components/EyebrowTag'
import { ServiceCTABand } from '@/components/ServiceCTABand'
import type { ServiceDoc } from '@/types/firestore'

export function MinimalServiceDetail({ service }: { service: ServiceDoc }) {
  return (
    <>
      {/* Hero */}
      <section className="pt-[160px] pb-16 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-4xl">
          <EyebrowTag>{service.heroEyebrow || 'Advisory Services'}</EyebrowTag>
          <h1 className="font-serif font-medium text-[42px] md:text-[56px] leading-tight text-white mb-4">
            {service.detailTitle || service.frontTitle}
          </h1>
          <div className="w-16 h-px bg-gold-brushed mb-5" />
          <p className="text-[16px] font-sans text-cream/65 max-w-2xl leading-relaxed">
            {service.detailIntro || service.frontSubtitle}
          </p>
        </div>
      </section>

      {/* Detail block */}
      <section className="py-20 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-navy-card border border-gold-brushed/15 overflow-hidden flex items-center justify-center">
                {service.heroImage ? (
                  <Image src={service.heroImage} alt={service.frontTitle} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                ) : (
                  <p className="text-cream/20 text-[13px] font-sans text-center px-8">Service image</p>
                )}
              </div>
            </div>

            {/* Checklists */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {service.whatWeProvide?.length > 0 && (
                  <div>
                    <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-brushed mb-4">What We Provide</h3>
                    <ul className="space-y-2.5">
                      {service.whatWeProvide.map(item => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-gold-brushed shrink-0 mt-0.5" />
                          <span className="text-[13px] font-sans text-ink leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {service.requirements?.length > 0 && (
                  <div>
                    <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-brushed mb-4">Typical Requirements</h3>
                    <ul className="space-y-2.5">
                      {service.requirements.map(req => (
                        <li key={req} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-gold/70 shrink-0 mt-0.5" />
                          <span className="text-[13px] font-sans text-ink leading-snug">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceCTABand serviceTitle={service.frontTitle} />
    </>
  )
}
