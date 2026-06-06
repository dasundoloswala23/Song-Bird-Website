'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, ArrowRight } from 'lucide-react'
import type { LeadDoc } from '@/types/firestore'

export default function AdminLeadsPage() {
  const [leads,   setLeads]   = useState<LeadDoc[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getLeads }) =>
      getLeads().then(data => { setLeads(data); setLoading(false) })
    )
  }, [])

  const fmtDate = (ms: number) => new Date(ms).toLocaleDateString('en-AE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  return (
    <div className="p-8">
      <h1 className="font-serif font-semibold text-[28px] text-white mb-1">Leads</h1>
      <p className="text-[13px] font-sans text-cream/50 mb-8">{leads.length} total submissions</p>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>
      ) : (
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold-brushed/10">
                {['Name', 'Email', 'Type', 'Destination', 'Date', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className="border-b border-gold-brushed/5 hover:bg-white/3 transition-colors">
                  <td className="px-5 py-3 text-[13px] font-sans text-cream">{lead.name || '—'}</td>
                  <td className="px-5 py-3 text-[13px] font-sans text-cream/60">{lead.email || '—'}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-sans uppercase tracking-wider ${lead.type === 'consultation' ? 'bg-gold/15 text-gold-brushed' : 'bg-cream/10 text-cream/50'}`}>
                      {lead.type}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[13px] font-sans text-cream/50">{lead.destination || '—'}</td>
                  <td className="px-5 py-3 text-[12px] font-sans text-cream/40">{lead.createdAt ? fmtDate(lead.createdAt) : '—'}</td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/leads/detail?id=${lead.id}`} className="p-1.5 text-cream/30 hover:text-gold-brushed transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
