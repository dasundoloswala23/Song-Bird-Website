import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getAuth, Auth } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { getStorage, Storage } from 'firebase-admin/storage'

let _app: App | null = null

function getApp(): App {
  if (_app) return _app
  if (getApps().length) {
    _app = getApps()[0]
    return _app
  }

  const credentialsEnv = process.env.FIREBASE_ADMIN_CREDENTIALS
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET

  if (credentialsEnv) {
    // Explicit service account — used for local development
    _app = initializeApp({ credential: cert(JSON.parse(credentialsEnv)), storageBucket: bucket })
  } else {
    // Application Default Credentials — automatically available on Firebase Hosting / Cloud Run
    _app = initializeApp({ storageBucket: bucket })
  }

  return _app
}

// Lazy accessors — only init when first accessed at runtime, never at build time
export const adminAuth: Auth       = new Proxy({} as Auth,       { get: (_, k) => (getAuth(getApp()) as any)[k] })
export const adminDb:   Firestore  = new Proxy({} as Firestore,  { get: (_, k) => (getFirestore(getApp()) as any)[k] })
export const adminStorage: Storage = new Proxy({} as Storage,    { get: (_, k) => (getStorage(getApp()) as any)[k] })
