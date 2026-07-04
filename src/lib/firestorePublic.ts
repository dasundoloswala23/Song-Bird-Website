/**
 * Firebase CLIENT SDK reads — used by both Server Components (build-time) and
 * client components (runtime). No Admin SDK / Cloud Functions required.
 */
import { initializeFirestore, collection, query, where, orderBy, getDocs, doc, getDoc, setDoc, addDoc, deleteDoc, updateDoc, deleteField } from 'firebase/firestore'
import { firebaseApp } from './firebase'
import { slugify } from './utils'
import type { ServiceDoc, ServicesIntroDoc, WhyChooseUsDoc, StatsDoc, ProcessSectionDoc, TestimonialsSectionDoc, LeadDoc, DestinationDoc, SlotDoc, BookingDoc, GlobalReachDoc, HeroSettingsDoc, WelcomeDoc, AccreditationsDoc, CollaborationsDoc, InsightsDoc, NewsletterSignupDoc, ReserveCtaDoc, FaqPageDoc } from '@/types/firestore'

// ignoreUndefinedProperties: optional fields (e.g. a section's unset stats) may be `undefined`;
// Firestore would otherwise reject the whole write ("invalid nested entity"). This drops them.
const db = initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true })

// Sections are persisted as a JSON string (`sectionsJson`) to sidestep Firestore's nested-array
// limit (services/destinations nest sections → tabs → cards). Rehydrate to a `sections` array
// on read so all consumers are unchanged. Back-compat: legacy docs store an array `sections`.
function hydrateSections(data: Record<string, any>): Record<string, any> {
  if (typeof data.sectionsJson === 'string') {
    try { data.sections = JSON.parse(data.sectionsJson) } catch { data.sections = [] }
    delete data.sectionsJson
  }
  return data
}

// Strip the nested `sections` array and store it as a JSON string for writing.
function dehydrateSections(data: Record<string, any>): Record<string, any> {
  const { sections, ...rest } = data
  return { ...rest, sectionsJson: JSON.stringify(sections ?? []) }
}

// ── Public reads ──────────────────────────────────────────────────────────────

export async function getPublishedServices(): Promise<ServiceDoc[]> {
  try {
    const q = query(collection(db, 'services'), where('published', '==', true))
    const snap = await getDocs(q)
    return snap.docs
      .map(d => hydrateSections({ id: d.id, ...d.data() }) as ServiceDoc)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  } catch { return [] }
}

export async function getAllServices(): Promise<ServiceDoc[]> {
  try {
    const snap = await getDocs(collection(db, 'services'))
    return snap.docs
      .map(d => hydrateSections({ id: d.id, ...d.data() }) as ServiceDoc)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  } catch { return [] }
}

export async function getServiceBySlug(slug: string): Promise<ServiceDoc | null> {
  try {
    // Exact match first (fast path), then a slug-agnostic fallback so a clean hyphenated URL
    // (e.g. "commercial-brokering") still resolves legacy docs stored with spaces/casing
    // (e.g. "commercial brokering").
    const q = query(collection(db, 'services'), where('slug', '==', slug))
    const snap = await getDocs(q)
    if (!snap.empty) return hydrateSections({ id: snap.docs[0].id, ...snap.docs[0].data() }) as ServiceDoc
    const target = slugify(slug)
    const all = await getDocs(collection(db, 'services'))
    const match = all.docs.find(d => slugify((d.data() as ServiceDoc).slug ?? '') === target)
    return match ? (hydrateSections({ id: match.id, ...match.data() }) as ServiceDoc) : null
  } catch { return null }
}

export async function getServiceById(id: string): Promise<ServiceDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'services', id))
    if (!snap.exists()) return null
    return hydrateSections({ id: snap.id, ...snap.data() }) as ServiceDoc
  } catch { return null }
}

export async function getWhyChooseUs(): Promise<WhyChooseUsDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'whyChooseUs'))
    return snap.exists() ? (snap.data() as WhyChooseUsDoc) : null
  } catch { return null }
}

export async function getSiteStats(): Promise<StatsDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'siteStats', 'home'))
    return snap.exists() ? (snap.data() as StatsDoc) : null
  } catch { return null }
}

export async function getProcessSection(): Promise<ProcessSectionDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'processSection'))
    return snap.exists() ? (snap.data() as ProcessSectionDoc) : null
  } catch { return null }
}

export async function getTestimonials(): Promise<TestimonialsSectionDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'testimonials'))
    return snap.exists() ? (snap.data() as TestimonialsSectionDoc) : null
  } catch { return null }
}

export async function getLeads(): Promise<LeadDoc[]> {
  try {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as LeadDoc))
  } catch { return [] }
}

export async function getLeadById(id: string): Promise<LeadDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'leads', id))
    return snap.exists() ? ({ id: snap.id, ...snap.data() } as LeadDoc) : null
  } catch { return null }
}

