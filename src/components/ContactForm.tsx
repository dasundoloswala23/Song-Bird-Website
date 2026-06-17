'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2, CheckCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { buildWhatsAppUrl } from '@/lib/utils'
import { saveLead } from '@/lib/firestorePublic'

const DESTINATIONS = [
  'UAE / Dubai', 'United Kingdom', 'Canada', 'Australia',
  'European Union', 'United States', 'New Zealand', 'Other',
]

interface FormData {
  name: string
  email: string
  phone: string
  destination: string
  subject: string
  message: string
}

export function ContactForm({ className }: { className?: string }) {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      await saveLead({ ...data, type: 'inquiry', createdAt: Date.now() })
    } catch { /* best-effort */ }
    const { sendLeadEmail } = await import('@/lib/email')
    await sendLeadEmail({ type: 'inquiry', name: data.name, email: data.email, phone: data.phone, destination: data.destination, subject: data.subject, message: data.message })
    const msg = `Hello Songbird, I submitted an enquiry via your website.\nName: ${data.name}\nPhone: ${data.phone}\nDestination: ${data.destination ?? ''}\nMessage: ${data.message ?? ''}`
    reset()
    setSent(true)
    setTimeout(() => window.open(buildWhatsAppUrl(WHATSAPP_NUMBER, msg), '_blank', 'noopener,noreferrer'), 600)
  }

  if (sent) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
        <CheckCircle className="w-12 h-12 text-gold mb-4" />
        <h3 className="font-serif font-medium text-[24px] text-ink mb-2">Message Sent</h3>
        <p className="text-[14px] font-sans text-slate">
          We&apos;ll be in touch shortly. Your WhatsApp should open — feel free to continue the conversation there.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={className}>
      <h3 className="font-serif font-medium text-[22px] text-ink mb-1">Send Us a Message</h3>
      <p className="text-[13px] font-sans text-slate mb-6">We respond within one business day.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="Full Name *" error={errors.name?.message}>
          <input
            {...register('name', { required: 'Name is required' })}
            placeholder="Your full name"
            className={inputCls(!!errors.name)}
          />
        </Field>
        <Field label="Email *" error={errors.email?.message}>
          <input
            {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
            type="email"
            placeholder="your@email.com"
            className={inputCls(!!errors.email)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="Phone / WhatsApp *" error={errors.phone?.message}>
          <input
            {...register('phone', { required: 'Phone is required' })}
            type="tel"
            placeholder="+971 50 000 0000"
            className={inputCls(!!errors.phone)}
          />
        </Field>
        <Field label="Destination of Interest *" error={errors.destination?.message}>
          <select
            {...register('destination', { required: 'Please select' })}
            className={inputCls(!!errors.destination) + ' appearance-none'}
          >
            <option value="">Select…</option>
            {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Subject" className="mb-4">
        <input
          {...register('subject')}
          placeholder="How can we help?"
          className={inputCls(false)}
        />
      </Field>

      <Field label="Message *" error={errors.message?.message} className="mb-6">
        <textarea
          {...register('message', { required: 'Message is required' })}
          rows={4}
          placeholder="Tell us about your situation and goals…"
          className={inputCls(!!errors.message) + ' resize-none'}
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-gold hover:bg-gold-deep disabled:opacity-60 text-navy text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        Send Inquiry
      </button>
    </form>
  )
}

function inputCls(hasError: boolean) {
  return [
    'w-full px-3.5 py-2.5 bg-white border rounded-[6px] text-[14px] font-sans text-ink placeholder:text-slate/50',
    'focus:outline-none focus:ring-2 focus:ring-gold-brushed/50 transition-colors',
    hasError ? 'border-red-400' : 'border-cloud',
  ].join(' ')
}

function Field({ label, error, className, children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label className="block text-[12px] font-sans font-medium text-ink/70 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  )
}
