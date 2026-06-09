'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, Loader2 } from 'lucide-react'
import type { SlotDoc } from '@/types/firestore'

const BRAND_GRADIENT = 'linear-gradient(135deg, #1FA968 0%, #0E5C54 50%, #0A3A52 100%)'

const DURATIONS = [15, 30, 45, 60]
const TIMEZONES = [
  'Asia/Dubai',
  'Asia/London',
  'Europe/London',
  'America/New_York',
  'America/Toronto',
  'Australia/Sydney',
  'Asia/Singapore',
  'Europe/Zurich',
]

const detailsSchema = z.object({
  name:     z.string().min(2, 'Name required'),
  email:    z.string().email('Valid email required'),
  phone:    z.string().min(6, 'Phone required'),
  timezone: z.string().min(1, 'Timezone required'),
  notes:    z.string().optional(),
})
type DetailsForm = z.infer<typeof detailsSchema>

function StepIndicator({ step }: { step: number }) {
  const steps = ['Pick a time', 'Your details', 'Confirm']
  return (
    <div className="flex items-center gap-2 mb-10">
      {steps.map((label, i) => {
        const n = i + 1
        const active    = n === step
        const completed = n < step
        return (
          <React.Fragment key={n}>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-sans font-bold transition-all"
                style={active || completed ? { background: BRAND_GRADIENT, color: '#fff' } : { background: 'rgba(255,255,255,0.05)', color: 'rgba(243,250,244,0.4)' }}
              >
                {completed ? <CheckCircle2 className="w-4 h-4" /> : n}
              </div>
              <span className={`text-[12px] font-sans hidden sm:block ${active ? 'text-white font-semibold' : 'text-cream/40'}`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px bg-gold-brushed/15" />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// Calendar helpers
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}
function isoDate(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function MonthCalendar({
  year, month, selectedDate, onSelect,
}: {
  year: number; month: number; selectedDate: string | null; onSelect: (d: string) => void;
}) {
  const days    = getDaysInMonth(year, month)
  const first   = getFirstDayOfMonth(year, month)
  const today   = new Date()
  const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayLabels.map(d => (
          <div key={d} className="text-center text-[10px] font-sans font-semibold uppercase tracking-[0.1em] text-cream/30 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: first }).map((_, i) => <div key={`blank-${i}`} />)}
        {Array.from({ length: days }).map((_, i) => {
          const day  = i + 1
          const date = isoDate(year, month, day)
          const isPast = new Date(date) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
          const sel  = date === selectedDate
          return (
            <button
              key={day}
              disabled={isPast}
              onClick={() => onSelect(date)}
              className={`aspect-square rounded-lg text-[13px] font-sans font-medium transition-all ${
                sel
                  ? 'text-white scale-105'
                  : isPast
                  ? 'text-cream/20 cursor-not-allowed'
                  : 'text-cream/70 hover:bg-white/10 hover:text-white'
              }`}
              style={sel ? { background: BRAND_GRADIENT } : {}}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Step 1: Date + Slot picker
function Step1({
  onNext,
}: {
  onNext: (slot: SlotDoc, duration: number) => void
}) {
  const today = new Date()
  const [year, setYear]           = useState(today.getFullYear())
  const [month, setMonth]         = useState(today.getMonth())
  const [selectedDate, setDate]   = useState<string | null>(null)
  const [duration, setDuration]   = useState(30)
  const [slots, setSlots]         = useState<SlotDoc[]>([])
  const [loadingSlots, setLoading] = useState(false)
  const [selectedSlot, setSlot]   = useState<SlotDoc | null>(null)

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  useEffect(() => {
    if (!selectedDate) { setSlots([]); setSlot(null); return }
    setLoading(true)
    setSlot(null)
    import('@/lib/firestorePublic').then(({ getAvailableSlots }) =>
      getAvailableSlots(selectedDate).then(s => { setSlots(s); setLoading(false) })
    )
  }, [selectedDate])

  const prevMonth = () => { if (month === 0) { setYear(y => y - 1); setMonth(11) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setYear(y => y + 1); setMonth(0) } else setMonth(m => m + 1) }

  const canNext = selectedSlot !== null
  const inp = 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50'

  return (
    <div>
      <h2 className="font-serif font-semibold text-[28px] text-white mb-8">Pick a time</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-1.5 rounded hover:bg-white/5 text-cream/60 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <p className="text-[14px] font-sans font-semibold text-white">{MONTHS[month]} {year}</p>
            <button onClick={nextMonth} className="p-1.5 rounded hover:bg-white/5 text-cream/60 hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <MonthCalendar year={year} month={month} selectedDate={selectedDate} onSelect={d => { setDate(d); setSlot(null) }} />
        </div>

        {/* Duration + Time slots */}
        <div className="space-y-5">
          <div>
            <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-2">Duration</p>
            <div className="flex gap-2">
              {DURATIONS.map(d => (
                <button key={d} onClick={() => setDuration(d)}
                  className={`flex-1 py-2.5 text-[13px] font-sans font-semibold rounded-[6px] border transition-colors ${duration === d ? 'border-teal text-white' : 'border-gold-brushed/20 text-cream/60 hover:border-gold-brushed/40'}`}
                  style={duration === d ? { background: BRAND_GRADIENT } : {}}>
                  {d}m
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-2">
              {selectedDate ? `Available slots — ${selectedDate}` : 'Select a date to see slots'}
            </p>
            {loadingSlots ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-5 h-5 text-gold-brushed animate-spin" />
              </div>
            ) : slots.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {slots.map(slot => (
                  <button key={slot.id} onClick={() => setSlot(slot)}
                    className={`flex items-center gap-1.5 px-3 py-2.5 rounded-[6px] border text-[13px] font-sans transition-colors ${selectedSlot?.id === slot.id ? 'border-teal text-white' : 'border-gold-brushed/20 text-cream/70 hover:border-gold-brushed/40'}`}
                    style={selectedSlot?.id === slot.id ? { background: BRAND_GRADIENT } : {}}>
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    {slot.startTime}
                  </button>
                ))}
              </div>
            ) : selectedDate ? (
              <p className="text-[13px] font-sans text-cream/40 py-4">No slots available for this date. Please pick another day.</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          disabled={!canNext}
          onClick={() => selectedSlot && onNext(selectedSlot, duration)}
          className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] disabled:opacity-40 transition-all hover:-translate-y-px"
          style={{ background: BRAND_GRADIENT }}
        >
          Continue <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Step 2: Personal details
function Step2({
  onNext, onBack,
}: {
  onNext: (data: DetailsForm) => void
  onBack: () => void
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<DetailsForm>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { timezone: 'Asia/Dubai' },
  })

  const inp = 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50'
  const err = 'mt-1 text-[11px] font-sans text-red-400'

  return (
    <div>
      <h2 className="font-serif font-semibold text-[28px] text-white mb-8">Your details</h2>
      <form onSubmit={handleSubmit(onNext)} className="space-y-5 max-w-lg">
        <div>
          <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Full Name</label>
          <input {...register('name')} className={inp} placeholder="Alexandra Chen" />
          {errors.name && <p className={err}>{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Email</label>
          <input {...register('email')} type="email" className={inp} placeholder="alex@company.com" />
          {errors.email && <p className={err}>{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Phone</label>
          <input {...register('phone')} type="tel" className={inp} placeholder="+971 50 000 0000" />
          {errors.phone && <p className={err}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Your Timezone</label>
          <select {...register('timezone')} className={inp}>
            {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Notes (optional)</label>
          <textarea {...register('notes')} rows={3} className={inp + ' resize-none'} placeholder="Anything you'd like us to know before the call…" />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-3.5 text-[13px] font-sans text-cream/60 hover:text-white border border-gold-brushed/15 hover:border-gold-brushed/30 rounded-[6px] transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button type="submit"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] transition-all hover:-translate-y-px"
            style={{ background: BRAND_GRADIENT }}>
            Review booking <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

// Step 3: Confirm
function Step3({
  slot, duration, details, onBack, onConfirm, submitting,
}: {
  slot: SlotDoc; duration: number; details: DetailsForm
  onBack: () => void; onConfirm: () => void; submitting: boolean
}) {
  return (
    <div>
      <h2 className="font-serif font-semibold text-[28px] text-white mb-8">Confirm your booking</h2>
      <div className="max-w-lg bg-navy-card border border-gold-brushed/15 rounded-xl p-6 mb-8 space-y-4">
        <Row label="Date"      value={slot.date} />
        <Row label="Time"      value={`${slot.startTime} (${details.timezone})`} />
        <Row label="Duration"  value={`${duration} minutes`} />
        <div className="h-px bg-gold-brushed/10" />
        <Row label="Name"      value={details.name} />
        <Row label="Email"     value={details.email} />
        <Row label="Phone"     value={details.phone} />
        {details.notes && <Row label="Notes" value={details.notes} />}
      </div>
      <div className="flex gap-3">
        <button onClick={onBack} disabled={submitting}
          className="inline-flex items-center gap-2 px-5 py-3.5 text-[13px] font-sans text-cream/60 hover:text-white border border-gold-brushed/15 hover:border-gold-brushed/30 rounded-[6px] transition-colors disabled:opacity-40">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onConfirm} disabled={submitting}
          className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-sans font-semibold uppercase tracking-[0.08em] text-white rounded-[6px] disabled:opacity-60 transition-all hover:-translate-y-px"
          style={{ background: BRAND_GRADIENT }}>
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
          Confirm Booking
        </button>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <p className="text-[12px] font-sans font-semibold uppercase tracking-[0.12em] text-gold-brushed shrink-0">{label}</p>
      <p className="text-[13px] font-sans text-cream/80 text-right">{value}</p>
    </div>
  )
}

// Success screen
function SuccessScreen({ bookingId }: { bookingId: string }) {
  return (
    <div className="text-center py-12">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ background: BRAND_GRADIENT }}
      >
        <CheckCircle2 className="w-10 h-10 text-white" />
      </div>
      <h2 className="font-serif font-semibold text-[32px] text-white mb-3">Booking confirmed!</h2>
      <p className="text-[15px] font-sans text-cream/65 max-w-md mx-auto mb-2">
        Thank you. We'll reach out shortly to confirm your session details.
      </p>
      <p className="text-[12px] font-mono text-cream/30">Ref: {bookingId.slice(0, 8).toUpperCase()}</p>
    </div>
  )
}

export function BookingFlow() {
  const [step, setStep]         = useState(1)
  const [slot, setSlot]         = useState<SlotDoc | null>(null)
  const [duration, setDuration] = useState(30)
  const [details, setDetails]   = useState<DetailsForm | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [bookingId, setBookingId]   = useState<string | null>(null)

  const handleStep1 = (s: SlotDoc, d: number) => { setSlot(s); setDuration(d); setStep(2) }
  const handleStep2 = (d: DetailsForm)         => { setDetails(d); setStep(3) }

  const handleConfirm = async () => {
    if (!slot || !details) return
    setSubmitting(true)
    try {
      const { createBooking, updateSlotAvailability } = await import('@/lib/firestorePublic')
      const id = await createBooking({
        name: details.name,
        email: details.email,
        phone: details.phone,
        slotId: slot.id!,
        date: slot.date,
        startTime: slot.startTime,
        durationMin: duration,
        timezone: details.timezone,
        notes: details.notes ?? '',
        createdAt: Date.now(),
        status: 'pending',
      })
      await updateSlotAvailability(slot.id!, false, details.email)
      setBookingId(id)
    } catch { /* booking failed silently — could add toast */ }
    setSubmitting(false)
  }

  if (bookingId) return <SuccessScreen bookingId={bookingId} />

  return (
    <div>
      <StepIndicator step={step} />
      {step === 1 && <Step1 onNext={handleStep1} />}
      {step === 2 && <Step2 onNext={handleStep2} onBack={() => setStep(1)} />}
      {step === 3 && slot && details && (
        <Step3
          slot={slot}
          duration={duration}
          details={details}
          onBack={() => setStep(2)}
          onConfirm={handleConfirm}
          submitting={submitting}
        />
      )}
    </div>
  )
}
