/**
 * Seed the Join With Us section fields into siteContent/collaborations.
 * Safe to re-run — uses merge: true (does not overwrite partner data).
 *
 * Usage: node scripts/seed-collaboration-join.mjs
 */

import { createRequire } from 'module'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const require = createRequire(import.meta.url)
const { initializeApp, cert, getApps } = require('firebase-admin/app')
const { getFirestore }                  = require('firebase-admin/firestore')

const credentials = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
const app = getApps().length ? getApps()[0] : initializeApp({ credential: cert(credentials) })
const db  = getFirestore(app)

const JOIN_SECTION = {
  joinEyebrow: 'COLLABORATION',
  joinTitle:   'Collaborating & Partnering with Songbird',
  tagline:     'Grow your potential globally',
  joinIntro:
    'Joining with Songbird can accelerate your opportunities through our global platform. We invite you to confirm your strategic connection with our collaboration channel for individual or collective benefits. Your contribution is built on customer-centric business activity, creating aligned prospects across the enterprise.',
  categories: [
    {
      groupLabel: 'Partners',
      items: ['Startup Business Founders', 'Enterprises', 'Legal Professionals'],
    },
    {
      groupLabel: 'Associates',
      items: ['Recruiting Companies', 'HR Companies'],
    },
    {
      groupLabel: 'Employer Companies',
      items: ['Small & Medium Companies', 'Multi-national Companies', 'Legal Firms'],
    },
    {
      groupLabel: 'Employees & Job Seekers',
      items: ['Skilled Workers', 'Skilled Professionals', 'Researchers', 'Individual Job Seekers', 'Interns & Trainees'],
    },
  ],
  benefits: [
    'Country expert guidance for business expansion',
    'Navigation on international trade & exports',
    'Expanding your business through trade fairs',
    'Introducing international tax-free trade zones',
    'Business, office & staff management',
    'International regulatory & legal advice',
    'Supply chain & shipping services',
    'International banking & finance assistance',
    'Labor agreements & trade negotiations',
  ],
}

async function seed() {
  console.log('🌱 Seeding collaboration join section…')
  await db.collection('siteContent').doc('collaborations').set(JOIN_SECTION, { merge: true })
  console.log('  ✓ siteContent/collaborations join fields written')
  console.log('✅ Done! Run npm run build to pick up the changes.')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
