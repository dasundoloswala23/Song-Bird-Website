/**
 * Seed Firestore with initial Songbird data.
 *
 * Usage:
 *   1. Copy .env.local.example to .env.local and fill FIREBASE_ADMIN_CREDENTIALS
 *   2. node scripts/seed.mjs
 */

import { createRequire } from 'module'
import { readFileSync } from 'fs'
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

// ─── Services ────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    order: 1, slug: 'immigration', icon: 'Scale', published: true,
    frontTitle: 'Immigration Advisory',
    frontSubtitle: 'Expert guidance on visas, residency, and citizenship pathways worldwide.',
    layout: 'minimal',
    heroImage: '', heroEyebrow: 'LEGAL & REGULATORY', detailTitle: 'Immigration Advisory',
    detailIntro: 'Our immigration specialists navigate the complex landscape of global visa and residency programmes on your behalf. From UAE golden visas to investor routes in Canada, Australia, and the EU, we handle every aspect of your application with precision and discretion.',
    statStrip: [], overview: '', keyBenefits: [], procedure: [], whoIsThisFor: [], faqs: [],
    whatWeProvide: ['UAE Golden Visa applications', 'Investor & entrepreneur visa programmes', 'Skilled worker and sponsored visa routes', 'Family reunification applications', 'Citizenship by investment guidance', 'Document legalisation and attestation'],
    requirements: ['Valid passport (min. 6 months validity)', 'Financial proof of eligibility', 'Clean criminal background record', 'Health insurance documentation', 'Destination-specific supporting documents'],
  },
  {
    order: 2, slug: 'patent-ip', icon: 'Lightbulb', published: true,
    frontTitle: 'Patent & IP Advisory',
    frontSubtitle: 'Protect your intellectual assets across all key jurisdictions.',
    layout: 'minimal',
    heroImage: '', heroEyebrow: 'LEGAL & REGULATORY', detailTitle: 'Patent & IP Advisory',
    detailIntro: 'Safeguard your innovations, trademarks, and creative works in every market you operate. Our IP advisory team coordinates with registered attorneys across the UAE, GCC, and international territories.',
    statStrip: [], overview: '', keyBenefits: [], procedure: [], whoIsThisFor: [], faqs: [],
    whatWeProvide: ['Patent searches and freedom-to-operate analysis', 'Trademark registration in UAE and GCC', 'International IP filing strategies (PCT, Madrid)', 'Copyright and design rights protection', 'IP portfolio management and renewals', 'Enforcement and dispute advisory'],
    requirements: ['Detailed invention or brand disclosure', 'Existing registration certificates (if any)', 'Target markets for protection', 'Proof of first use or priority date'],
  },
  {
    order: 3, slug: 'maritime', icon: 'Anchor', published: true,
    frontTitle: 'Maritime Consultancy',
    frontSubtitle: 'Compliance, registration, and operational support for maritime ventures.',
    layout: 'minimal',
    heroImage: '', heroEyebrow: 'LEGAL & REGULATORY', detailTitle: 'Maritime Consultancy',
    detailIntro: "Dubai's strategic location makes it a premier hub for maritime commerce. We guide shipping companies, yacht owners, and maritime operators through UAE and international maritime regulations.",
    statStrip: [], overview: '', keyBenefits: [], procedure: [], whoIsThisFor: [], faqs: [],
    whatWeProvide: ['Vessel registration under UAE and international flags', 'Maritime company formation in DMCA and JAFZA', 'Crew documentation and endorsements', 'Port State Control compliance audits', 'Marine insurance advisory', 'Ship mortgage and financing support'],
    requirements: ['Vessel survey and classification certificates', 'Proof of vessel ownership or purchase agreement', 'Operator company documents', 'Crew list and certificate of competency'],
  },
  {
    order: 4, slug: 'management', icon: 'BarChart3', published: true,
    frontTitle: 'Management Advisory',
    frontSubtitle: 'Strategic consulting to grow, restructure, or scale your business in the UAE.',
    layout: 'minimal',
    heroImage: '', heroEyebrow: 'BUSINESS ADVISORY', detailTitle: 'Management Advisory',
    detailIntro: 'Whether you are launching a new venture in Dubai or restructuring an established enterprise, our management advisors bring deep regional expertise and global frameworks to drive performance.',
    statStrip: [], overview: '', keyBenefits: [], procedure: [], whoIsThisFor: [], faqs: [],
    whatWeProvide: ['Market entry strategy and feasibility studies', 'Business restructuring and transformation', 'Corporate governance and board advisory', 'Mergers, acquisitions, and joint-venture support', 'Performance improvement programmes', 'Executive coaching and leadership development'],
    requirements: ['Current business registration documents', 'Financial statements (last 2–3 years)', 'Business plan or growth objectives brief', 'Stakeholder and ownership structure details'],
  },
  {
    order: 5, slug: 'hr', icon: 'Users', published: true,
    frontTitle: 'HR Advisory',
    frontSubtitle: 'Building compliant, high-performance teams in the UAE and beyond.',
    layout: 'minimal',
    heroImage: '', heroEyebrow: 'BUSINESS ADVISORY', detailTitle: 'HR Advisory',
    detailIntro: 'From drafting UAE-compliant employment contracts to designing competitive compensation packages, our HR advisory practice ensures your workforce strategy is both legally sound and talent-attracting.',
    statStrip: [], overview: '', keyBenefits: [], procedure: [], whoIsThisFor: [], faqs: [],
    whatWeProvide: ['UAE Labour Law compliance audits', 'Employment contract drafting and review', 'Salary benchmarking and compensation design', 'Recruitment process outsourcing', 'MOHRE registration and Tasheel support', 'Employee handbook and policy development'],
    requirements: ['Existing employment contracts (if any)', 'Current headcount and organogram', 'Industry and role specifications', 'Target compensation budget'],
  },
  {
    order: 6, slug: 'commercial-brokering', icon: 'Handshake', published: true,
    frontTitle: 'Commercial Brokering',
    frontSubtitle: 'Connecting buyers, sellers, and investors across key market sectors.',
    layout: 'minimal',
    heroImage: '', heroEyebrow: 'BUSINESS ADVISORY', detailTitle: 'Commercial Brokering',
    detailIntro: "Our commercial brokerage team facilitates high-value transactions in real estate, business sales, and investment introductions throughout the UAE and GCC. We act as a trusted intermediary, protecting all parties' interests throughout the deal lifecycle.",
    statStrip: [], overview: '', keyBenefits: [], procedure: [], whoIsThisFor: [], faqs: [],
    whatWeProvide: ['Business acquisition and sale mandates', 'Commercial real estate brokerage', 'Investment introduction and matchmaking', 'Due diligence coordination', 'Term sheet and MOU drafting support', 'Post-completion integration advisory'],
    requirements: ['Clear mandate letter or power of attorney', 'Asset or business valuation (if available)', 'Financial proof of buyer capacity', 'Non-disclosure agreement'],
  },
  {
    order: 7, slug: 'concierge', icon: 'Star', published: true,
    frontTitle: 'Concierge Services',
    frontSubtitle: 'White-glove personal assistance for every aspect of life in Dubai.',
    layout: 'minimal',
    heroImage: '', heroEyebrow: 'LIFESTYLE & CONCIERGE', detailTitle: 'Concierge Services',
    detailIntro: "Dubai's pace demands seamless personal support. Our concierge team handles government transactions, property management, vehicle registration, school admissions, and everyday errands.",
    statStrip: [], overview: '', keyBenefits: [], procedure: [], whoIsThisFor: [], faqs: [],
    whatWeProvide: ['Dubai government services and paperwork', 'Property rental and purchase assistance', 'Vehicle registration and licensing', 'School search and admissions support', 'Medical and health service coordination', 'Travel planning and executive transport'],
    requirements: ['Valid Emirates ID or passport', 'Proof of UAE residency (if applicable)', 'Specific service brief or requirements list'],
  },
  {
    order: 8, slug: 'lifestyle-development', icon: 'Sparkles', published: true,
    frontTitle: 'Lifestyle Development',
    frontSubtitle: 'Curated pathways to culture, wellness, and personal growth in the UAE.',
    layout: 'minimal',
    heroImage: '', heroEyebrow: 'LIFESTYLE & CONCIERGE', detailTitle: 'Lifestyle Development',
    detailIntro: "Relocating or upgrading your lifestyle in Dubai goes beyond logistics. Our lifestyle development consultants connect you with the city's finest educational institutions, wellness facilities, arts communities, and social networks.",
    statStrip: [], overview: '', keyBenefits: [], procedure: [], whoIsThisFor: [], faqs: [],
    whatWeProvide: ['Personal lifestyle strategy and goal planning', 'Private education and tutoring referrals', 'Wellness, fitness, and nutrition programme design', 'Art, culture, and social club introductions', 'Luxury residential interior coordination', 'Expat community integration support'],
    requirements: ['Personal profile and lifestyle objectives', 'Budget and timeline preferences', 'Family composition details (if applicable)'],
  },
  {
    order: 9, slug: 'reservations', icon: 'UtensilsCrossed', published: true,
    frontTitle: 'Reservation Services',
    frontSubtitle: "Priority access to Dubai's finest restaurants, hotels, and experiences.",
    layout: 'minimal',
    heroImage: '', heroEyebrow: 'LIFESTYLE & CONCIERGE', detailTitle: 'Reservation Services',
    detailIntro: "From Michelin-starred dining to exclusive resort experiences across the UAE and beyond, our reservations team secures access that is simply not available to the public — leveraging established relationships with the region's premier hospitality partners.",
    statStrip: [], overview: '', keyBenefits: [], procedure: [], whoIsThisFor: [], faqs: [],
    whatWeProvide: ['Fine dining reservations and private dining rooms', 'Luxury hotel and resort bookings', 'Yacht and private aviation charters', 'Event tickets and VIP hospitality packages', 'Desert safari and experiential trip planning', 'Anniversary, birthday, and celebration planning'],
    requirements: ['Preferred dates and party size', 'Budget range and preferences', 'Any dietary or special requirements'],
  },
]

