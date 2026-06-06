export interface Service {
  slug: string
  title: string
  shortDesc: string
  description: string
  cluster: 'legal' | 'business' | 'lifestyle'
  clusterLabel: string
  whatWeProvide: string[]
  requirements: string[]
}

export const SERVICES: Service[] = [
  {
    slug: 'immigration',
    title: 'Immigration Advisory',
    shortDesc: 'Expert guidance on visas, residency, and citizenship pathways worldwide.',
    description:
      'Our immigration specialists navigate the complex landscape of global visa and residency programmes on your behalf. From UAE golden visas to investor routes in Canada, Australia, and the EU, we handle every aspect of your application with precision and discretion.',
    cluster: 'legal',
    clusterLabel: 'Legal & Regulatory',
    whatWeProvide: [
      'UAE Golden Visa applications',
      'Investor & entrepreneur visa programmes',
      'Skilled worker and sponsored visa routes',
      'Family reunification applications',
      'Citizenship by investment guidance',
      'Document legalisation and attestation',
    ],
    requirements: [
      'Valid passport (min. 6 months validity)',
      'Financial proof of eligibility',
      'Clean criminal background record',
      'Health insurance documentation',
      'Destination-specific supporting documents',
    ],
  },
  {
    slug: 'patent-ip',
    title: 'Patent & IP Advisory',
    shortDesc: 'Protect your intellectual assets across all key jurisdictions.',
    description:
      'Safeguard your innovations, trademarks, and creative works in every market you operate. Our IP advisory team coordinates with registered attorneys across the UAE, GCC, and international territories to build robust, multi-jurisdiction protection strategies.',
    cluster: 'legal',
    clusterLabel: 'Legal & Regulatory',
    whatWeProvide: [
      'Patent searches and freedom-to-operate analysis',
      'Trademark registration in UAE and GCC',
      'International IP filing strategies (PCT, Madrid)',
      'Copyright and design rights protection',
      'IP portfolio management and renewals',
      'Enforcement and dispute advisory',
    ],
    requirements: [
      'Detailed invention or brand disclosure',
      'Existing registration certificates (if any)',
      'Target markets for protection',
      'Proof of first use or priority date',
    ],
  },
  {
    slug: 'maritime',
    title: 'Maritime Advisory',
    shortDesc: 'Compliance, registration, and operational support for maritime ventures.',
    description:
      'Dubai\'s strategic location makes it a premier hub for maritime commerce. We guide shipping companies, yacht owners, and maritime operators through UAE and international maritime regulations, vessel registration, and flag-state compliance.',
    cluster: 'legal',
    clusterLabel: 'Legal & Regulatory',
    whatWeProvide: [
      'Vessel registration under UAE and international flags',
      'Maritime company formation in DMCA and JAFZA',
      'Crew documentation and endorsements',
      'Port State Control compliance audits',
      'Marine insurance advisory',
      'Ship mortgage and financing support',
    ],
    requirements: [
      'Vessel survey and classification certificates',
      'Proof of vessel ownership or purchase agreement',
      'Operator company documents',
      'Crew list and certificate of competency',
    ],
  },
  {
    slug: 'management',
    title: 'Management Advisory',
    shortDesc: 'Strategic consulting to grow, restructure, or scale your business in the UAE.',
    description:
      'Whether you are launching a new venture in Dubai or restructuring an established enterprise, our management advisors bring deep regional expertise and global frameworks to drive performance and sustainable growth.',
    cluster: 'business',
    clusterLabel: 'Business Advisory',
    whatWeProvide: [
      'Market entry strategy and feasibility studies',
      'Business restructuring and transformation',
      'Corporate governance and board advisory',
      'Mergers, acquisitions, and joint-venture support',
      'Performance improvement programmes',
      'Executive coaching and leadership development',
    ],
    requirements: [
      'Current business registration documents',
      'Financial statements (last 2–3 years)',
      'Business plan or growth objectives brief',
      'Stakeholder and ownership structure details',
    ],
  },
  {
    slug: 'hr',
    title: 'HR Advisory',
    shortDesc: 'Building compliant, high-performance teams in the UAE and beyond.',
    description:
      'From drafting UAE-compliant employment contracts to designing competitive compensation packages, our HR advisory practice ensures your workforce strategy is both legally sound and talent-attracting in the competitive Dubai market.',
    cluster: 'business',
    clusterLabel: 'Business Advisory',
    whatWeProvide: [
      'UAE Labour Law compliance audits',
      'Employment contract drafting and review',
      'Salary benchmarking and compensation design',
      'Recruitment process outsourcing',
      'MOHRE registration and Tasheel support',
      'Employee handbook and policy development',
    ],
    requirements: [
      'Existing employment contracts (if any)',
      'Current headcount and organogram',
      'Industry and role specifications',
      'Target compensation budget',
    ],
  },
  {
    slug: 'commercial-brokering',
    title: 'Commercial Brokering',
    shortDesc: 'Connecting buyers, sellers, and investors across key market sectors.',
    description:
      'Our commercial brokerage team facilitates high-value transactions in real estate, business sales, and investment introductions throughout the UAE and GCC. We act as a trusted intermediary, protecting all parties\' interests throughout the deal lifecycle.',
    cluster: 'business',
    clusterLabel: 'Business Advisory',
    whatWeProvide: [
      'Business acquisition and sale mandates',
      'Commercial real estate brokerage',
      'Investment introduction and matchmaking',
      'Due diligence coordination',
      'Term sheet and MOU drafting support',
      'Post-completion integration advisory',
    ],
    requirements: [
      'Clear mandate letter or power of attorney',
      'Asset or business valuation (if available)',
      'Financial proof of buyer capacity',
      'Non-disclosure agreement',
    ],
  },
  {
    slug: 'concierge',
    title: 'Concierge Services',
    shortDesc: 'White-glove personal assistance for every aspect of life in Dubai.',
    description:
      'Dubai\'s pace demands seamless personal support. Our concierge team handles government transactions, property management, vehicle registration, school admissions, and everyday errands — freeing you to focus on what matters most.',
    cluster: 'lifestyle',
    clusterLabel: 'Lifestyle & Concierge',
    whatWeProvide: [
      'Dubai government services and paperwork',
      'Property rental and purchase assistance',
      'Vehicle registration and licensing',
      'School search and admissions support',
      'Medical and health service coordination',
      'Travel planning and executive transport',
    ],
    requirements: [
      'Valid Emirates ID or passport',
      'Proof of UAE residency (if applicable)',
      'Specific service brief or requirements list',
    ],
  },
  {
    slug: 'lifestyle-development',
    title: 'Lifestyle Development',
    shortDesc: 'Curated pathways to culture, wellness, and personal growth in the UAE.',
    description:
      'Relocating or upgrading your lifestyle in Dubai goes beyond logistics. Our lifestyle development consultants connect you with the city\'s finest educational institutions, wellness facilities, arts communities, and social networks — building a life you love.',
    cluster: 'lifestyle',
    clusterLabel: 'Lifestyle & Concierge',
    whatWeProvide: [
      'Personal lifestyle strategy and goal planning',
      'Private education and tutoring referrals',
      'Wellness, fitness, and nutrition programme design',
      'Art, culture, and social club introductions',
      'Luxury residential interior coordination',
      'Expat community integration support',
    ],
    requirements: [
      'Personal profile and lifestyle objectives',
      'Budget and timeline preferences',
      'Family composition details (if applicable)',
    ],
  },
  {
    slug: 'reservations',
    title: 'Reservations & Hospitality',
    shortDesc: 'Priority access to Dubai\'s finest restaurants, hotels, and experiences.',
    description:
      'From Michelin-starred dining to exclusive resort experiences across the UAE and beyond, our reservations team secures access that is simply not available to the public — leveraging established relationships with the region\'s premier hospitality partners.',
    cluster: 'lifestyle',
    clusterLabel: 'Lifestyle & Concierge',
    whatWeProvide: [
      'Fine dining reservations and private dining rooms',
      'Luxury hotel and resort bookings',
      'Yacht and private aviation charters',
      'Event tickets and VIP hospitality packages',
      'Desert safari and experiential trip planning',
      'Anniversary, birthday, and celebration planning',
    ],
    requirements: [
      'Preferred dates and party size',
      'Budget range and preferences',
      'Any dietary or special requirements',
    ],
  },
]

export const SERVICE_CLUSTERS = [
  {
    key: 'legal',
    label: 'Legal & Regulatory',
    services: SERVICES.filter(s => s.cluster === 'legal'),
  },
  {
    key: 'business',
    label: 'Business Advisory',
    services: SERVICES.filter(s => s.cluster === 'business'),
  },
  {
    key: 'lifestyle',
    label: 'Lifestyle & Concierge',
    services: SERVICES.filter(s => s.cluster === 'lifestyle'),
  },
]
