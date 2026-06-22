'use client'

import React from 'react'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { EyebrowTag } from './EyebrowTag'
import type { TestimonialsSectionDoc, TestimonialItemExtended } from '@/types/firestore'

interface Props {
  content: TestimonialsSectionDoc | null
}

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
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
  if (!content || !content.items || content.items.length === 0) return null

  const items = content.items as TestimonialItemExtended[]

  return (
    <section className="py-24 bg-cream overflow-hidden" aria-labelledby="testimonials-heading" id="testimonials">
      <div className="mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-14">
          <EyebrowTag>Client Stories</EyebrowTag>
          <h2 id="testimonials-heading" className="font-serif font-normal text-[34px] md:text-[44px] leading-tight text-ink">
            "We Are Proud to Pronounce Your Compliments"
          </h2>
          <div className="mx-auto mt-4 w-16 h-px bg-gold-brushed" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, idx) => (
            <figure
              key={idx}
              className="relative flex flex-col p-7 rounded-2xl border border-cloud bg-white shadow-[0_4px_24px_rgba(4,38,28,.06)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(4,38,28,.1)] transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gold-brushed/15" aria-hidden="true" />
              <Stars />
              <blockquote className="font-sans text-[14px] text-ink/80 leading-relaxed flex-1 mb-6">
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-5 border-t border-cloud">
                <Avatar name={t.name} avatarUrl={t.avatarUrl} />
                <div>
                  <p className="font-serif font-normal text-[16px] text-ink">{t.name}</p>
                  <p className="text-[12px] font-sans text-slate mt-0.5">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