export async function getNewsletterSignups(): Promise<NewsletterSignupDoc[]> {
  try {
    const q = query(collection(db, 'newsletter'), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as NewsletterSignupDoc))
  } catch { return [] }
}

export async function saveNewsletterSignup(email: string): Promise<void> {
  await addDoc(collection(db, 'newsletter'), { email: email.trim().toLowerCase(), createdAt: Date.now() })
}

// ── Destinations ──────────────────────────────────────────────────────────────

export async function getDestinations(): Promise<DestinationDoc[]> {
  try {
    const q = query(collection(db, 'destinations'), where('published', '==', true))
    const snap = await getDocs(q)
    return snap.docs
      .map(d => hydrateSections({ id: d.id, ...d.data() }) as DestinationDoc)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  } catch { return [] }
}

export async function getAllDestinations(): Promise<DestinationDoc[]> {
  try {
    const snap = await getDocs(collection(db, 'destinations'))
    return snap.docs
      .map(d => hydrateSections({ id: d.id, ...d.data() }) as DestinationDoc)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  } catch { return [] }
}

export async function getDestinationBySlug(slug: string): Promise<DestinationDoc | null> {
  try {
    const q = query(collection(db, 'destinations'), where('slug', '==', slug))
    const snap = await getDocs(q)
    if (!snap.empty) return hydrateSections({ id: snap.docs[0].id, ...snap.docs[0].data() }) as DestinationDoc
    const target = slugify(slug)
    const all = await getDocs(collection(db, 'destinations'))
    const match = all.docs.find(d => slugify((d.data() as DestinationDoc).slug ?? '') === target)
    return match ? (hydrateSections({ id: match.id, ...match.data() }) as DestinationDoc) : null
  } catch { return null }
}

// ── Slots ─────────────────────────────────────────────────────────────────────

export async function getAvailableSlots(date: string): Promise<SlotDoc[]> {
  try {
    const q = query(
      collection(db, 'slots'),
      where('date', '==', date),
      where('available', '==', true),
    )
    const snap = await getDocs(q)
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() } as SlotDoc))
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
  } catch { return [] }
}

export async function getAllSlots(): Promise<SlotDoc[]> {
  try {
    const q = query(collection(db, 'slots'), orderBy('date', 'asc'))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as SlotDoc))
  } catch { return [] }
}

// ── Bookings ──────────────────────────────────────────────────────────────────

export async function getBookings(): Promise<BookingDoc[]> {
  try {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as BookingDoc))
  } catch { return [] }
}

export async function getBookingById(id: string): Promise<BookingDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'bookings', id))
    return snap.exists() ? ({ id: snap.id, ...snap.data() } as BookingDoc) : null
  } catch { return null }
}

// ── Site Content ──────────────────────────────────────────────────────────────

export async function getGlobalReach(): Promise<GlobalReachDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'globalReach'))
    return snap.exists() ? (snap.data() as GlobalReachDoc) : null
  } catch { return null }
}

export async function getHeroSettings(): Promise<HeroSettingsDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'heroSettings'))
    return snap.exists() ? (snap.data() as HeroSettingsDoc) : null
  } catch { return null }
}

export async function getWelcome(): Promise<WelcomeDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'welcome'))
    return snap.exists() ? (snap.data() as WelcomeDoc) : null
  } catch { return null }
}

export async function getAccreditations(): Promise<AccreditationsDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'accreditations'))
    return snap.exists() ? (snap.data() as AccreditationsDoc) : null
  } catch { return null }
}

export async function getCollaborations(): Promise<CollaborationsDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'collaborations'))
    return snap.exists() ? (snap.data() as CollaborationsDoc) : null
  } catch { return null }
}

export async function getInsights(): Promise<InsightsDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'insights'))
    return snap.exists() ? (snap.data() as InsightsDoc) : null
  } catch { return null }
}

export async function getServicesIntro(): Promise<ServicesIntroDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'servicesIntro'))
    return snap.exists() ? (snap.data() as ServicesIntroDoc) : null
  } catch { return null }
}

export async function getServicesPageIntro(): Promise<ServicesIntroDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'servicesPageIntro'))
    return snap.exists() ? (snap.data() as ServicesIntroDoc) : null
  } catch { return null }
}

export async function getReserveCta(): Promise<ReserveCtaDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'reserveCta'))
    return snap.exists() ? (snap.data() as ReserveCtaDoc) : null
  } catch { return null }
}

export async function getFaqPage(): Promise<FaqPageDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'faq'))
    return snap.exists() ? (snap.data() as FaqPageDoc) : null
  } catch { return null }
}

// ── Admin writes ──────────────────────────────────────────────────────────────

