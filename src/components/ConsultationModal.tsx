'use client'

import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useForm } from 'react-hook-form'
import { X, Loader2 } from 'lucide-react'
import { useConsultationModal } from '@/context/ConsultationModalContext'
import { useWhatsAppPicker } from '@/context/WhatsAppPickerContext'
import { saveLead } from '@/lib/firestorePublic'

const DESTINATIONS = [
  'UAE / Dubai', 'United Kingdom', 'Canada', 'Australia',
  'European Union', 'United States', 'New Zealand', 'Other',
]

interface FormData {
  name: string
  phone: string
  email: string
  destination: string
  message: string
}

export function ConsultationModal() {
  const { isOpen, close } = useConsultationModal()
  const { openPicker } = useWhatsAppPicker()

  const { register, handleSubmit, reset, setFocus, formState: { errors, isSubmitting } } = useForm<FormData>()

  // Focus first input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setFocus('name'), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen, setFocus])

  // ESC key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) close() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, close])

  const onSubmit = async (data: FormData) => {
    try {
      await saveLead({ ...data, type: 'consultation', createdAt: Date.now() })
    } catch { /* best-effort */ }
    const { sendLeadEmail } = await import('@/lib/email')
    await sendLeadEmail({ type: 'consultation', name: data.name, email: data.email, phone: data.phone, destination: data.destination, message: data.message })
    const msg = `Hello Songbird, I would like a free consultation. My name is ${data.name}, I can be reached at ${data.phone}.`
    reset()
    close()
    openPicker(msg)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="consultation-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-navy/70 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            key="consultation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-title"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-lg bg-navy-deep border border-gold-brushed/30 rounded-2xl p-8 shadow-[0_32px_80px_rgba(10,23,56,.7)] pointer-events-auto max-h-[90vh] overflow-y-auto">
              <button
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 p-1.5 text-cream/40 hover:text-cream/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-brushed rounded"
              >
                <X className="w-4 h-4" />
              </button>

              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-gold-brushed mb-1">
                <span className="inline-block w-5 h-px bg-gold-brushed align-middle mr-2" />
                Free Consultation
              </p>
              <h2 id="consultation-title" className="font-serif font-normal text-[28px] leading-tight text-white mb-2">
                Reserve Your Free Consultation
              </h2>
              <p className="text-[14px] font-sans text-cream/70 mb-1">Make the best review of your application — let’s assist you.</p>
              <p className="text-[12px] font-sans text-gold-brushed mb-6">We will respond to you within 24 hours.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <Field label="Full Name *" error={errors.name?.message}>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Your full name"
                    className={inputCls(!!errors.name)}
                  />
                </Field>

                <Field label="Phone / WhatsApp *" error={errors.phone?.message}>
                  <input
                    {...register('phone', { required: 'Phone is required' })}
                    type="tel"
                    placeholder="+971 50 000 0000"
                    className={inputCls(!!errors.phone)}
                  />
                </Field>

                <Field label="Email">
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="your@email.com"
                    className={inputCls(false)}
                  />
                </Field>

                <Field label="Destination of Interest *" error={errors.destination?.message}>
                  <select
                    {...register('destination', { required: 'Please select a destination' })}
                    className={inputCls(!!errors.destination) + ' appearance-none'}
                  >
                    <option value="">Select destination…</option>
                    {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Field>

                <Field label="Brief Message">
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Tell us a bit about your situation…"
                    className={inputCls(false) + ' resize-none'}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 text-white disabled:opacity-60 text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(31,169,104,.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                  style={{ background: 'linear-gradient(95deg, #22B877 0%, #0E7C5A 100%)' }}
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Request Free Consultation
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function inputCls(hasError: boolean) {
  return [
    'w-full px-3.5 py-2.5 bg-navy/60 border rounded-[6px] text-[14px] font-sans text-cream placeholder:text-cream/30',
    'focus:outline-none focus:ring-2 focus:ring-gold-brushed/60 transition-colors',
    hasError ? 'border-red-400/60' : 'border-gold-brushed/20',
  ].join(' ')
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] font-sans font-medium text-cream/60 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-400">{error}</p>}
    </div>
  )
}
