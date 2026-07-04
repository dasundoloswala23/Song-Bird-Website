import { Plus } from 'lucide-react'
import { decodeEntities } from '@/lib/utils'
import type { FAQ } from '@/types/firestore'

/**
 * Presentational FAQ list — native <details>/<summary> so every answer stays in
 * the DOM (crawlable/quotable by Google AI Overviews and answer engines) with no
 * JS required. Shared by the /faq hub and destination detail pages.
 */
export function FaqAccordion({ items }: { items: FAQ[] }) {
  const faqs = items?.filter(f => f.question && f.answer) ?? []
  if (!faqs.length) return null

  return (
    <div className="divide-y divide-gold-brushed/15 border-y border-gold-brushed/15">
      {faqs.map((faq, i) => (
        <details key={i} className="group py-1">
          <summary className="flex items-start justify-between gap-4 cursor-pointer list-none py-4 text-[16px] md:text-[17px] font-sans font-medium text-ink hover:text-emerald transition-colors">
            {decodeEntities(faq.question)}
            <Plus className="w-5 h-5 shrink-0 mt-0.5 text-gold-brushed transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <p className="pb-5 pr-9 text-[15px] font-sans leading-relaxed text-slate">
            {decodeEntities(faq.answer)}
          </p>
        </details>
      ))}
    </div>
  )
}
