'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react'
import { ServiceForm } from '@/components/admin/ServiceForm'
import type { ServiceDoc } from '@/types/firestore'

function EditServiceInner() {
  const params = useSearchParams()
  const id = params.get('id')
  const [service, setService] = useState<ServiceDoc | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) { setLoading(false); return }
    import('@/lib/firestorePublic').then(({ getServiceById }) =>
      getServiceById(id).then(s => { setService(s); setLoading(false) })
    )
  }, [id])

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>
  if (!service) return <div className="p-8 text-cream/60">Service not found.</div>

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/services" className="inline-flex items-center gap-1.5 text-[12px] font-sans text-cream/50 hover:text-cream transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Services
        </Link>
        <a href={`/preview?type=service&slug=${service.slug}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-sans font-semibold text-gold-brushed border border-gold-brushed/30 hover:bg-gold/10 rounded-[6px] transition-colors">
          <ExternalLink className="w-3.5 h-3.5" />
          Preview
        </a>
      </div>
      <h1 className="font-serif font-normal text-[28px] text-white mb-8">Edit — {service.frontTitle}</h1>
      <ServiceForm initialData={service} serviceId={id!} />
    </div>
  )
}

export default function EditServicePage() {
  return (
    <Suspense fallback={<div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-gold-brushed animate-spin" /></div>}>
      <EditServiceInner />
    </Suspense>
  )
}
