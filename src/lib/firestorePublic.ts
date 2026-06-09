/**
 * Firebase CLIENT SDK reads — used by both Server Components (build-time) and
 * client components (runtime). No Admin SDK / Cloud Functions required.
 */
import { getFirestore, collection, query, where, orderBy, getDocs, doc, getDoc, setDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { firebaseApp } from './firebase'
import type { ServiceDoc, WhyChooseUsDoc, StatsDoc, ProcessSectionDoc, TestimonialsSectionDoc, LeadDoc, DestinationDoc, SlotDoc, BookingDoc, GlobalReachDoc, HeroSettingsDoc } from '@/types/firestore'

const db = getFirestore(firebaseApp)

// ── Public reads ──────────────────────────────────────────────────────────────

export async function getPublishedServices(): Promise<ServiceDoc[]> {
  try {
    const q = query(collection(db, 'services'), where('published', '==', true))
    const snap = await getDocs(q)
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() } as ServiceDoc))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  } catch { return [] }
}

export async function getAllServices(): Promise<ServiceDoc[]> {
  try {
    const snap = await getDocs(collection(db, 'services'))
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() } as ServiceDoc))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  } catch { return [] }
}

export async function getServiceBySlug(slug: string): Promise<ServiceDoc | null> {
  try {
    const q = query(collection(db, 'services'), where('slug', '==', slug))
    const snap = await getDocs(q)
    if (snap.empty) return null
    const d = snap.docs[0]
    return { id: d.id, ...d.data() } as ServiceDoc
  } catch { return null }
}

export async function getServiceById(id: string): Promise<ServiceDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'services', id))
    if (!snap.exists()) return null
    return { id: snap.id, ...snap.data() } as ServiceDoc
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

// ── Destinations ──────────────────────────────────────────────────────────────

export async function getDestinations(): Promise<DestinationDoc[]> {
  try {
    const q = query(collection(db, 'destinations'), where('published', '==', true))
    const snap = await getDocs(q)
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() } as DestinationDoc))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  } catch { return [] }
}

export async function getAllDestinations(): Promise<DestinationDoc[]> {
  try {
    const snap = await getDocs(collection(db, 'destinations'))
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() } as DestinationDoc))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  } catch { return [] }
}

export async function getDestinationBySlug(slug: string): Promise<DestinationDoc | null> {
  try {
    const q = query(collection(db, 'destinations'), where('slug', '==', slug))
    const snap = await getDocs(q)
    if (snap.empty) return null
    const d = snap.docs[0]
    return { id: d.id, ...d.data() } as DestinationDoc
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

// ── Admin writes ──────────────────────────────────────────────────────────────

export async function saveService(data: Omit<ServiceDoc, 'id'>, id?: string): Promise<string> {
  if (id) {
    await setDoc(doc(db, 'services', id), data, { merge: true })
    return id
  }
  const ref = await addDoc(collection(db, 'services'), data)
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
  if (id) {
    await setDoc(doc(db, 'destinations', id), data, { merge: true })
    return id
  }
  const ref = await addDoc(collection(db, 'destinations'), data)
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

export async function updateBookingStatus(id: string, status: BookingDoc['status']): Promise<void> {
  await updateDoc(doc(db, 'bookings', id), { status })
}
