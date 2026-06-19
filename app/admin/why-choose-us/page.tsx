'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Loader2, Save, Plus, Trash2 } from 'lucide-react'
import { ImageUpload } from '@/components/admin/ImageUpload'
import type { WhyChooseUsDoc, WhyChooseUsFeature } from '@/types/firestore'

const ICON_OPTIONS = ['Shield', 'Eye', 'Globe2', 'UserCheck', 'Award', 'Star', 'Lightbulb', 'Heart', 'BarChart3', 'CheckCircle']

function inputCls() {
  return 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50'
}

export default function WhyChooseUsPage() {
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [toast,   setToast]   = useState('')

  const { control, handleSubmit, reset, watch } = useForm<WhyChooseUsDoc>({
    defaultValues: { eyebrow: '', title: '', intro: '', image: '', badge: { value: '', label: '' }, features: [] },
  })
  const features = watch('features')

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getWhyChooseUs }) =>
      getWhyChooseUs().then(data => { if (data) reset(data); setLoading(false) })
    )
  }, [reset])

  const onSubmit = async (data: WhyChooseUsDoc) => {
    setSaving(true)
    try {
      const { saveWhyChooseUs } = await import('@/lib/firestorePublic')
      await saveWhyChooseUs(data)
      setToast('Saved!')
    } catch { setToast('Error saving.') }
    setSaving(false)
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-serif font-normal text-[28px] text-white mb-8">Why Choose Us</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic fields */}
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Eyebrow</label>
              <Controller name="eyebrow" control={control} render={({ field }) => <input {...field} placeholder="WHY CHOOSE US" className={inputCls()} />} />
            </div>
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Section Title</label>
              <Controller name="title" control={control} render={({ field }) => <input {...field} placeholder="The Songbird Difference" className={inputCls()} />} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Intro paragraph</label>
              <Controller name="intro" control={control} render={({ field }) => <textarea {...field} rows={3} className={inputCls() + ' resize-none'} />} />
            </div>
          </div>

          <Controller name="image" control={control} render={({ field }) => (
            <ImageUpload value={field.value} onChange={field.onChange} label="Section Image (left side)" />
          )} />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Badge Value</label>
              <Controller name="badge.value" control={control} render={({ field }) => <input {...field} placeholder="10+" className={inputCls()} />} />
            </div>
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Badge Label</label>
              <Controller name="badge.label" control={control} render={({ field }) => <input {...field} placeholder="Years of Excellence" className={inputCls()} />} />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <p className="font-serif font-normal text-[18px] text-white">Feature Cards</p>
            <button type="button" onClick={() => {
              const current = (features || []) as WhyChooseUsFeature[]
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ;(control as any)._formValues.features = [...current, { icon: 'Shield', title: '', description: '' }]
              reset({ ...(control as any)._formValues })
            }} className="flex items-center gap-1 text-[12px] font-sans text-gold-brushed hover:text-gold transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Card
            </button>
          </div>
          <Controller name="features" control={control} render={({ field }) => (
            <div className="space-y-4">
              {(field.value as WhyChooseUsFeature[]).map((feat, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-gold-brushed/10 bg-navy/30">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <select
                      value={feat.icon}
                      onChange={e => { const next = [...field.value as WhyChooseUsFeature[]]; next[i] = { ...feat, icon: e.target.value }; field.onChange(next) }}
                      className={inputCls() + ' appearance-none'}
                    >
                      {ICON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <input value={feat.title} onChange={e => { const next = [...field.value as WhyChooseUsFeature[]]; next[i] = { ...feat, title: e.target.value }; field.onChange(next) }}
                      placeholder="Card title" className={inputCls()} />
                    <input value={feat.description} onChange={e => { const next = [...field.value as WhyChooseUsFeature[]]; next[i] = { ...feat, description: e.target.value }; field.onChange(next) }}
                      placeholder="Description" className={inputCls()} />
                  </div>
                  <button type="button" onClick={() => field.onChange((field.value as WhyChooseUsFeature[]).filter((_, idx) => idx !== i))}
                    className="mt-2 p-1.5 text-cream/30 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )} />
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
