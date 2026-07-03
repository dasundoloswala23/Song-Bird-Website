// Central SEO keyword lists. Root layout combines the broad lists; individual
// pages pick the subset (or destination-specific set) that matches their intent.

export const BRAND_KEYWORDS = [
  'Songbird',
  'Songbird Consultancy',
  'Songbird Consulting',
  'Songbird immigration',
  'Songbird immigration consultancy',
  'Songbird Immigration Consultants',
  'Songbird Dubai',
  'Songbird UAE',
  'songbird.ae',
]

export const PRIMARY_KEYWORDS = [
  'Immigration Consultants UAE',
  'Immigration Consultants Dubai',
  'Immigration Services UAE',
  'Immigration Services Dubai',
  'Visa Consultants UAE',
  'Visa Consultants Dubai',
  'Migration Consultants UAE',
  'Best Immigration Consultants Dubai',
  'Best Immigration Consultants UAE',
  'Immigration Agency UAE',
  'Immigration Consultant Near Me',
  'Overseas Immigration UAE',
  'Overseas Immigration Consultants UAE',
  'Global Immigration Services',
  'Global Mobility Services UAE',
]

export const LOCAL_KEYWORDS = [
  'Immigration Consultant in Dubai',
  'Immigration Consultant in Abu Dhabi',
  'Immigration Consultant in Sharjah',
  'Immigration Consultant in Ajman',
  'Visa Consultant Near Me',
  'Travel Consultant Near Me',
]

export const TRAVEL_BUSINESS_KEYWORDS = [
  'Tourist Visa UAE',
  'Visit Visa UAE',
  'Schengen Visa UAE',
  'Europe Visa UAE',
  'Travel Visa Consultants Dubai',
  'Family Visit Visa UAE',
  'Tourist Visa Services Dubai',
  'Student Visa UAE',
  'Business Setup UAE',
  'Company Formation UAE',
  'Business Registration Dubai',
  'UAE Golden Visa',
  'Investor Visa UAE',
  'Business Immigration',
  'Business Migration UAE',
]

export const LONG_TAIL_KEYWORDS = [
  'Best immigration consultants in UAE',
  'Best visa consultants in Dubai',
  'Affordable immigration consultants UAE',
  'Trusted immigration consultants Dubai',
  'Immigration consultants for Canada',
  'Immigration consultants for Australia',
  'Student visa consultants UAE',
  'Visit visa consultants Dubai',
  'Family migration consultants UAE',
  'Business migration consultants UAE',
  'Immigration experts in UAE',
  'Professional visa services UAE',
  'Global migration services',
  'Overseas education consultants UAE',
]

// Country-specific keyword sets, keyed by destination slug (as generated for
// /destinations/[slug]). Slugs not listed here fall back to
// genericDestinationKeywords(name).
export const DESTINATION_KEYWORDS: Record<string, string[]> = {
  canada: [
    'Canada Immigration UAE',
    'Canada Visa Consultants Dubai',
    'Canada PR Consultants UAE',
    'Canada Express Entry UAE',
    'Canada Student Visa UAE',
    'Canada Visit Visa UAE',
    'Canada Work Permit UAE',
    'Canada Family Sponsorship UAE',
    'Canada Business Migration',
    'Migrate to Canada from UAE',
  ],
  australia: [
    'Australia Immigration UAE',
    'Australia PR Visa UAE',
    'Australia Student Visa UAE',
    'Australia Visitor Visa UAE',
    'Australia Skilled Migration',
    'Australia Immigration Consultants Dubai',
  ],
  'new-zealand': [
    'New Zealand Immigration UAE',
    'New Zealand Student Visa UAE',
    'New Zealand Visitor Visa',
    'New Zealand Skilled Migrant Visa',
    'New Zealand Business Visa',
  ],
  'uk-migration': [
    'UK Immigration UAE',
    'UK Visa Consultants Dubai',
    'UK Student Visa UAE',
    'UK Visitor Visa',
    'UK Skilled Worker Visa',
    'UK Family Visa',
    'UK Business Visa',
    'UK Settlement Visa',
  ],
  usa: [
    'USA Immigration Consultants UAE',
    'USA Visit Visa',
    'USA B1 B2 Visa UAE',
    'USA Student Visa UAE',
    'USA Family Sponsored Visa',
    'USA Employer Sponsored Visa',
    'USA EB5 Visa',
    'USA Immigration Services Dubai',
  ],
  uae: [
    'UAE Golden Visa',
    'UAE Residency Visa',
    'Dubai Residency Visa',
    'Investor Visa UAE',
    'UAE Visit Visa',
    'UAE Business Setup',
    'UAE Immigration Services',
  ],
  eu: [
    'Europe Residency Programs',
    'Europe Visa UAE',
    'Schengen Visa UAE',
    'EU Golden Visa',
    'Europe Immigration Consultants Dubai',
    'Residency by Investment Europe',
  ],
  asia: [
    'Asia Immigration UAE',
    'Asia Visa Consultants Dubai',
    'Asia Business Migration',
    'Asia Residency Programs',
  ],
}

export function genericDestinationKeywords(name: string): string[] {
  return [
    `${name} Immigration UAE`,
    `${name} Visa Consultants Dubai`,
    `${name} Residency from UAE`,
    `${name} Immigration Consultants UAE`,
    `Migrate to ${name} from UAE`,
  ]
}

export function serviceKeywords(title: string): string[] {
  return [title, `${title} UAE`, `${title} Dubai`, `${title} Consultants UAE`]
}
