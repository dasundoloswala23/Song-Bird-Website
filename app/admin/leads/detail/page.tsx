'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import type { LeadDoc } from '@/types/firestore'

function LeadDetailInner() {
  const params = useSearchParams()
  const id = params.get('id')
  const [lead, setLead] = useState<LeadDoc | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) { setLoading(false); return }
    import('@/lib/firestorePublic').then(({ getLeadById }) =>
      getLeadById(id).then(l => { setLead(l); setLoading(false) })
    )
  }, [id])

  const fmtDate = (ms: number) => new Date(ms).toLocaleString('en-AE', { dateStyle: 'full', timeStyle: 'short' })

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>
  if (!lead) return <div className="p-8 text-cream/60">Lead not found.</div>

  const fields = [
    { label: 'Name',        value: lead.name },
    { label: 'Email',       value: lead.email },
    { label: 'Phone',       value: lead.phone },
    { label: 'Destination', value: lead.destination },
    { label: 'Type',        value: lead.type },
    { label: 'Subject',     value: lead.subject },
    { label: 'Date',        value: lead.createdAt ? fmtDate(lead.createdAt) : '—' },
  ]

  return (
    <div className="p-8 max-w-2xl">
      <Link href="/admin/leads" className="inline-flex items-center gap-1.5 text-[12px] font-sans text-cream/50 hover:text-cream mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Leads
      </Link>
      <h1 className="font-serif font-semibold text-[28px] text-white mb-8">Lead — {lead.name || 'Unknown'}</h1>
      <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-6 space-y-4">
        {fields.filter(f => f.value).map(f => (
          <div key={f.label}>
            <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-0.5">{f.label}</p>
            <p className="text-[14px] font-sans text-cream">{f.value}</p>
          </div>
        ))}
        {lead.message && (
          <div>
            <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-0.5">Message</p>
            <p className="text-[14px] font-sans text-cream/80 whitespace-pre-wrap leading-relaxed">{lead.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function LeadDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>}>
      <LeadDetailInner />
    </Suspense>
  )
}
