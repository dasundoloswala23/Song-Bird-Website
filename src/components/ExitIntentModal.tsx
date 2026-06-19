'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X, MessageCircle, ArrowRight } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'
import { WHATSAPP_NUMBER } from '@/lib/constants'

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false)
  const hasShown = useRef(false)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (hasShown.current) return
      if (e.clientY <= 4) {
        hasShown.current = true
        setIsOpen(true)
      }
    }
    document.addEventListener('mouseleave', handler)
    return () => document.removeEventListener('mouseleave', handler)
  }, [])

  const close = () => setIsOpen(false)

  const waUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, 'Hello Songbird, I would like a free immigration assessment.')

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-navy/70 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-modal-title"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md bg-navy-deep border border-gold-brushed/30 rounded-2xl p-8 shadow-[0_32px_80px_rgba(10,23,56,.7)] pointer-events-auto">
              <button
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 p-1.5 text-cream/40 hover:text-cream/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-brushed rounded"
              >
                <X className="w-4 h-4" />
              </button>

              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-gold-brushed mb-1">
                <span className="inline-block w-5 h-px bg-gold-brushed align-middle mr-2" />
                Before You Go…
              </p>
              <h2 id="exit-modal-title" className="font-serif font-normal text-[28px] leading-tight text-white mb-3">
                Get Your Free<br />Immigration Assessment
              </h2>
              <p className="text-[14px] font-sans text-cream/60 mb-7 leading-relaxed">
                Talk to a specialist — just an honest conversation about your options. We will respond to you within 24 hours.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 text-white text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(31,169,104,.4)]"
                  style={{ background: 'linear-gradient(95deg, #22B877 0%, #0E7C5A 100%)' }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Free Assessment
                </a>
                <button
                  onClick={close}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-gold-brushed/40 text-gold-brushed hover:bg-gold-brushed/10 text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors"
                >
                  Fill in Contact Form
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={close}
                  className="text-[12px] font-sans text-cream/35 hover:text-cream/55 transition-colors text-center pt-1"
                >
                  No thanks, I&apos;ll continue browsing
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
