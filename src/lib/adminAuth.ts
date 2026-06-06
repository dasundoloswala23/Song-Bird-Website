import { NextRequest } from 'next/server'
import { verifySession, SESSION_COOKIE, SessionPayload } from './session'

export async function requireAdmin(req: NextRequest): Promise<SessionPayload> {
  const token = req.cookies.get(SESSION_COOKIE)?.value
  if (!token) throw new Error('Unauthenticated')

  const session = await verifySession(token)
  if (!session) throw new Error('Invalid session')

  return session
}

export function adminError(message: string, status = 403) {
  return Response.json({ error: message }, { status })
}
