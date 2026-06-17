'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, CheckCircle2, Loader2, Paperclip, Clock } from 'lucide-react'
import { MonthCalendar } from './MonthCalendar'

const BRAND_GRADIENT = 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)'

type Goal = 'residency' | 'work' | 'business' | 'study' | 'lifestyle'

const GOALS: { id: Goal; label: string; icon: string; desc: string }[] = [
  { id: 'residency', label: 'Residency', icon: '🏠', desc: 'Long-term residency or citizenship' },
  { id: 'work',      label: 'Work',      icon: '💼', desc: 'Work permit or employment visa' },
  { id: 'business',  label: 'Business',  icon: '📈', desc: 'Company setup or investor visa' },
  { id: 'study',     label: 'Study',     icon: '🎓', desc: 'Student visa or education pathway' },
  { id: 'lifestyle', label: 'Lifestyle', icon: '✨', desc: 'Concierge, hospitality, personal advisory' },
]

type SlotChoice = '15min' | '1hour'

const inp = 'w-full px-4 py-3 bg-white/5 border border-gold-brushed/20 rounded-[8px] text-[14px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-teal/50 transition-colors'
const labelCls = 'block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5'

export function EligibilityFlow() {
  const [phase, setPhase] = useState<'goal' | 'form' | 'schedule'>('goal')
  const [goal, setGoal] = useState<Goal | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', nationality: '', location: '', notes: '' })
  const [cvName, setCvName] = useState('')
  const cvRef = useRef<HTMLInputElement>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [slotChoice, setSlotChoice] = useState<SlotChoice | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const update = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))
  const duration = slotChoice === '1hour' ? 60 : 15
  const chargeLabel = slotChoice === '1hour' ? '50 AED' : 'Free'
  const phaseIndex = phase === 'goal' ? 0 : phase === 'form' ? 1 : 2

  const handleSubmit = async () => {
    if (!form.name || !form.email || !selectedDate || !slotChoice) return
    setSubmitting(true)

    let cvUrl: string | undefined
    let cvFileName: string | undefined
    const file = cvRef.current?.files?.[0]
    if (file) {
      try {
        const { uploadFile } = await import('@/lib/uploadFile')
        cvUrl = await uploadFile(file, 'eligibility-cv')
        cvFileName = file.name
      } catch { /* CV upload failed — proceed without it */ }
    }

    const sessionLabel = slotChoice === '1hour' ? '1 hour (50 AED)' : '15 minutes (Free)'

    try {
      const { saveLead } = await import('@/lib/firestorePublic')
      await saveLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        destination: form.location,
        subject: `Eligibility — ${goal}`,
        message: `Goal: ${goal} | Nationality: ${form.nationality} | Date: ${selectedDate} | Session: ${sessionLabel} | Notes: ${form.notes || '—'}`,
        type: 'consultation',
        attachments: cvUrl ? [cvUrl] : [],
        createdAt: Date.now(),
      })
    } catch { /* keep going; show success either way */ }

    const { sendLeadEmail } = await import('@/lib/email')
    await sendLeadEmail({
      type: 'eligibility',
      name: form.name,
      email: form.email,
      phone: form.phone,
      destination: form.location,
      nationality: form.nationality,
      goal: goal ?? undefined,
      message: form.notes,
      date: selectedDate ?? undefined,
      durationMin: duration,
      sessionType: sessionLabel,
      charge: chargeLabel,
      cvUrl,
      cvFileName,
    })

    setSubmitting(false)
    setDone(true)
  }

  if (done) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: BRAND_GRADIENT }}>
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-serif font-medium text-[26px] text-white mb-3">Thank you — you’re all set</h3>
        <p className="text-[14px] font-sans text-cream/60 mb-2 max-w-md mx-auto">
          We’ve received your request for a {duration}-minute session on {selectedDate}.
        </p>
        <p className="text-[13px] font-sans text-gold-brushed mb-8">Our team will confirm your appointment shortly.</p>
        <Link href="/services"
          className="px-7 py-3.5 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] hover:-translate-y-px transition-all inline-block"
          style={{ background: BRAND_GRADIENT }}>
          Explore Our Services
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="flex gap-1 mb-8">
        {[0, 1, 2].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: i <= phaseIndex ? '100%' : '0%', background: BRAND_GRADIENT }} />
          </div>
        ))}
      </div>

      {/* Phase 1 — Goal */}
      {phase === 'goal' && (
        <div>
          <h3 className="font-serif font-medium text-[26px] text-white mb-2">What are you looking to achieve?</h3>
          <p className="text-[14px] font-sans text-cream/55 mb-6">Select your primary goal.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GOALS.map(g => (
              <button key={g.id} type="button" onClick={() => { setGoal(g.id); setPhase('form') }}
                className="flex items-start gap-4 p-4 rounded-xl border border-gold-brushed/15 bg-white/[0.03] hover:border-teal/40 hover:bg-teal/5 transition-all text-left group">
                <span className="text-[28px]">{g.icon}</span>
                <div>
                  <p className="text-[14px] font-sans font-semibold text-white group-hover:text-teal-end transition-colors">{g.label}</p>
                  <p className="text-[12px] font-sans text-cream/50">{g.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Phase 2 — Single form */}
      {phase === 'form' && (
        <div>
          <h3 className="font-serif font-medium text-[26px] text-white mb-2">Tell us about yourself</h3>
          <p className="text-[14px] font-sans text-cream/55 mb-6">A few details so we can prepare for your consultation.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Full Name *</label>
              <input value={form.name} onChange={e => update('name', e.target.value)} className={inp} placeholder="Alexandra Chen" />
            </div>
            <div>
              <label className={labelCls}>Email Address *</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className={inp} placeholder="alex@company.com" />
            </div>
            <div>
              <label className={labelCls}>Phone (optional)</label>
              <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className={inp} placeholder="+971 50 000 0000" />
            </div>
            <div>
              <label className={labelCls}>Nationality</label>
              <input value={form.nationality} onChange={e => update('nationality', e.target.value)} className={inp} placeholder="e.g. British, Indian" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Current City / Country</label>
              <input value={form.location} onChange={e => update('location', e.target.value)} className={inp} placeholder="e.g. London, Mumbai, Dubai" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Notes (optional)</label>
              <textarea value={form.notes} onChange={e => update('notes', e.target.value)} rows={3} className={inp + ' resize-none'} placeholder="Anything you'd like us to know…" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Attach CV (optional)</label>
              <input ref={cvRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                onChange={e => setCvName(e.target.files?.[0]?.name ?? '')} />
              <button type="button" onClick={() => cvRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-[8px] border border-gold-brushed/20 bg-white/5 text-[13px] font-sans text-cream/70 hover:border-teal/40 transition-colors w-full">
                <Paperclip className="w-4 h-4 text-gold-brushed shrink-0" />
                <span className="truncate">{cvName || 'Attach your CV (PDF or Word, max 10 MB)'}</span>
              </button>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setPhase('goal')} className="px-5 py-3 text-[13px] font-sans text-cream/50 hover:text-cream border border-gold-brushed/15 rounded-[6px] transition-colors">Back</button>
            <button type="button" onClick={() => setPhase('schedule')} disabled={!form.name || !form.email}
              className="inline-flex items-center gap-2 px-7 py-3 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] disabled:opacity-40 transition-all hover:-translate-y-px"
              style={{ background: BRAND_GRADIENT }}>
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Phase 3 — Calendar + slot */}
      {phase === 'schedule' && (
        <div>
          <h3 className="font-serif font-medium text-[26px] text-white mb-2">Pick a date &amp; session</h3>
          <p className="text-[14px] font-sans text-cream/55 mb-6">Choose a day and the consultation length that suits you.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MonthCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />

            <div className="space-y-3">
              <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Session length</p>
              {([
                { id: '15min' as SlotChoice, title: '15 minutes', desc: 'Quick eligibility chat', badge: 'FREE', badgeCls: 'text-teal-end' },
                { id: '1hour' as SlotChoice, title: '1 hour', desc: 'In-depth consultation', badge: '50 AED', badgeCls: 'text-gold-brushed' },
              ]).map(opt => {
                const sel = slotChoice === opt.id
                return (
                  <button key={opt.id} type="button" onClick={() => setSlotChoice(opt.id)}
                    className={`w-full flex items-center justify-between gap-3 p-4 rounded-xl border text-left transition-colors ${sel ? 'border-teal text-white' : 'border-gold-brushed/20 text-cream/70 hover:border-gold-brushed/40'}`}
                    style={sel ? { background: BRAND_GRADIENT } : {}}>
                    <span className="flex items-center gap-3">
                      <Clock className={`w-5 h-5 shrink-0 ${sel ? 'text-white' : 'text-gold-brushed'}`} />
                      <span>
                        <span className="block text-[14px] font-sans font-semibold">{opt.title}</span>
                        <span className={`block text-[12px] font-sans ${sel ? 'text-white/80' : 'text-cream/50'}`}>{opt.desc}</span>
                      </span>
                    </span>
                    <span className={`text-[12px] font-sans font-semibold uppercase tracking-[0.1em] ${sel ? 'text-white' : opt.badgeCls}`}>{opt.badge}</span>
                  </button>
                )
              })}
              <p className="text-[12px] font-sans text-cream/40 leading-relaxed pt-1">
                No payment required now — the 50 AED fee for the 1-hour session is settled directly with your advisor.
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button type="button" onClick={() => setPhase('form')} className="px-5 py-3 text-[13px] font-sans text-cream/50 hover:text-cream border border-gold-brushed/15 rounded-[6px] transition-colors">Back</button>
            <button type="button" onClick={handleSubmit} disabled={submitting || !selectedDate || !slotChoice}
              className="inline-flex items-center gap-2 px-7 py-3 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] disabled:opacity-40 transition-all hover:-translate-y-px"
              style={{ background: BRAND_GRADIENT }}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              Confirm Request
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
