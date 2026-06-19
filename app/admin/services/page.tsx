'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react'
import type { ServiceDoc } from '@/types/firestore'

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceDoc[]>([])
  const [loading, setLoading]   = useState(true)

  const load = async () => {
    setLoading(true)
    const { getAllServices } = await import('@/lib/firestorePublic')
    setServices(await getAllServices())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const togglePublish = async (service: ServiceDoc) => {
    const { toggleServicePublished } = await import('@/lib/firestorePublic')
    await toggleServicePublished(service.id!, !service.published)
    load()
  }

  const deleteService = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    const { deleteService: del } = await import('@/lib/firestorePublic')
    await del(id)
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif font-normal text-[28px] text-white mb-0.5">Services</h1>
          <p className="text-[13px] font-sans text-cream/50">{services.length} total</p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-deep text-navy text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-gold-brushed animate-spin" />
        </div>
      ) : (
        <div className="bg-navy-card border border-gold-brushed/15 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold-brushed/10">
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">#</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Title</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Template</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id} className="border-b border-gold-brushed/5 hover:bg-white/3 transition-colors">
                  <td className="px-5 py-3 text-[13px] font-sans text-cream/40">{s.order}</td>
                  <td className="px-5 py-3">
                    <p className="text-[13px] font-sans text-cream">{s.frontTitle}</p>
                    <p className="text-[11px] font-sans text-cream/40">/{s.slug}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-sans font-semibold uppercase tracking-wider ${s.layout === 'full' ? 'bg-gold/15 text-gold-brushed' : 'bg-cream/10 text-cream/50'}`}>
                      {s.layout}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => togglePublish(s)} title={s.published ? 'Unpublish' : 'Publish'}
                      className={`flex items-center gap-1.5 text-[12px] font-sans ${s.published ? 'text-green-400' : 'text-cream/30'}`}>
                      {s.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      {s.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link href={`/admin/services/edit?id=${s.id}`}
                        className="p-1.5 text-cream/40 hover:text-gold-brushed transition-colors rounded">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button onClick={() => deleteService(s.id!, s.frontTitle)}
                        className="p-1.5 text-cream/40 hover:text-red-400 transition-colors rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
