import { EyebrowTag } from './EyebrowTag'
import { ApplicationCTA } from './ApplicationCTA'
import type { ProcessSectionDoc } from '@/types/firestore'

const NODE_GRADIENT = 'linear-gradient(135deg, #1A6B7E 0%, #3FB68A 100%)'

interface Props {
  content: ProcessSectionDoc | null
}

export function ProcessSection({ content }: Props) {
  if (!content || !content.steps || content.steps.length === 0) return null

  const steps = content.steps
  const sectionTitle = content.title || 'Our Process'
  const stepNums = steps.map((_, i) => String(i + 1).padStart(2, '0'))

  return (
    <section className="py-24 bg-cream" aria-labelledby="process-heading">
      <div className="mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-16">
          <EyebrowTag>How It Works</EyebrowTag>
          <h2 id="process-heading" className="font-serif font-semibold text-[38px] md:text-[48px] leading-tight text-ink">
            {sectionTitle}
          </h2>
          <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative mb-14">
          {/* Connecting line behind nodes */}
          <div
            className="absolute top-6 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 2%, rgba(26,107,126,0.25) 10%, rgba(63,182,138,0.25) 90%, transparent 98%)' }}
            aria-hidden="true"
          />

          <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-2">
                {/* Gradient circle node */}
                <div
                  className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-5 ring-4 ring-teal/10 shrink-0"
                  style={{ background: NODE_GRADIENT }}
                >
                  <span className="font-serif font-semibold text-[16px] text-white select-none">
                    {stepNums[idx]}
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-[17px] text-ink mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[13px] font-sans text-slate leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative mb-14 pl-8">
          {/* Vertical connecting line */}
          <div
            className="absolute top-0 bottom-0 left-[23px] w-px"
            style={{ background: 'linear-gradient(180deg, rgba(26,107,126,0.3) 0%, rgba(63,182,138,0.3) 100%)' }}
            aria-hidden="true"
          />

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex gap-5">
                {/* Node */}
                <div
                  className="absolute -left-8 top-0 z-10 w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-teal/10 shrink-0"
                  style={{ background: NODE_GRADIENT }}
                >
                  <span className="font-serif font-semibold text-[14px] text-white select-none">
                    {stepNums[idx]}
                  </span>
                </div>
                {/* Content */}
                <div className="pt-1">
                  <h3 className="font-serif font-semibold text-[17px] text-ink mb-1.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[13px] font-sans text-slate leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <ApplicationCTA />
        </div>
      </div>
    </section>
  )
}
