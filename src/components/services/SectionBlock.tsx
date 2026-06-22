'use client'

import { useState } from 'react'
import { MessageCircle, Mail, Check, Loader2 } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'
import { renderRichHtml } from '@/lib/richText'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import type { ServiceSection, SectionTab, ReserveCtaDoc } from '@/types/firestore'

// Prefer the new `tabs` array; fall back to legacy body/serviceBody so old content still works.
function resolveTabs(section: ServiceSection): SectionTab[] {
  const tabs = section.tabs?.length
    ? section.tabs.filter(t => t.label?.trim() || t.body?.trim())
    : [
        { label: 'Overview', body: section.body || '' },
        ...(section.serviceBody?.trim() ? [{ label: 'Our Service', body: section.serviceBody }] : []),
      ]
  return tabs.length ? tabs : [{ label: 'Overview', body: section.body || '' }]
}

// "Reserve your free consultation" CTA shown under a section. Channels are independently
// toggled in the admin panel. WhatsApp opens a wa.me chat; Email auto-sends a notification.
export function ReserveButtons({ subject, settings }: { subject: string; settings: ReserveCtaDoc }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  if (!settings.whatsappEnabled && !settings.emailEnabled) return null

  const waUrl = buildWhatsAppUrl(
    WHATSAPP_NUMBER,
    `Hello Songbird, I would like to reserve a free consultation regarding ${subject}.`,
  )

  const sendEmail = async () => {
    if (status !== 'idle') return
    setStatus('sending')
    try {
      const { sendLeadEmail } = await import('@/lib/email')
      await sendLeadEmail({
        type: 'inquiry',
        name: 'Website visitor',
        subject: `Free consultation request — ${subject}`,
        message: `A visitor requested a free consultation regarding "${subject}" via the Reserve button.`,
      })
    } catch { /* best-effort */ }
    setStatus('sent')
  }

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-3">
        {settings.whatsappEnabled && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-[12px] font-sans font-semibold uppercase tracking-[0.08em] rounded-full transition-all hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            style={{ background: 'linear-gradient(95deg, #22B877 0%, #0E7C5A 100%)' }}
          >
            <MessageCircle className="w-4 h-4" /> Reserve Your Free Consultation
          </a>
        )}
        {settings.emailEnabled && (
          <button
            type="button"
            onClick={sendEmail}
            disabled={status !== 'idle'}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[12px] font-sans font-semibold uppercase tracking-[0.08em] rounded-full border border-gold-brushed/50 text-ink hover:bg-surface-muted disabled:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-brushed"
          >
            {status === 'sent'
              ? <><Check className="w-4 h-4 text-teal" /> Request sent</>
              : status === 'sending'
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                : <><Mail className="w-4 h-4 text-gold-deep" /> Reserve via Email</>}
          </button>
        )}
      </div>
    </div>
  )
}

export function SectionStats({ stats }: { stats?: ServiceSection['stats'] }) {
  if (!stats?.some(st => st.label || st.value)) return null
  return (
    <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
      {stats.filter(st => st.label || st.value).map((st, i) => (
        <div key={`${st.label}-${i}`} className="flex flex-col">
          <span className="font-serif font-normal text-gold leading-none text-[30px] md:text-[36px] whitespace-nowrap">{st.label}</span>
          <span className="mt-1.5 text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-slate">{st.value}</span>
        </div>
      ))}
    </div>
  )
}

// One section block: title, optional Overview/Our Service tabs, rich-text body (card-style
// bullet lists via .sb-cards), optional stats, and an optional Reserve CTA.
export function SectionBlock({ section, reserve }: { section: ServiceSection; reserve?: { subject: string; settings: ReserveCtaDoc } }) {
  const tabs = resolveTabs(section)
  const [active, setActive] = useState(0)
  const activeTab = tabs[active] ?? tabs[0]
  const activeBody = activeTab.body

  return (
    <section id={section.id} className="scroll-mt-32 py-12 border-b border-cloud last:border-b-0 first:pt-0">
      {section.showTitle !== false && (
        <h2 className="font-serif font-normal text-[30px] md:text-[34px] text-ink mb-5">{section.title}</h2>
      )}

      {tabs.length > 1 && (
        <div className="flex flex-wrap gap-6 border-b border-cloud mb-6">
          {tabs.map((t, i) => (
            <button
              key={`${t.label}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative -mb-px pb-3 text-[13px] font-sans font-semibold uppercase tracking-[0.08em] transition-colors ${
                active === i ? 'text-ink' : 'text-slate hover:text-ink'
              }`}
            >
              {t.label || `Tab ${i + 1}`}
              {active === i && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gold" />}
            </button>
          ))}
        </div>
      )}

      <div className="sb-prose sb-cards" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: renderRichHtml(activeBody) }} />
      <SectionStats stats={section.stats} />
      <FeatureCards cards={activeTab.cards} />
      <FeatureCards cards={section.cards} />
      {reserve && <ReserveButtons subject={reserve.subject} settings={reserve.settings} />}
    </section>
  )
}

function FeatureCards({ cards }: { cards?: ServiceSection['cards'] }) {
  const items = cards?.filter(c => c.title || c.subtitle || c.icon) ?? []
  if (items.length === 0) return null
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((c, i) => (
        <div key={`${c.title}-${i}`} className="flex flex-col items-center text-center rounded-xl border border-cloud bg-white p-6">
          {c.icon && <img src={c.icon} alt="" className="h-12 w-12 object-contain mb-4" />}
          {c.title && <h3 className="font-serif font-normal text-[18px] text-ink mb-2">{c.title}</h3>}
          {c.subtitle && <p className="text-[13px] font-sans text-slate leading-relaxed">{c.subtitle}</p>}
        </div>
      ))}
    </div>
  )
}
