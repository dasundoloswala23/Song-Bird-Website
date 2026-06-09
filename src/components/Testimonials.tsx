'use client'

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EyebrowTag } from './EyebrowTag'
import type { TestimonialsSectionDoc, TestimonialItemExtended } from '@/types/firestore'

interface Props {
  content: TestimonialsSectionDoc | null
}

function Stars() {
  return (
    <div className="flex gap-0.5 mb-5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-gold fill-gold" />
      ))}
    </div>
  )
}

function Avatar({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-gold-brushed/20">
      {avatarUrl ? (
        <Image src={avatarUrl} alt={name} width={44} height={44} className="object-cover w-full h-full" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-teal/15 text-[13px] font-sans font-semibold text-teal">
          {initials}
        </div>
      )}
    </div>
  )
}

export function Testimonials({ content }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selected, setSelected] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  if (!content || !content.items || content.items.length === 0) return null

  const items = content.items as TestimonialItemExtended[]

  return (
    <section className="py-24 bg-cream overflow-hidden" aria-labelledby="testimonials-heading" id="testimonials">
      <div className="mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-14">
          <EyebrowTag>Client Stories</EyebrowTag>
          <h2 id="testimonials-heading" className="font-serif font-semibold text-[38px] md:text-[48px] leading-tight text-ink">
            What Our Clients Say
          </h2>
          <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
        </div>

        <div className="relative">
          {/* Decorative serif quote mark */}
          <span
            className="absolute -top-6 left-6 md:left-12 font-serif leading-none text-[160px] text-gold-brushed/8 select-none pointer-events-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {items.map((t, idx) => (
                <div
                  key={idx}
                  className="min-w-[min(100%,560px)] lg:min-w-[min(55%,640px)] flex flex-col p-8 rounded-2xl border border-cloud bg-white shadow-[0_4px_24px_rgba(4,38,28,.06)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(4,38,28,.1)] transition-all duration-300"
                >
                  <Stars />
                  {/* Large serif opening quote */}
                  <p className="font-serif text-[42px] leading-none text-gold-brushed/30 mb-1 select-none" aria-hidden="true">&ldquo;</p>
                  <blockquote className="font-sans text-[15px] text-ink/80 leading-relaxed flex-1 mb-7">
                    {t.quote}
                  </blockquote>
                  <div className="flex items-center gap-3 pt-5 border-t border-cloud">
                    <Avatar name={t.name} avatarUrl={t.avatarUrl} />
                    <div>
                      <p className="font-serif font-semibold text-[16px] text-ink">{t.name}</p>
                      <p className="text-[12px] font-sans text-slate mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-cloud flex items-center justify-center text-slate hover:border-teal hover:text-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    'rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal',
                    i === selected ? 'w-6 h-2 bg-teal' : 'w-2 h-2 bg-cloud',
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-cloud flex items-center justify-center text-slate hover:border-teal hover:text-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
