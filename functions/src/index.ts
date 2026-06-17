import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { defineSecret } from 'firebase-functions/params'
import * as nodemailer from 'nodemailer'

// Gmail app password — stored as a secret, never committed.
//   firebase functions:secrets:set GMAIL_APP_PASSWORD
const GMAIL_APP_PASSWORD = defineSecret('GMAIL_APP_PASSWORD')

const SENDER = 'songbirddevdasun@gmail.com'
const RECIPIENT = 'info@songbird.ae'

interface LeadEmailData {
  type?: 'inquiry' | 'consultation' | 'eligibility' | 'booking'
  name?: string
  email?: string
  phone?: string
  destination?: string
  subject?: string
  message?: string
  goal?: string
  timeline?: string
  nationality?: string
  date?: string
  startTime?: string
  durationMin?: number
  timezone?: string
  sessionType?: string
  charge?: string
  cvUrl?: string
  cvFileName?: string
}

function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function row(label: string, value?: unknown): string {
  if (value === undefined || value === null || String(value).trim() === '') return ''
  return `<tr>
    <td style="padding:6px 12px;font:600 12px sans-serif;color:#0E7C5A;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap">${esc(label)}</td>
    <td style="padding:6px 12px;font:14px sans-serif;color:#0F2A20">${esc(value)}</td>
  </tr>`
}

function subjectFor(d: LeadEmailData): string {
  switch (d.type) {
    case 'consultation': return `New Consultation Request — ${d.name ?? 'Website'}`
    case 'eligibility':  return `New Eligibility Submission — ${d.name ?? 'Website'}`
    case 'booking':      return `New Consultation Booking — ${d.name ?? 'Website'}${d.date ? ` — ${d.date} ${d.startTime ?? ''}` : ''}`
    default:             return `New Website Inquiry — ${d.name ?? 'Website'}`
  }
}

function buildHtml(d: LeadEmailData): string {
  const sessionRow = d.sessionType
    ? row('Session', d.charge ? `${d.sessionType} — ${d.charge}` : d.sessionType)
    : ''
  const cvRow = d.cvUrl
    ? `<tr>
        <td style="padding:6px 12px;font:600 12px sans-serif;color:#0E7C5A;text-transform:uppercase;letter-spacing:.08em;vertical-align:top">CV / Document</td>
        <td style="padding:6px 12px;font:14px sans-serif"><a href="${esc(d.cvUrl)}" style="color:#0E7C5A">${esc(d.cvFileName || 'Download attachment')}</a></td>
      </tr>`
    : ''

  return `<div style="background:#F3FAF4;padding:24px">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e3eee7;border-radius:12px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#009688,#5EEA8A);padding:18px 24px">
        <p style="margin:0;font:700 16px sans-serif;color:#fff">Songbird Consultancy</p>
        <p style="margin:2px 0 0;font:12px sans-serif;color:rgba(255,255,255,.85)">${esc(subjectFor(d))}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;padding:8px">
        ${row('Name', d.name)}
        ${row('Email', d.email)}
        ${row('Phone', d.phone)}
        ${row('Nationality', d.nationality)}
        ${row('Destination / Location', d.destination)}
        ${row('Goal', d.goal)}
        ${row('Timeline', d.timeline)}
        ${row('Subject', d.subject)}
        ${row('Date', d.date)}
        ${row('Time', d.startTime ? `${d.startTime}${d.timezone ? ` (${d.timezone})` : ''}` : '')}
        ${row('Duration', d.durationMin ? `${d.durationMin} minutes` : '')}
        ${sessionRow}
        ${row('Message / Notes', d.message)}
        ${cvRow}
      </table>
    </div>
  </div>`
}

export const sendLeadEmail = onCall(
  { region: 'us-central1', secrets: [GMAIL_APP_PASSWORD], cors: true },
  async (request) => {
    const data = (request.data ?? {}) as LeadEmailData
    if (!data.name && !data.email) {
      throw new HttpsError('invalid-argument', 'Missing name/email.')
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: SENDER, pass: GMAIL_APP_PASSWORD.value() },
    })

    // Best-effort CV attachment (skip if too large or unreachable; the email
    // still includes a download link in that case).
    const attachments: nodemailer.SendMailOptions['attachments'] = []
    if (data.cvUrl) {
      try {
        const resp = await fetch(data.cvUrl)
        if (resp.ok) {
          const len = Number(resp.headers.get('content-length') ?? '0')
          if (len <= 7 * 1024 * 1024) {
            const buf = Buffer.from(await resp.arrayBuffer())
            attachments.push({ filename: data.cvFileName || 'cv', content: buf })
          }
        }
      } catch { /* keep the link only */ }
    }

    await transporter.sendMail({
      from: `Songbird Website <${SENDER}>`,
      to: RECIPIENT,
      replyTo: data.email || undefined,
      subject: subjectFor(data),
      html: buildHtml(data),
      attachments,
    })

    return { ok: true }
  },
)
