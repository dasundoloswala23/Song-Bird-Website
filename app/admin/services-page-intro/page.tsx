'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { DEFAULT_SERVICES_PAGE_INTRO } from '@/components/ServicesIntro'
import type { ServicesIntroDoc } from '@/types/firestore'

const inp = 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50'

export default function AdminServicesPageIntroPage() {
  const [form, setForm] = useState<ServicesIntroDoc>(DEFAULT_SERVICES_PAGE_INTRO)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getServicesPageIntro }) =>
      getServicesPageIntro().then(d => { if (d) setForm(d); setLoading(false) })
    )
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { saveServicesPageIntro } = await import('@/lib/firestorePublic')
      await saveServicesPageIntro(form)
      setToast('Saved!')
    } catch { setToast('Error saving.') }
    setSaving(false)
    setTimeout(() => setToast(''), 3000)
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-serif font-medium text-[28px] text-white mb-2">Services Page Intro</h1>
      <p className="text-[13px] font-sans text-cream/50 mb-8">
        The intro block shown at the top of the <strong>Services</strong> page (separate from the home
        page “What We Offer” intro). Separate paragraphs with a blank line.
      </p>

      <form onSubmit={onSubmit}>
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Title</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inp} placeholder="Our Firm. One Path" />
          </div>
          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Body</label>
            <textarea value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} rows={10} className={inp + ' resize-y'} placeholder="Songbird provides comprehensive legal and consulting services…" />
          </div>
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
