// ── Service ──────────────────────────────────────────────────────────────────

export interface StatStripItem {
  label: string
  value: string
}

export interface KeyBenefit {
  title: string
  description: string
}

export interface ProcedureStep {
  step: number
  title: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface SectionTab {
  label: string   // tab title, e.g. "Overview", "Benefits", "Service"
  body: string    // rich HTML from Quill (may contain inline <img>)
  cards?: FeatureCard[]   // optional per-tab feature-cards grid (icon + title + subtitle)
}

export interface FeatureCard {
  icon?: string   // uploaded icon image URL (optional)
  title: string
  subtitle: string
}

export interface ServiceSection {
  id: string      // stable anchor slug, e.g. "overview"
  title: string   // nav label + H2 of the block
  tabs?: SectionTab[]       // flexible named tabs (preferred). Falls back to body/serviceBody below.
  body: string    // legacy: first/"Overview" tab content (kept for back-compat)
  serviceBody?: string      // legacy: second/"Our Service" tab content
  stats?: StatStripItem[]   // optional row of figures shown within this section
  cards?: FeatureCard[]     // optional feature-cards grid (icon + title + subtitle)
  showTitle?: boolean        // whether to render the h2 heading (defaults true)
}

export interface ServiceDoc {
  id?: string
  order: number
  slug: string
  icon: string
  published: boolean

  // Card (front)
  frontTitle: string
  frontSubtitle: string       // card description on the /services page grid
  homeSubtitle?: string       // card description on the home "What We Offer" band (falls back to frontSubtitle)
  cardImage: string   // background image shown on the service card (optional)

  // Detail page
  layout: 'full' | 'minimal' | 'sectioned'
  heroImage: string
  heroEyebrow: string
  detailTitle: string
  detailIntro: string

  // Full layout
  statStrip: StatStripItem[]
  overview: string
  keyBenefits: KeyBenefit[]
  procedure: ProcedureStep[]
  whoIsThisFor: string[]
  faqs: FAQ[]

  // Minimal layout
  whatWeProvide: string[]
  requirements: string[]

  // Sectioned layout
  sections?: ServiceSection[]
  showContactNav?: boolean   // show "Contact an adviser" in side nav (defaults true)

  // Detail-page extras
  showUaeBar?: boolean       // show the UAE Licensed bar under the hero on this service's detail page
  uaeBarText?: string        // main label of the UAE bar (falls back to the site default)
  uaeBarDetail?: string      // detail line of the UAE bar (falls back to the site default)
  overviewTitle?: string     // custom heading for the overview block (falls back to "Overview")
  showOverviewTitle?: boolean // whether to render the overview heading (defaults true)
}

// ── Services Intro ("One Firm. Every Path") (siteContent/servicesIntro) ─────────

export interface ServicesIntroDoc {
  title: string
  body: string   // multi-paragraph (split on blank lines for rendering)
}

// ── Why Choose Us ─────────────────────────────────────────────────────────────

export interface WhyChooseUsFeature {
  icon: string
  title: string
  description: string
}

export interface WhyChooseUsDoc {
  eyebrow: string
  title: string
  intro: string
  image: string
  badge: { value: string; label: string }
  features: WhyChooseUsFeature[]
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export interface StatEntry {
  value: string
  label: string
}

export interface StatsDoc {
  applications: StatEntry
  successRate:  StatEntry
  destinations: StatEntry
  serviceLines: StatEntry
}

// ── Reserve Consultation CTA (siteContent/reserveCta) ──────────────────────────

export interface ReserveCtaDoc {
  whatsappEnabled: boolean
  emailEnabled: boolean
}

// ── Newsletter ────────────────────────────────────────────────────────────────

export interface NewsletterSignupDoc {
  id?: string
  email: string
  createdAt: number // unix ms
}

// ── Leads ─────────────────────────────────────────────────────────────────────

export interface LeadDoc {
  id?: string
  name: string
  email: string
  phone?: string
  destination?: string
  subject?: string
  message?: string
  type: 'inquiry' | 'consultation' | 'collaboration'
  attachments?: string[]
  createdAt: number // unix ms
}

// ── Process Section ───────────────────────────────────────────────────────────

export interface ProcessStepItem {
  title: string
  description: string
}

export interface ProcessSectionDoc {
  title: string
  steps: ProcessStepItem[]
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export interface TestimonialItem {
  quote: string
  name: string
  role: string
}

export interface TestimonialsSectionDoc {
  items: TestimonialItem[]
}

// ── Users ─────────────────────────────────────────────────────────────────────

export interface UserDoc {
  uid?: string
  email: string
  name: string
  role: 'admin' | 'editor'
  active: boolean
}

// ── Destinations ──────────────────────────────────────────────────────────────

export interface DestinationDoc {
  id?: string
  order: number
  slug: string
  name: string
  blurb: string
  image: string
  ctaImage?: string             // optional background image for the "Ready to explore X?" CTA
  bottomImage?: string          // optional full image shown between the CTA and the final CTA
  routes: string[]
  published: boolean

