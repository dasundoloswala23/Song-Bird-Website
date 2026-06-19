'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Mail } from 'lucide-react'
import type { NewsletterSignupDoc } from '@/types/firestore'

export default function AdminNewsletterPage() {
  const [items, setItems] = useState<NewsletterSignupDoc[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getNewsletterSignups }) =>
      getNewsletterSignups().then(d => { setItems(d); setLoading(false) })
    )
  }, [])

  const fmt = (ms: number) => {
    try { return new Date(ms).toLocaleString() } catch { return '' }
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-serif font-normal text-[28px] text-white mb-2">Newsletter</h1>
      <p className="text-[13px] font-sans text-cream/50 mb-8">
        {items.length} subscriber{items.length === 1 ? '' : 's'} from the footer signup form.
      </p>

      {items.length === 0 ? (
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl p-10 text-center text-[14px] font-sans text-cream/50">
          No newsletter signups yet.
        </div>
      ) : (
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl divide-y divide-gold-brushed/10">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <span className="flex items-center gap-2.5 text-[13px] font-sans text-cream">
                <Mail className="w-4 h-4 text-gold-brushed shrink-0" />
                {item.email}
              </span>
              <span className="text-[12px] font-sans text-cream/40 shrink-0">{fmt(item.createdAt)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