// ─── Why Choose Us ────────────────────────────────────────────────────────────

const WHY_CHOOSE_US = {
  eyebrow: 'WHY CHOOSE US',
  title: 'The Songbird Difference',
  intro: 'We combine legal rigour with genuine care — treating every client\'s future as if it were our own. Our track record speaks clearly, and our process is built around your success.',
  image: '',
  badge: { value: '15+', label: 'Years of Recognition' },
  features: [
    { icon: 'Layers', title: 'Full-Spectrum Consultancy Services Under One Roof', description: 'Immigration, legal, business and HR advisory — handled by one accountable team.' },
    { icon: 'Award', title: 'Over 15+ Years of Combined Professional Experience', description: 'Proven leadership across multiple international jurisdictions.' },
    { icon: 'Languages', title: 'Multilingual Team for Enhanced, Accurate Access', description: 'Guidance in your language, so nothing is lost in translation.' },
    { icon: 'UserCheck', title: 'Client-Centric Approach', description: 'Customised solutions built around your goals, timeline and budget.' },
    { icon: 'TrendingUp', title: 'Proven Track Record for a Higher Success Ratio', description: 'A 95% success ratio backed by thousands of successful steps.' },
  ],
}

// ─── Stats (locked values per client brief) ─────────────────────────────────────

