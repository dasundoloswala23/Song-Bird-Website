'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Send, CheckCircle2 } from 'lucide-react'

const BRAND_GRADIENT = 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)'

const DESTINATION_OPTIONS = [
  'UAE (Dubai)', 'UAE (Abu Dhabi)', 'UAE (Sharjah)',
  'United Kingdom', 'Canada', 'Australia', 'United States', 'Germany', 'Portugal', 'Malta', 'Other',
]

const VISA_TYPES = [
  'Golden Visa / Residency', 'Work Permit', 'Investor Visa', 'Student Visa',
  'Business Setup', 'Family Visa', 'Other',
]

const schema = z.object({
  name:        z.string().min(2, 'Name required'),
  email:       z.string().email('Valid email required'),
  phone:       z.string().min(6, 'Phone required'),
  destination: z.string().min(1, 'Select a destination'),
  nationality: z.string().min(2, 'Nationality required'),
  visaType:    z.string().min(1, 'Select a visa type'),
  profession:  z.string().optional(),
})
type Form = z.infer<typeof schema>

const inp = 'w-full px-4 py-3 bg-white/5 border border-gold-brushed/20 rounded-[8px] text-[14px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal/40 transition-colors'
const lab = 'block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5'

export function EligibilityForm() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: Form) => {
    const { saveLead } = await import('@/lib/firestorePublic')
    await saveLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      destination: data.destination,
      subject: data.visaType,
      message: data.profession ?? '',
      type: 'inquiry',
      createdAt: Date.now(),
    })
    const { sendLeadEmail } = await import('@/lib/email')
    await sendLeadEmail({
      type: 'eligibility',
      name: data.name,
      email: data.email,
      phone: data.phone,
      destination: data.destination,
      nationality: data.nationality,
      subject: data.visaType,
      message: data.profession ?? '',
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: BRAND_GRADIENT }}>
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-serif font-medium text-[24px] text-white mb-2">Thank you!</h3>
        <p className="text-[14px] font-sans text-cream/60">A Songbird advisor will reach out within 24 hours to discuss your eligibility.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={lab}>Full Name</label>
          <input {...register('name')} className={inp} placeholder="Alexandra Chen" />
          {errors.name && <p className="mt-1 text-[11px] font-sans text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <label className={lab}>Email Address</label>
          <input {...register('email')} type="email" className={inp} placeholder="alex@company.com" />
          {errors.email && <p className="mt-1 text-[11px] font-sans text-red-400">{errors.email.message}</p>}
        </div>
        <div>
          <label className={lab}>Phone</label>
          <input {...register('phone')} type="tel" className={inp} placeholder="+971 50 000 0000" />
          {errors.phone && <p className="mt-1 text-[11px] font-sans text-red-400">{errors.phone.message}</p>}
        </div>
        <div>
          <label className={lab}>Nationality</label>
          <input {...register('nationality')} className={inp} placeholder="British, Indian, South African…" />
          {errors.nationality && <p className="mt-1 text-[11px] font-sans text-red-400">{errors.nationality.message}</p>}
        </div>
        <div>
          <label className={lab}>Destination of Interest</label>
          <select {...register('destination')} className={inp}>
            <option value="">Select destination…</option>
            {DESTINATION_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          {errors.destination && <p className="mt-1 text-[11px] font-sans text-red-400">{errors.destination.message}</p>}
        </div>
        <div>
          <label className={lab}>Visa / Service Type</label>
          <select {...register('visaType')} className={inp}>
            <option value="">Select type…</option>
            {VISA_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          {errors.visaType && <p className="mt-1 text-[11px] font-sans text-red-400">{errors.visaType.message}</p>}
        </div>
      </div>
      <div>
        <label className={lab}>Profession (optional)</label>
        <input {...register('profession')} className={inp} placeholder="Software Engineer, Business Owner, Doctor…" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[8px] disabled:opacity-60 transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(31,169,104,.4)]"
        style={{ background: BRAND_GRADIENT }}
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        Check My Eligibility
      </button>
    </form>
  )
}
