export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000'

export const CONTACT_EMAIL = 'advisory@songbird.ae'

export const OFFICE_ADDRESS = 'Level 42, Emirates Towers, Sheikh Zayed Rd, Dubai, UAE'

export const OFFICE_PHONE = '+971 4 000 0000'

export const OFFICE_HOURS = 'Sun – Thu  9 am – 6 pm GST'

export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Emirates+Towers+Dubai'

export const STATS = [
  { value: '10K+', label: 'Applications Filed' },
  { value: '98%',  label: 'Success Rate' },
  { value: '15+',  label: 'Destinations' },
  { value: '9',    label: 'Service Lines' },
] as const

export const DESTINATIONS = [
  { label: 'UAE',       keyword: 'UAE' },
  { label: 'UK',        keyword: 'United Kingdom' },
  { label: 'Canada',    keyword: 'Canada' },
  { label: 'Australia', keyword: 'Australia' },
  { label: 'EU',        keyword: 'Europe' },
  { label: 'USA',       keyword: 'United States' },
] as const

export const SOCIAL = {
  facebook:  'https://facebook.com/songbirdae',
  instagram: 'https://instagram.com/songbirdae',
  linkedin:  'https://linkedin.com/company/songbirdae',
} as const
