'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react'
import type { BookingDoc } from '@/types/firestore'

const STATUS_STYLES: Record<BookingDoc['status'], string> = {
  pending:   'bg-yellow-400/10 text-yellow-400',
  confirmed: 'bg-emerald/20 text-emerald',
  cancelled: 'bg-red-400/10 text-red-400',
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingDoc[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { getBookings } = await import('@/lib/firestorePublic')
    setBookings(await getBookings())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: BookingDoc['status']) => {
    const { updateBookingStatus } = await import('@/lib/firestorePublic')
    await updateBookingStatus(id, status)
    load()
  }

  const fmt = (ts: number) => new Date(ts).toLocaleDateString('en-AE', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif font-medium text-[28px] text-white mb-0.5">Bookings</h1>
        <p className="text-[13px] font-sans text-cream/50">{bookings.length} total</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>
      ) : (
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold-brushed/10">
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Client</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Date & Time</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Duration</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Timezone</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Received</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Status</th>
                <th className="text-right px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-b border-gold-brushed/5 last:border-0">
                  <td className="px-5 py-3.5">
                    <p className="text-[13px] font-sans font-medium text-cream">{b.name}</p>
                    <p className="text-[11px] font-sans text-cream/40">{b.email}</p>
                    <p className="text-[11px] font-sans text-cream/40">{b.phone}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-[13px] font-sans text-cream">{b.date}</p>
                    <p className="text-[11px] font-sans text-cream/50 flex items-center gap-1">
                      <Clock className="w-3 h-3" />{b.startTime}
                    </p>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] font-sans text-cream/60">{b.durationMin} min</td>
                  <td className="px-5 py-3.5 text-[12px] font-sans text-cream/40">{b.timezone}</td>
                  <td className="px-5 py-3.5 text-[12px] font-sans text-cream/40">{fmt(b.createdAt)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-sans font-semibold uppercase tracking-[0.1em] ${STATUS_STYLES[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      {b.status !== 'confirmed' && (
                        <button onClick={() => updateStatus(b.id!, 'confirmed')} title="Confirm"
                          className="p-1.5 rounded hover:bg-emerald/10 text-cream/40 hover:text-emerald transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {b.status !== 'cancelled' && (
                        <button onClick={() => updateStatus(b.id!, 'cancelled')} title="Cancel"
                          className="p-1.5 rounded hover:bg-red-400/10 text-cream/40 hover:text-red-400 transition-colors">
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-[13px] font-sans text-cream/30">No bookings yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
