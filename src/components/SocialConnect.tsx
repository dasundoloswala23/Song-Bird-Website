import { Facebook, Instagram, ArrowUpRight } from 'lucide-react'
import { EyebrowTag } from './EyebrowTag'
import { SOCIAL } from '@/lib/constants'

export function SocialConnect() {
  return (
    <section className="py-24 bg-cream" aria-labelledby="social-heading">
      <div className="mx-auto px-6 md:px-12 max-w-4xl text-center">
        <EyebrowTag>Stay Connected</EyebrowTag>
        <h2 id="social-heading" className="font-serif font-semibold text-[36px] md:text-[44px] leading-tight text-ink mb-4">
          Connect With Us
        </h2>
        <div className="mx-auto mb-12 w-16 h-px bg-gold-brushed" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto">
          <SocialCard
            Icon={Facebook}
            platform="Facebook"
            handle="@songbirdae"
            href={SOCIAL.facebook}
            colour="bg-[#1877F2]"
          />
          <SocialCard
            Icon={Instagram}
            platform="Instagram"
            handle="@songbirdae"
            href={SOCIAL.instagram}
            colour="bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
          />
        </div>
      </div>
    </section>
  )
}

function SocialCard({
  Icon, platform, handle, href, colour,
}: {
  Icon: React.ElementType; platform: string; handle: string; href: string; colour: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center p-8 rounded-2xl border border-cloud bg-white hover:border-gold-brushed/30 hover:shadow-[0_12px_32px_rgba(10,23,56,.08)] transition-all hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-brushed"
    >
      <div className={`w-14 h-14 rounded-2xl ${colour} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="font-serif font-semibold text-[18px] text-ink mb-0.5">{platform}</p>
      <p className="text-[13px] font-sans text-slate mb-4">{handle}</p>
      <span className="inline-flex items-center gap-1 text-[12px] font-sans font-semibold uppercase tracking-[0.1em] text-gold-brushed group-hover:gap-1.5 transition-all">
        Follow Us
        <ArrowUpRight className="w-3.5 h-3.5" />
      </span>
    </a>
  )
}
