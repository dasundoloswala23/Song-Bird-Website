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
  'nav.faq': 'FAQ',
  'nav.contact': 'Contact',

  // ── Brand ──
  'brand.name': 'Songbird Consultancy',
  'brand.slogan': 'Uplift Your Status',

  // ── Calls to action ──
  'cta.bookConsultation': 'Book a Consultation',
  'cta.bookFreeConsultation': 'Reserve Your Free Consultation',
  'cta.reserveConsultation': 'Reserve Your Consultation',
  'cta.connectWhatsApp': 'Connect via WhatsApp',
  'cta.freeEligibility': 'Free Eligibility Check →',
  'cta.getStarted': 'Get Started',
  'cta.learnMore': 'Learn More',
  'cta.contactUs': 'Contact Us',
  'cta.viewAllServices': 'View all services',
  'cta.whatsappNow': 'WhatsApp Us Now',
  'cta.subscribe': 'Subscribe',

  // ── Consultation / lead messaging ──
  'lead.reviewLine': 'Make the best review of your application — let’s assist you.',
  'lead.responseLine': 'We will respond to you within 24 hours.',
  'lead.thankYou': 'Thank you!',

  // ── Hero ──
  'hero.eyebrow': 'UAE-Licensed · Immigration & Global Mobility',
  'hero.slide1': 'Trusted Immigration Consultants in UAE',
  'hero.slide2': 'Reliable & Professional Legal Advisory Services for You & Your Businesses Abroad',
  'hero.slide3': 'Your Gateway to Life in the Emirates',
  'hero.slide4': 'Live Your Story in the UAE',
  'hero.slide5': 'Power & Inspire Your Next Step Abroad',
  'hero.trust.licensed': 'UAE Licensed',
  'hero.trust.counsel': 'Regulated Counsel',
  'hero.trust.success': '95% Success Ratio',
  'hero.trust.confidential': 'Confidential Process',

  // ── UAE licensed strip ──
  'uae.licensed': 'UAE Licensed',
  'uae.licensedDetail': '— Consultancy · Immigration · Business Management · HR',

  // ── Pillars ──
  'pillars.eyebrow': 'What We Do',
  'pillars.heading': 'Two pillars, one accountable team',
  'pillars.residency.title': 'Residency & Immigration',
  'pillars.residency.desc': 'Golden Visas, investor, work and family residency — handled end-to-end.',
  'pillars.business.title': 'Business & Corporate',
  'pillars.business.desc': 'Company formation, corporate structuring and HR advisory across the UAE.',

  // ── Quick support ──
  'quick.eyebrow': 'How We Can Help',
  'quick.heading': 'Quick Support Services',
  'quick.visa': 'Visa & Residency',
  'quick.business': 'Business Setup',
  'quick.citizenship': 'Second Citizenship',
  'quick.legal': 'Corporate & Legal',
  'quick.patent': 'Patent & Trademark',
  'quick.finance': 'Finance & Insurance',
  'quick.hr': 'HR & Management',
  'quick.property': 'Property & Tourism',

  // ── Power band ──
  'power.heading': 'Power Your Next Step Abroad',
  'power.sub': 'With Songbird Consultancy',

  // ── Process ──
  'process.eyebrow': 'How It Works',
  'process.heading': 'We Guide You Through 4 Simple Steps',

  // ── Accreditations ──
  'accred.eyebrow': 'Trust & Compliance',

  // ── Global reach ──
  'reach.eyebrow': 'Global Reach',

  // ── Destinations ──
  'dest.eyebrow': 'Where We Operate',
  'dest.heading': 'Our Immigration Destinations',

  // ── Combined CTA ──
  'combined.eyebrow': 'Free Assessment',
  'combined.heading': 'Are You Eligible? Connect With Us',
  'combined.subline': 'Tell us your goal, share a few details, and pick a time for a personalised consultation — or reach us directly. We respond within 24 hours.',
  'combined.prefer': 'Prefer to talk now?',
  'combined.preferSub': 'Connect with a Songbird advisor directly.',

  // ── Google reviews ──
  'reviews.eyebrow': 'Reviews',
  'reviews.heading': 'Review on Google',
  'reviews.subline': 'We are proud to pronounce your compliments.',
  'reviews.soon': 'Client reviews coming soon.',

  // ── Final CTA ──
  'final.eyebrow': 'Take the First Step',
  'final.heading': 'Ready to Begin Your Journey?',
  'final.body': 'Connect with a Songbird advisor today and take the first step towards your global future — with complete confidence.',
  'final.whatsapp': 'WhatsApp Consultation',

  // ── Booking free consultation block ──
  'book.eyebrow': 'Free Consultation',

  // ── Forms ──
  'form.fullName': 'Full Name *',
  'form.phoneWhatsapp': 'Phone / WhatsApp *',
  'form.email': 'Email',
  'form.destinationPlaceholder': 'Destination of interest…',
  'form.briefMessage': 'Brief message',
  'form.name': 'Full Name',
  'form.phone': 'Phone / WhatsApp',
  'form.message': 'Message',
  'form.submit': 'Submit',

  // ── Footer ──
  'footer.stayInformed': 'Subscribe to our Newsletter',
  'footer.stayInformedSub': 'Our monthly newsletter with all the news and important updates, delivered to your inbox.',
  'footer.subscribed': 'Thank you — you’re subscribed.',
  'footer.emailPlaceholder': 'Your email address',
  'footer.brandLine': 'Dubai’s premier multi-service advisory firm — your gateway to global residency, done right.',
  'footer.ourServices': 'Our Services',
  'footer.quickLinks': 'Quick Links',
  'footer.contactUs': 'Contact Us',
  'footer.link.home': 'Home',
  'footer.link.about': 'About Us',
  'footer.link.eligibility': 'Free Eligibility Check',
  'footer.link.process': 'Our Process',
  'footer.link.testimonials': 'Testimonials',
  'footer.link.collaborations': 'Collaborations',
  'footer.link.insights': 'Insights',
  'footer.link.faq': 'FAQ',
  'footer.link.contact': 'Contact',
  'footer.link.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
  'footer.rights': 'All rights reserved. UAE Licensed.',

  // ── Contact ──
  'contact.hours': 'Opening Hours',
  'contact.followUs': 'Follow Us',
} as const

export type MessageKey = keyof typeof en
export default en
