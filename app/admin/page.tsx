import { adminDb } from '@/lib/firebaseAdmin'
import Link from 'next/link'
import { Layers, Inbox, Settings2, BarChart3, ArrowRight } from 'lucide-react'

async function getCounts() {
  try {
    const [services, leads] = await Promise.all([
      adminDb.collection('services').count().get(),
      adminDb.collection('leads').count().get(),
    ])
    return {
      services: services.data().count,
      leads: leads.data().count,
    }
  } catch {
    return { services: 0, leads: 0 }
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts()

  const cards = [
    { label: 'Total Services',  value: counts.services, href: '/admin/services',      Icon: Layers },
    { label: 'Total Leads',     value: counts.leads,    href: '/admin/leads',          Icon: Inbox },
    { label: 'Why Choose Us',   value: 'Edit',          href: '/admin/why-choose-us',  Icon: Settings2 },
    { label: 'Site Stats',      value: 'Edit',          href: '/admin/stats',          Icon: BarChart3 },
  ]

  return (
    <div className="p-8">
      <h1 className="font-serif font-normal text-[28px] text-white mb-1">Dashboard</h1>
      <p className="text-[13px] font-sans text-cream/50 mb-8">Welcome to the Songbird content manager.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(({ label, value, href, Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col p-5 rounded-xl bg-navy-card border border-gold-brushed/15 hover:border-gold-brushed/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-lg bg-gold-brushed/15 flex items-center justify-center">
                <Icon className="w-4.5 h-4.5 text-gold-brushed" />
              </div>
              <ArrowRight className="w-4 h-4 text-cream/25 group-hover:text-gold-brushed transition-colors" />
            </div>
            <p className="font-serif font-normal text-[28px] text-white leading-none mb-1">{value}</p>
            <p className="text-[12px] font-sans text-cream/50 uppercase tracking-[0.12em]">{label}</p>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-deep text-navy text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors"
        >
          + Add Service
        </Link>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold-brushed/30 text-gold-brushed hover:bg-gold-brushed/10 text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors"
        >
          View Leads
        </Link>
      </div>
    </div>
  )
}
