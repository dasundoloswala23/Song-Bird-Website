import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { EyebrowTag } from '@/components/EyebrowTag'
import { FinalCTA } from '@/components/FinalCTA'
import { getWhyChooseUs } from '@/lib/firestorePublic'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'About Us — Songbird Consulting',
  description: 'Songbird Consulting is a UAE-licensed immigration and business advisory firm headquartered in Dubai, serving clients across 15+ jurisdictions.',
}

const VALUES = [
  { title: 'Transparency', desc: 'No hidden fees. Every step, cost, and timeline laid out before we begin.' },
  { title: 'Precision', desc: 'Meticulous preparation — every application reviewed multiple times before submission.' },
  { title: 'Discretion', desc: 'Your personal and financial information stays private. Always.' },
  { title: 'Accountability', desc: 'UAE-licensed and fully regulated. We stand behind every engagement.' },
]

export default async function AboutPage() {
  const whyContent = await getWhyChooseUs()
  const image    = whyContent?.image    ?? ''
  const badge    = whyContent?.badge
  const features = whyContent?.features ?? []

  return (
    <>
      {/* Hero */}
      <section className="pt-[160px] pb-20 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-4xl text-center">
          <EyebrowTag>Our Story</EyebrowTag>
          <h1 className="font-serif font-semibold text-[48px] md:text-[64px] leading-tight text-white mb-5">
            About Songbird Consulting
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
                    <p className="text-cream/20 text-[13px] font-sans text-center px-8">Office photo<br />(set via Admin → Why Choose Us)</p>
                  </div>
                )}
              </div>
              {badge?.value && (
                <div className="absolute -bottom-5 -right-5 md:bottom-8 md:-right-8 bg-white border-2 border-teal/40 rounded-2xl px-6 py-4 shadow-lg">
                  <p
                    className="font-serif font-semibold text-[36px] leading-none"
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
              <h2 className="font-serif font-semibold text-[36px] md:text-[44px] leading-tight text-ink mb-4">
                Built on trust, powered by expertise
              </h2>
              <div className="w-12 h-px bg-gold-brushed mb-6" />
              <div className="space-y-4 text-[15px] font-sans text-slate leading-relaxed mb-10">
                <p>
                  Songbird Consulting was founded with a clear purpose: to make global mobility seamless for those who have earned the right to choose where they live and build.
                </p>
                <p>
                  From UAE Golden Visas to investor pathways in Europe, North America, and beyond, our team of licensed advisors brings deep jurisdictional knowledge and genuine care to every engagement. We don't just process applications — we architect futures.
                </p>
                <p>
                  Operating from our flagship Dubai office, we have guided thousands of clients through the complexities of immigration law, business formation, maritime regulation, and lifestyle advisory — always with transparency, precision, and discretion.
                </p>
              </div>

              <Link
                href="/book-a-consultation"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(31,169,104,.4)]"
                style={{ background: 'linear-gradient(135deg, #1FA968 0%, #0E5C54 50%, #0A3A52 100%)' }}
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
            <h2 className="font-serif font-semibold text-[38px] md:text-[48px] leading-tight text-white">Our Values</h2>
            <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(v => (
              <div key={v.title} className="p-6 rounded-xl border border-gold-brushed/15 bg-navy-card hover:border-gold-brushed/30 transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-teal/15">
                  <CheckCircle2 className="w-5 h-5 text-teal" />
                </div>
                <h3 className="font-serif font-semibold text-[18px] text-white mb-2">{v.title}</h3>
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
              <h2 className="font-serif font-semibold text-[38px] text-ink">Why clients choose us</h2>
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

      <FinalCTA />
    </>
  )
}
