'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { RepeatableList } from '@/components/admin/RepeatableList'
import type { CollaborationsDoc, PartnerItem } from '@/types/firestore'

const inp = 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50'
const lbl = 'block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5'

export default function AdminCollaborationsPage() {
  const [form, setForm] = useState<CollaborationsDoc>({ eyebrow: '', title: '', intro: '', partners: [] })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getCollaborations }) =>
      getCollaborations().then(d => { if (d) setForm(d); setLoading(false) })
    )
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { saveCollaborations } = await import('@/lib/firestorePublic')
      await saveCollaborations(form)
      setToast('Saved!')
    } catch { setToast('Error saving.') }
    setSaving(false)
    setTimeout(() => setToast(''), 3000)
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-serif font-semibold text-[28px] text-white mb-2">Collaborations & Partnerships</h1>
      <p className="text-[13px] font-sans text-cream/50 mb-8">Partner logos and details shown on the Collaborations page.</p>

      <form onSubmit={onSubmit}>
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6 space-y-5">
          <div>
            <label className={lbl}>Eyebrow</label>
            <input value={form.eyebrow} onChange={e => setForm(f => ({ ...f, eyebrow: e.target.value }))} className={inp} placeholder="Our Network" />
          </div>
          <div>
            <label className={lbl}>Title</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inp} placeholder="Collaborations & Partnerships" />
          </div>
          <div>
            <label className={lbl}>Intro</label>
            <textarea value={form.intro} onChange={e => setForm(f => ({ ...f, intro: e.target.value }))} rows={3} className={inp + ' resize-none'} />
          </div>

          <RepeatableList<PartnerItem>
            label="Partners"
            maxItems={24}
            items={form.partners ?? []}
            onChange={partners => setForm(f => ({ ...f, partners }))}
            createEmpty={() => ({ name: '', logo: '', url: '', blurb: '' })}
            renderItem={(item, _i, onChange) => (
              <div className="space-y-3 bg-navy/40 border border-gold-brushed/10 rounded-lg p-4">
                <input value={item.name} onChange={e => onChange({ ...item, name: e.target.value })} className={inp} placeholder="Partner name" />
                <input value={item.url} onChange={e => onChange({ ...item, url: e.target.value })} className={inp} placeholder="https://partner.com (optional)" />
                <input value={item.blurb} onChange={e => onChange({ ...item, blurb: e.target.value })} className={inp} placeholder="Short description (optional)" />
                <ImageUpload value={item.logo} onChange={url => onChange({ ...item, logo: url })} label="Logo" />
              </div>
            )}
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
