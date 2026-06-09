import Link from 'next/link'
import { FileText, Building2, Globe2, Briefcase, ShieldCheck, Users, Landmark, Plane } from 'lucide-react'
import { EyebrowTag } from './EyebrowTag'

const ITEMS = [
  { icon: FileText,    label: 'Visa & Residency' },
  { icon: Building2,   label: 'Business Setup' },
  { icon: Globe2,      label: 'Second Citizenship' },
  { icon: Briefcase,   label: 'Corporate & Legal' },
  { icon: ShieldCheck, label: 'Patent & Trademark' },
  { icon: Landmark,    label: 'Finance & Insurance' },
  { icon: Users,       label: 'HR & Management' },
  { icon: Plane,       label: 'Property & Tourism' },
]

/** Quick-support services grid (icon + label cards). */
export function QuickSupport() {
  return (
    <section className="py-24 bg-surface-soft" aria-labelledby="quick-support-heading">
      <div className="mx-auto px-6 md:px-12 max-w-6xl">
        <div className="text-center mb-14">
          <EyebrowTag>How We Can Help</EyebrowTag>
          <h2 id="quick-support-heading" className="font-serif font-semibold text-[34px] md:text-[44px] leading-tight text-ink">
            Quick Support Services
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {ITEMS.map(({ icon: Icon, label }) => (
            <Link
              key={label}
              href="/services"
              className="group flex flex-col items-center text-center gap-3 rounded-xl bg-white border border-hairline p-6 transition-all hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(4,38,28,.08)]"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-muted text-emerald group-hover:text-teal transition-colors">
                <Icon className="w-6 h-6" />
              </span>
              <span className="text-[13px] font-sans font-medium text-ink">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
