import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { EyebrowTag } from './EyebrowTag'

const ARTICLES = [
  {
    date:     'May 2025',
    category: 'Visa Update',
    title:    'UAE Golden Visa: What Changed in 2025 and Who Qualifies Now',
    excerpt:  'A plain-language breakdown of the latest eligibility criteria, investment thresholds, and the application pathway for the UAE Golden Visa.',
    href:     '/insights',
  },
  {
    date:     'April 2025',
    category: 'Advisory',
    title:    'Five Mistakes to Avoid When Applying for Dubai Residency',
    excerpt:  'From incomplete documentation to missed deadlines — our case managers share the most common errors that delay or derail applications.',
    href:     '/insights',
  },
  {
    date:     'March 2025',
    category: 'Market',
    title:    'Global-Talent Visas Compared: UAE, UK, Canada, and Australia',
    excerpt:  'We map out the four most sought-after global-talent schemes side by side so you can identify the best fit for your profile and goals.',
    href:     '/insights',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  'Visa Update': 'bg-teal/10 text-teal',
  'Advisory':   'bg-gold-brushed/15 text-gold-brushed',
  'Market':     'bg-emerald/10 text-emerald',
}

export function Insights() {
  return (
    <section className="py-24 bg-cream" aria-labelledby="insights-heading">
      <div className="mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-14">
          <EyebrowTag>From Our Desk</EyebrowTag>
          <h2 id="insights-heading" className="font-serif font-semibold text-[38px] md:text-[48px] leading-tight text-ink">
            Insights
          </h2>
          <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((article, idx) => (
            <Link
              key={idx}
              href={article.href}
              className="group flex flex-col rounded-2xl border border-cloud bg-white overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(4,38,28,.12)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              {/* Brand gradient top strip */}
              <div
                className="h-1.5 w-full shrink-0"
                style={{ background: 'linear-gradient(90deg, #1FA968 0%, #5EEA8A 100%)' }}
                aria-hidden="true"
              />

              <div className="flex flex-col flex-1 p-6">
                {/* Category chip + date */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-[0.1em] ${CATEGORY_COLORS[article.category] ?? 'bg-cloud text-slate'}`}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-sans font-semibold uppercase tracking-[0.1em] text-slate/60">
                    <CalendarDays className="w-3 h-3 text-gold-brushed" />
                    {article.date}
                  </div>
                </div>

                <h3 className="font-serif font-semibold text-[18px] text-ink leading-snug mb-3 flex-1">
                  {article.title}
                </h3>
                <p className="text-[13px] font-sans text-slate leading-relaxed mb-5">
                  {article.excerpt}
                </p>

                <span className="inline-flex items-center gap-1 text-[12px] font-sans font-semibold uppercase tracking-[0.1em] text-teal group-hover:gap-2 group-hover:text-emerald transition-all">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
