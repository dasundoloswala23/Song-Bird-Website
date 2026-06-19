import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { DestinationDoc } from '@/types/firestore'

interface Props {
  destination: DestinationDoc
}

export function DestinationCard({ destination }: Props) {
  const { name, image, slug, routes, sections, overview } = destination

  // Hover preview = this destination's section titles (the "On this page" topics);
  // fall back to the routes list when there are no sections yet.
  const sectionTitles = [
    ...(overview?.trim() ? ['Overview'] : []),
    ...(sections ?? []).map(s => s.title).filter(Boolean),
  ]
  const topics = sectionTitles.length > 0 ? sectionTitles : (routes ?? [])
  const hasTopics = topics.length > 0

  return (
    <Link
      href={`/destinations/${slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-navy-card border border-gold-brushed/10"
    >
      {/* Image */}
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-card to-teal/10" />
      )}

      {/* Resting state: subtle bottom fade + country name only */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
      <h3 className="absolute bottom-0 left-0 p-5 font-serif font-normal text-[22px] text-white">
        {name}
      </h3>

      {/* Hover popup: this destination's section titles (topics) */}
      <div className="absolute inset-0 flex flex-col justify-end gap-3 p-5 bg-navy/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-y-auto">
        <h3 className="font-serif font-normal text-[22px] text-white">{name}</h3>
        {hasTopics && (
          <ul className="space-y-1.5">
            {topics.map((t, i) => (
              <li key={`${t}-${i}`} className="flex items-center gap-2 text-[13px] font-sans text-cream/85">
                <ArrowRight className="w-3.5 h-3.5 text-gold-brushed shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  )
}
