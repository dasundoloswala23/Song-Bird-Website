export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971558397703'

// Additional WhatsApp contact number (India). WHATSAPP_NUMBER above remains the default
// used by all CTA buttons — this one is shown alongside it as an extra contact option.
export const WHATSAPP_NUMBER_INDIA = '918879251443'
export const WHATSAPP_NUMBER_INDIA_DISPLAY = '+91 88792 51443'

export const CONTACT_EMAIL = 'info@songbird.ae'

// UAE offices. Ajman is the main (head) office. Street-level details are
// placeholders pending confirmation — update the `address` strings before deploy.
export const OFFICES = [
  { city: 'Ajman',     address: 'Ajman, United Arab Emirates',                       isMain: true  },
  { city: 'Sharjah',   address: 'Sharjah, United Arab Emirates',                     isMain: false },
  { city: 'Fujairah',  address: 'Fujairah, United Arab Emirates',                    isMain: false },
  { city: 'Colombo',   address: 'Colombo, Sri Lanka',                                isMain: false },
  { city: 'Mumbai',    address: 'Mumbai, India',                                     isMain: false },
] as const

// Primary address (main office) — kept for back-compat with single-address usages.
export const OFFICE_ADDRESS = OFFICES[0].address

export const OFFICE_PHONE = '+971 55 839 7703'

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
