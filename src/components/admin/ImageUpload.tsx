'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2 } from 'lucide-react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { firebaseApp } from '@/lib/firebase'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')

  const handleFile = async (file: File) => {
    setError('')
    setUploading(true)
    setProgress(0)
    try {
      const storage = getStorage(firebaseApp)
      const storageRef = ref(storage, `uploads/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`)
      const task = uploadBytesResumable(storageRef, file)

      await new Promise<void>((resolve, reject) => {
        task.on(
          'state_changed',
          snap => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
          reject,
          resolve,
        )
      })

      const url = await getDownloadURL(task.snapshot.ref)
      onChange(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  return (
    <div>
      <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-gold-brushed mb-2">{label}</p>
      {value ? (
        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gold-brushed/20 bg-navy-card">
          <Image src={value} alt="Uploaded" fill className="object-cover" sizes="400px" unoptimized />
          <button type="button" onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1 bg-navy/80 rounded text-cream/70 hover:text-red-400">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
          className="w-full h-32 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gold-brushed/25 rounded-lg text-cream/40 hover:border-gold-brushed/50 hover:text-cream/60 transition-colors disabled:opacity-50">
          {uploading
            ? <><Loader2 className="w-5 h-5 animate-spin" /><span className="text-[12px] font-sans">{progress}%</span></>
            : <><Upload className="w-5 h-5" /><span className="text-[12px] font-sans">Click to upload</span></>
          }
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
      <div className="mt-2">
        <input type="url" value={value} onChange={e => onChange(e.target.value)}
          placeholder="Or paste an image URL…"
          className="w-full px-3 py-2 bg-navy/40 border border-gold-brushed/15 rounded-[6px] text-[12px] font-sans text-cream/60 placeholder:text-cream/25 focus:outline-none focus:ring-1 focus:ring-gold-brushed/40" />
      </div>
      {error && <p className="mt-1 text-[11px] text-red-400">{error}</p>}
    </div>
  )
}
