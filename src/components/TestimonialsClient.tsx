'use client'

import { useEffect, useState } from 'react'
import { getTestimonials } from '@/lib/firestorePublic'
import { Testimonials } from './Testimonials'
import type { TestimonialsSectionDoc } from '@/types/firestore'

export function TestimonialsClient({ fallback }: { fallback: TestimonialsSectionDoc | null }) {
  const [content, setContent] = useState<TestimonialsSectionDoc | null>(fallback)

  useEffect(() => {
    getTestimonials().then(data => { if (data) setContent(data) }).catch(() => {})
  }, [])

  return <Testimonials content={content} />
}
