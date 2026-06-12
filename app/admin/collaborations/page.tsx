'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { RepeatableList } from '@/components/admin/RepeatableList'
import type { CollaborationsDoc, PartnerItem, CollabCategory } from '@/types/firestore'

const inp = 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50'
const lbl = 'block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5'

const DEFAULT: CollaborationsDoc = {
  eyebrow: '', title: '', intro: '', partners: [],
  tagline: '', joinEyebrow: '', joinTitle: '', joinIntro: '', categories: [], benefits: [],
}

export default function AdminCollaborationsPage() {
  const [form, setForm] = useState<CollaborationsDoc>(DEFAULT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getCollaborations }) =>
      getCollaborations().then(d => {
        if (d) setForm({ ...DEFAULT, ...d })
        setLoading(false)
      })
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
      <p className="text-[13px] font-sans text-cream/50 mb-8">Partner network and Join With Us section content.</p>

      <form onSubmit={onSubmit} className="space-y-8">

        {/* ── Partner Network Section ── */}
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6 space-y-5">
          <h2 className="font-serif font-semibold text-[18px] text-white">Partner Network Section</h2>
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

        {/* ── Join With Us Section ── */}
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6 space-y-5">
          <h2 className="font-serif font-semibold text-[18px] text-white">Join With Us Section</h2>
          <div>
            <label className={lbl}>Eyebrow</label>
            <input value={form.joinEyebrow ?? ''} onChange={e => setForm(f => ({ ...f, joinEyebrow: e.target.value }))} className={inp} placeholder="COLLABORATION" />
          </div>
          <div>
            <label className={lbl}>Title</label>
            <input value={form.joinTitle ?? ''} onChange={e => setForm(f => ({ ...f, joinTitle: e.target.value }))} className={inp} placeholder="Collaborating & Partnering with Songbird" />
          </div>
          <div>
            <label className={lbl}>Tagline</label>
            <input value={form.tagline ?? ''} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} className={inp} placeholder="Grow your potential globally" />
          </div>
          <div>
            <label className={lbl}>Intro</label>
            <textarea value={form.joinIntro ?? ''} onChange={e => setForm(f => ({ ...f, joinIntro: e.target.value }))} rows={4} className={inp + ' resize-none'} />
          </div>

          <RepeatableList<CollabCategory>
            label="Categories"
            maxItems={10}
            items={form.categories ?? []}
            onChange={categories => setForm(f => ({ ...f, categories }))}
            createEmpty={() => ({ groupLabel: '', items: [] })}
            renderItem={(item, _i, onChange) => (
              <div className="space-y-2 bg-navy/40 border border-gold-brushed/10 rounded-lg p-4">
                <input
                  value={item.groupLabel}
                  onChange={e => onChange({ ...item, groupLabel: e.target.value })}
                  className={inp}
                  placeholder="Group label (e.g. Partners)"
                />
                <textarea
                  value={item.items.join('\n')}
                  onChange={e => onChange({ ...item, items: e.target.value.split('\n').filter(Boolean) })}
                  rows={3}
                  className={inp + ' resize-none'}
                  placeholder="One item per line"
                />
              </div>
            )}
          />

          <RepeatableList<string>
            label="Business Benefits"
            maxItems={20}
            items={form.benefits ?? []}
            onChange={benefits => setForm(f => ({ ...f, benefits }))}
            createEmpty={() => ''}
            renderItem={(item, _i, onChange) => (
              <input value={item} onChange={e => onChange(e.target.value)} className={inp} placeholder="Benefit description" />
            )}
          />
        </div>

        <div className="flex items-center gap-4">
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
