import type { Metadata } from 'next'
import { EyebrowTag } from '@/components/EyebrowTag'
import { FinalCTA } from '@/components/FinalCTA'
import { CONTACT_EMAIL } from '@/lib/constants'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing your use of the Songbird Consultancy website and services.',
}

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: '1. Acceptance of Terms',
    body: [
      'By accessing this website or engaging Songbird Consultancy for any service, you agree to these Terms of Service. If you do not agree, please discontinue use of the website and our services.',
    ],
  },
  {
    heading: '2. Advisory Services',
    body: [
      'Songbird Consultancy provides immigration, legal, business, and related advisory services. Information on this website is general in nature and does not constitute legal advice or a guarantee of any outcome. Specific advice is provided only through a formal engagement.',
    ],
  },
  {
    heading: '3. No Guaranteed Outcomes',
    body: [
      'Immigration and government decisions are made by the relevant authorities, not by Songbird Consultancy. While we apply our best professional efforts and experience, we cannot guarantee approvals, processing times, or any particular result.',
    ],
  },
  {
    heading: '4. Fees & Payments',
    body: [
      'Fees for services are agreed in advance and set out in your engagement terms. Government, third-party, and processing charges are separate from our advisory fees unless stated otherwise.',
    ],
  },
  {
    heading: '5. Client Responsibilities',
    body: [
      'You agree to provide accurate, complete, and timely information and documentation. We are not responsible for delays or outcomes arising from inaccurate, incomplete, or late information.',
    ],
  },
  {
    heading: '6. Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, Songbird Consultancy shall not be liable for indirect or consequential losses. Our total liability in connection with any engagement shall not exceed the fees paid for that engagement.',
    ],
  },
  {
    heading: '7. Governing Law',
    body: [
      'These terms are governed by the laws of the United Arab Emirates, and any disputes shall be subject to the jurisdiction of the applicable UAE courts.',
    ],
  },
  {
    heading: '8. Contact Us',
    body: [
      `For questions about these terms, contact us at ${CONTACT_EMAIL}.`,
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      <section className="pt-[160px] pb-20 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-4xl text-center">
          <EyebrowTag light>Legal</EyebrowTag>
          <h1 className="font-serif font-medium text-[42px] md:text-[56px] leading-tight text-white mb-4">
            Terms of Service
          </h1>
          <div className="mx-auto w-16 h-px bg-gold-brushed mb-5" />
          <p className="text-[15px] font-sans text-cream/60">The terms governing your use of our website and services.</p>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-3xl">
          <div className="space-y-10">
            {SECTIONS.map(s => (
              <div key={s.heading}>
                <h2 className="font-serif font-medium text-[22px] md:text-[26px] text-ink mb-3">{s.heading}</h2>
                <div className="space-y-3">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-[15px] font-sans text-slate leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
