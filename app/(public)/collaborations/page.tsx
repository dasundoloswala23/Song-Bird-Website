import type { Metadata } from 'next'
import Image from 'next/image'
import { EyebrowTag } from '@/components/EyebrowTag'
import { FinalCTA } from '@/components/FinalCTA'
import { CollaborationJoinSection } from '@/components/CollaborationJoinSection'
import { getCollaborations } from '@/lib/firestorePublic'
import type { CollaborationsDoc } from '@/types/firestore'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Collaborations',
  description: 'Our partnerships and affiliated institutions — the network behind Songbird Consultancy.',
}

const DEFAULT: CollaborationsDoc = {
  eyebrow: 'Our Network',
  title: 'Collaborations & Partnerships',
  intro: 'We work alongside trusted partners and affiliated institutions to deliver full-spectrum advisory across jurisdictions. Partner logos and details will appear here.',
  partners: [],
}

export default async function CollaborationsPage() {
  const content  = (await getCollaborations()) ?? DEFAULT
  const partners = content.partners?.length ? content.partners : []

  return (
    <>
      <section className="pt-[160px] pb-20 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-4xl text-center">
          <EyebrowTag light>{content.eyebrow}</EyebrowTag>
          <h1 className="font-serif font-semibold text-[42px] md:text-[56px] leading-tight text-white mb-4">
            {content.title}
          </h1>
          <div className="mx-auto w-16 h-px bg-gold-brushed mb-5" />
          <p className="text-[16px] font-sans text-cream/65 max-w-2xl mx-auto leading-relaxed">{content.intro}</p>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-6xl">
          {partners.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((p, i) => {
                const card = (
                  <div className="h-full flex flex-col items-center text-center gap-4 rounded-2xl bg-white border border-hairline p-8 transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(4,38,28,.08)]">
                    <div className="flex items-center justify-center h-20">
                      {p.logo ? (
                        <Image src={p.logo} alt={p.name} width={160} height={80} className="object-contain max-h-16 w-auto" unoptimized />
                      ) : (
                        <span className="font-serif font-semibold text-[20px] text-slate/70">{p.name}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[18px] text-ink mb-1">{p.name}</h3>
                      {p.blurb && <p className="text-[13px] font-sans text-slate leading-relaxed">{p.blurb}</p>}
                    </div>
                  </div>
                )
                return p.url ? (
                  <a key={i} href={p.url} target="_blank" rel="noopener noreferrer">{card}</a>
                ) : (
                  <div key={i}>{card}</div>
                )
              })}
            </div>
          ) : (
            <div className="text-center rounded-2xl border border-dashed border-hairline bg-white py-20 px-6">
              <p className="text-[15px] font-sans text-slate">Partner logos and partnership details will be added here soon.</p>
            </div>
          )}
        </div>
      </section>

      <CollaborationJoinSection content={content} />

      <FinalCTA />
    </>
  )
}
