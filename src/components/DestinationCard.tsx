import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { DestinationDoc } from '@/types/firestore'

interface Props {
  destination: DestinationDoc
}

export function DestinationCard({ destination }: Props) {
  const { slug, name, blurb, image, routes } = destination

  return (
    <Link
      href={`/destinations/${slug}`}
      className="group relative overflow-hidden rounded-2xl block bg-navy-card border border-gold-brushed/10 hover:border-gold-brushed/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(4,38,28,.5)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
      </div>

      {/* Glass panel overlay at bottom */}
      <div className="absolute bottom-0 inset-x-0 p-5 bg-navy/70 backdrop-blur-sm border-t border-gold-brushed/10">
        <h3 className="font-serif font-semibold text-[20px] text-white mb-1">{name}</h3>
        {blurb && <p className="text-[12px] font-sans text-cream/60 mb-3 line-clamp-1">{blurb}</p>}
        {routes?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {routes.slice(0, 3).map(r => (
              <span key={r} className="px-2 py-0.5 rounded-full text-[10px] font-sans font-medium text-teal-end/80 border border-teal/25 bg-teal/10">
                {r}
              </span>
            ))}
            {routes.length > 3 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-sans text-cream/40">+{routes.length - 3}</span>
            )}
          </div>
        )}
        <div className="flex items-center gap-1 text-[12px] font-sans font-medium text-gold-brushed group-hover:text-gold transition-colors">
          View details <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
