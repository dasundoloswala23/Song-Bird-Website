import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ComponentType } from 'react'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  href: string
  isPrimary?: boolean
  className?: string
}

export function ServiceCard({ icon: Icon, title, description, href, isPrimary, className }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(10,23,56,.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-brushed',
        isPrimary
          ? 'bg-white border-gold-brushed/50 shadow-md'
          : 'bg-white border-cloud hover:border-gold-brushed/30',
        className,
      )}
    >
      <div className={cn(
        'w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors',
        isPrimary ? 'bg-navy text-gold-brushed' : 'bg-cream text-ink group-hover:bg-navy group-hover:text-gold-brushed',
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="font-serif font-medium text-[17px] text-ink mb-2 leading-snug">
        {title}
      </h4>
      <p className="font-sans text-[13px] text-slate leading-relaxed flex-1">
        {description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-sans font-semibold uppercase tracking-[0.1em] text-gold-brushed group-hover:gap-2 transition-all">
        Explore
        <ArrowRight className="w-3 h-3" />
      </span>
    </Link>
  )
}
