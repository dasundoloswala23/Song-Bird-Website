import { adminDb } from './firebaseAdmin'
import type { ServiceDoc, WhyChooseUsDoc, StatsDoc, ProcessSectionDoc, TestimonialsSectionDoc } from '@/types/firestore'

export async function getPublishedServices(): Promise<ServiceDoc[]> {
  try {
    const snap = await adminDb
      .collection('services')
      .where('published', '==', true)
      .orderBy('order')
      .get()
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as ServiceDoc))
  } catch {
    return []
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceDoc | null> {
  try {
    const snap = await adminDb.collection('services').where('slug', '==', slug).limit(1).get()
    if (snap.empty) return null
    const d = snap.docs[0]
    return { id: d.id, ...d.data() } as ServiceDoc
  } catch {
    return null
  }
}

export async function getWhyChooseUs(): Promise<WhyChooseUsDoc | null> {
  try {
    const snap = await adminDb.collection('siteContent').doc('whyChooseUs').get()
    return snap.exists ? (snap.data() as WhyChooseUsDoc) : null
  } catch {
    return null
  }
}

export async function getSiteStats(): Promise<StatsDoc | null> {
  try {
    const snap = await adminDb.collection('siteStats').doc('home').get()
    return snap.exists ? (snap.data() as StatsDoc) : null
  } catch {
    return null
  }
}

export async function getProcessSection(): Promise<ProcessSectionDoc | null> {
  try {
    const snap = await adminDb.collection('siteContent').doc('processSection').get()
    return snap.exists ? (snap.data() as ProcessSectionDoc) : null
  } catch {
    return null
  }
}

export async function getTestimonials(): Promise<TestimonialsSectionDoc | null> {
  try {
    const snap = await adminDb.collection('siteContent').doc('testimonials').get()
    return snap.exists ? (snap.data() as TestimonialsSectionDoc) : null
  } catch {
    return null
  }
}
