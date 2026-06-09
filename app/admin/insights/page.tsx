'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { RepeatableList } from '@/components/admin/RepeatableList'
import type { InsightsDoc, InsightItem } from '@/types/firestore'

const inp = 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50'

export default function AdminInsightsPage() {
  const [form, setForm] = useState<InsightsDoc>({ items: [] })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getInsights }) =>
      getInsights().then(d => { if (d) setForm(d); setLoading(false) })
    )
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { saveInsights } = await import('@/lib/firestorePublic')
      await saveInsights(form)
      setToast('Saved!')
    } catch { setToast('Error saving.') }
    setSaving(false)
    setTimeout(() => setToast(''), 3000)
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-serif font-semibold text-[28px] text-white mb-2">Insights</h1>
      <p className="text-[13px] font-sans text-cream/50 mb-8">
        Articles shown in the homepage “From Our Desk” section. Leave the list empty to hide the section entirely.
      </p>

      <form onSubmit={onSubmit}>
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6">
          <RepeatableList<InsightItem>
            label="Articles"
            maxItems={12}
            items={form.items ?? []}
            onChange={items => setForm({ items })}
            createEmpty={() => ({ category: '', date: '', title: '', excerpt: '', href: '/insights' })}
            renderItem={(item, _i, onChange) => (
              <div className="space-y-3 bg-navy/40 border border-gold-brushed/10 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <input value={item.category} onChange={e => onChange({ ...item, category: e.target.value })} className={inp} placeholder="Category (e.g. Visa Update)" />
                  <input value={item.date} onChange={e => onChange({ ...item, date: e.target.value })} className={inp} placeholder="Date (e.g. May 2025)" />
                </div>
                <input value={item.title} onChange={e => onChange({ ...item, title: e.target.value })} className={inp} placeholder="Title" />
                <textarea value={item.excerpt} onChange={e => onChange({ ...item, excerpt: e.target.value })} rows={3} className={inp + ' resize-none'} placeholder="Excerpt" />
                <input value={item.href} onChange={e => onChange({ ...item, href: e.target.value })} className={inp} placeholder="Link (e.g. /insights)" />
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
