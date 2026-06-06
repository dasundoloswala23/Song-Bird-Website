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
        light ? 'text-gold-brushed' : 'text-gold-brushed',
        className,
      )}
    >
      <span className="inline-block w-6 h-px bg-gold-brushed align-middle mr-2" />
      {children}
    </p>
  )
}
