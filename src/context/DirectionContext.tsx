'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Dir = 'ltr' | 'rtl'

interface DirectionContextValue {
  dir: Dir
  toggleDir: () => void
}

const DirectionContext = createContext<DirectionContextValue>({ dir: 'ltr', toggleDir: () => {} })

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const [dir, setDir] = useState<Dir>('ltr')

  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = dir === 'rtl' ? 'ar' : 'en'
  }, [dir])

  const toggleDir = () => setDir(d => (d === 'ltr' ? 'rtl' : 'ltr'))

  return (
    <DirectionContext.Provider value={{ dir, toggleDir }}>
      {children}
    </DirectionContext.Provider>
  )
}

export function useDirection() {
  return useContext(DirectionContext)
}
