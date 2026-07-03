import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { EyebrowTag } from '@/components/EyebrowTag'
import { FinalCTA } from '@/components/FinalCTA'
import { Accreditations } from '@/components/Accreditations'
import { getWhyChooseUs, getAccreditations } from '@/lib/firestorePublic'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'About Us — UAE-Licensed Immigration Consultancy',
  description: 'Songbird Consultancy is a UAE-licensed immigration and business advisory firm serving clients across the UAE, GCC, EU, and Asia — 15+ years of international recognition and 20,000+ clients served.',
  alternates: { canonical: '/about/' },
}

// "Who We Are & Our Focus" story paragraphs.
const WHO_WE_ARE = [
  'Since 2015, we have supported clients across different regions with expert legal leadership. With proven experience in multiple jurisdictions, we take responsibility for your outcome in any arena.',
  'As a combination of international forums, we serve clients from the UAE across the GCC, EU, Sri Lanka, India and other Asian regional countries. Our expert advisors and legal consultants, international affiliated institutes, international law firms and partners combine to deliver practical strategies and expert knowledge.',
  'We consider every client to have a unique inquiry and case depending on their circumstances and requirements. Focusing on practical, concrete solutions and realistic professional advice, we treat our clients with accurate documentation rather than verbal guarantees. All process steps, timelines, payments and outcomes are transparent, structured in writing and receipted. We undertake your matter with end-to-end consultancy solutions under one doorstep.',
]

// Vision / Mission / Philosophy pillars.
const PILLARS = [
  {
    title: 'Our Vision',
    body: 'To lead individuals and corporate entities globally by offering complete, reliable guidance and end-to-end services in skilled and business-investment migration, education, travel, and professional and lifestyle development. We uplift your status.',
  },
  {
    title: 'Our Mission',
    body: 'To expand overseas opportunities efficiently and competently for skilled professionals, individuals and business investors who seek the foreign labour market — building a higher standard of living through new employment, business investment and relocation globally.',
  },
  {
    title: 'Our Philosophy',
    body: 'In a global arena, cross-border relationships have expanded far beyond national boundaries. We simplify the complex relocation process in accordance with immigration rules and regulations, providing accurate expertise and guidance with an exceptional standard of professional ethics — building long-lasting relationships among individuals, professionals, partners, investors and associates to achieve common goals.',
  },
]

const CORE_VALUES_INTRO =
  'Our core values of Integrity, Excellence, Innovation and Client Focus are applied to everything we do. At the centre of our practice we uphold the highest ethical standards at every step of your inquiry, striving for the best practical outcomes — tailored to the specific requirements of our clientele.'

const CORE_VALUE_POINTS = [
  'Full-Spectrum Consultancy Services Under One Roof',
  'Over 10+ Years of Combined Professional Experience',
  'Multilingual Team for Accurate Access',
  'Client-Centric Approach',
  'Proven Track Record for a Higher Success Ratio',
]