export async function saveService(data: Omit<ServiceDoc, 'id'>, id?: string): Promise<string> {
  const payload = dehydrateSections(data)
  if (id) {
    // deleteField removes any stale nested `sections` array left on legacy docs under merge.
    await setDoc(doc(db, 'services', id), { ...payload, sections: deleteField() }, { merge: true })
    return id
  }
  const ref = await addDoc(collection(db, 'services'), payload)
  return ref.id
}

export async function deleteService(id: string): Promise<void> {
  await deleteDoc(doc(db, 'services', id))
}

export async function toggleServicePublished(id: string, published: boolean): Promise<void> {
  await updateDoc(doc(db, 'services', id), { published })
}

export async function saveWhyChooseUs(data: WhyChooseUsDoc): Promise<void> {
  await setDoc(doc(db, 'siteContent', 'whyChooseUs'), data)
}

export async function saveSiteStats(data: StatsDoc): Promise<void> {
  await setDoc(doc(db, 'siteStats', 'home'), data)
}

export async function saveProcessSection(data: ProcessSectionDoc): Promise<void> {
  await setDoc(doc(db, 'siteContent', 'processSection'), data)
}

export async function saveTestimonials(data: TestimonialsSectionDoc): Promise<void> {
  await setDoc(doc(db, 'siteContent', 'testimonials'), data)
}

export async function saveLead(data: Omit<LeadDoc, 'id'>): Promise<void> {
  await addDoc(collection(db, 'leads'), data)
}

export async function saveDestination(data: Omit<DestinationDoc, 'id'>, id?: string): Promise<string> {
  const payload = dehydrateSections(data)
  if (id) {
    await setDoc(doc(db, 'destinations', id), { ...payload, sections: deleteField() }, { merge: true })
    return id
  }
  const ref = await addDoc(collection(db, 'destinations'), payload)
  return ref.id
}

export async function deleteDestination(id: string): Promise<void> {
  await deleteDoc(doc(db, 'destinations', id))
}

export async function toggleDestinationPublished(id: string, published: boolean): Promise<void> {
  await updateDoc(doc(db, 'destinations', id), { published })
}

export async function saveGlobalReach(data: GlobalReachDoc): Promise<void> {
  await setDoc(doc(db, 'siteContent', 'globalReach'), data)
}

export async function saveHeroSettings(data: HeroSettingsDoc): Promise<void> {
  await setDoc(doc(db, 'siteContent', 'heroSettings'), data)
}

export async function saveWelcome(data: WelcomeDoc): Promise<void> {
  await setDoc(doc(db, 'siteContent', 'welcome'), data)
}

export async function saveAccreditations(data: AccreditationsDoc): Promise<void> {
  await setDoc(doc(db, 'siteContent', 'accreditations'), data)
}

export async function saveCollaborations(data: CollaborationsDoc): Promise<void> {
  await setDoc(doc(db, 'siteContent', 'collaborations'), data)
}

export async function saveInsights(data: InsightsDoc): Promise<void> {
  await setDoc(doc(db, 'siteContent', 'insights'), data)
}

export async function saveServicesIntro(data: ServicesIntroDoc): Promise<void> {
  await setDoc(doc(db, 'siteContent', 'servicesIntro'), data)
}

export async function saveServicesPageIntro(data: ServicesIntroDoc): Promise<void> {
  await setDoc(doc(db, 'siteContent', 'servicesPageIntro'), data)
}

export async function saveReserveCta(data: ReserveCtaDoc): Promise<void> {
  await setDoc(doc(db, 'siteContent', 'reserveCta'), data)
}

export async function saveFaqPage(data: FaqPageDoc): Promise<void> {
  await setDoc(doc(db, 'siteContent', 'faq'), data)
}

export async function saveSlot(data: Omit<SlotDoc, 'id'>, id?: string): Promise<string> {
  if (id) {
    await setDoc(doc(db, 'slots', id), data, { merge: true })
    return id
  }
  const ref = await addDoc(collection(db, 'slots'), data)
  return ref.id
}

export async function deleteSlot(id: string): Promise<void> {
  await deleteDoc(doc(db, 'slots', id))
}

export async function updateSlotAvailability(slotId: string, available: boolean, bookedBy?: string): Promise<void> {
  await updateDoc(doc(db, 'slots', slotId), bookedBy ? { available, bookedBy } : { available })
}

export async function createBooking(data: Omit<BookingDoc, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'bookings'), data)
  return ref.id
}

export async function getSiteDown(): Promise<boolean> {
  try {
    const snap = await getDoc(doc(db, 'siteDown', 'siteDown'))
    return snap.data()?.sitedown === true
  } catch { return false }
}

export async function saveSiteDown(value: boolean): Promise<void> {
  await setDoc(doc(db, 'siteDown', 'siteDown'), { sitedown: value })
}

export async function updateBookingStatus(id: string, status: BookingDoc['status']): Promise<void> {
  await updateDoc(doc(db, 'bookings', id), { status })
}
