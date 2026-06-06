'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { Loader2, Save } from 'lucide-react'
import { ImageUpload } from './ImageUpload'
import { RepeatableList } from './RepeatableList'
import type { ServiceDoc, StatStripItem, KeyBenefit, ProcedureStep, FAQ } from '@/types/firestore'

type ServiceFormData = Omit<ServiceDoc, 'id'>

const ICON_OPTIONS = [
  'Scale', 'Lightbulb', 'Anchor', 'BarChart3', 'Users', 'Handshake',
  'Star', 'Sparkles', 'UtensilsCrossed', 'Globe2', 'Shield', 'Briefcase',
  'Building2', 'Home', 'Car', 'Plane', 'Ship', 'Heart', 'Award', 'FileText',
]

function Field({ label, error, children, className }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-400">{error}</p>}
    </div>
  )
}

function inputCls() {
  return 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50 transition-colors'
}

function TextInput({ name, control, placeholder, rules }: { name: any; control: any; placeholder?: string; rules?: any }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => <input {...field} placeholder={placeholder} className={inputCls()} />}
    />
  )
}

interface ServiceFormProps {
  initialData?: Partial<ServiceDoc>
  serviceId?: string
}

export function ServiceForm({ initialData, serviceId }: ServiceFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [toast, setToast]   = useState('')

  const defaults: ServiceFormData = {
    order: 99, slug: '', icon: 'Scale', published: false,
    frontTitle: '', frontSubtitle: '',
    layout: 'minimal',
    heroImage: '', heroEyebrow: '', detailTitle: '', detailIntro: '',
    statStrip: [], overview: '', keyBenefits: [], procedure: [], whoIsThisFor: [], faqs: [],
    whatWeProvide: [], requirements: [],
    ...initialData,
  }

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<ServiceFormData>({ defaultValues: defaults })
  const layout   = watch('layout')
  const heroImage = watch('heroImage')

  const onSubmit = async (data: ServiceFormData) => {
    setSaving(true)
    setToast('')
    // Always store slugs lowercase to avoid case-sensitive 404s on Firebase Hosting
    data.slug = data.slug.trim().toLowerCase()
    try {
      const { saveService } = await import('@/lib/firestorePublic')
      await saveService(data, serviceId)
      setToast('Saved successfully!')
      if (!serviceId) router.push('/admin/services')
    } catch (err) {
      setToast(err instanceof Error ? `Error: ${err.message}` : 'Error saving — please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">

      {/* ── FRONT VIEW ─────────────────────────────────── */}
      <section className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6">
        <h2 className="font-serif font-semibold text-[18px] text-white mb-5">Front View (Card)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Service Title *" error={errors.frontTitle?.message}>
            <TextInput name="frontTitle" control={control} placeholder="Immigration Advisory" rules={{ required: 'Required' }} />
          </Field>
          <Field label="Slug *" error={errors.slug?.message}>
            <TextInput name="slug" control={control} placeholder="immigration" rules={{ required: 'Required' }} />
          </Field>
          <Field label="Subtitle (shown on card)" className="sm:col-span-2">
            <TextInput name="frontSubtitle" control={control} placeholder="Expert guidance on visas and residency pathways." />
          </Field>
          <Field label="Icon name (Lucide)">
            <Controller
              name="icon"
              control={control}
              render={({ field }) => (
                <select {...field} className={inputCls() + ' appearance-none'}>
                  {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              )}
            />
          </Field>
          <Field label="Sort order">
            <Controller name="order" control={control} render={({ field }) => (
              <input {...field} type="number" className={inputCls()} onChange={e => field.onChange(Number(e.target.value))} />
            )} />
          </Field>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Controller name="published" control={control} render={({ field }) => (
            <button type="button" onClick={() => field.onChange(!field.value)}
              className={`relative w-10 h-5 rounded-full transition-colors ${field.value ? 'bg-gold' : 'bg-navy/60 border border-gold-brushed/20'}`}>
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${field.value ? 'left-5.5' : 'left-0.5'}`} style={{ left: field.value ? '22px' : '2px' }} />
            </button>
          )} />
          <span className="text-[13px] font-sans text-cream/60">Published (visible on public site)</span>
        </div>
      </section>

      {/* ── BACK VIEW ─────────────────────────────────── */}
      <section className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6">
        <h2 className="font-serif font-semibold text-[18px] text-white mb-5">Back View (Detail Page)</h2>

        <Field label="Template" className="mb-5">
          <Controller name="layout" control={control} render={({ field }) => (
            <div className="flex gap-4 mt-2">
              {(['minimal', 'full'] as const).map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value={opt} checked={field.value === opt} onChange={() => field.onChange(opt)}
                    className="w-4 h-4 accent-[#C6A35A]" />
                  <span className="text-[13px] font-sans text-cream/70">
                    {opt === 'minimal' ? 'Minimal details (image + checklist)' : 'Full details page (screenshots 1–5)'}
                  </span>
                </label>
              ))}
            </div>
          )} />
        </Field>

        {/* Shared hero fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <Field label="Hero eyebrow (uppercase kicker)">
            <TextInput name="heroEyebrow" control={control} placeholder="LEGAL & REGULATORY" />
          </Field>
          <Field label="Detail page title">
            <TextInput name="detailTitle" control={control} placeholder="Immigration Advisory" />
          </Field>
          <Field label="Detail intro paragraph" className="sm:col-span-2">
            <Controller name="detailIntro" control={control} render={({ field }) => (
              <textarea {...field} rows={3} placeholder="Our specialists navigate…" className={inputCls() + ' resize-none'} />
            )} />
          </Field>
        </div>

        <Controller name="heroImage" control={control} render={({ field }) => (
          <ImageUpload value={field.value} onChange={field.onChange} label="Hero Image" />
        )} />

        {/* MINIMAL conditional fields */}
        {layout === 'minimal' && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Controller name="whatWeProvide" control={control} render={({ field }) => (
              <RepeatableList
                label="What We Provide"
                items={field.value as string[]}
                onChange={field.onChange}
                createEmpty={() => ''}
                renderItem={(item, _, onChg) => (
                  <input value={item as string} onChange={e => onChg(e.target.value)} placeholder="Service item…" className={inputCls()} />
                )}
              />
            )} />
            <Controller name="requirements" control={control} render={({ field }) => (
              <RepeatableList
                label="Requirements"
                items={field.value as string[]}
                onChange={field.onChange}
                createEmpty={() => ''}
                renderItem={(item, _, onChg) => (
                  <input value={item as string} onChange={e => onChg(e.target.value)} placeholder="Requirement…" className={inputCls()} />
                )}
              />
            )} />
          </div>
        )}

        {/* FULL conditional fields */}
        {layout === 'full' && (
          <div className="mt-6 space-y-8">
            {/* Stat Strip */}
            <Controller name="statStrip" control={control} render={({ field }) => (
              <RepeatableList<StatStripItem>
                label="Stat Strip (up to 4)"
                items={field.value as StatStripItem[]}
                onChange={field.onChange}
                createEmpty={() => ({ label: '', value: '' })}
                maxItems={4}
                renderItem={(item, _, onChg) => (
                  <div className="grid grid-cols-2 gap-2">
                    <input value={item.label} onChange={e => onChg({ ...item, label: e.target.value })} placeholder="Label (e.g. Success Rate)" className={inputCls()} />
                    <input value={item.value} onChange={e => onChg({ ...item, value: e.target.value })} placeholder="Value (e.g. 98%)" className={inputCls()} />
                  </div>
                )}
              />
            )} />

            {/* Overview */}
            <Field label="Overview (paragraphs separated by blank lines)">
              <Controller name="overview" control={control} render={({ field }) => (
                <textarea {...field} rows={6} className={inputCls() + ' resize-y'} />
              )} />
            </Field>

            {/* Key Benefits */}
            <Controller name="keyBenefits" control={control} render={({ field }) => (
              <RepeatableList<KeyBenefit>
                label="Key Benefits"
                items={field.value as KeyBenefit[]}
                onChange={field.onChange}
                createEmpty={() => ({ title: '', description: '' })}
                renderItem={(item, _, onChg) => (
                  <div className="space-y-2">
                    <input value={item.title} onChange={e => onChg({ ...item, title: e.target.value })} placeholder="Benefit title" className={inputCls()} />
                    <input value={item.description} onChange={e => onChg({ ...item, description: e.target.value })} placeholder="Short description" className={inputCls()} />
                  </div>
                )}
              />
            )} />

            {/* Procedure */}
            <Controller name="procedure" control={control} render={({ field }) => (
              <RepeatableList<ProcedureStep>
                label="Procedure Steps"
                items={field.value as ProcedureStep[]}
                onChange={(items) => field.onChange(items.map((s, i) => ({ ...s, step: i + 1 })))}
                createEmpty={() => ({ step: 1, title: '', description: '' })}
                renderItem={(item, _, onChg) => (
                  <div className="space-y-2">
                    <input value={item.title} onChange={e => onChg({ ...item, title: e.target.value })} placeholder="Step title" className={inputCls()} />
                    <input value={item.description} onChange={e => onChg({ ...item, description: e.target.value })} placeholder="Step description" className={inputCls()} />
                  </div>
                )}
              />
            )} />

            {/* Who Is This For */}
            <Controller name="whoIsThisFor" control={control} render={({ field }) => (
              <RepeatableList
                label="Who Is This For"
                items={field.value as string[]}
                onChange={field.onChange}
                createEmpty={() => ''}
                renderItem={(item, _, onChg) => (
                  <input value={item as string} onChange={e => onChg(e.target.value)} placeholder="Target audience…" className={inputCls()} />
                )}
              />
            )} />

            {/* FAQs */}
            <Controller name="faqs" control={control} render={({ field }) => (
              <RepeatableList<FAQ>
                label="FAQs"
                items={field.value as FAQ[]}
                onChange={field.onChange}
                createEmpty={() => ({ question: '', answer: '' })}
                renderItem={(item, _, onChg) => (
                  <div className="space-y-2">
                    <input value={item.question} onChange={e => onChg({ ...item, question: e.target.value })} placeholder="Question" className={inputCls()} />
                    <textarea value={item.answer} onChange={e => onChg({ ...item, answer: e.target.value })} rows={2} placeholder="Answer" className={inputCls() + ' resize-none'} />
                  </div>
                )}
              />
            )} />
          </div>
        )}
      </section>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-deep disabled:opacity-60 text-navy text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Service
        </button>
        {toast && (
          <p className={`text-[13px] font-sans ${toast.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>{toast}</p>
        )}
      </div>
    </form>
  )
}
