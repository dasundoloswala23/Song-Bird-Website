'use client'

import React, { createContext, useContext, useState } from 'react'

interface ConsultationModalContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ConsultationModalContext = createContext<ConsultationModalContextValue | null>(null)

export function ConsultationModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ConsultationModalContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </ConsultationModalContext.Provider>
  )
}

export function useConsultationModal() {
  const ctx = useContext(ConsultationModalContext)
  if (!ctx) throw new Error('useConsultationModal must be used inside ConsultationModalProvider')
  return ctx
}
