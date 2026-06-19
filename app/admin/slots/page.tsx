'use client'

import React, { useEffect, useState } from 'react'
import { Plus, Trash2, Loader2, Clock } from 'lucide-react'
import type { SlotDoc } from '@/types/firestore'

const DURATIONS = [15, 30, 45, 60]

function AddSlotModal({ onSave, onClose }: { onSave: () => void; onClose: () => void }) {
  const [form, setForm] = useState({ date: '', startTime: '09:00', endTime: '09:30', durationMin: 30, available: true })
  const [saving, setSaving] = useState(false)
  const inp = 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { saveSlot } = await import('@/lib/firestorePublic')
    await saveSlot(form)
    setSaving(false)
    onSave()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-navy-card border border-gold-brushed/20 rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
        <h2 className="font-serif text-[22px] text-white mb-6">Add Time Slot</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Date</label>
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required className={inp} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Start Time</label>
              <input type="time" value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))} required className={inp} />
            </div>
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">End Time</label>
              <input type="time" value={form.endTime} onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))} required className={inp} />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Duration</label>
            <div className="flex gap-2">
              {DURATIONS.map(d => (
                <button key={d} type="button" onClick={() => setForm(f => ({ ...f, durationMin: d }))}
                  className={`flex-1 py-2 text-[12px] font-sans font-semibold rounded-[6px] border transition-colors ${form.durationMin === d ? 'bg-gold border-gold text-navy' : 'border-gold-brushed/20 text-cream/60 hover:border-gold-brushed/40'}`}>
                  {d}m
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-deep disabled:opacity-60 text-navy text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Add Slot
            </button>
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-[13px] font-sans text-cream/50 hover:text-cream transition-colors">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminSlotsPage() {
  const [slots, setSlots] = useState<SlotDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)

  const load = async () => {
    setLoading(true)
    const { getAllSlots } = await import('@/lib/firestorePublic')
    setSlots(await getAllSlots())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const del = async (id: string) => {
    if (!confirm('Delete this slot?')) return
    const { deleteSlot } = await import('@/lib/firestorePublic')
    await deleteSlot(id)
    load()
  }

  const toggleAvail = async (slot: SlotDoc) => {
    const { updateSlotAvailability } = await import('@/lib/firestorePublic')
    await updateSlotAvailability(slot.id!, !slot.available)
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif font-normal text-[28px] text-white mb-0.5">Time Slots</h1>
          <p className="text-[13px] font-sans text-cream/50">{slots.length} slots</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-deep text-navy text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors">
          <Plus className="w-4 h-4" />
          Add Slot
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>
      ) : (
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold-brushed/10">
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Date</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Time</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Duration</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Status</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Booked By</th>
                <th className="text-right px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.map(slot => (
                <tr key={slot.id} className="border-b border-gold-brushed/5 last:border-0">
                  <td className="px-5 py-3.5 text-[13px] font-sans text-cream">{slot.date}</td>
                  <td className="px-5 py-3.5 text-[13px] font-sans text-cream/70">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold-brushed/60" />
                      {slot.startTime} – {slot.endTime}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] font-sans text-cream/60">{slot.durationMin} min</td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => toggleAvail(slot)}
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-sans font-semibold uppercase tracking-[0.1em] transition-colors ${slot.available ? 'bg-emerald/20 text-emerald hover:bg-emerald/30' : 'bg-red-400/10 text-red-400 hover:bg-red-400/20'}`}>
                      {slot.available ? 'Available' : 'Booked'}
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-[12px] font-sans text-cream/40">{slot.bookedBy ?? '—'}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end">
                      <button onClick={() => del(slot.id!)} title="Delete"
                        className="p-1.5 rounded hover:bg-red-400/10 text-cream/40 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {slots.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-[13px] font-sans text-cream/30">No slots yet. Add one to get started.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showAdd && <AddSlotModal onSave={() => { setShowAdd(false); load() }} onClose={() => setShowAdd(false)} />}
    </div>
  )
}
