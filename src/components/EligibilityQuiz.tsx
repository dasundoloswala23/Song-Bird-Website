'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, CheckCircle2, Loader2 } from 'lucide-react'
import { SERVICES } from '@/lib/services'

const BRAND_GRADIENT = 'linear-gradient(135deg, #1FA968 0%, #0E5C54 50%, #0A3A52 100%)'

type Goal = 'residency' | 'work' | 'business' | 'study' | 'lifestyle'

const GOALS: { id: Goal; label: string; icon: string; desc: string }[] = [
  { id: 'residency', label: 'Residency',  icon: '🏠', desc: 'Long-term residency or citizenship' },
  { id: 'work',      label: 'Work',       icon: '💼', desc: 'Work permit or employment visa' },
  { id: 'business',  label: 'Business',   icon: '📈', desc: 'Company setup or investor visa' },
  { id: 'study',     label: 'Study',      icon: '🎓', desc: 'Student visa or education pathway' },
  { id: 'lifestyle', label: 'Lifestyle',  icon: '✨', desc: 'Concierge, hospitality, personal advisory' },
]

const TIMELINES = [
  { id: 'now',      label: 'Immediately',   desc: 'I want to move as soon as possible' },
  { id: '3months',  label: 'Within 3 months', desc: 'Planning for the near future' },
  { id: '6months',  label: 'Within 6 months', desc: 'Taking my time to prepare' },
  { id: 'nextyear', label: 'Next year+',    desc: 'Still exploring options' },
]

const GOAL_SERVICE_MAP: Record<Goal, string> = {
  residency: 'immigration',
  work:      'immigration',
  business:  'management',
  study:     'immigration',
  lifestyle: 'lifestyle-development',
}

interface ContactForm {
  name: string; email: string; phone: string
}

export function EligibilityQuiz() {
  const [step, setStep]         = useState(0)
  const [goal, setGoal]         = useState<Goal | null>(null)
  const [nationality, setNat]   = useState('')
  const [location, setLocation] = useState('')
  const [timeline, setTimeline] = useState<string | null>(null)
  const [contact, setContact]   = useState<ContactForm>({ name: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone]         = useState(false)

  const recSlug = goal ? GOAL_SERVICE_MAP[goal] : 'immigration'
  const recommended = SERVICES.find(s => s.slug === recSlug) ?? SERVICES[0]

  const inp = 'w-full px-4 py-3 bg-white/5 border border-gold-brushed/20 rounded-[8px] text-[14px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-teal/50 transition-colors'

  const handleSubmit = async () => {
    if (!contact.name || !contact.email) return
    setSubmitting(true)
    const { saveLead } = await import('@/lib/firestorePublic')
    await saveLead({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      destination: location,
      subject: goal ?? '',
      message: `Goal: ${goal}, Timeline: ${timeline}, Nationality: ${nationality}`,
      type: 'inquiry',
      createdAt: Date.now(),
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
        <h3 className="font-serif font-semibold text-[26px] text-white mb-3">Your recommendation is ready</h3>
        <p className="text-[14px] font-sans text-cream/60 mb-6">Based on your profile, we suggest:</p>
        <div className="inline-block bg-navy-card border border-gold-brushed/20 rounded-xl p-6 mb-8 max-w-sm text-left">
          <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-brushed mb-2">Recommended service</p>
          <h4 className="font-serif font-semibold text-[20px] text-white mb-2">{recommended.title}</h4>
          <p className="text-[13px] font-sans text-cream/60 leading-relaxed">{recommended.shortDesc}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/book-a-consultation"
            className="px-7 py-3.5 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] hover:-translate-y-px transition-all inline-block"
            style={{ background: BRAND_GRADIENT }}>
            Book a Consultation
          </Link>
          <Link href={`/services/${recommended.slug}`}
            className="px-7 py-3.5 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-gold-brushed border border-gold-brushed/30 rounded-[6px] hover:border-gold-brushed/60 transition-colors inline-block">
            Learn More
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="flex gap-1 mb-8">
        {[0,1,2,3].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: i <= step ? '100%' : '0%', background: BRAND_GRADIENT }} />
          </div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <h3 className="font-serif font-semibold text-[26px] text-white mb-2">What are you looking to achieve?</h3>
          <p className="text-[14px] font-sans text-cream/55 mb-6">Select your primary goal.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GOALS.map(g => (
              <button key={g.id} onClick={() => { setGoal(g.id); setStep(1) }}
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

      {step === 1 && (
        <div>
          <h3 className="font-serif font-semibold text-[26px] text-white mb-2">Tell us about your profile</h3>
          <p className="text-[14px] font-sans text-cream/55 mb-6">Helps us match you to the right pathway.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Nationality</label>
              <input value={nationality} onChange={e => setNat(e.target.value)} className={inp} placeholder="e.g. British, Indian, South African" />
            </div>
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Current City / Country</label>
              <input value={location} onChange={e => setLocation(e.target.value)} className={inp} placeholder="e.g. London, Mumbai, Cape Town" />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(0)} className="px-5 py-3 text-[13px] font-sans text-cream/50 hover:text-cream border border-gold-brushed/15 rounded-[6px] transition-colors">Back</button>
            <button onClick={() => setStep(2)} disabled={!nationality || !location}
              className="inline-flex items-center gap-2 px-7 py-3 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] disabled:opacity-40 transition-all hover:-translate-y-px"
              style={{ background: BRAND_GRADIENT }}>
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="font-serif font-semibold text-[26px] text-white mb-2">When are you looking to move?</h3>
          <p className="text-[14px] font-sans text-cream/55 mb-6">Select your intended timeline.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TIMELINES.map(t => (
              <button key={t.id} onClick={() => { setTimeline(t.id); setStep(3) }}
                className="flex items-start gap-3 p-4 rounded-xl border border-gold-brushed/15 bg-white/[0.03] hover:border-teal/40 hover:bg-teal/5 transition-all text-left group">
                <div>
                  <p className="text-[14px] font-sans font-semibold text-white group-hover:text-teal-end transition-colors">{t.label}</p>
                  <p className="text-[12px] font-sans text-cream/50">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="mt-4 px-5 py-2.5 text-[13px] font-sans text-cream/50 hover:text-cream border border-gold-brushed/15 rounded-[6px] transition-colors">Back</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="font-serif font-semibold text-[26px] text-white mb-2">Almost there — how can we reach you?</h3>
          <p className="text-[14px] font-sans text-cream/55 mb-6">We'll send your personalised recommendation within minutes.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Full Name</label>
              <input value={contact.name} onChange={e => setContact(c => ({ ...c, name: e.target.value }))} className={inp} placeholder="Alexandra Chen" />
            </div>
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Email Address</label>
              <input type="email" value={contact.email} onChange={e => setContact(c => ({ ...c, email: e.target.value }))} className={inp} placeholder="alex@company.com" />
            </div>
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Phone (optional)</label>
              <input type="tel" value={contact.phone} onChange={e => setContact(c => ({ ...c, phone: e.target.value }))} className={inp} placeholder="+971 50 000 0000" />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(2)} className="px-5 py-3 text-[13px] font-sans text-cream/50 hover:text-cream border border-gold-brushed/15 rounded-[6px] transition-colors">Back</button>
            <button
              onClick={handleSubmit}
              disabled={submitting || !contact.name || !contact.email}
              className="inline-flex items-center gap-2 px-7 py-3 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] disabled:opacity-40 transition-all hover:-translate-y-px"
              style={{ background: BRAND_GRADIENT }}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              See My Results
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