const VALUES = [
  { title: 'Customized Solutions', desc: 'Advice shaped around your goals, profile and timeline — never one-size-fits-all.' },
  { title: 'Client Satisfaction', desc: 'Your outcome is our measure of success at every stage.' },
  { title: 'Customized Pricing Structure', desc: 'Transparent, flexible pricing matched to the scope of your engagement.' },
  { title: 'Expertise & Experience', desc: 'Over a decade of combined professional experience across jurisdictions.' },
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

// Fallback "Why Clients Choose Us" points if the CMS has none yet.
const WHY_FALLBACK = [
  { title: 'Full-Spectrum Consultancy', description: 'Immigration, legal, financial and lifestyle advisory under one roof.' },
  { title: '10+ Years of Experience', description: 'Combined professional experience across multiple jurisdictions.' },
  { title: 'Multilingual Team', description: 'Accurate access and clear communication in your language.' },
  { title: 'Client-Centric Approach', description: 'Every case handled around your specific circumstances and goals.' },
  { title: 'Proven Track Record', description: 'A higher success ratio built on realistic, professional advice.' },
  { title: 'Transparent & Written', description: 'Steps, timelines, payments and outcomes — structured in writing.' },
]

export default async function AboutPage() {
  const [whyContent, accreditations] = await Promise.all([getWhyChooseUs(), getAccreditations()])
  const image    = whyContent?.image ?? ''
  const badge    = whyContent?.badge
  const features = (whyContent?.features?.length ? whyContent.features : WHY_FALLBACK)

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

      {/* Who We Are & Our Focus */}
      <section className="py-24 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy-card border border-gold-brushed/15 shadow-[0_24px_64px_rgba(4,38,28,.15)]">
                {image ? (
                  <Image src={image} alt="Songbird immigration consultants office in UAE" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
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
              <EyebrowTag>Our Difference</EyebrowTag>
              <h2 className="font-serif font-normal text-[36px] md:text-[44px] leading-tight text-ink mb-4">
                Who We Are &amp; Our Focus
              </h2>
              <p className="font-sans text-[13px] uppercase tracking-[0.24em] text-gold-deep mb-4">
                Expert Legal Leadership Since 2015
              </p>
              <div className="w-12 h-px bg-gold mb-6" />
              <div className="space-y-4 text-[15px] font-sans text-slate leading-relaxed mb-10">
                {WHO_WE_ARE.map((p, i) => <p key={i}>{p}</p>)}
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

      {/* Intro video */}
      <section className="py-20 bg-navy-deep">
        <div className="mx-auto px-6 md:px-12 max-w-4xl text-center">
          <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-gold-brushed mb-3">Inside Songbird</p>
          <h2 className="font-serif font-normal text-[30px] md:text-[40px] leading-tight text-white mb-8">A Closer Look</h2>
          <div className="relative rounded-2xl overflow-hidden border border-gold-brushed/15 shadow-[0_24px_64px_rgba(4,38,28,.3)]">
            <video
              src="/videos/insight.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>

      {/* Vision / Mission / Philosophy */}
      <section className="py-24 bg-surface-soft border-y border-hairline">
        <div className="mx-auto px-6 md:px-12 max-w-7xl">
          <div className="text-center mb-14">
            <EyebrowTag>What Drives Us</EyebrowTag>
            <h2 className="font-serif font-normal text-[34px] md:text-[44px] leading-tight text-ink">Vision, Mission &amp; Philosophy</h2>
            <div className="mx-auto mt-4 w-16 h-px bg-gold" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map(p => (
              <div key={p.title} className="p-8 rounded-2xl bg-white border border-hairline shadow-sm">
                <h3 className="font-serif font-normal text-[24px] text-ink mb-3">{p.title}</h3>
                <div className="w-10 h-px bg-gold-brushed mb-4" />
                <p className="text-[14px] font-sans text-slate leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-7xl">
          <div className="text-center mb-12">
            <EyebrowTag>What We Stand For</EyebrowTag>
            <h2 className="font-serif font-normal text-[38px] md:text-[48px] leading-tight text-white">Our Core Values</h2>
            <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
            <p className="mt-5 text-[15px] font-sans text-cream/60 max-w-2xl mx-auto">
              Providing customized consultations with a deep understanding of UAE and international laws.
            </p>
          </div>

          {/* Intro + key differentiators */}
          <div className="max-w-3xl mx-auto mb-14">
            <p className="text-[15px] font-sans text-cream/70 leading-relaxed text-center mb-7">{CORE_VALUES_INTRO}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CORE_VALUE_POINTS.map(point => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                  <span className="text-[14px] font-sans text-cream/85">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map(v => (
              <div key={v.title} className="p-6 rounded-xl border border-gold-brushed/15 bg-navy-card hover:border-gold-brushed/30 transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-gold/15">
                  <CheckCircle2 className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif font-normal text-[18px] text-white mb-2">{v.title}</h3>
                <p className="text-[13px] font-sans text-cream/55 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase image */}
      <section className="py-20 bg-navy-deep">
        <div className="mx-auto px-6 md:px-12 max-w-5xl">
          <div className="relative rounded-2xl overflow-hidden border border-gold-brushed/15 shadow-[0_24px_64px_rgba(4,38,28,.3)]">
            <Image src="/images/aboutt.png" alt="Songbird Consultancy — immigration and visa advisory team UAE" width={1600} height={900} className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* The Songbird Difference */}
      <section className="py-24 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-12">
            <EyebrowTag>The Songbird Difference</EyebrowTag>
            <h2 className="font-serif font-normal text-[34px] md:text-[44px] leading-tight text-ink">Why Clients Choose Us</h2>
            <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map(f => (
              <div key={f.title} className="flex items-start gap-4 p-5 rounded-xl border border-gold-brushed/10 bg-white shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                <div>
                  <p className="text-[14px] font-sans font-semibold text-ink">{f.title}</p>
                  <p className="text-[12px] font-sans text-slate leading-relaxed mt-1">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Accreditations & Licenses */}
      <Accreditations fallback={accreditations} />

      {/* Power your next step band */}
      <section className="py-16 bg-navy text-center">
        <div className="mx-auto px-6 md:px-12 max-w-3xl">
          <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-gold-brushed mb-3">Power Your Next Step Abroad</p>
          <p className="font-serif font-normal text-[26px] md:text-[32px] leading-tight text-white">With Songbird Consultancy</p>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
