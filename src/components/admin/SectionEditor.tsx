'use client'

import { useState } from 'react'
import { RepeatableList } from './RepeatableList'
import { RichTextEditor } from './RichTextEditor'
import { ImageUpload } from './ImageUpload'
import { slugify } from '@/lib/utils'
import type { ServiceSection, SectionTab, StatStripItem, FeatureCard } from '@/types/firestore'

const inputCls = 'w-full px-3.5 py-2.5 bg-navy/40 border border-gold-brushed/20 rounded-[6px] text-[13px] font-sans text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50 transition-colors'

// Tabs of a section, preferring the new `tabs` array and falling back to the legacy
// body / serviceBody fields so older content keeps working.
export function sectionTabs(section: ServiceSection): SectionTab[] {
  if (section.tabs && section.tabs.length) return section.tabs
  return [
    { label: 'Overview', body: section.body || '' },
    ...(section.serviceBody?.trim() ? [{ label: 'Our Service', body: section.serviceBody }] : []),
  ]
}

// Collapsible section editor: title + addable named tabs (Overview / Benefits / Service …) +
// optional stats. Quill is heavy, so editors stay unmounted until expanded (prevents form lag).
// Shared by the Services and Destinations admin forms.
export function SectionEditor({ item, onChange }: { item: ServiceSection; onChange: (val: ServiceSection) => void }) {
  const [expanded, setExpanded] = useState(() => !item.title?.trim() && !item.body?.trim() && !item.tabs?.length)
  const tabs = sectionTabs(item)

  return (
    <div className="space-y-2">
      <input
        value={item.title}
        onChange={e => onChange({ ...item, title: e.target.value })}
        placeholder="Section title (e.g. Skilled Migration)"
        className={inputCls}
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-sans text-cream/35">
          Anchor: <span className="text-gold-brushed/70">#{slugify(item.title) || 'section'}</span>
        </p>
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          className="shrink-0 text-[11px] font-sans font-semibold uppercase tracking-[0.08em] text-gold-brushed hover:text-cream transition-colors"
        >
          {expanded ? 'Hide content ▲' : 'Edit content ▼'}
        </button>
      </div>
      {expanded && (
        <div className="space-y-2 pt-1">
          <RepeatableList<SectionTab>
            label="Tabs (add Overview, Benefits, Service…)"
            items={tabs}
            onChange={next => onChange({ ...item, tabs: next })}
            createEmpty={() => ({ label: '', body: '' })}
            maxItems={6}
            renderItem={(tab, _i, onTab) => (
              <div className="space-y-2">
                <input
                  value={tab.label}
                  onChange={e => onTab({ ...tab, label: e.target.value })}
                  placeholder="Tab title (e.g. Overview / Benefits / Service)"
                  className={inputCls}
                />
                <RichTextEditor value={tab.body} onChange={html => onTab({ ...tab, body: html })} placeholder="Tab content…" />
              </div>
            )}
          />

          <div className="pt-2">
            <RepeatableList<StatStripItem>
              label="Section Stats (optional, up to 4)"
              items={item.stats ?? []}
              onChange={stats => onChange({ ...item, stats })}
              createEmpty={() => ({ label: '', value: '' })}
              maxItems={4}
              renderItem={(st, _j, onStat) => (
                <div className="grid grid-cols-2 gap-2">
                  <input value={st.label} onChange={e => onStat({ ...st, label: e.target.value })} placeholder="Figure (e.g. 98%)" className={inputCls} />
                  <input value={st.value} onChange={e => onStat({ ...st, value: e.target.value })} placeholder="Caption (e.g. Success Rate)" className={inputCls} />
                </div>
              )}
            />
          </div>

          <div className="pt-2">
            <RepeatableList<FeatureCard>
              label="Feature Cards (optional — icon + title + subtitle grid)"
              items={item.cards ?? []}
              onChange={cards => onChange({ ...item, cards })}
              createEmpty={() => ({ icon: '', title: '', subtitle: '' })}
              maxItems={8}
              renderItem={(card, _k, onCard) => (
                <div className="space-y-2">
                  <ImageUpload value={card.icon ?? ''} onChange={url => onCard({ ...card, icon: url })} label="Icon (optional)" />
                  <input value={card.title} onChange={e => onCard({ ...card, title: e.target.value })} placeholder="Card title (e.g. Global Recognition)" className={inputCls} />
                  <textarea value={card.subtitle} onChange={e => onCard({ ...card, subtitle: e.target.value })} rows={2} placeholder="Card subtitle…" className={inputCls + ' resize-none'} />
                </div>
              )}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Normalizes sectioned content before saving: trims titles + tab labels, drops empty tabs,
// (re)generates stable slug ids, dedupes collisions, drops fully-empty sections.
export function normalizeSections(sections: ServiceSection[] | undefined): ServiceSection[] {
  if (!sections) return []
  const seen = new Map<string, number>()
  return sections
    .map(s => {
      const stats = (s.stats ?? []).filter(st => st.label?.trim() || st.value?.trim())
      const cards = (s.cards ?? [])
        .map(c => ({ icon: c.icon ?? '', title: c.title.trim(), subtitle: c.subtitle.trim() }))
        .filter(c => c.title || c.subtitle || c.icon)
      return {
        ...s,
        title: s.title.trim(),
        tabs: (s.tabs ?? []).map(t => ({ label: t.label.trim(), body: t.body })).filter(t => t.label || t.body?.trim()),
        stats: stats.length ? stats : [],
        cards: cards.length ? cards : [],
      }
    })
    .filter(s => s.title || s.body?.trim() || s.serviceBody?.trim() || s.tabs.length > 0 || s.cards.length > 0)
    .map(s => {
      const base = s.id && s.id === slugify(s.title) ? s.id : slugify(s.title) || 'section'
      const count = seen.get(base) ?? 0
      seen.set(base, count + 1)
      return { ...s, id: count === 0 ? base : `${base}-${count + 1}` }
    })
}
