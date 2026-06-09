'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import type { HeroSettingsDoc } from '@/types/firestore'

const inp = 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50'

export default function AdminHeroPage() {
  const [form, setForm] = useState<HeroSettingsDoc>({ heroVideoUrl: '', heroVideoFullUrl: '', heroImage: '' })
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [toast,   setToast]   = useState('')

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getHeroSettings }) =>
      getHeroSettings().then(data => { if (data) setForm(data); setLoading(false) })
    )
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { saveHeroSettings } = await import('@/lib/firestorePublic')
      await saveHeroSettings(form)
      setToast('Saved!')
    } catch { setToast('Error saving.') }
    setSaving(false)
    setTimeout(() => setToast(''), 3000)
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-serif font-semibold text-[28px] text-white mb-2">Hero / Video Settings</h1>
      <p className="text-[13px] font-sans text-cream/50 mb-8">
        Set the looping background video, full-quality modal video, and the Ken-Burns fallback image for the homepage hero.
      </p>

      <form onSubmit={onSubmit}>
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6 space-y-6">
          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">
              Background Video URL
            </label>
            <input
              value={form.heroVideoUrl}
              onChange={e => setForm(f => ({ ...f, heroVideoUrl: e.target.value }))}
              className={inp}
              placeholder="https://firebasestorage.googleapis.com/... (looping, muted, compressed)"
            />
            <p className="mt-1 text-[11px] font-sans text-cream/30">Upload a short looping video (10–30s, H.264, ≤ 8 MB) to Firebase Storage and paste the URL here.</p>
          </div>

          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">
              Full-Quality Video URL (for modal player)
            </label>
            <input
              value={form.heroVideoFullUrl}
              onChange={e => setForm(f => ({ ...f, heroVideoFullUrl: e.target.value }))}
              className={inp}
              placeholder="https://firebasestorage.googleapis.com/... (full resolution, with audio)"
            />
            <p className="mt-1 text-[11px] font-sans text-cream/30">Shown when the user clicks "Play Brand Video". Can be the same as above if no separate full version.</p>
          </div>

          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">
              Fallback Image URL
            </label>
            <input
              value={form.heroImage}
              onChange={e => setForm(f => ({ ...f, heroImage: e.target.value }))}
              className={inp}
              placeholder="https://... (used if video URL is empty or fails to load)"
            />
            <p className="mt-1 text-[11px] font-sans text-cream/30">Used as the Ken-Burns animated still image when no video is configured.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-deep disabled:opacity-60 text-navy text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Settings
          </button>
          {toast && <p className={`text-[13px] font-sans ${toast.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>{toast}</p>}
        </div>
      </form>
    </div>
  )
}
