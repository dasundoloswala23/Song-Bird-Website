'use client'

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle2, Loader2, Paperclip } from 'lucide-react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { firebaseApp } from '@/lib/firebase'

type FormValues = {
  name: string
  phone: string
  email: string
  category: string
  preferredLocation: string
  inquiry: string
}

const CATEGORIES = [
  'Partner',
  'Associate',
  'Employer Company',
  'Employee & Job Seeker',
]

const inp =
  'w-full px-3.5 py-2.5 bg-navy-card border border-gold-brushed/20 rounded-[6px] text-[14px] font-sans text-cream placeholder:text-cream/35 focus:outline-none focus:ring-2 focus:ring-gold-brushed/40 transition-colors'

async function uploadFile(file: File, path: string): Promise<string> {
  const storage   = getStorage(firebaseApp)
  const sanitized = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const storageRef = ref(storage, `collaboration-uploads/${Date.now()}_${sanitized}`)
  await new Promise<void>((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, file)
    task.on('state_changed', null, reject, () => resolve())
  })
  return getDownloadURL(storageRef)
}

export function CollaborationJoinForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [error, setError]           = useState('')

  const companyFileRef   = useRef<HTMLInputElement>(null)
  const portfolioFileRef = useRef<HTMLInputElement>(null)
  const [companyFileName,   setCompanyFileName]   = useState('')
  const [portfolioFileName, setPortfolioFileName] = useState('')

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true)
    setError('')
    try {
      const attachments: string[] = []

      if (companyFileRef.current?.files?.[0]) {
        const url = await uploadFile(companyFileRef.current.files[0], 'company-profile')
        attachments.push(url)
      }
      if (portfolioFileRef.current?.files?.[0]) {
        const url = await uploadFile(portfolioFileRef.current.files[0], 'portfolio')
        attachments.push(url)
      }

      const { saveLead } = await import('@/lib/firestorePublic')
      await saveLead({
        name:        values.name,
        email:       values.email,
        phone:       values.phone,
        subject:     values.category,
        destination: values.preferredLocation,
        message:     values.inquiry,
        type:        'collaboration',
        attachments,
        createdAt:   Date.now(),
      })

      reset()
      setCompanyFileName('')
      setPortfolioFileName('')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or contact us directly.')
    }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle2 className="w-12 h-12 text-emerald" />
        <h4 className="font-serif font-normal text-[22px] text-white">Thank you!</h4>
        <p className="text-[14px] font-sans text-cream/65 max-w-sm">
          Your collaboration inquiry has been received. A Songbird advisor will be in touch within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-[13px] font-sans text-gold-brushed underline underline-offset-2 hover:text-gold transition-colors"
        >
          Submit another inquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Name */}
      <div>
        <input
          {...register('name', { required: 'Name is required' })}
          placeholder="Full Name *"
          className={inp}
        />
        {errors.name && <p className="mt-1 text-[12px] text-red-400">{errors.name.message}</p>}
      </div>

      {/* Contact number */}
      <input
        {...register('phone')}
        placeholder="Contact Number"
        className={inp}
      />

      {/* Email */}
      <div>
        <input
          {...register('email', { required: 'Email is required' })}
          type="email"
          placeholder="Email Address *"
          className={inp}
        />
        {errors.email && <p className="mt-1 text-[12px] text-red-400">{errors.email.message}</p>}
      </div>

      {/* Category */}
      <select
        {...register('category')}
        className={inp + ' appearance-none'}
        defaultValue=""
      >
        <option value="" disabled>Category</option>
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      {/* File: Company Profile */}
      <div>
        <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">
          Company Profile (optional)
        </label>
        <button
          type="button"
          onClick={() => companyFileRef.current?.click()}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 bg-navy-card border border-dashed border-gold-brushed/30 rounded-[6px] text-[13px] font-sans text-cream/50 hover:border-gold-brushed/60 hover:text-cream/80 transition-colors"
        >
          <Paperclip className="w-4 h-4 shrink-0" />
          {companyFileName || 'Attach PDF, Word or image (max 10 MB)'}
        </button>
        <input
          ref={companyFileRef}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="hidden"
          onChange={e => setCompanyFileName(e.target.files?.[0]?.name ?? '')}
        />
      </div>

      {/* File: Personal Portfolio */}
      <div>
        <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">
          Personal Portfolio (optional)
        </label>
        <button
          type="button"
          onClick={() => portfolioFileRef.current?.click()}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 bg-navy-card border border-dashed border-gold-brushed/30 rounded-[6px] text-[13px] font-sans text-cream/50 hover:border-gold-brushed/60 hover:text-cream/80 transition-colors"
        >
          <Paperclip className="w-4 h-4 shrink-0" />
          {portfolioFileName || 'Attach PDF, Word or image (max 10 MB)'}
        </button>
        <input
          ref={portfolioFileRef}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="hidden"
          onChange={e => setPortfolioFileName(e.target.files?.[0]?.name ?? '')}
        />
      </div>

      {/* Preferred Location */}
      <input
        {...register('preferredLocation')}
        placeholder="Preferred Location"
        className={inp}
      />

      {/* Inquiry */}
      <textarea
        {...register('inquiry')}
        placeholder="Your inquiry…"
        rows={4}
        className={inp + ' resize-none'}
      />

      {error && <p className="text-[13px] font-sans text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 text-white text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] disabled:opacity-60 transition-all hover:-translate-y-px"
        style={{ background: 'linear-gradient(135deg, #22B877 0%, #0E9C6E 55%, #0E7C5A 100%)' }}
      >
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {submitting ? 'Submitting…' : 'Submit Inquiry'}
      </button>
    </form>
  )
}
