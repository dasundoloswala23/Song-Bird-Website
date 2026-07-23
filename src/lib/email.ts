/**
 * Client helper that sends lead-notification emails by invoking the
 * `sendLeadEmail` Firebase Cloud Function (nodemailer + Gmail SMTP). The
 * function delivers to the configured recipient and builds the email server-
 * side, so no SMTP credentials ever reach the browser. Best-effort: failures
 * are swallowed so they never block the Firestore write or the form's success UI.
 */
import { getFunctions, httpsCallable } from 'firebase/functions'
import { firebaseApp } from './firebase'
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

export async function sendLeadEmail(payload: LeadEmailPayload): Promise<void> {
  try {
    // Region must match the onCall region in functions/src/index.ts.
    const functions = getFunctions(firebaseApp, 'us-central1')
    const call = httpsCallable(functions, 'sendLeadEmail')
    // Payload field names already match the function's LeadEmailData shape.
    await call(payload)
  } catch {
    /* best-effort: email failure must not block the form */
  }
}
