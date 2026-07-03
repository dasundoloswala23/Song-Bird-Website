import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import AdminLayoutClient from './AdminLayoutClient'

// Keep the admin panel out of search results (robots.txt also disallows /admin/).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
