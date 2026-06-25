'use client'

import React, { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, ExternalLink } from 'lucide-react'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { RichTextEditor } from '@/components/admin/RichTextEditor'
import { RepeatableList } from '@/components/admin/RepeatableList'
import { SectionEditor, normalizeSections } from '@/components/admin/SectionEditor'
import { slugify } from '@/lib/utils'
import type { DestinationDoc, ServiceSection } from '@/types/firestore'

function DestinationModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: DestinationDoc
  onSave: () => void
  onClose: () => void
}) {
  const [form, setForm] = useState<Omit<DestinationDoc, 'id'>>({
    order: initial?.order ?? 0,
    slug: initial?.slug ?? '',
    name: initial?.name ?? '',
    blurb: initial?.blurb ?? '',
    image: initial?.image ?? '',
    ctaImage: initial?.ctaImage ?? '',
    bottomImage: initial?.bottomImage ?? '',
    routes: initial?.routes ?? [],
    published: initial?.published ?? false,
    overview: initial?.overview ?? '',
    sections: initial?.sections ?? [],
  })
  const [saving, setSaving] = useState(false)
  const [routesText, setRoutesText] = useState((initial?.routes ?? []).join('\n'))

  const inp = 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // Upload any pasted base64 images (overview + sections) to keep the doc under 1 MB.
    const { uploadInlineSectionImages, inlineImagesToUrls } = await import('@/lib/uploadFile')
    const overview = await inlineImagesToUrls(form.overview ?? '')
    const sections = (await uploadInlineSectionImages(normalizeSections(form.sections))) ?? []
    const { saveDestination } = await import('@/lib/firestorePublic')
    await saveDestination({
      ...form,
      overview,
      slug: slugify(form.slug) || slugify(form.name),
      routes: routesText.split('\n').map(r => r.trim()).filter(Boolean),
      sections,
    }, initial?.id)
    setSaving(false)
    onSave()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-navy-card border border-gold-brushed/20 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
        <h2 className="font-serif text-[22px] text-white mb-6">{initial ? 'Edit Destination' : 'Add Destination'}</h2>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className={inp} placeholder="Dubai" />
            </div>
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Slug</label>
              <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required className={inp} placeholder="dubai" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Blurb</label>
            <input value={form.blurb} onChange={e => setForm(f => ({ ...f, blurb: e.target.value }))} className={inp} placeholder="Short positioning line" />
          </div>
          <ImageUpload
            value={form.image}
            onChange={url => setForm(f => ({ ...f, image: url }))}
            label="Hero / Card Image"
          />
          <ImageUpload
            value={form.ctaImage ?? ''}
            onChange={url => setForm(f => ({ ...f, ctaImage: url }))}
            label={'CTA Background ("Ready to explore …?") — optional'}
          />
          <ImageUpload
            value={form.bottomImage ?? ''}
            onChange={url => setForm(f => ({ ...f, bottomImage: url }))}
            label={'Bottom Image (shown before the final CTA) — optional'}
          />
          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Routes (sub-topics, one per line)</label>
            <textarea value={routesText} onChange={e => setRoutesText(e.target.value)} rows={4} className={inp + ' resize-none'} placeholder={'Golden Visa\nWork Permit\nBusiness Setup'} />
          </div>

          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Overview (shown as the first block on the detail page — optional)</label>
            <RichTextEditor value={form.overview ?? ''} onChange={html => setForm(f => ({ ...f, overview: html }))} placeholder="Intro / overview for this destination…" />
          </div>

          <div>
            <RepeatableList<ServiceSection>
              label="Page Sections"
              items={form.sections ?? []}
              onChange={sections => setForm(f => ({ ...f, sections }))}
              createEmpty={() => ({ id: '', title: '', body: '', serviceBody: '' })}
              renderItem={(item, _i, onChg) => <SectionEditor item={item} onChange={onChg} />}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed mb-1.5">Order</label>
              <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} className={inp} />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="accent-gold w-4 h-4" />
                <span className="text-[13px] font-sans text-cream/70">Published</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-deep disabled:opacity-60 text-navy text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save
            </button>
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-[13px] font-sans text-cream/50 hover:text-cream transition-colors">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<DestinationDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<DestinationDoc | null | 'new'>(null)

  const load = async () => {
    setLoading(true)
    const { getAllDestinations } = await import('@/lib/firestorePublic')
    setDestinations(await getAllDestinations())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const toggle = async (dest: DestinationDoc) => {
    const { toggleDestinationPublished } = await import('@/lib/firestorePublic')
    await toggleDestinationPublished(dest.id!, !dest.published)
    load()
  }

  const del = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    const { deleteDestination } = await import('@/lib/firestorePublic')
    await deleteDestination(id)
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif font-normal text-[28px] text-white mb-0.5">Destinations</h1>
          <p className="text-[13px] font-sans text-cream/50">{destinations.length} total</p>
        </div>
        <button onClick={() => setEditing('new')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-deep text-navy text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors">
          <Plus className="w-4 h-4" />
          Add Destination
        </button>
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
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Name</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Slug</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Routes</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Status</th>
                <th className="text-right px-5 py-3 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-gold-brushed">Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map(dest => (
                <tr key={dest.id} className="border-b border-gold-brushed/5 last:border-0">
                  <td className="px-5 py-3.5 text-[13px] font-sans text-cream/40">{dest.order}</td>
                  <td className="px-5 py-3.5">
                    <p className="text-[13px] font-sans font-medium text-cream">{dest.name}</p>
                    <p className="text-[11px] font-sans text-cream/40 truncate max-w-[200px]">{dest.blurb}</p>
                  </td>
                  <td className="px-5 py-3.5 text-[12px] font-mono text-cream/50">{dest.slug}</td>
                  <td className="px-5 py-3.5 text-[12px] font-sans text-cream/50">{dest.routes?.length ?? 0} routes</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-sans font-semibold uppercase tracking-[0.1em] ${dest.published ? 'bg-emerald/20 text-emerald' : 'bg-white/5 text-cream/30'}`}>
                      {dest.published ? 'Live' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <a href={`/preview?type=destination&slug=${dest.slug}`} target="_blank" rel="noopener noreferrer"
                        title="Preview" className="p-1.5 rounded hover:bg-white/5 text-cream/40 hover:text-gold-brushed transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button onClick={() => toggle(dest)} title={dest.published ? 'Unpublish' : 'Publish'}
                        className="p-1.5 rounded hover:bg-white/5 text-cream/40 hover:text-cream transition-colors">
                        {dest.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button onClick={() => setEditing(dest)} title="Edit"
                        className="p-1.5 rounded hover:bg-white/5 text-cream/40 hover:text-gold-brushed transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => del(dest.id!, dest.name)} title="Delete"
                        className="p-1.5 rounded hover:bg-red-400/10 text-cream/40 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {destinations.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-[13px] font-sans text-cream/30">No destinations yet. Add one to get started.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <DestinationModal
          initial={editing === 'new' ? undefined : editing}
          onSave={() => { setEditing(null); load() }}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
