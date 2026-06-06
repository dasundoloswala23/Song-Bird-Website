import { ServiceForm } from '@/components/admin/ServiceForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewServicePage() {
  return (
    <div className="p-8">
      <Link href="/admin/services" className="inline-flex items-center gap-1.5 text-[12px] font-sans text-cream/50 hover:text-cream mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Services
      </Link>
      <h1 className="font-serif font-semibold text-[28px] text-white mb-8">Add Service</h1>
      <ServiceForm />
    </div>
  )
}
