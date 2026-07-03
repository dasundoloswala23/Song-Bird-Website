'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { EyebrowTag } from '@/components/EyebrowTag'
import { CollaborationJoinForm } from '@/components/CollaborationJoinForm'
import type { CollaborationsDoc } from '@/types/firestore'

export function CollaborationJoinSection({ fallback }: { fallback: CollaborationsDoc }) {
  const [content, setContent] = useState(fallback)

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getCollaborations }) =>
      getCollaborations().then(d => { if (d) setContent(d) })
    )
  }, [])

  if (!content.joinTitle) return null

  const categories = content.categories ?? []
  const benefits   = content.benefits   ?? []

  return (
    <>
      {/* Hero title bar — Collaborating.png background with emerald overlay (mirrors home hero) */}
      <section className="relative pt-[160px] pb-20 bg-navy overflow-hidden">
        <Image
          src="/images/collaborating.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, rgba(14,92,84,0.92) 0%, rgba(15,124,90,0.66) 45%, rgba(31,169,104,0.32) 100%)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(11,61,46,0.85), transparent)' }} />

        <div className="relative z-10 mx-auto px-6 md:px-12 max-w-6xl text-center">
          {content.joinEyebrow && <EyebrowTag light>{content.joinEyebrow}</EyebrowTag>}
          <h2 className="font-serif font-normal text-[38px] md:text-[50px] leading-tight text-white mb-3">
            {content.joinTitle}
          </h2>
          {content.tagline && (
            <p className="text-[16px] font-sans font-semibold text-gold-brushed uppercase tracking-[0.12em] mb-4">
              {content.tagline}
            </p>
          )}
          <div className="mx-auto w-16 h-px bg-gold-brushed" />
        </div>
      </section>

      {/* Join section */}
      <section className="pb-24 pt-16 bg-navy">
      <div className="mx-auto px-6 md:px-12 max-w-6xl">

        {content.joinIntro && (
          <p className="text-[15px] md:text-[16px] font-sans text-cream/75 max-w-2xl mx-auto text-center leading-relaxed mb-14">
            {content.joinIntro}
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left: Categories + Benefits */}
          <div className="space-y-10">

            {categories.length > 0 && (
              <div>
                <h3 className="font-serif font-normal text-[22px] text-white mb-6">Who Can Join?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map((cat, i) => (
                    <div key={i} className="rounded-xl border border-gold-brushed/20 bg-navy-card p-5">
                      <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-gold-brushed mb-3">
                        {cat.groupLabel}
                      </p>
                      <ul className="space-y-1.5">
                        {cat.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />
                            <span className="text-[13px] font-sans text-cream/70">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {benefits.length > 0 && (
              <div>
                <h3 className="font-serif font-normal text-[22px] text-white mb-6">Business Benefits</h3>
                <ul className="space-y-3">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                      <span className="text-[14px] font-sans text-cream/75">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Inquiry Form */}
          <div>
            <h3 className="font-serif font-normal text-[22px] text-white mb-6">Join With Us</h3>
            <CollaborationJoinForm />
          </div>
        </div>

      </div>
      </section>
    </>
  )
}
