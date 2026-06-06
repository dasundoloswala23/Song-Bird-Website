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

export interface ServiceDoc {
  id?: string
  order: number
  slug: string
  icon: string
  published: boolean

  // Card (front)
  frontTitle: string
  frontSubtitle: string

  // Detail page
  layout: 'full' | 'minimal'
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

// ── Leads ─────────────────────────────────────────────────────────────────────

export interface LeadDoc {
  id?: string
  name: string
  email: string
  phone?: string
  destination?: string
  subject?: string
  message?: string
  type: 'inquiry' | 'consultation'
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
