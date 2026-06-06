'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Loader2, Save } from 'lucide-react'
import type { StatsDoc } from '@/types/firestore'

function inputCls() {
  return 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50'
}

const STAT_KEYS: Array<{ key: keyof StatsDoc; name: string }> = [
  { key: 'applications', name: 'Applications Filed' },
  { key: 'successRate',  name: 'Success Rate' },
  { key: 'destinations', name: 'Destinations' },
  { key: 'serviceLines', name: 'Service Lines' },
]

export default function StatsPage() {
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [toast,   setToast]   = useState('')

  const { control, handleSubmit, reset } = useForm<StatsDoc>({
    defaultValues: {
      applications: { value: '', label: 'Applications Filed' },
      successRate:  { value: '', label: 'Success Rate' },
      destinations: { value: '', label: 'Destinations' },
      serviceLines: { value: '', label: 'Service Lines' },
    },
  })

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getSiteStats }) =>
      getSiteStats().then(data => { if (data) reset(data); setLoading(false) })
    )
  }, [reset])

  const onSubmit = async (data: StatsDoc) => {
    setSaving(true)
    try {
      const { saveSiteStats } = await import('@/lib/firestorePublic')
      await saveSiteStats(data)
      setToast('Saved!')
    } catch { setToast('Error saving.') }
    setSaving(false)
    setTimeout(() => setToast(''), 3000)
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-serif font-semibold text-[28px] text-white mb-2">Stats Band</h1>
      <p className="text-[13px] font-sans text-cream/50 mb-8">
        Leave a value field blank to hide that stat. If all four are blank, the entire stats band will be hidden from the homepage.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6 space-y-5">
          {STAT_KEYS.map(({ key, name }) => (
            <div key={key} className="grid grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">
                  {name} — Value
                </label>
                <Controller name={`${key}.value`} control={control} render={({ field }) => (
                  <input {...field} placeholder={key === 'applications' ? '10K+' : key === 'successRate' ? '98%' : key === 'destinations' ? '15+' : '9'} className={inputCls()} />
                )} />
              </div>
              <div>
                <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Label</label>
                <Controller name={`${key}.label`} control={control} render={({ field }) => (
                  <input {...field} placeholder={name} className={inputCls()} />
                )} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-deep disabled:opacity-60 text-navy text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Stats
          </button>
          {toast && <p className={`text-[13px] font-sans ${toast.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>{toast}</p>}
        </div>
      </form>
    </div>
  )
}
