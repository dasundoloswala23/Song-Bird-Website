'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { RepeatableList } from '@/components/admin/RepeatableList'
import type { AccreditationsDoc, AccreditationItem } from '@/types/firestore'

const inp = 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50'
const lbl = 'block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5'

export default function AdminAccreditationsPage() {
  const [form, setForm] = useState<AccreditationsDoc>({ title: '', subline: '', items: [] })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getAccreditations }) =>
      getAccreditations().then(d => { if (d) setForm(d); setLoading(false) })
    )
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { saveAccreditations } = await import('@/lib/firestorePublic')
      await saveAccreditations(form)
      setToast('Saved!')
    } catch { setToast('Error saving.') }
    setSaving(false)
    setTimeout(() => setToast(''), 3000)
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-serif font-semibold text-[28px] text-white mb-2">Accreditations & Licenses</h1>
      <p className="text-[13px] font-sans text-cream/50 mb-8">Logos/badges shown on the homepage (e.g. MARN, ICCRC, BASL, IBA). Upload a logo or leave blank to show the name as text.</p>

      <form onSubmit={onSubmit}>
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6 space-y-5">
          <div>
            <label className={lbl}>Title</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inp} placeholder="Accreditations & Licenses" />
          </div>
          <div>
            <label className={lbl}>Subline</label>
            <input value={form.subline} onChange={e => setForm(f => ({ ...f, subline: e.target.value }))} className={inp} placeholder="Recognised and regulated by leading professional bodies." />
          </div>

          <RepeatableList<AccreditationItem>
            label="Accreditations"
            maxItems={12}
            items={form.items ?? []}
            onChange={items => setForm(f => ({ ...f, items }))}
            createEmpty={() => ({ name: '', logo: '' })}
            renderItem={(item, _i, onChange) => (
              <div className="space-y-3 bg-navy/40 border border-gold-brushed/10 rounded-lg p-4">
                <input value={item.name} onChange={e => onChange({ ...item, name: e.target.value })} className={inp} placeholder="Name (e.g. ICCRC)" />
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
