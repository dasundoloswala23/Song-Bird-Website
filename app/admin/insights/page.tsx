'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { RepeatableList } from '@/components/admin/RepeatableList'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { RichTextEditor } from '@/components/admin/RichTextEditor'
import { slugify } from '@/lib/utils'
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
      // Generate stable, unique slugs from titles; drop fully-empty articles.
      const seen = new Map<string, number>()
      const items = (form.items ?? [])
        .map(it => ({ ...it, title: it.title.trim() }))
        .filter(it => it.title || it.excerpt?.trim() || it.body?.trim())
        .map(it => {
          const base = it.slug && it.slug === slugify(it.title) ? it.slug : slugify(it.title) || 'article'
          const count = seen.get(base) ?? 0
          seen.set(base, count + 1)
          return { ...it, slug: count === 0 ? base : `${base}-${count + 1}` }
        })
      const { saveInsights } = await import('@/lib/firestorePublic')
      await saveInsights({ ...form, items })
      setForm({ ...form, items })
      setToast('Saved!')
    } catch { setToast('Error saving.') }
    setSaving(false)
    setTimeout(() => setToast(''), 3000)
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-serif font-medium text-[28px] text-white mb-2">Insights</h1>
      <p className="text-[13px] font-sans text-cream/50 mb-8">
        Articles shown in the homepage “From Our Desk” section and on the Insights page. The first
        article is featured. Each article gets its own page at <code>/insights/&lt;slug&gt;</code>.
        Leave the list empty to hide the section entirely.
      </p>

      <form onSubmit={onSubmit}>
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6 mb-6">
          <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Top Video URL (optional)</label>
          <input
            value={form.topVideoUrl ?? ''}
            onChange={e => setForm({ ...form, topVideoUrl: e.target.value })}
            className={inp}
            placeholder="https://… (MP4 or video URL shown at the top of the Insights page)"
          />
        </div>

        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6">
          <RepeatableList<InsightItem>
            label="Articles"
            maxItems={20}
            items={form.items ?? []}
            onChange={items => setForm({ ...form, items })}
            createEmpty={() => ({ category: '', date: '', title: '', excerpt: '', slug: '', image: '', body: '' })}
            renderItem={(item, _i, onChange) => (
              <div className="space-y-3 bg-navy/40 border border-gold-brushed/10 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <input value={item.category} onChange={e => onChange({ ...item, category: e.target.value })} className={inp} placeholder="Category (e.g. Visa Update)" />
                  <input value={item.date} onChange={e => onChange({ ...item, date: e.target.value })} className={inp} placeholder="Date (e.g. May 2025)" />
                </div>
                <input value={item.title} onChange={e => onChange({ ...item, title: e.target.value })} className={inp} placeholder="Title" />
                <p className="text-[11px] font-sans text-cream/35">
                  Link: <span className="text-gold-brushed/70">/insights/{slugify(item.title) || 'article'}</span>
                </p>
                <textarea value={item.excerpt} onChange={e => onChange({ ...item, excerpt: e.target.value })} rows={2} className={inp + ' resize-none'} placeholder="Excerpt (shown on cards)" />
                <ImageUpload value={item.image ?? ''} onChange={url => onChange({ ...item, image: url })} label="Hero / Thumbnail Image" />
                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Article Body</label>
                  <RichTextEditor value={item.body ?? ''} onChange={html => onChange({ ...item, body: html })} placeholder="Write the full article… (images can be added inline)" />
                </div>
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
