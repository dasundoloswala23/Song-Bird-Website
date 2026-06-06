'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseApp } from '@/lib/firebase'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Loader2 } from 'lucide-react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/'
  const [authChecked, setAuthChecked] = useState(isLoginPage)

  useEffect(() => {
    if (isLoginPage) return
    const auth = getAuth(firebaseApp)
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) router.replace('/admin/login')
      else setAuthChecked(true)
    })
    return unsub
  }, [isLoginPage, router])

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#0d1e38] font-sans">{children}</div>
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0d1e38] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-gold-brushed animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#0d1e38] font-sans">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
