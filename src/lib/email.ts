/**
 * Client helper that triggers the `sendLeadEmail` Firebase Cloud Function, which
 * sends an email to info@songbird.ae via Gmail SMTP. Best-effort: failures are
 * swallowed so they never block the Firestore write or the form's success UI.
 *
 * The Cloud Function lives in `functions/` and requires the Blaze plan +
 * the GMAIL_APP_PASSWORD secret. See the deploy steps in the plan.
 */
export interface LeadEmailPayload {
  type: 'inquiry' | 'consultation' | 'eligibility' | 'booking'
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

const FUNCTIONS_REGION = 'us-central1'

export async function sendLeadEmail(payload: LeadEmailPayload): Promise<void> {
  try {
    const { getFunctions, httpsCallable } = await import('firebase/functions')
    const { firebaseApp } = await import('./firebase')
    const functions = getFunctions(firebaseApp, FUNCTIONS_REGION)
    await httpsCallable(functions, 'sendLeadEmail')(payload)
  } catch {
    /* best-effort: email failure must not block the form */
  }
}
