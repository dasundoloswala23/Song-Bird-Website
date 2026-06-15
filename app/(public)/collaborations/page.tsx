import type { Metadata } from 'next'
import { FinalCTA } from '@/components/FinalCTA'
import { CollaborationJoinSection } from '@/components/CollaborationJoinSection'
import { getCollaborations } from '@/lib/firestorePublic'
import type { CollaborationsDoc } from '@/types/firestore'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Collaborations',
  description: 'Join with Songbird Consultancy — collaboration and partnership opportunities across our global platform.',
}

const DEFAULT: CollaborationsDoc = {
  eyebrow: 'Our Network',
  title: 'Collaborations & Partnerships',
  intro: '',
  partners: [],
}

export default async function CollaborationsPage() {
  const content = (await getCollaborations()) ?? DEFAULT

  return (
    <>
      <CollaborationJoinSection fallback={content} />
      <FinalCTA />
    </>
  )
}
