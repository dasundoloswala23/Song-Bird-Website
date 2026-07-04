import type { FaqPageDoc } from '@/types/firestore'

/**
 * Starter FAQ content — drafted AEO-style: the first sentence answers the
 * question completely and self-contained (no "it depends" preamble), so Google
 * AI Overviews and answer engines can quote it directly. Fully editable in the
 * admin panel (siteContent/faq). Facts are kept to stable, widely-published
 * generalities; anything client-specific defers to a consultation.
 *
 * Lives in a plain (non-client) module so Server Components can read its
 * properties at build time — a `'use client'` module only lets you pass the
 * imported name through, not dot into it.
 */
export const DEFAULT_FAQ_PAGE: FaqPageDoc = {
  groups: [
    {
      category: 'UAE Golden Visa & Residency',
      items: [
        {
          question: 'What is the UAE Golden Visa?',
          answer:
            'The UAE Golden Visa is a long-term residence permit that grants 5 or 10 years of renewable residency without the need for a local sponsor. It lets holders live, work, and study in the UAE, sponsor family members, and stay outside the country for extended periods without losing residency. Songbird handles eligibility assessment, document preparation, and submission end to end.',
        },
        {
          question: 'Who is eligible for the UAE Golden Visa?',
          answer:
            'Property investors, entrepreneurs, skilled professionals, scientists, outstanding students, and specialised talents are all eligible for the UAE Golden Visa. The most common route is real-estate investment of at least AED 2 million, but salary-based, business-ownership, and talent categories also qualify. Songbird reviews your profile against every category to find the strongest route.',
        },
        {
          question: 'How much does the UAE Golden Visa cost?',
          answer:
            'Government fees for the UAE Golden Visa typically range from roughly AED 3,000 to AED 5,000 depending on the category and whether you apply from inside or outside the UAE. Investment routes carry a separate qualifying threshold (e.g. AED 2 million in property). Book a consultation for an exact, itemised quote based on your route.',
        },
        {
          question: 'Can I sponsor my family on a UAE Golden Visa?',
          answer:
            'Yes — Golden Visa holders can sponsor their spouse, children, and (in many cases) parents and domestic staff for the full duration of the visa. Dependants receive residency linked to the primary holder without the usual salary or age restrictions. Songbird prepares family applications alongside the main file.',
        },
      ],
    },
    {
      category: 'Eligibility & Assessment',
      items: [
        {
          question: 'How do I know which visa or country is right for me?',
          answer:
            'The right pathway depends on your goal (residency, work, study, investment, or citizenship), your budget, and your qualifications and family situation. Songbird begins every engagement with a personalised eligibility assessment that maps your profile against UAE, UK, Canada, Australia, EU, and US routes. This gives you a ranked shortlist before you commit to any application.',
        },
        {
          question: 'Is the initial consultation free?',
          answer:
            'Yes — Songbird offers a complimentary initial consultation to assess your eligibility and outline your options. You can book it online or over WhatsApp, and there is no obligation to proceed. Paid, in-depth advisory begins only once you choose a specific pathway.',
        },
        {
          question: 'Do I need a job offer to migrate?',
          answer:
            'No — many pathways do not require a job offer, including investor visas, the UAE Golden Visa, self-employed and entrepreneur routes, and points-based skilled programs like Canada Express Entry. A job offer helps in some streams but is only one of several qualifying routes. Songbird identifies which options fit you without an offer in hand.',
        },
      ],
    },
    {
      category: 'Costs & Timelines',
      items: [
        {
          question: 'How long does the immigration process take?',
          answer:
            'Processing times range from a few weeks for UAE residency to several months for skilled-migration and permanent-residency programs abroad. UAE Golden Visas are often issued within 2–4 weeks once documents are ready, while Canada or Australia PR can take 6–12 months. Songbird gives you a realistic timeline for your specific route at the assessment stage.',
        },
        {
          question: 'What documents do I need to get started?',
          answer:
            'A valid passport, recent photographs, and proof of your qualifying category (such as property title, employment records, or academic certificates) are the core documents to begin. Requirements vary by pathway, so Songbird provides a tailored checklist after your eligibility assessment. We also review and attest documents so applications are not delayed.',
        },
        {
          question: 'What happens if my visa application is refused?',
          answer:
            'A refusal is not the end — most cases can be appealed, re-submitted with stronger evidence, or redirected to an alternative pathway. Songbird analyses the refusal reason, corrects the underlying issue, and advises on the best next step, whether that is an appeal or a fresh application. Our process is built to minimise rejection risk from the outset.',
        },
      ],
    },
    {
      category: 'Destinations & Pathways',
      items: [
        {
          question: 'Which countries does Songbird help clients move to?',
          answer:
            'Songbird supports immigration and residency to the UAE, United Kingdom, Canada, Australia, Europe, and the United States. We cover residency by investment, skilled-worker and business routes, student visas, and family sponsorship across these destinations. Our UAE base gives us particular depth on Golden Visa and Gulf relocation.',
        },
        {
          question: 'Can I get residency through investment?',
          answer:
            'Yes — residency by investment is available in the UAE, several EU countries, and beyond, typically through real estate, business, or a qualifying fund. Investment thresholds and benefits vary widely by country, so choosing the right program is critical. Songbird compares the options against your budget and mobility goals.',
        },
        {
          question: 'Does the UAE offer citizenship?',
          answer:
            'The UAE offers long-term residency (including the 10-year Golden Visa) rather than a general path to citizenship, though citizenship is granted by nomination in exceptional cases. For clients seeking a second passport, Songbird also advises on citizenship-by-investment programs in other jurisdictions. We help you weigh residency versus citizenship based on your objectives.',
        },
      ],
    },
    {
      category: 'Working with Songbird',
      items: [
        {
          question: 'Is Songbird a licensed immigration consultancy?',
          answer:
            'Yes — Songbird is a UAE-licensed immigration and multi-service advisory firm with offices in Ajman, Sharjah, and Fujairah, plus international desks in Colombo and Mumbai. Our advisors manage the full process from eligibility to approval. Being locally licensed means your case is handled in compliance with UAE regulations.',
        },
        {
          question: 'How do I get started with Songbird?',
          answer:
            'Book a free consultation through the website or message us on WhatsApp to begin your eligibility assessment. An advisor reviews your goals, recommends the strongest pathway, and outlines the documents, costs, and timeline involved. From there, Songbird manages the application end to end.',
        },
        {
          question: 'What services does Songbird offer beyond visas?',
          answer:
            'Beyond immigration, Songbird provides business setup, patent and IP advisory, maritime and HR advisory, and concierge services for individuals and families relocating to the UAE. This means one firm can coordinate your residency, company formation, and settling-in support together. We call it an integrated, 360-degree approach to global mobility.',
        },
      ],
    },
  ],
}
