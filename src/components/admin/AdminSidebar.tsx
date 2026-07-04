'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Layers, Settings2, BarChart3, Inbox, LogOut, Bird, ListOrdered, Quote, MapPin, CalendarDays, Clock, Video, Sparkles, Award, Handshake, Newspaper, Mail, Eye, Power, HelpCircle } from 'lucide-react'
import { getAuth, signOut } from 'firebase/auth'
import { firebaseApp } from '@/lib/firebase'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin',                label: 'Dashboard',      Icon: LayoutDashboard, preview: '/' },
  { href: '/admin/services',       label: 'Services',       Icon: Layers,          preview: '/services' },
  { href: '/admin/services-intro', label: 'Services Intro (Home)', Icon: Newspaper, preview: '/' },
  { href: '/admin/services-page-intro', label: 'Services Page Intro', Icon: Newspaper, preview: '/services' },
  { href: '/admin/destinations',   label: 'Destinations',   Icon: MapPin,          preview: '/destinations' },
  { href: '/admin/why-choose-us',  label: 'Why Choose Us',  Icon: Settings2,       preview: '/' },
  { href: '/admin/welcome',        label: 'Welcome / Who We Are', Icon: Sparkles,  preview: '/about' },
  { href: '/admin/accreditations', label: 'Accreditations', Icon: Award,           preview: '/' },
  { href: '/admin/collaborations', label: 'Collaborations', Icon: Handshake,       preview: '/' },
  { href: '/admin/process',        label: 'How It Works',   Icon: ListOrdered,     preview: '/' },
  { href: '/admin/testimonials',   label: 'Client Stories', Icon: Quote,           preview: '/' },
  { href: '/admin/insights',       label: 'Insights',       Icon: Newspaper,       preview: '/insights' },
  { href: '/admin/faq',            label: 'FAQ',            Icon: HelpCircle,      preview: '/faq' },
  { href: '/admin/stats',          label: 'Stats',          Icon: BarChart3,       preview: '/' },
  { href: '/admin/slots',          label: 'Time Slots',     Icon: Clock },
  { href: '/admin/bookings',       label: 'Bookings',       Icon: CalendarDays },
  { href: '/admin/hero',           label: 'Hero / Video',   Icon: Video,           preview: '/' },
  { href: '/admin/leads',          label: 'Leads',          Icon: Inbox },
  { href: '/admin/newsletter',     label: 'Newsletter',     Icon: Mail },
  { href: '/admin/settings',       label: 'Reserve Button', Icon: Settings2 },
  { href: '/admin/site-status',    label: 'Site Status',    Icon: Power },
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
          <Image src="/logo2.webp" alt="Songbird" width={120} height={120} className="h-10 w-auto" />
        </Link>
        <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gold-brushed/60 mt-1">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ href, label, Icon, preview }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <div key={href} className="group relative flex items-center">
              <Link
                href={href}
                className={cn(
                  'flex flex-1 items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-sans font-medium transition-colors',
                  active ? 'bg-gold/15 text-gold-brushed' : 'text-cream/60 hover:text-cream hover:bg-white/5',
                  preview && 'pr-8',
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
              {preview && (
                <a
                  href={preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Preview: ${preview}`}
                  onClick={e => e.stopPropagation()}
                  className="absolute right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded text-cream/40 hover:text-gold-brushed hover:bg-gold/10"
                >
                  <Eye className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
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
