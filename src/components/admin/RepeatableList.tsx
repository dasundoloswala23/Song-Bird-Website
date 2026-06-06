'use client'

import React from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'

interface RepeatableListProps<T> {
  items: T[]
  onChange: (items: T[]) => void
  renderItem: (item: T, index: number, onChange: (val: T) => void) => React.ReactNode
  createEmpty: () => T
  label: string
  maxItems?: number
}

export function RepeatableList<T>({
  items, onChange, renderItem, createEmpty, label, maxItems = 20,
}: RepeatableListProps<T>) {
  const update = (index: number, val: T) => {
    const next = [...items]
    next[index] = val
    onChange(next)
  }

  const remove = (index: number) => onChange(items.filter((_, i) => i !== index))

  const add = () => {
    if (items.length >= maxItems) return
    onChange([...items, createEmpty()])
  }

  return (
    <div>
      <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-gold-brushed mb-3">{label}</p>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <GripVertical className="w-4 h-4 text-cream/20 mt-3 shrink-0" />
            <div className="flex-1">{renderItem(item, i, val => update(i, val))}</div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="mt-2.5 p-1.5 text-cream/30 hover:text-red-400 transition-colors rounded"
              aria-label="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      {items.length < maxItems && (
        <button
          type="button"
          onClick={add}
          className="mt-3 flex items-center gap-1.5 text-[12px] font-sans font-medium text-gold-brushed hover:text-gold transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add {label.replace(/s$/, '')}
        </button>
      )}
    </div>
  )
}
