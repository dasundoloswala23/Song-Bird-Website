'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X, MessageCircle } from 'lucide-react'
import { useWhatsAppPicker } from '@/context/WhatsAppPickerContext'
import { WHATSAPP_NUMBER, WHATSAPP_NUMBER_INDIA, WHATSAPP_NUMBER_INDIA_DISPLAY, OFFICE_PHONE } from '@/lib/constants'
import { buildWhatsAppUrl } from '@/lib/utils'

const OPTIONS = [
  { label: 'UAE', display: OFFICE_PHONE, number: WHATSAPP_NUMBER },
  { label: 'India', display: WHATSAPP_NUMBER_INDIA_DISPLAY, number: WHATSAPP_NUMBER_INDIA },
]

export function WhatsAppPickerModal() {
  const { isOpen, message, close } = useWhatsAppPicker()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) close() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, close])

  const choose = (number: string) => {
    window.open(buildWhatsAppUrl(number, message), '_blank', 'noopener,noreferrer')
    close()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="whatsapp-picker-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] bg-navy/70 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            key="whatsapp-picker-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-picker-title"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed inset-0 z-[96] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-sm bg-navy-deep border border-gold-brushed/30 rounded-2xl p-6 shadow-[0_32px_80px_rgba(10,23,56,.7)] pointer-events-auto">
              <button
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 p-1.5 text-cream/40 hover:text-cream/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-brushed rounded"
              >
                <X className="w-4 h-4" />
              </button>

              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-gold-brushed mb-1">
                <span className="inline-block w-5 h-px bg-gold-brushed align-middle mr-2" />
                Choose a Number
              </p>
              <h2 id="whatsapp-picker-title" className="font-serif font-normal text-[22px] leading-tight text-white mb-5">
                Chat with us on WhatsApp
              </h2>

              <div className="space-y-3">
                {OPTIONS.map(opt => (
                  <button
                    key={opt.number}
                    onClick={() => choose(opt.number)}
                    className="w-full flex items-center gap-3 p-4 rounded-[10px] border border-gold-brushed/20 hover:border-teal hover:bg-white/5 transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                  >
                    <div className="w-9 h-9 rounded-full bg-whatsapp/15 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4.5 h-4.5 text-whatsapp" />
                    </div>
                    <div>
                      <p className="text-[13px] font-sans font-semibold text-white">{opt.label}</p>
                      <p className="text-[12px] font-sans text-cream/60">{opt.display}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
