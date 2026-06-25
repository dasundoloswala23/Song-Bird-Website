'use client'

import { useEffect, useState } from 'react'
import { Loader2, AlertTriangle, Globe } from 'lucide-react'

export default function SiteStatusPage() {
  const [siteDown, setSiteDown] = useState<boolean | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    import('@/lib/firestorePublic').then(({ getSiteDown }) =>
      getSiteDown().then(setSiteDown)
    )
  }, [])

  const toggle = async (value: boolean) => {
    setSaving(true)
    const { saveSiteDown } = await import('@/lib/firestorePublic')
    await saveSiteDown(value)
    setSiteDown(value)
    setSaving(false)
  }

  return (
    <div className="p-8 max-w-xl">
      <h1 className="font-serif font-normal text-[28px] text-white mb-1">Site Status</h1>
      <p className="text-[13px] font-sans text-cream/50 mb-10">
        Toggle the public website on or off. When set to &quot;Down&quot;, all visitors see the Coming Soon page.
      </p>

      {siteDown === null ? (
        <div className="flex items-center gap-3 text-cream/50">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-[13px] font-sans">Loading status…</span>
        </div>
      ) : (
        <div className="bg-navy-card border border-gold-brushed/15 rounded-2xl p-6 flex flex-col gap-6">
          {/* Current status indicator */}
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${siteDown ? 'bg-red-400' : 'bg-emerald'}`} />
            <div>
              <p className="text-[15px] font-sans font-semibold text-white">
                {siteDown ? 'Site Down — Coming Soon visible' : 'Site Live — Normal website visible'}
              </p>
              <p className="text-[12px] font-sans text-cream/40 mt-0.5">
                {siteDown
                  ? 'Visitors are seeing the Coming Soon page.'
                  : 'Visitors are seeing the full website.'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => toggle(false)}
              disabled={saving || !siteDown}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[13px] font-sans font-semibold transition-colors ${
                !siteDown
                  ? 'bg-emerald/20 text-emerald border border-emerald/30 cursor-default'
                  : 'bg-white/5 text-cream/60 hover:bg-emerald/15 hover:text-emerald border border-transparent hover:border-emerald/20'
              }`}
            >
              <Globe className="w-4 h-4" />
              Set Live
            </button>
            <button
              onClick={() => toggle(true)}
              disabled={saving || siteDown === true}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[13px] font-sans font-semibold transition-colors ${
                siteDown
                  ? 'bg-red-400/20 text-red-400 border border-red-400/30 cursor-default'
                  : 'bg-white/5 text-cream/60 hover:bg-red-400/15 hover:text-red-400 border border-transparent hover:border-red-400/20'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Take Down
            </button>
          </div>

          {saving && (
            <div className="flex items-center gap-2 text-gold-brushed text-[12px] font-sans">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Saving…
            </div>
          )}
        </div>
      )}
    </div>
  )
}
