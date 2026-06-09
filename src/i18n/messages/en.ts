// English — the canonical message set. All other locales fall back to these keys
// until translated. Keep keys grouped by area; add new UI strings here first.

const en = {
  // ── Navigation ──
  'nav.home': 'Home',
  'nav.services': 'Services',
  'nav.destinations': 'Destinations',
  'nav.about': 'About',
  'nav.collaborations': 'Collaborations',
  'nav.insights': 'Insights',
  'nav.contact': 'Contact',

  // ── Brand ──
  'brand.name': 'Songbird Consultancy',
  'brand.slogan': 'Uplift Your Status',

  // ── Calls to action ──
  'cta.bookConsultation': 'Book a Consultation',
  'cta.bookFreeConsultation': 'Book Your Free Consultation',
  'cta.reserveConsultation': 'Reserve Your Consultation',
  'cta.connectWhatsApp': 'Connect via WhatsApp',
  'cta.viewAllServices': 'View all services',
  'cta.learnMore': 'Learn more',

  // ── Consultation / lead messaging ──
  'lead.reviewLine': 'Make the best review of your application — let’s assist you.',
  'lead.responseLine': 'We will respond to you within 24 hours.',

  // ── Section headings ──
  'home.process.heading': 'We Guide You Through 4 Simple Steps',
  'home.welcome.eyebrow': 'Welcome to Songbird Consultancy',
  'home.power.heading': 'Power Your Next Step Abroad — With Songbird Consultancy',
  'home.reviews.heading': 'Review on Google',
  'home.reviews.subline': 'We are proud to pronounce your compliments.',
  'home.uaeLicensed': 'UAE LICENSED — Consultancy · Immigration · Business Management · HR',

  // ── Forms ──
  'form.name': 'Full Name',
  'form.email': 'Email',
  'form.phone': 'Phone / WhatsApp',
  'form.message': 'Message',
  'form.submit': 'Submit',

  // ── Contact ──
  'contact.hours': 'Opening Hours',
  'contact.followUs': 'Follow Us',
} as const

export type MessageKey = keyof typeof en
export default en
