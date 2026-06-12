# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm i

# Development server
npm run dev

# Lint
npm run lint

# Production build (static export to out/)
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy Firestore security rules
firebase deploy --only firestore

# Deploy Storage rules
firebase deploy --only storage

# Seed Firestore with initial data (run once to bootstrap)
node scripts/seed.mjs
```

No test runner is configured.

## Environment Variables

Required in `.env.local`:

| Variable | Notes |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_*` | 7 Firebase Client SDK config vars |
| `FIREBASE_ADMIN_CREDENTIALS` | Service account JSON as a single line (server-only) |
| `ADMIN_SESSION_SECRET` | JWT signing secret for admin sessions |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Nodemailer email delivery |
| `CONTACT_EMAIL` | Admin email for leads (also falls back to `constants.ts`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp link number (also falls back to `constants.ts`) |

## Architecture

**Next.js 14 App Router + TypeScript** — a luxury Dubai-themed immigration/residency advisory website for Songbird Consulting. Content is stored in **Firebase Firestore** and fetched at build time (static export). An admin panel manages all CMS content.

### Routing

- `app/(public)/` — public-facing pages (home, contact, services, service detail)
- `app/admin/` — protected admin panel (login, services CRUD, leads, stats, testimonials, etc.)
- `app/layout.tsx` — root layout: fonts (Cormorant Garamond + Jost via `next/font/google`), global styles, `DirectionProvider`
- `app/(public)/layout.tsx` — public layout: `TopUtilityBar`, `Header`, `Footer`, `WhatsAppButton`, `ExitIntentModal`, `ConsultationModal`, `ConsultationModalProvider`

There are no `middleware.ts` or `app/api/` route handlers — this is a fully static export.

### Data Flow

All dynamic content lives in Firestore. Public pages are **async Server Components** with `export const dynamic = 'force-static'`, fetching from Firestore at build time. Service detail pages at `/services/[slug]` use `generateStaticParams()` + `generateMetadata()`.

After adding or editing content in the admin panel, run `npm run build && firebase deploy --only hosting` to publish changes to the static site.

### Dual Firestore Module Pattern

There are two Firestore modules — choosing the wrong one is a common mistake:

| | `src/lib/firestore.ts` | `src/lib/firestorePublic.ts` |
| --- | --- | --- |
| SDK | Firebase **Admin** | Firebase **Client** |
| Runs on | Server only | Server + Client |
| Security rules | Bypassed | Enforced |
| Writes | No (read-only) | Yes (full CRUD) |
| Used by | `app/admin/page.tsx` (counts) | Admin panel CRUD, contact form, client components |

**Rule of thumb:** Use `firestorePublic.ts` for everything. `firestore.ts` (Admin SDK) is only needed in Server Components that must bypass security rules.

`src/lib/firebaseAdmin.ts` exposes lazy-loaded Admin SDK proxies (`adminAuth`, `adminDb`, `adminStorage`) to prevent initialization at build time.

### Admin Auth Flow

Admin sessions use **JWT cookies**, not Firebase Auth client sessions:

- Login writes an `sb_session` cookie (7-day expiry) signed with `ADMIN_SESSION_SECRET`
- `src/lib/session.ts` — `signSession()` / `verifySession()` via `jose`; exports `SESSION_COOKIE` and `EXPIRES_IN`
- `src/lib/adminAuth.ts` — `requireAdmin()` validates the cookie and returns `{ uid, email, role }`; `adminError()` formats error responses
- Admin CRUD endpoints call `requireAdmin()` to gate access

### Static Services vs Firestore Services

`src/lib/services.ts` — a **static hardcoded array** used for footer links and other UI that needs the service list without a Firestore fetch. It is NOT the source of truth for service content.

`Firestore > services collection` — the authoritative CMS data for all service detail pages, edited via the admin panel. The `ServiceDoc` type (in `src/types/firestore.ts`) is the real schema.

When adding a new service, add it to **both** `src/lib/services.ts` (for navigation/footer) and create it in Firestore via the admin panel.

### Service Detail Layout Variants

Each `ServiceDoc` has a `layout: 'full' | 'minimal'` field that determines which component renders:

- **`FullServiceDetail`** — hero image, stat strip, overview prose, key benefits, procedure steps, who-is-this-for, FAQs accordion
- **`MinimalServiceDetail`** — two-column layout: what-we-provide (left) + requirements (right), with hero image in a bordered container

### Client-Hydration Pattern

Static-export public pages pass Firestore data as a `fallback` prop to client components that then re-fetch on mount for freshness:

```tsx
// Server Component (build time)
const services = await getPublishedServices()
return <ServicesBandClient fallback={services} />

// Client Component
const [services, setServices] = useState(fallback)
useEffect(() => { getPublishedServices().then(setServices) }, [])
```

This pattern is used by `ServicesBandClient` and `ServicesGrid`. It avoids a loading flash while keeping data fresh.

### i18n / Localization

`src/i18n/` implements a lightweight multilingual system:

- **Supported locales**: `en`, `hi`, `fr`, `ru`, `ta`, `si`, `tl` (English, Hindi, French, Russian, Tamil, Sinhala, Tagalog)
- **Messages**: `src/i18n/messages/[locale].ts` — one file per language; missing keys fall back to English, then the key itself
- **API**: `src/i18n/index.ts` exports `translate()`, `LOCALES`, `DEFAULT_LOCALE` (`'en'`)
- **Context**: `src/context/LanguageContext.tsx` provides `useT()` hook returning `{ locale, setLocale, t(key) }`; selected locale persists to `localStorage` key `'songbird.locale'` and updates the HTML `lang` attribute

### CMS Collections in Firestore

All types defined in `src/types/firestore.ts`:

- **services** — `ServiceDoc`: slug, layout, published, order, hero, stat strip, overview, key benefits, procedure, FAQs, etc.
- **siteContent/whyChooseUs** — `WhyChooseUsDoc`: eyebrow, title, intro, image, badge, features[]
- **siteContent/processSection** — `ProcessSectionDoc`: title, steps[]
- **siteContent/testimonials** — `TestimonialsSectionDoc`: items[]
- **siteStats/home** — `StatsDoc`: applications, successRate, destinations, serviceLines
- **leads** — `LeadDoc`: name, email, phone, destination, type (`'inquiry'|'consultation'`), createdAt
- **users** — `UserDoc`: uid, email, role (`'admin'|'editor'`), active

### Styling System

Tailwind CSS v4 via PostCSS (`@tailwindcss/postcss`). CSS entry: `src/styles/index.css` → `tailwind.css` → `theme.css` → `globals.css`.

Custom color palette (CSS variables in `src/styles/theme.css`):

| Token | Hex | Usage |
| --- | --- | --- |
| `--navy` | `#06241B` | Primary dark (deep emerald) |
| `--navy-deep` | `#04261C` | Darker dark surface |
| `--navy-card` | `#0A2E1F` | Card backgrounds in admin/dark sections |
| `--emerald` | `#0E7C5A` | Active/hover states |
| `--teal` | `#009688` | Gradient start, accent |
| `--teal-end` | `#5EEA8A` | Gradient end, mint |
| `--gold` | `#C8911E` | Primary luxury accent |
| `--gold-brushed` | `#C6A35A` | Subtle gold |
| `--cream` | `#F3FAF4` | Page background (green-tinted) |
| `--ink` | `#0F2A20` | Dark body text |
| `--slate` | `#4A6B5E` | Muted text |
| `--brand-gradient` | `135deg, #009688→#3FB68A→#5EEA8A` | Hero, primary CTA buttons |

`@/*` path alias maps to `src/`. Hardcoded hex values in components must use the tokens above — check `theme.css` before adding any new color.

### Key Source Directories

- `src/components/` — brand components (Hero, Header, Footer, ServicesBand, Testimonials, ConsultationModal, etc.)
- `src/components/admin/` — admin-only components (AdminSidebar, ServiceForm, ImageUpload, RepeatableList)
- `src/components/services/` — `FullServiceDetail`, `MinimalServiceDetail`, `ServiceDetailClient`
- `src/app/components/ui/` — shadcn/ui primitives (Radix UI-backed; excluded from strict TS checking)
- `src/context/` — `ConsultationModalContext`, `DirectionContext` (LTR/RTL), `LanguageContext` (i18n)
- `src/lib/` — Firebase init, Firestore modules, `session.ts`, `adminAuth.ts`, `motionVariants.ts`, `constants.ts`, `utils.ts` (`cn`, `buildWhatsAppUrl`)
- `src/i18n/` — locale messages and `translate()` helper

### Key Dependencies

- `next` v14 — framework (`output: 'export'` in `next.config.mjs`, `trailingSlash: true`)
- `firebase` + `firebase-admin` — Firestore CMS and Auth
- `jose` — JWT signing/verification for admin sessions
- `react-hook-form` + `zod` — form validation
- `@radix-ui/*` — headless primitives (powers shadcn/ui)
- `lucide-react` — icons
- `motion` — animations (`src/lib/motionVariants.ts` has shared presets: `fadeUp`, `fadeIn`, `staggerContainer`, `slideInLeft`, `scaleIn`)
- `embla-carousel-react` — testimonials/hero carousel
- `nodemailer` — contact form email
