/**
 * Seed the Immigration service into Firestore with layout: 'full'.
 * Safe to re-run — uses merge: true.
 *
 * Usage: node scripts/seed-immigration.mjs
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

const IMMIGRATION = {
  order: 1,
  slug: 'immigration',
  icon: 'Globe2',
  published: true,

  // Card (front)
  frontTitle: 'Immigration',
  frontSubtitle:
    'Your trusted partner for global immigration — UK, UAE, USA, Australia, Canada, New Zealand and Asia, covering study, visit, work, business, residency and citizenship pathways.',

  // Detail page
  layout: 'full',
  heroImage: '',
  heroEyebrow: 'GLOBAL IMMIGRATION ADVISORY',
  detailTitle: 'Immigration',
  detailIntro:
    'Songbird Immigration Consultants — experts in immigration law practice, UAE-licensed immigration advisory. We provide study, visit, work, TR, business, PR and citizenship pathways across the UAE, UK, USA, Australia, Canada, New Zealand and Asia, serving clients from Sri Lanka, India, the Philippines, South Asia, Europe and Africa.',

  // Stat strip
  statStrip: [
    { value: '100%', label: 'On-Time Service' },
    { value: '100%', label: 'On-Time Updates' },
    { value: '100%', label: 'On-Time Process' },
    { value: '24/7',  label: 'Availability' },
  ],

  // Overview — main paragraphs + destination sub-sections
  overview: [
    'With 15+ years of experience in global migration practice, Songbird proudly established in the UAE to deliver end-to-end global mobility solutions. We specialize as full-service migration consultants, advising and representing nationals from Sri Lanka, India, the Philippines, South Asia, Europe and African regions in their immigration applications to the UAE, UK, USA, Australia, Canada, New Zealand and EU countries — across Student, Work, Visit, TR, PR and Citizenship categories.',

    'Our specialist legal advisors provide tailored legal strategies covering every aspect of your immigration application, and our methodology ensures premium-quality service through to your ultimate success.',

    'There is no law against the freedom of movement, but every destination country has its own requirements for entry, study, work and residence under different visa categories. Songbird bridges the correct pathway for you by focusing on your purpose and applying our expert knowledge — giving you a true, honest assessment of your immigration prospects from day one.',

    'UAE — Pathway to obtain legal residency in the UAE. Migrate with your family for work and long-term living. Business Formation in the UAE includes mainland and freezone setup. Visa types: Student, Visit, Employment, Standard Investor, Green Visa, Golden Visa, Business Entry, Resident Visa for the Retired.',

    'UK — Move to the United Kingdom. Migrate for visit, tourism, study, family reunification, business investment or permanent residence. Visa types: Partner & Family, Visit/Transit/Tourist, Skilled Worker, Graduate, Student, Overseas Domestic Worker, Business, Global Business Mobility, Investor, Resident Return, ILR Settlement, British Citizenship, Human Rights & Refugee Applications, Immigration Appeals, Judicial Reviews.',

    'USA — Explore your American Dream. Visa types: B1/B2 Visitor, Student, EB-5 Immigrant Investor, Family Sponsored, Employer Sponsored, Returning Resident, Citizenship Application.',

    'AUSTRALIA — Visa types: Visitor (Subclass 600), Student (Subclass 500), Student Guardian, Skilled Migration, Business Investor, Resident Return, Dual Citizenship.',

    'CANADA — Find your route in Canada, a country that always creates a new beginning. Categories: Student, Visit, Express Entry, Provincial Nomination, Family Sponsorship, Business Migration.',

    'NEW ZEALAND — Explore your future and global mobility in New Zealand, the Land of the Long White Cloud. Visa types: Student, Student Dependent, Graduate, Partner, Work, Skilled Migration, Business & Investor.',

    'ASIA — Experiencing the beauty of Asia — opportunities in skilled transfer and business investment. Visa types: Visit, Student & Internships, Trade & Investment, Family, Work, Dual Citizenship.',
  ].join('\n\n'),

  // Key benefits
  keyBenefits: [
    { title: '15+ years of global migration practice experience', description: '' },
    { title: 'UAE-licensed immigration advisory', description: '' },
    { title: 'Specialist legal advisors for tailored strategies', description: '' },
    { title: 'Coverage across UAE, UK, USA, Australia, Canada, New Zealand and Asia', description: '' },
    { title: 'Full visa category support: Study, Visit, Work, TR, Business, PR, Citizenship', description: '' },
    { title: 'Honest, transparent assessment of your migration prospects', description: '' },
    { title: '100% on-time service, updates and processing', description: '' },
    { title: '24/7 availability', description: '' },
  ],

  // Procedure
  procedure: [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'We assess your background, purpose and goals to identify the strongest migration pathway.',
    },
    {
      step: 2,
      title: 'Pathway Selection',
      description: 'Our advisors match you to the right destination and visa category (Study, Work, Visit, Business, PR, Citizenship).',
    },
    {
      step: 3,
      title: 'Document Preparation',
      description: 'We compile, translate and prepare all required documentation to destination-country standards.',
    },
    {
      step: 4,
      title: 'Application Submission',
      description: 'We lodge your application with the relevant authority and track its progress.',
    },
    {
      step: 5,
      title: 'Ongoing Updates',
      description: 'We provide regular status updates until a decision is reached.',
    },
    {
      step: 6,
      title: 'Approval & Settlement Support',
      description: 'On approval, we assist with travel, settlement and any onward family sponsorship.',
    },
  ],

  // Who is this for
  whoIsThisFor: [
    'Students seeking study visas abroad',
    'Visitors and tourists planning travel',
    'Skilled workers and professionals seeking employment visas',
    'Business owners seeking investor or business migration visas',
    'Families seeking sponsorship and reunification',
    'Individuals pursuing permanent residency or citizenship',
  ],

  // FAQs
  faqs: [
    {
      question: 'Which countries do you cover?',
      answer: 'We cover the UAE, UK, USA, Australia, Canada, New Zealand and Asia, with tailored pathways for each destination.',
    },
    {
      question: 'What visa types can you help with?',
      answer: 'Study, Visit, Work, Temporary Residence (TR), Business, Permanent Residence (PR) and Citizenship applications.',
    },
    {
      question: 'Do you provide honest assessments?',
      answer: 'Yes. We give you a true, transparent evaluation of your migration prospects before proceeding, so you understand your real chances of success.',
    },
    {
      question: 'How long has Songbird been operating?',
      answer: 'We have over 15 years of experience in global migration practice.',
    },
  ],

  // Minimal layout fields (unused at full layout, kept for schema completeness)
  whatWeProvide: [],
  requirements: [],
}

async function seed() {
  console.log('🌱 Seeding immigration service…')
  await db.collection('services').doc('immigration').set(IMMIGRATION, { merge: true })
  console.log('  ✓ services/immigration written (layout: full)')
  console.log('✅ Done! Run npm run build to pick up the changes.')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
