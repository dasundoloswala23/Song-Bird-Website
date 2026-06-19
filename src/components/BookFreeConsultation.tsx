'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Loader2, CheckCircle2, MessageCircle } from 'lucide-react'
import { saveLead } from '@/lib/firestorePublic'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { buildWhatsAppUrl } from '@/lib/utils'
import { EyebrowTag } from './EyebrowTag'

const BRAND_GRADIENT = 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)'

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

export function BookFreeConsultation() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      await saveLead({ ...data, type: 'consultation', createdAt: Date.now() })
    } catch { /* best-effort */ }
    const { sendLeadEmail } = await import('@/lib/email')
    await sendLeadEmail({ type: 'consultation', name: data.name, email: data.email, phone: data.phone, destination: data.destination, message: data.message })
    reset()
  }

  const waUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, 'Hello Songbird, I would like to book a free consultation.')
  const inp = 'w-full px-4 py-3 bg-white border border-hairline rounded-[8px] text-[14px] font-sans text-ink placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-emerald/40 transition-colors'

  return (
    <section className="py-24 bg-surface-soft" aria-labelledby="book-free-heading">
      <div className="mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div>
            <EyebrowTag>Free Consultation</EyebrowTag>
            <h2 id="book-free-heading" className="font-serif font-normal text-[36px] md:text-[44px] leading-tight text-ink mb-4">
              Book Your Free Consultation
            </h2>
            <p className="text-[16px] font-sans text-slate leading-relaxed mb-2">
              Make the best review of your application — let’s assist you.
            </p>
            <p className="text-[14px] font-sans font-semibold text-emerald mb-8">
              We will respond to you within 24 hours.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[6px] bg-whatsapp text-white text-[13px] font-sans font-semibold uppercase tracking-[0.08em] transition-all hover:-translate-y-px"
            >
              <MessageCircle className="w-4 h-4" /> Connect via WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="bg-white border border-hairline rounded-2xl p-7 shadow-[0_16px_48px_rgba(4,38,28,.08)]">
            {isSubmitSuccessful ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: BRAND_GRADIENT }}>
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif font-normal text-[24px] text-ink mb-2">Thank you!</h3>
                <p className="text-[14px] font-sans text-slate">We will respond to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div>
                  <input {...register('name', { required: 'Name is required' })} placeholder="Full Name *" className={inp} />
                  {errors.name && <p className="mt-1 text-[11px] text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register('phone', { required: 'Phone is required' })} type="tel" placeholder="Phone / WhatsApp *" className={inp} />
                  {errors.phone && <p className="mt-1 text-[11px] text-red-500">{errors.phone.message}</p>}
                </div>
                <input {...register('email')} type="email" placeholder="Email" className={inp} />
                <select {...register('destination', { required: 'Please select a destination' })} className={inp + ' appearance-none'}>
                  <option value="">Destination of interest…</option>
                  {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.destination && <p className="text-[11px] text-red-500">{errors.destination.message}</p>}
                <textarea {...register('message')} rows={3} placeholder="Brief message" className={inp + ' resize-none'} />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-white disabled:opacity-60 text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-all hover:-translate-y-px"
                  style={{ background: BRAND_GRADIENT }}
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Book Your Free Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
