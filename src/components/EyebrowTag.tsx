import { cn } from '@/lib/utils'

interface EyebrowTagProps {
  children: React.ReactNode
  className?: string
  light?: boolean
}

export function EyebrowTag({ children, className, light }: EyebrowTagProps) {
  return (
    <p
      className={cn(
        'inline-block text-[11px] font-sans font-semibold uppercase tracking-[0.22em] mb-4',
        light ? 'text-gold-brushed' : 'text-gold-deep',
        className,
      )}
    >
      <span className={cn('inline-block w-6 h-px align-middle mr-2', light ? 'bg-gold-brushed' : 'bg-gold')} />
      {children}
    </p>
  )
}
