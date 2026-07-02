'use client'

import React from 'react'
import { useWhatsAppPicker } from '@/context/WhatsAppPickerContext'

interface WhatsAppTriggerButtonProps {
  message: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export function WhatsAppTriggerButton({ message, className, style, children }: WhatsAppTriggerButtonProps) {
  const { openPicker } = useWhatsAppPicker()
  return (
    <button type="button" onClick={() => openPicker(message)} className={className} style={style}>
      {children}
    </button>
  )
}
