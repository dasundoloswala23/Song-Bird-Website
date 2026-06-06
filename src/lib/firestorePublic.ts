/**
 * Firebase CLIENT SDK reads — used by both Server Components (build-time) and
 * client components (runtime). No Admin SDK / Cloud Functions required.
 */
import { getFirestore, collection, query, where, orderBy, getDocs, doc, getDoc, setDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { firebaseApp } from './firebase'
import type { ServiceDoc, WhyChooseUsDoc, StatsDoc, ProcessSectionDoc, TestimonialsSectionDoc, LeadDoc } from '@/types/firestore'

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
