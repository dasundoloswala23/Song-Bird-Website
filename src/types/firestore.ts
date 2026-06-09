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

// ── Destinations ──────────────────────────────────────────────────────────────

export interface DestinationDoc {
  id?: string
  order: number
  slug: string
  name: string
  blurb: string
  image: string
  routes: string[]
  published: boolean
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
}

export interface GlobalReachDoc {
  headline: string
  subline: string
  pins: GlobalReachPin[]
}

// ── Hero Settings ─────────────────────────────────────────────────────────────

export interface HeroSettingsDoc {
  heroVideoUrl: string      // looping background video (Firebase Storage URL)
  heroVideoFullUrl: string  // full-quality video for modal player
  heroImage: string         // Ken-Burns fallback still image
}

// ── Testimonials (extended) ───────────────────────────────────────────────────

export interface TestimonialItemExtended extends TestimonialItem {
  avatarUrl?: string
}
