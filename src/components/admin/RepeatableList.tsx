'use client'

import React, { useState } from 'react'
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
  // Drag-to-reorder state. `draggableIndex` is the row enabled for dragging (set on grip mousedown,
  // so only the handle starts a drag — inputs/editors stay selectable).
  const [draggableIndex, setDraggableIndex] = useState<number | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)

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

  const move = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0) return
    const next = [...items]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    onChange(next)
  }

  const resetDrag = () => {
    setDraggableIndex(null)
    setDragIndex(null)
    setOverIndex(null)
  }

  return (
    <div>
      <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-gold-brushed mb-3">{label}</p>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            draggable={draggableIndex === i}
            onDragStart={e => { e.stopPropagation(); setDragIndex(i); e.dataTransfer.effectAllowed = 'move' }}
            onDragOver={e => { if (dragIndex === null) return; e.preventDefault(); e.stopPropagation(); if (overIndex !== i) setOverIndex(i) }}
            onDrop={e => { if (dragIndex === null) return; e.preventDefault(); e.stopPropagation(); move(dragIndex, i); resetDrag() }}
            onDragEnd={() => resetDrag()}
            className={`flex items-start gap-2 rounded-lg transition-shadow ${overIndex === i && dragIndex !== null && dragIndex !== i ? 'ring-2 ring-gold-brushed/50' : ''} ${dragIndex === i ? 'opacity-50' : ''}`}
          >
            <button
              type="button"
              aria-label="Drag to reorder"
              title="Drag to reorder"
              onMouseDown={() => setDraggableIndex(i)}
              onMouseUp={() => setDraggableIndex(null)}
              className="mt-2.5 p-1.5 text-cream/30 hover:text-gold-brushed cursor-grab active:cursor-grabbing shrink-0"
            >
              <GripVertical className="w-4 h-4" />
            </button>
            <div className="flex-1 min-w-0">{renderItem(item, i, val => update(i, val))}</div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="mt-2.5 p-1.5 text-cream/30 hover:text-red-400 transition-colors rounded shrink-0"
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
