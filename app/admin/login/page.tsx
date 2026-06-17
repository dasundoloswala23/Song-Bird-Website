'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { firebaseApp } from '@/lib/firebase'
import Image from 'next/image'
import { Loader2, LogIn } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  useEffect(() => {
    const auth = getAuth(firebaseApp)
    const unsub = onAuthStateChanged(auth, user => { if (user) router.replace('/admin') })
    return unsub
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const auth = getAuth(firebaseApp)
      await signInWithEmailAndPassword(auth, email, password)
      router.replace('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="Songbird" width={140} height={48} className="h-12 w-auto brightness-0 invert" />
        </div>

        <div className="bg-navy-card border border-gold-brushed/20 rounded-2xl p-8 shadow-[0_24px_48px_rgba(10,23,56,.5)]">
          <h1 className="font-serif font-medium text-[26px] text-white mb-1">Admin Login</h1>
          <p className="text-[13px] font-sans text-cream/50 mb-6">Sign in to manage your site content.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-sans font-medium text-cream/60 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-3.5 py-2.5 bg-navy/60 border border-gold-brushed/20 rounded-[6px] text-[14px] font-sans text-cream placeholder:text-cream/25 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50"
                placeholder="admin@songbird.ae"
              />
            </div>

            <div>
              <label className="block text-[12px] font-sans font-medium text-cream/60 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-3.5 py-2.5 bg-navy/60 border border-gold-brushed/20 rounded-[6px] text-[14px] font-sans text-cream placeholder:text-cream/25 focus:outline-none focus:ring-2 focus:ring-gold-brushed/50"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-[12px] font-sans text-red-400 bg-red-400/10 px-3 py-2 rounded-[6px]">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gold hover:bg-gold-deep disabled:opacity-60 text-navy text-[13px] font-sans font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-colors mt-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
