'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MessageCircle, Mail, X } from 'lucide-react'
import { useWhatsAppPicker } from '@/context/WhatsAppPickerContext'

export function ApplicationCTA({ label = 'Start Your Application' }: { label?: string }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { openPicker } = useWhatsAppPicker()

  const handleWhatsApp = () => {
    setOpen(false)
    openPicker('Hello Songbird, I would like to start my application.')
  }

  const handleEmail = () => {
    setOpen(false)
    router.push('/contact')
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-gold-deep text-navy text-[14px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(200,145,30,.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="app-modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-sm bg-navy-card border border-gold-brushed/20 rounded-2xl p-8 shadow-[0_24px_64px_rgba(10,23,56,.6)]">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-cream/40 hover:text-cream/80 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 id="app-modal-title" className="font-serif font-normal text-[22px] text-white mb-2">
              How would you like to apply?
            </h2>
            <p className="text-[13px] font-sans text-cream/55 mb-7 leading-relaxed">
              Choose your preferred channel and an advisor will be in touch.
            </p>

            <div className="flex flex-col gap-3">
              {/* WhatsApp */}
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-3 w-full px-5 py-4 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white transition-colors text-left"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <div>
                  <p className="text-[14px] font-sans font-semibold">WhatsApp</p>
                  <p className="text-[12px] font-sans opacity-80">Chat with an advisor instantly</p>
                </div>
              </button>

              {/* Email / Inquiry */}
              <button
                onClick={handleEmail}
                className="flex items-center gap-3 w-full px-5 py-4 rounded-xl border border-gold-brushed/30 hover:border-gold-brushed/60 hover:bg-gold-brushed/5 text-cream transition-colors text-left"
              >
                <Mail className="w-5 h-5 shrink-0 text-gold-brushed" />
                <div>
                  <p className="text-[14px] font-sans font-semibold text-white">Send an Inquiry</p>
                  <p className="text-[12px] font-sans text-cream/55">Fill out our contact form</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
