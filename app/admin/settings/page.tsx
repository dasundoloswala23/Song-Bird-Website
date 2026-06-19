'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import type { ReserveCtaDoc } from '@/types/firestore'

const DEFAULT: ReserveCtaDoc = { whatsappEnabled: true, emailEnabled: false }

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors ${value ? 'bg-gold' : 'bg-navy/60 border border-gold-brushed/20'}`}
        aria-pressed={value}
      >
        <span className="absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform" style={{ left: value ? '22px' : '2px' }} />
      </button>
      <span className="text-[13px] font-sans text-cream/60">{label}</span>
    </div>
  )
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState<ReserveCtaDoc>(DEFAULT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getReserveCta }) =>
      getReserveCta().then(d => { if (d) setForm(d); setLoading(false) })
    )
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { saveReserveCta } = await import('@/lib/firestorePublic')
      await saveReserveCta(form)
      setToast('Saved!')
    } catch { setToast('Error saving.') }
    setSaving(false)
    setTimeout(() => setToast(''), 3000)
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-serif font-normal text-[28px] text-white mb-2">Reserve Button (Consultation CTA)</h1>
      <p className="text-[13px] font-sans text-cream/50 mb-8">
        Controls the &ldquo;Reserve your free consultation&rdquo; buttons shown under each section (visa type)
        on Sectioned service pages. Each enabled channel shows its own button.
      </p>

      <form onSubmit={onSubmit}>
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6 space-y-5">
          <Toggle
            value={form.whatsappEnabled}
            onChange={v => setForm({ ...form, whatsappEnabled: v })}
            label="Show WhatsApp button (opens a chat with the visa type)"
          />
          <Toggle
            value={form.emailEnabled}
            onChange={v => setForm({ ...form, emailEnabled: v })}
            label="Show Email button (auto-notifies info@songbird.ae with the visa type)"
          />
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-deep disabled:opacity-60 text-navy text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
          {toast && <p className={`text-[13px] font-sans ${toast.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>{toast}</p>}
        </div>
      </form>
    </div>
  )
}
