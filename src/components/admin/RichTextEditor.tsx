'use client'

import { useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { uploadFile } from '@/lib/uploadFile'
import 'react-quill-new/dist/quill.snow.css'

// Quill touches `document`, so it must be client-only (required under static export).
// next/dynamic strips ref forwarding, so wrap it to pass the editor ref through `forwardedRef`.
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill-new')
    const Wrapped = ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />
    return Wrapped
  },
  {
    ssr: false,
    loading: () => (
      <div className="h-48 bg-navy/40 border border-gold-brushed/20 rounded-[6px] animate-pulse" />
    ),
  },
)

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const quillRef = useRef<any>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  // Open a file picker, upload through the existing Firebase pipeline, then embed the URL.
  const imageHandler = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      setError('')
      setUploading(true)
      try {
        const url = await uploadFile(file, 'uploads')
        const editor = quillRef.current?.getEditor?.()
        const range = editor?.getSelection?.(true)
        const index = range ? range.index : editor?.getLength?.() ?? 0
        editor?.insertEmbed(index, 'image', url)
        editor?.setSelection?.(index + 1, 0)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Image upload failed.')
      } finally {
        setUploading(false)
      }
    }
    input.click()
  }

  // useMemo so the toolbar handler isn't recreated each render (which would remount the editor).
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'link', 'image'],
          ['clean'],
        ],
        handlers: { image: imageHandler },
      },
    }),
    [],
  )

  const formats = ['header', 'bold', 'italic', 'underline', 'list', 'blockquote', 'link', 'image']

  return (
    <div className="sb-quill bg-navy/40 border border-gold-brushed/20 rounded-[6px]">
      <ReactQuill
        forwardedRef={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
      {uploading && <p className="px-3 py-1.5 text-[11px] font-sans text-gold-brushed">Uploading image…</p>}
      {error && <p className="px-3 py-1.5 text-[11px] font-sans text-red-400">{error}</p>}
    </div>
  )
}
