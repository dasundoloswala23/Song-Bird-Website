'use client'

import React, { createContext, useContext, useState } from 'react'

interface WhatsAppPickerContextValue {
  isOpen: boolean
  message: string
  openPicker: (message: string) => void
  close: () => void
}

const WhatsAppPickerContext = createContext<WhatsAppPickerContextValue | null>(null)

export function WhatsAppPickerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <WhatsAppPickerContext.Provider
      value={{
        isOpen,
        message,
        openPicker: (msg: string) => { setMessage(msg); setIsOpen(true) },
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </WhatsAppPickerContext.Provider>
  )
}

export function useWhatsAppPicker() {
  const ctx = useContext(WhatsAppPickerContext)
  if (!ctx) throw new Error('useWhatsAppPicker must be used inside WhatsAppPickerProvider')
  return ctx
}
