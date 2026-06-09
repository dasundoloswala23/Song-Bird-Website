export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000'

export const CONTACT_EMAIL = 'advisory@songbird.ae'

export const OFFICE_ADDRESS = 'Level 42, Emirates Towers, Sheikh Zayed Rd, Dubai, UAE'

export const OFFICE_PHONE = '+971 4 000 0000'

export const OFFICE_HOURS = {
  weekdays: 'Mon – Fri  10:00 am – 7:00 pm',
  weekend:  'Sat & Sun  8:00 am – 11:00 pm',
} as const

export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Emirates+Towers+Dubai'

export const STATS = [
  { value: '5,000+',  label: 'Successful Steps' },
  { value: '15+',     label: 'Years of International Recognition' },
  { value: '20,000+', label: 'Clients Served' },
  { value: '95%',     label: 'Success Ratio' },
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
