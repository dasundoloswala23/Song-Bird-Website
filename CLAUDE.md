# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm i

# Development server
npm run dev

# Production build (static export to out/)
npm run build
```

No test runner is configured.

## Architecture

**Next.js 14 App Router + TypeScript** — a luxury Dubai-themed immigration/residency advisory website for Songbird Consulting. Content is stored in **Firebase Firestore** and fetched at build time (static export). An admin panel manages all CMS content.

### Routing

- `app/(public)/` — public-facing pages (home, contact, services, service detail)
- `app/admin/` — protected admin panel (login, services CRUD, leads, stats, testimonials, etc.)
- `app/layout.tsx` — root layout: fonts (Cormorant Garamond + Jost via `next/font/google`), global styles, `DirectionProvider`
- `app/(public)/layout.tsx` — public layout: `TopUtilityBar`, `Header`, `Footer`, `WhatsAppButton`, `ExitIntentModal`, `ConsultationModal`, `ConsultationModalProvider`

### Data Flow

All dynamic content lives in Firestore. Public pages are **async Server Components** with `export const dynamic = 'force-static'`, fetching from Firestore at build time via functions in `src/lib/firestorePublic.ts`. The admin panel writes back to Firestore via `src/lib/firestore.ts` (uses Firebase Admin SDK server-side).

Service detail pages at `/services/[slug]` use `generateStaticParams()` + `generateMetadata()`.

### CMS Content in Firestore

Collections and their TypeScript types (defined in `src/types/firestore.ts`):

- **services** — `ServiceDoc`: slug, layout (`'full'|'minimal'`), hero, stat strip, overview, key benefits, procedure, FAQs, etc.
- **leads** — `LeadDoc`: name, email, phone, destination, type (`'inquiry'|'consultation'`), createdAt
- **whyChooseUs** — `WhyChooseUsDoc`: eyebrow, title, intro, image, features[]
- **stats** — `StatsDoc`: applications, successRate, destinations, serviceLines (each with value/label)
- **processSection** — `ProcessSectionDoc`: title, steps[]
- **testimonials** — `TestimonialsSectionDoc`: items[]
- **users** — `UserDoc`: uid, email, role (`'admin'|'editor'`), active

### Key Source Directories

- `src/components/` — all custom brand components (Hero, Header, Footer, ServicesBand, Testimonials, ConsultationModal, etc.)
- `src/components/admin/` — admin-only components (AdminSidebar, ServiceForm, ImageUpload, RepeatableList)
- `src/components/services/` — service detail layout variants (`FullServiceDetail`, `MinimalServiceDetail`)
- `src/app/components/ui/` — shadcn/ui primitives (Radix UI-backed; excluded from strict TS checking)
- `src/app/components/figma/ImageWithFallback.tsx` — image component with Figma-path fallback
- `src/context/` — `ConsultationModalContext` (modal open/close state) and `DirectionContext` (LTR/RTL for i18n)
- `src/lib/` — `firebase.ts` (client init), `firestore.ts` (admin writes), `firestorePublic.ts` (public reads), `adminAuth.ts`, `constants.ts`, `utils.ts` (`cn`, `buildWhatsAppUrl`)

### Styling System

Tailwind CSS v4 via PostCSS (`@tailwindcss/postcss`). CSS entry: `src/styles/index.css` → `tailwind.css` → `theme.css` → `globals.css`.

Custom color palette (CSS variables in `src/styles/theme.css`):

| Token | Hex | Usage |
| --- | --- | --- |
| `--navy` | `#0B1B38` | Primary dark |
| `--gold` | `#C8911E` | Primary accent |
| `--gold-brushed` | `#C6A35A` | Subtle gold accents |
| `--cream` | `#FAF5EC` | Page background |
| `--ink` | `#1B2A44` | Dark body text |
| `--slate` | `#5A6675` | Muted text |
| `--whatsapp` | `#25D366` | WhatsApp button |
| `--teal` / `--teal-end` | `#1A6B7E` / `#3FB68A` | Gradient accent |

`@/*` path alias maps to `src/`.

### Key Dependencies

- `next` v14 — framework (static export mode: `output: 'export'` in `next.config.mjs`)
- `firebase` + `firebase-admin` — Firestore CMS and Auth
- `react-hook-form` + `zod` — form validation
- `@radix-ui/*` — headless primitives (powers shadcn/ui)
- `lucide-react` — icons
- `motion` — animations
- `embla-carousel-react` — testimonials carousel
- `nodemailer` — contact form email sending
