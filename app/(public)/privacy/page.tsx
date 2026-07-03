import type { Metadata } from 'next'
import { EyebrowTag } from '@/components/EyebrowTag'
import { FinalCTA } from '@/components/FinalCTA'
import { CONTACT_EMAIL, OFFICE_ADDRESS } from '@/lib/constants'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Songbird Consultancy collects, uses, and protects your personal information.',
  alternates: { canonical: '/privacy/' },
}

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: '1. Information We Collect',
    body: [
      'When you contact us, request a consultation, or book an appointment, we collect the details you provide — typically your name, email address, phone/WhatsApp number, destination of interest, appointment date and time, and any message or notes you share.',
      'We may also collect limited technical information automatically (such as device and browser type) to operate and secure the website.',
    ],
  },
  {
    heading: '2. How We Use Your Information',
    body: [
      'We use your information to respond to your enquiries, prepare and manage your consultation or application, schedule appointments, and communicate updates relevant to the services you have requested.',
      'We do not sell your personal information. We use it only to provide and improve our advisory services.',
    ],
  },
  {
    heading: '3. How Your Information Is Stored',
    body: [
      'Form submissions and bookings are stored securely using Google Firebase / Cloud Firestore. Access is restricted to authorised Songbird Consultancy personnel.',
    ],
  },
  {
    heading: '4. Third-Party Services',
    body: [
      'If you choose to contact us via WhatsApp, your message is handled under WhatsApp’s own privacy terms. Our website is hosted on Firebase Hosting. These providers process data on our behalf in accordance with their respective policies.',
    ],
  },
  {
    heading: '5. Data Retention',
    body: [
      'We retain your information only for as long as necessary to deliver the requested services and to meet our legal and regulatory obligations, after which it is securely deleted or anonymised.',
    ],
  },
  {
    heading: '6. Your Rights',
    body: [
      'You may request access to, correction of, or deletion of the personal information we hold about you, and you may ask us to stop contacting you at any time. To exercise these rights, contact us using the details below.',
    ],
  },
  {
    heading: '7. Contact Us',
    body: [
      `If you have questions about this Privacy Policy or your data, email us at ${CONTACT_EMAIL} or write to us at ${OFFICE_ADDRESS}.`,
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <section className="pt-[160px] pb-20 bg-navy">
        <div className="mx-auto px-6 md:px-12 max-w-4xl text-center">
          <EyebrowTag light>Your Privacy</EyebrowTag>
          <h1 className="font-serif font-normal text-[42px] md:text-[56px] leading-tight text-white mb-4">
            Privacy Policy
          </h1>
          <div className="mx-auto w-16 h-px bg-gold-brushed mb-5" />
          <p className="text-[15px] font-sans text-cream/60">How we collect, use, and protect your information.</p>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="mx-auto px-6 md:px-12 max-w-3xl">
          <div className="space-y-10">
            {SECTIONS.map(s => (
              <div key={s.heading}>
                <h2 className="font-serif font-normal text-[22px] md:text-[26px] text-ink mb-3">{s.heading}</h2>
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
