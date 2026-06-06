'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { Loader2, Save, Plus, Trash2, GripVertical } from 'lucide-react'
import type { ProcessSectionDoc } from '@/types/firestore'

function inputCls() {
  return 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50'
}

export default function ProcessPage() {
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [toast,   setToast]   = useState('')

  const { control, handleSubmit, reset } = useForm<ProcessSectionDoc>({
    defaultValues: { title: '', steps: [] },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'steps' })

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getProcessSection }) =>
      getProcessSection().then(data => { if (data) reset(data); setLoading(false) })
    ).catch(() => setLoading(false))
  }, [reset])

  const onSubmit = async (data: ProcessSectionDoc) => {
    setSaving(true)
    try {
      const { saveProcessSection } = await import('@/lib/firestorePublic')
      await saveProcessSection(data)
      setToast('Saved!')
    } catch { setToast('Error saving.') }
    setSaving(false)
    setTimeout(() => setToast(''), 3000)
  }

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <Loader2 className="w-6 h-6 text-gold-brushed animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-serif font-semibold text-[28px] text-white mb-2">How It Works</h1>
      <p className="text-[13px] font-sans text-cream/45 mb-8">
        Edit the process steps shown on the home page. Leave all steps empty to hide this section entirely.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section title */}
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6">
          <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">
            Section Heading
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Our 4-Step Process"
                className={inputCls()}
              />
            )}
          />
        </div>

        {/* Steps */}
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <p className="font-serif font-semibold text-[18px] text-white">Process Steps</p>
            <button
              type="button"
              onClick={() => append({ title: '', description: '' })}
              className="flex items-center gap-1 text-[12px] font-sans text-gold-brushed hover:text-gold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Step
            </button>
          </div>

          {fields.length === 0 && (
            <p className="text-[13px] font-sans text-cream/30 text-center py-6">
              No steps added — the &ldquo;How It Works&rdquo; section will be hidden on the site.
            </p>
          )}

          <div className="space-y-4">
            {fields.map((field, idx) => (
              <div key={field.id} className="flex items-start gap-3 p-4 rounded-lg border border-gold-brushed/10 bg-navy/30">
                <div className="mt-3 text-cream/20">
                  <GripVertical className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-gold-brushed/70 mb-1">
                      Step {idx + 1} — Title
                    </label>
                    <Controller
                      name={`steps.${idx}.title`}
                      control={control}
                      render={({ field }) => (
                        <input {...field} placeholder="e.g. Free Consultation" className={inputCls()} />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-gold-brushed/70 mb-1">
                      Description
                    </label>
                    <Controller
                      name={`steps.${idx}.description`}
                      control={control}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          rows={2}
                          placeholder="Brief description of this step…"
                          className={inputCls() + ' resize-none'}
                        />
                      )}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="mt-3 p-1.5 text-cream/30 hover:text-red-400 transition-colors"
                  aria-label="Remove step"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-deep disabled:opacity-60 text-navy text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
          {toast && (
            <p className={`text-[13px] font-sans ${toast.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
              {toast}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
