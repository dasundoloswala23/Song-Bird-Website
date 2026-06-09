import { Star } from 'lucide-react'
import { EyebrowTag } from './EyebrowTag'

/**
 * Google Reviews block. Heading + supporting line per the brief.
 * Real reviews will be added once supplied by the client.
 */
export function GoogleReviews() {
  return (
    <section className="py-24 bg-cream" aria-labelledby="google-reviews-heading">
      <div className="mx-auto px-6 md:px-12 max-w-3xl text-center">
        <EyebrowTag>Reviews</EyebrowTag>
        <h2 id="google-reviews-heading" className="font-serif font-semibold text-[36px] md:text-[48px] leading-tight text-ink mb-3">
          Review on Google
        </h2>
        <p className="text-[16px] font-sans text-slate mb-8">We are proud to pronounce your compliments.</p>
        <div className="flex items-center justify-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-6 h-6 text-gold fill-gold" />
          ))}
        </div>
        <p className="text-[13px] font-sans text-slate/70">Client reviews coming soon.</p>
      </div>
    </section>
  )
}
