'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { DEFAULT_LOCALE, translate, type LocaleCode, type MessageKey } from '@/i18n'

const STORAGE_KEY = 'songbird.locale'

interface LanguageContextValue {
  locale: LocaleCode
  setLocale: (code: LocaleCode) => void
  t: (key: MessageKey) => string
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key) => translate(DEFAULT_LOCALE, key),
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(DEFAULT_LOCALE)

  // Restore the saved locale on mount (client-only; safe for static export).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as LocaleCode | null
    if (saved) setLocaleState(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((code: LocaleCode) => {
    setLocaleState(code)
    window.localStorage.setItem(STORAGE_KEY, code)
  }, [])

  const t = useCallback((key: MessageKey) => translate(locale, key), [locale])

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useT() {
  return useContext(LanguageContext)
}
