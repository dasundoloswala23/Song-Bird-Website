'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Layers, Settings2, BarChart3, Inbox, LogOut, Bird, ListOrdered, Quote, MapPin, CalendarDays, Clock, Video, Sparkles, Award, Handshake } from 'lucide-react'
import { getAuth, signOut } from 'firebase/auth'
import { firebaseApp } from '@/lib/firebase'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin',                label: 'Dashboard',      Icon: LayoutDashboard },
  { href: '/admin/services',       label: 'Services',       Icon: Layers },
  { href: '/admin/destinations',   label: 'Destinations',   Icon: MapPin },
  { href: '/admin/why-choose-us',  label: 'Why Choose Us',  Icon: Settings2 },
  { href: '/admin/welcome',        label: 'Welcome / Who We Are', Icon: Sparkles },
  { href: '/admin/accreditations', label: 'Accreditations', Icon: Award },
  { href: '/admin/collaborations', label: 'Collaborations', Icon: Handshake },
  { href: '/admin/process',        label: 'How It Works',   Icon: ListOrdered },
  { href: '/admin/testimonials',   label: 'Client Stories', Icon: Quote },
  { href: '/admin/stats',          label: 'Stats',          Icon: BarChart3 },
  { href: '/admin/slots',          label: 'Time Slots',     Icon: Clock },
  { href: '/admin/bookings',       label: 'Bookings',       Icon: CalendarDays },
  { href: '/admin/hero',           label: 'Hero / Video',   Icon: Video },
  { href: '/admin/leads',          label: 'Leads',          Icon: Inbox },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router   = useRouter()

  const handleLogout = async () => {
    const auth = getAuth(firebaseApp)
    await signOut(auth)
    router.replace('/admin/login')
  }

  return (
    <aside className="w-60 shrink-0 bg-navy-deep border-r border-gold-brushed/10 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gold-brushed/10">
        <Link href="/admin">
          <Image src="/logo.png" alt="Songbird" width={120} height={40} className="h-8 w-auto brightness-0 invert" />
        </Link>
        <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gold-brushed/60 mt-1">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ href, label, Icon }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-sans font-medium transition-colors',
                active ? 'bg-gold/15 text-gold-brushed' : 'text-cream/60 hover:text-cream hover:bg-white/5',
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gold-brushed/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[13px] font-sans font-medium text-cream/50 hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign Out
        </button>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 mt-1 px-3 py-2 rounded-lg text-[12px] font-sans text-cream/35 hover:text-cream/60 transition-colors"
        >
          <Bird className="w-3.5 h-3.5" />
          View Public Site
        </Link>
      </div>
    </aside>
  )
}