const STATS = {
  applications: { value: '5,000+',  label: 'Successful Steps' },
  successRate:  { value: '15+',     label: 'Years of International Recognition' },
  destinations: { value: '20,000+', label: 'Clients Served' },
  serviceLines: { value: '95%',     label: 'Success Ratio' },
}

// ─── Process / How It Works ─────────────────────────────────────────────────────

const PROCESS_SECTION = {
  title: 'We Guide You Through 4 Simple Steps',
  steps: [
    { title: 'Step 1', description: 'Step wording to be provided by the client.' },
    { title: 'Step 2', description: 'Step wording to be provided by the client.' },
    { title: 'Step 3', description: 'Step wording to be provided by the client.' },
    { title: 'Step 4', description: 'Step wording to be provided by the client.' },
  ],
}

// ─── Welcome / Who We Are ───────────────────────────────────────────────────────

const WELCOME = {
  eyebrow: 'Welcome to Songbird Consultancy',
  title: 'Who We Are',
  slogan: 'Uplift Your Status',
  body:
    'Since 2015, we have supported clients across different regions with expert legal leadership. ' +
    'With proven experience in different jurisdictions, we are responsible for your outcome in any arena.\n\n' +
    'From residency and immigration to foreign investment, corporate structuring and beyond, our multilingual ' +
    'team delivers tailored consultations grounded in a deep understanding of UAE and international laws.',
}

// ─── Accreditations ─────────────────────────────────────────────────────────────

const ACCREDITATIONS = {
  title: 'Accreditations & Licenses',
  subline: 'Recognised and regulated by leading professional bodies.',
  items: [
    { name: 'MARN',  logo: '' },
    { name: 'ICCRC', logo: '' },
    { name: 'BASL',  logo: '' },
    { name: 'IBA',   logo: '' },
  ],
}

// ─── Collaborations ─────────────────────────────────────────────────────────────

const COLLABORATIONS = {
  eyebrow: 'Our Network',
  title: 'Collaborations & Partnerships',
  intro: 'We work alongside trusted partners and affiliated institutions to deliver full-spectrum advisory across jurisdictions. Partner logos and details will appear here.',
  partners: [],
}

// ─── Run ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 Seeding Firestore…')

  // Services
  const batch = db.batch()
  for (const service of SERVICES) {
    const ref = db.collection('services').doc(service.slug)
    batch.set(ref, service, { merge: true })
  }
  await batch.commit()
  console.log(`  ✓ ${SERVICES.length} services written`)

  // Why Choose Us
  await db.collection('siteContent').doc('whyChooseUs').set(WHY_CHOOSE_US, { merge: true })
  console.log('  ✓ siteContent/whyChooseUs written')

  // Stats
  await db.collection('siteStats').doc('home').set(STATS, { merge: true })
  console.log('  ✓ siteStats/home written')

  // Process / How It Works
  await db.collection('siteContent').doc('processSection').set(PROCESS_SECTION, { merge: true })
  console.log('  ✓ siteContent/processSection written')

  // Welcome / Who We Are
  await db.collection('siteContent').doc('welcome').set(WELCOME, { merge: true })
  console.log('  ✓ siteContent/welcome written')

  // Accreditations
  await db.collection('siteContent').doc('accreditations').set(ACCREDITATIONS, { merge: true })
  console.log('  ✓ siteContent/accreditations written')

  // Collaborations
  await db.collection('siteContent').doc('collaborations').set(COLLABORATIONS, { merge: true })
  console.log('  ✓ siteContent/collaborations written')

  console.log('✅ Seed complete!')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
