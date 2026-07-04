'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Save, Plus, Trash2 } from 'lucide-react'
import { DEFAULT_FAQ_PAGE } from '@/lib/faqContent'
import type { FaqPageDoc } from '@/types/firestore'

const inp = 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50'

export default function AdminFaqPage() {
  const [form, setForm] = useState<FaqPageDoc>(DEFAULT_FAQ_PAGE)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getFaqPage }) =>
      getFaqPage().then(d => { if (d?.groups?.length) setForm(d); setLoading(false) }),
    )
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { saveFaqPage } = await import('@/lib/firestorePublic')
      await saveFaqPage(form)
      setToast('Saved!')
    } catch { setToast('Error saving.') }
    setSaving(false)
    setTimeout(() => setToast(''), 3000)
  }

  // ── Group + item mutation helpers ──────────────────────────────────────────
  const updateGroup = (gi: number, patch: Partial<FaqPageDoc['groups'][number]>) =>
    setForm(f => ({ ...f, groups: f.groups.map((g, i) => (i === gi ? { ...g, ...patch } : g)) }))

  const addGroup = () =>
    setForm(f => ({ ...f, groups: [...f.groups, { category: '', items: [{ question: '', answer: '' }] }] }))

  const removeGroup = (gi: number) =>
    setForm(f => ({ ...f, groups: f.groups.filter((_, i) => i !== gi) }))

  const updateItem = (gi: number, ii: number, patch: Partial<{ question: string; answer: string }>) =>
    setForm(f => ({
      ...f,
      groups: f.groups.map((g, i) =>
        i === gi ? { ...g, items: g.items.map((it, j) => (j === ii ? { ...it, ...patch } : it)) } : g,
      ),
    }))

  const addItem = (gi: number) =>
    setForm(f => ({
      ...f,
      groups: f.groups.map((g, i) => (i === gi ? { ...g, items: [...g.items, { question: '', answer: '' }] } : g)),
    }))

  const removeItem = (gi: number, ii: number) =>
    setForm(f => ({
      ...f,
      groups: f.groups.map((g, i) => (i === gi ? { ...g, items: g.items.filter((_, j) => j !== ii) } : g)),
    }))

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-serif font-normal text-[28px] text-white mb-2">FAQ Page</h1>
      <p className="text-[13px] font-sans text-cream/50 mb-8">
        The <code className="text-gold-brushed">/faq</code> answer hub. Grouped by category and rendered as
        FAQ structured data for Google AI Overviews and answer engines. Tip: write the answer so the
        <strong className="text-cream/70"> first sentence fully answers the question</strong> — that is the part AI quotes.
      </p>

      <form onSubmit={onSubmit} className="space-y-6">
        {form.groups.map((group, gi) => (
          <div key={gi} className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <input
                value={group.category}
                onChange={e => updateGroup(gi, { category: e.target.value })}
                className={inp + ' font-semibold'}
                placeholder="Category (e.g. UAE Golden Visa & Residency)"
              />
              <button type="button" onClick={() => removeGroup(gi)} title="Remove category"
                className="shrink-0 p-2 rounded-md text-cream/40 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 pl-3 border-l border-gold-brushed/10">
              {group.items.map((item, ii) => (
                <div key={ii} className="space-y-2">
                  <div className="flex items-start gap-2">
                    <input
                      value={item.question}
                      onChange={e => updateItem(gi, ii, { question: e.target.value })}
                      className={inp}
                      placeholder="Question"
                    />
                    <button type="button" onClick={() => removeItem(gi, ii)} title="Remove question"
                      className="shrink-0 mt-0.5 p-2 rounded-md text-cream/40 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={item.answer}
                    onChange={e => updateItem(gi, ii, { answer: e.target.value })}
                    rows={3}
                    className={inp + ' resize-y'}
                    placeholder="Answer — lead with the direct answer, then add detail."
                  />
                </div>
              ))}
              <button type="button" onClick={() => addItem(gi)}
                className="inline-flex items-center gap-1.5 text-[12px] font-sans font-semibold text-gold-brushed hover:text-gold transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add question
              </button>
            </div>
          </div>
        ))}

        <button type="button" onClick={addGroup}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-gold-brushed/30 text-gold-brushed text-[12px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] hover:border-gold-brushed/60 transition-colors">
          <Plus className="w-4 h-4" /> Add category
        </button>

        <div className="flex items-center gap-4 pt-2">
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