  // Sectioned detail content (mirrors the sectioned service layout)
  overview?: string             // rich HTML intro block shown above the sections
  sections?: ServiceSection[]   // collapsible content sections (Overview / Our Service tabs + stats)
}

// ── Bookings & Slots ──────────────────────────────────────────────────────────

export interface SlotDoc {
  id?: string
  date: string        // "2026-06-20"
  startTime: string   // "09:00"
  endTime: string     // "10:00"
  durationMin: number // 15 | 30 | 45 | 60
  available: boolean
  bookedBy?: string   // email if booked
}

export interface BookingDoc {
  id?: string
  name: string
  email: string
  phone: string
  slotId: string
  date: string
  startTime: string
  durationMin: number
  timezone: string
  notes?: string
  createdAt: number
  status: 'pending' | 'confirmed' | 'cancelled'
}

// ── Global Reach ──────────────────────────────────────────────────────────────

export interface GlobalReachPin {
  label: string
  lat: number
  lng: number
  chip?: boolean   // show this country's name as a pill below the map (markers always render)
}

export interface GlobalReachDoc {
  headline: string
  subline: string
  pins: GlobalReachPin[]
}

// ── Hero Settings ─────────────────────────────────────────────────────────────

export interface HeroSlide {
  image: string
  tagline: string
}

export interface HeroSettingsDoc {
  heroVideoUrl: string      // looping background video (Firebase Storage URL)
  heroVideoFullUrl: string  // full-quality video for modal player
  heroImage: string         // Ken-Burns fallback still image
  slides?: HeroSlide[]      // 4-image slider with rotating taglines
  finalCtaImage?: string    // background image for the global "Ready to Begin Your Journey?" CTA
}

// ── Testimonials (extended) ───────────────────────────────────────────────────

export interface TestimonialItemExtended extends TestimonialItem {
  avatarUrl?: string
}

// ── Welcome / Who We Are (siteContent/welcome) ─────────────────────────────────

export interface WelcomeDoc {
  eyebrow: string
  title: string
  slogan: string
  body: string          // multi-paragraph (split on blank lines for rendering)
}

// ── Accreditations & Licenses (siteContent/accreditations) ─────────────────────

export interface AccreditationItem {
  name: string
  logo: string          // image URL (placeholder until supplied)
}

export interface AccreditationsDoc {
  title: string
  subline: string
  items: AccreditationItem[]
}

// ── Insights / Articles (siteContent/insights) ────────────────────────────────

export interface InsightItem {
  category: string
  date: string
  title: string
  excerpt: string
  slug?: string      // stable anchor for the /insights/[slug] detail page (generated from title)
  image?: string     // hero / thumbnail image (Firebase Storage URL)
  body?: string      // rich HTML article body (from Quill; may contain inline images)
  href?: string      // legacy/external link — optional, detail page is preferred
}

export interface InsightsDoc {
  items: InsightItem[]
  topVideoUrl?: string   // optional video shown at the top of the /insights page
}

// ── Collaborations / Partnerships (siteContent/collaborations) ─────────────────

export interface PartnerItem {
  name: string
  logo: string
  url: string
  blurb: string
}

export interface CollabCategory {
  groupLabel: string
  items: string[]
}

export interface CollaborationsDoc {
  eyebrow: string
  title: string
  intro: string
  partners: PartnerItem[]
  // Join With Us section
  tagline?: string
  joinEyebrow?: string
  joinTitle?: string
  joinIntro?: string
  categories?: CollabCategory[]
  benefits?: string[]
}
