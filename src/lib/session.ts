import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET ?? 'fallback-dev-secret-change-in-production',
)

export interface SessionPayload {
  uid:   string
  email: string
  role:  'admin' | 'editor'
}

const SESSION_COOKIE = 'sb_session'
const EXPIRES_IN = 60 * 60 * 24 * 7 // 7 days in seconds

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRES_IN}s`)
    .sign(secret)
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export { SESSION_COOKIE, EXPIRES_IN }
