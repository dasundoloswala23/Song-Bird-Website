import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { EyebrowTag } from '@/components/EyebrowTag'
import { FinalCTA } from '@/components/FinalCTA'
import { getWhyChooseUs, getWelcome } from '@/lib/firestorePublic'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'About Us — Songbird Consultancy',
  description: 'Songbird Consultancy is a UAE-licensed immigration and business advisory firm headquartered in Dubai, serving clients across 15+ jurisdictions.',
}

const VALUES = [
  { title: 'Customized Solutions', desc: 'Advice shaped around your goals, profile and timeline — never one-size-fits-all.' },
  { title: 'Client Satisfaction', desc: 'Your outcome is our measure of success at every stage.' },
  { title: 'Customized Pricing Structure', desc: 'Transparent, flexible pricing matched to the scope of your engagement.' },
  { title: 'Expertise & Experience', desc: 'Over 15 years of combined professional experience across jurisdictions.' },
  { title: 'Dedicated Support', desc: 'A responsive team that stays with you from first contact to final approval.' },
  { title: 'Legally Authorized Advice', desc: 'UAE-licensed and fully regulated guidance you can rely on.' },
]

const RELATED_EXPERTISE = [
  'Residency & Immigration',
  'Foreign Investments',
  'Second Citizenships',
  'Corporate & Commercial',
  'Patent & Trademark',
  'Finance & Insurance',
  'Property & Tourism',
  'Employment, HR & Management Consultancy',
]

export default async function AboutPage() {
  const [whyContent, welcome] = await Promise.all([getWhyChooseUs(), getWelcome()])
  const image    = whyContent?.image    ?? ''
  const badge    = whyContent?.badge
  const features = whyContent?.features ?? []
  const welcomeParas = (welcome?.body ?? '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

  return (
    <>
      {/* Hero */}
      <section className="pt-[160px] pb-20 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-4xl text-center">
          <EyebrowTag>Our Story</EyebrowTag>
          <h1 className="font-serif font-normal text-[48px] md:text-[64px] leading-tight text-white mb-5">
            About Songbird Consultancy
          </h1>
          <div className="mx-auto w-16 h-px bg-gold-brushed mb-6" />
          <p className="text-[17px] font-sans text-cream/65 max-w-2xl mx-auto leading-relaxed">
            A UAE-licensed advisory firm headquartered in Dubai, dedicated to helping ambitious individuals and businesses build exceptional lives across borders.
          </p>
        </div>
      </section>

      {/* Story + Image */}
      <section className="py-24 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy-card border border-gold-brushed/15 shadow-[0_24px_64px_rgba(4,38,28,.15)]">
                {image ? (
                  <Image src={image} alt="Songbird office" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy via-navy-card to-teal/5">
                    <p className="text-cream/30 text-[13px] font-sans text-center px-8">Office desk scene with Songbird logo</p>
                  </div>
                )}
              </div>
              {badge?.value && (
                <div className="absolute -bottom-5 -right-5 md:bottom-8 md:-right-8 bg-white border-2 border-teal/40 rounded-2xl px-6 py-4 shadow-lg">
                  <p
                    className="font-serif font-normal text-[36px] leading-none"
                    style={{ background: 'linear-gradient(135deg,#1FA968 0%,#5EEA8A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                  >
                    {badge.value}
                  </p>
                  <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-slate mt-0.5 whitespace-pre-line">{badge.label}</p>
                </div>
              )}
            </div>

            {/* Story text */}
            <div>
              <EyebrowTag>Who We Are</EyebrowTag>
              <h2 className="font-serif font-normal text-[36px] md:text-[44px] leading-tight text-ink mb-4">
                Built on trust, powered by expertise
              </h2>
              {welcome?.slogan && (
                <p className="font-sans text-[13px] uppercase tracking-[0.24em] text-gold-deep mb-4">{welcome.slogan}</p>
              )}
              <div className="w-12 h-px bg-gold mb-6" />
              <div className="space-y-4 text-[15px] font-sans text-slate leading-relaxed mb-10">
                {welcomeParas.length > 0 ? (
                  welcomeParas.map((p, i) => <p key={i}>{p}</p>)
                ) : (
                  <>
                    <p>
                      We, Songbird Consultancy, specialize in providing tailored consultations with a deep understanding of UAE and international laws — guiding individuals and businesses through every stage of their journey.
                    </p>
                    <p>
                      Our work spans Residency &amp; Immigration, Foreign Investments, Second Citizenships, Corporate &amp; Commercial matters, Patent &amp; Trademark, Finance &amp; Insurance, Property &amp; Tourism, and Employment, HR &amp; Management Consultancy.
                    </p>
                    <p>
                      With a multilingual team and proven experience across multiple jurisdictions, we take responsibility for your outcome — delivering full-spectrum advisory under one roof, with transparency and discretion.
                    </p>
                  </>
                )}
              </div>

              <Link
                href="/book-a-consultation"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(31,169,104,.4)]"
                style={{ background: 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)' }}
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-7xl">
          <div className="text-center mb-14">
            <EyebrowTag>What We Stand For</EyebrowTag>
            <h2 className="font-serif font-normal text-[38px] md:text-[48px] leading-tight text-white">Our Core Values</h2>
            <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
            <p className="mt-5 text-[15px] font-sans text-cream/60 max-w-2xl mx-auto">
              Providing customized consultations with a deep understanding of UAE and international laws.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map(v => (
              <div key={v.title} className="p-6 rounded-xl border border-gold-brushed/15 bg-navy-card hover:border-gold-brushed/30 transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-teal/15">
                  <CheckCircle2 className="w-5 h-5 text-teal" />
                </div>
                <h3 className="font-serif font-normal text-[18px] text-white mb-2">{v.title}</h3>
                <p className="text-[13px] font-sans text-cream/55 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Difference — reuse CMS features if available */}
      {features.length > 0 && (
        <section className="py-24 bg-cream">
          <div className="mx-auto px-6 md:px-12 max-w-4xl">
            <div className="text-center mb-12">
              <EyebrowTag>The Songbird Difference</EyebrowTag>
              <h2 className="font-serif font-normal text-[38px] text-ink">Why clients choose us</h2>
              <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map(f => (
                <div key={f.title} className="flex items-start gap-4 p-5 rounded-xl border border-gold-brushed/10 bg-white shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] font-sans font-semibold text-ink">{f.title}</p>
                    <p className="text-[12px] font-sans text-slate leading-relaxed mt-1">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Expertise */}
      <section className="py-24 bg-surface-soft border-t border-hairline">
        <div className="mx-auto px-6 md:px-12 max-w-5xl">
          <div className="text-center mb-12">
            <EyebrowTag>Our Practice Areas</EyebrowTag>
            <h2 className="font-serif font-normal text-[34px] md:text-[44px] leading-tight text-ink">Related Expertise</h2>
            <div className="mx-auto mt-4 w-16 h-px bg-gold" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RELATED_EXPERTISE.map(area => (
              <Link
                key={area}
                href="/services"
                className="flex items-center gap-3 p-5 rounded-xl bg-white border border-hairline hover:border-emerald/40 hover:-translate-y-0.5 transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald shrink-0" />
                <span className="text-[14px] font-sans font-medium text-ink">{area}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
