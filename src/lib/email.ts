/**
 * Client helper that sends lead-notification emails to info@songbird.ae via
 * EmailJS (browser-side, no server required — fits the static-export
 * architecture). Best-effort: failures are swallowed so they never block the
 * Firestore write or the form's success UI.
 *
 * Requires NEXT_PUBLIC_EMAILJS_SERVICE_ID / _TEMPLATE_ID / _PUBLIC_KEY to be
 * set (see .env.local.example). These are safe to expose client-side — that
 * is the EmailJS public-key model, unlike a raw SMTP password.
 */
export interface LeadEmailPayload {
  type: 'inquiry' | 'consultation' | 'eligibility' | 'booking' | 'collaboration'
  name: string
  email?: string
  phone?: string
  destination?: string
  subject?: string
  message?: string
  // eligibility / quiz extras
  goal?: string
  timeline?: string
  nationality?: string
  // booking / eligibility scheduling extras
  date?: string
  startTime?: string
  durationMin?: number
  timezone?: string
  sessionType?: string
  charge?: string
  // CV attachment (Firebase Storage download URL)
  cvUrl?: string
  cvFileName?: string
}

const RECIPIENT = 'info@songbird.ae'

function subjectFor(p: LeadEmailPayload): string {
  switch (p.type) {
    case 'consultation':   return `New Consultation Request — ${p.name}`
    case 'eligibility':    return `New Eligibility Submission — ${p.name}`
    case 'booking':        return `New Consultation Booking — ${p.name}${p.date ? ` — ${p.date} ${p.startTime ?? ''}` : ''}`
    case 'collaboration':  return `New Collaboration Inquiry — ${p.name}`
    default:                return `New Website Inquiry — ${p.name}`
  }
}

export async function sendLeadEmail(payload: LeadEmailPayload): Promise<void> {
  try {
    const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (!serviceId || !templateId || !publicKey) return

    const emailjs = (await import('@emailjs/browser')).default

    await emailjs.send(serviceId, templateId, {
      to_email: RECIPIENT,
      email_subject: subjectFor(payload),
      lead_type: payload.type,
      name: payload.name,
      email: payload.email ?? '',
      phone: payload.phone ?? '',
      destination: payload.destination ?? '',
      subject: payload.subject ?? '',
      message: payload.message ?? '',
      goal: payload.goal ?? '',
      timeline: payload.timeline ?? '',
      nationality: payload.nationality ?? '',
      date: payload.date ?? '',
      start_time: payload.startTime ?? '',
      duration_min: payload.durationMin ?? '',
      timezone: payload.timezone ?? '',
      session_type: payload.sessionType ?? '',
      charge: payload.charge ?? '',
      cv_url: payload.cvUrl ?? '',
      cv_file_name: payload.cvFileName ?? '',
    }, { publicKey })
  } catch {
    /* best-effort: email failure must not block the form */
  }
}
