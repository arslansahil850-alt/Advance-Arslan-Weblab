# ARSLAN WEBLAB — Discovery, Inventory, Architecture & Implementation Plan

Independent, ground-up rebuild of **ARSLAN WEBLAB** featuring a Hybrid Premium Futuristic identity, four global themes (`Original`, `System`, `Light`, `Black`), full English + Urdu (`RTL`) localization, data-driven showcases sourced strictly from verified existing data, frontend global search, and a strictly isolated Contact-only backend for Render.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Approval Gate (Phases 1–3 Complete — Zero Code Written Yet)**
> No source files have been modified, and the existing live website (`arslan-weblab.netlify.app`), old GitHub repository (`arslansahil850-alt/Arslan-Weblab`), Basic Projects Hub, and Advanced Projects Hub remain completely untouched. Please review the discovered inventory, asset upload checklist, and architecture below before approving Phase 4–11 execution.

- **Missing Required Hero Asset**: The approved futuristic hero background image (dark black/navy/blue technology visual with central glowing gold geometric structure) is **not present** in the old repository, either project hub, or the current workspace. You must supply this file for `frontend/public/assets/images/hero/hero-background.webp` (or upload it here) before hero asset wiring.
- **Logo Verification**: An existing `logo.webp` (`492×507`, `30,382 bytes`, WebP with alpha) was found identically across the old website and both project hubs. Please confirm whether to reuse that exact `logo.webp` as the approved black-and-champagne-gold monogram emblem or upload a vector SVG / higher-resolution file.
- **Unverified / Absent Profile Data**: No formal education degrees, certifications, awards, client names, testimonials, or calendar years exist in the inspected sources. In strict compliance with your brief, none of these will be fabricated.
- **External Provider Selections Needed Before Phase 8/10**: Confirm your preferred new Vercel canonical domain (for SEO + strict backend CORS allowlist), Email API provider (recommended: **Resend** free tier) + optional SMTP fallback, free CAPTCHA provider (recommended: **Cloudflare Turnstile**), and external privacy-conscious analytics provider (recommended: **Vercel Web Analytics** or **Umami**).

---

## 1. Phase 1 & 2 — Discovery & Existing Project Data Inventory

All four reference sources returned HTTP `200` and were audited read-only.

### Confirmed Page List (Preserved 1:1 from Existing Site)

| # | Route (New SPA) | Old Source Path | Live Path Verified | Core Sections & Relationships |
|---|---|---|---|---|
| 1 | `/` | `index.html` | `/` | Cinematic Hero, Core Capabilities, About Preview, Skills & Tech Marquee, Services Preview, Featured Projects (3), Why Work With Me, Process, Values, GitHub Card, CTA, Contact Preview |
| 2 | `/projects` | `pages/projects.html` | `/pages/projects` | Category Filters, Complete Project Library (34 verified hub projects), Project Types Marquee, Dual Project Hub Showcases ("Explore My Project Universe"), CTA |
| 3 | `/services` | `pages/services.html` | `/pages/services` | 8 Services Editorial Showcase (expanded from 4 per spec §11), 4-Step Work Process (`#process`), CTA |
| 4 | `/about` | `pages/about.html` | `/pages/about` | Developer Story (`#developer`), Core Technologies (`#skills`), Journey & Growth Timeline (`#journey`), Long-Term Vision (`#testimonials` anchor — zero testimonials present) |
| 5 | `/case-studies` | `pages/case-studies.html` | `/pages/case-studies` | 3 Project Breakdowns (`Shopora`, `Weather`, `Todo`), 4-Step Approach, CTA |
| 6 | `/contact` | `pages/contact.html` | `/pages/contact` | Contact-only Render API Form, Direct Email (`arslansahil850@gmail.com`), WhatsApp (`+92 343 7773393`), Facebook, Process ("What Happens Next") |
| — | `/404`, `/403`, `/500` | *(New Error Views)* | — | Custom theme-aware, bilingual (`EN`/`UR` RTL), accessible error experiences with search & navigation recovery |

### Discovered Projects & Hubs Coverage

- **Basic Projects Hub (`https://myprojects-hub.netlify.app/`)**: **28 projects** (`HTML & CSS`: 6, `JavaScript`: 7, `Web Projects`: 15). Text-only cards; all 28 have verified live URLs and GitHub URLs.
- **Advanced Projects Hub (`https://projects-hub-snowy.vercel.app/`)**: **34 projects** (the same 28 frontend projects with refined naming plus **6 Backend Development Phase 1–6** projects), **32 verified `.webp` screenshots** (HTTP `200`), Three.js hero visual, and `Ctrl+K` global search.
- **Old Main Site (`pages/projects.html`)**: Listed 7 cards; 6 had `#` placeholder links on the old page (resolved via real live/GitHub URLs from the two hubs), and 1 item (`Expense Tracker`) appears only on `pages/projects.html` without a live/GitHub URL (will be flagged as incomplete/unlinked in the inventory unless you supply URLs).
- **Anomalies Flagged for Verification**:
  - `Stayora` and `SAAS Project` reuse `real-estate.webp` and `business-service.webp` respectively on the Advanced Hub.
  - `Backend Development - Phase 3` live URL on the Advanced Hub points to `https://backend-bhase-2.vercel.app/` (likely typo in the original hub data, kept verbatim until confirmed).
  - Old `index.html` Contact Preview heading reads *"Let's Start a Conservation"* (typo — will be corrected to *"Conversation"*).

### Verified Identity, Skills & Contact Channels

- **Brand / Owner**: `Arslan Sahil` / `ARSLAN WEBLAB` (`@arslansahil850-alt`)
- **Email**: `arslansahil850@gmail.com`
- **WhatsApp**: `+92 343 7773393` (`https://wa.me/923437773393`) / ID `ArslanSahil2011`
- **GitHub**: `https://github.com/arslansahil850-alt`
- **Facebook**: `https://www.facebook.com/share/18c4n4kW56/`
- **Verified Technologies**: `HTML5`, `CSS3`, `JavaScript`, `React`, `Node.js`, `Express.js`, `MongoDB`, `Python`, `C++`, `REST APIs / JSON`, `Git & GitHub`, `Responsive Design`, `UI/UX Design`.
- **Missing Socials**: LinkedIn, X/Twitter, Instagram, YouTube (none verified — omitted unless supplied).

---

## 2. User Experience & Visual Design System

### Aesthetic Direction: Hybrid Premium Futuristic
- **Visual Grammar**: Editorial luxury proportions combined with controlled futuristic depth—translucent glass surfaces, hairline metallic champagne-gold borders, subtle ambient gradients, selective 3D wireframe/glass accents, and high-contrast legibility. Zero pill-badge clutter on static metadata; metadata uses clean inline typographic separators (`·`, `/`).
- **Typography (`2+1` System + Urdu RTL)**:
  - *English Display*: `Outfit` (geometric architectural clarity, tight tracking, `text-wrap: balance`).
  - *English Body*: `Plus Jakarta Sans` (high legibility at `15px–16px`, `1.6` line-height).
  - *Technical/Numeric Accents*: `JetBrains Mono` (`tabular-nums` for indices and stats).
  - *Urdu (`RTL`)*: `Noto Nastaliq Urdu` / `Noto Sans Arabic` loaded conditionally on `[dir="rtl"]` with tuned line-height (`1.9–2.1`) so Urdu script never clips.
- **Four Complete Global Themes (CSS Custom Properties)**:
  1. `original` (Default): Deep navy/midnight blue canvas (`#060B16`), translucent dark glass surfaces, champagne/metallic gold accents (`#D4AF37` / `#E7C873`), high-contrast ivory text.
  2. `system`: Dynamically tracks `prefers-color-scheme` and reacts live to OS changes.
  3. `light`: Crisp architectural alabaster/ivory canvas (`#F8F9FC`), dark slate typography (`#0B1324`), refined antique gold accents (`#9A7214`) passing WCAG AA contrast.
  4. `black`: Pure obsidian canvas (`#050507`), hairline metallic gold/platinum borders, stark high-contrast typography.
- **Hero Image Treatment**: The exact supplied `hero-background.webp` is rendered identically in composition across all four themes, adapted via theme-scoped CSS `filter` (brightness/contrast/saturation) and multi-stop contrast scrim overlays.
- **Loading System Distinction**:
  - *Main Initial Website Loader*: Custom cinematic ARSLAN WEBLAB geometric emblem & gold-line reveal with smooth non-blocking exit (auto-failsafe timeout so visitors are never trapped; no fake percentages).
  - *Media Loaders (Circular Only)*: Every project thumbnail, logo, and media container uses a centered circular animated ring loader (theme-adaptive gold/slate) that disappears immediately upon `onLoad` or switches to a clean fallback on `onError`. Zero rectangular skeletons for media.
- **Global Search (`Ctrl+K` / `⌘K`) & Notifications**: Frontend-only instant search across pages, all 34 projects, 8 services, technologies, and FAQs with match highlighting, RTL support, and keyboard navigation; paired with accessible auto-dismissing Toast notifications.

---

## 3. Proposed Architecture & Responsibility Boundaries

```
┌────────────────────────────────────────────────────────────────────────────┐
│  VERCEL — STATIC / SPA FRONTEND (Independent Project)                      │
│                                                                            │
│  ┌──────────────────────┐   ┌───────────────────────────────────────────┐  │
│  │ Theme & i18n Engine  │   │ Centralized Data Layer (No DB)            │  │
│  │ • Original/System/   │   │ • src/data/imported/inventory.json        │  │
│  │   Light/Black tokens │   │ • projects.ts (34 verified + hubs)        │  │
│  │ • EN (LTR) / UR (RTL)│   │ • services.ts (8), skills.ts, faqs.ts     │  │
│  └──────────┬───────────┘   └─────────────────────┬─────────────────────┘  │
│             ▼                                     ▼                        │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Pages & Interactive Features (100% Client-Side)                      │  │
│  │ • 6 Preserved Routes + 404/403/500 Error Pages                       │  │
│  │ • Global Search Index (Pages, Projects, Services, Tech, FAQs)        │  │
│  │ • Toast Notifications, Circular Media Loaders, Preferences Panel     │  │
│  │ • External Privacy-Conscious Analytics (Consent-aware)               │  │
│  └──────────────────────────────────┬───────────────────────────────────┘  │
└─────────────────────────────────────┼──────────────────────────────────────┘
                                      │ HTTPS POST (Strict CORS + Turnstile)
                                      │ *CONTACT SUBMISSIONS ONLY*
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│  RENDER — CONTACT-ONLY NODE/EXPRESS BACKEND (Always-On Service)            │
│                                                                            │
│  ┌─────────────────┐   ┌───────────────────────┐   ┌────────────────────┐  │
│  │ Security Layer  │──▶│ Validation & Sanitize │──▶│ Dual Email Delivery│  │
│  │ • Helmet/CORS   │   │ • Honeypot + Turnstile│   │ 1. Primary API     │  │
│  │ • Rate Limiter  │   │ • Duplicate hash guard│   │    (Resend)        │  │
│  │ • 16KB Cap      │   │ • Header-inj. strip   │   │ 2. SMTP Fallback   │  │
│  └─────────────────┘   └───────────────────────┘   │    (Nodemailer)    │  │
│  • GET /api/health (Uptime monitoring only)        └────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

### Target Project Structure Overview
- **Workspace / Repo Layout (`Arslan-Weblab-New`)**:
  - `frontend/` (or workspace root adapted cleanly for Vercel + AI Studio preview):
    - `public/assets/{images/{brand,hero,projects,technologies,illustrations,backgrounds},icons,logos}` + `robots.txt` + `sitemap.xml`
    - `src/{app,pages,layouts,sections,components,data/imported,config,i18n/{en,ur},themes,hooks,context,services,utils,styles}`
    - `tests/{unit,integration,accessibility,e2e}`
  - `backend/` (standalone Render service, **Contact + Health endpoints ONLY**):
    - `src/{config,routes,controllers,services/email,middleware,validators,utils,server.js}`
    - `tests/{unit,integration,security}`
  - `docs/` (13 standalone Markdown documents: `architecture.md`, `folder-structure.md`, `existing-project-data-inventory.md`, `asset-inventory.md`, `asset-naming-guide.md`, `installation.md`, `development.md`, `deployment.md`, `contact-api.md`, `security.md`, `testing.md`, `monitoring.md`, `troubleshooting.md`).
- **AI Studio Preview vs. Production Split**: During build & verification inside AI Studio (which runs a single port-`3000` preview server), `server.ts` can mount the contact-only API routes alongside Vite dev middleware for end-to-end contact testing, while `backend/` remains cleanly isolated as a standalone deployable package for Render with zero non-contact routes.

---

## 4. Exact Asset Naming & Upload Guide (Phase 4 Checklist)

All filenames use lowercase, hyphen-separated names inside `frontend/public/assets/` (or `public/assets/` in the root Vite build). **Do not rename files silently or use spaces.**

### Required Assets Checklist

| # | Exact Filename | Exact Folder Path | Purpose | Format & Dimensions | Theme Variants | Status |
|---|---|---|---|---|---|---|
| 1 | `brand-monogram.webp` | `public/assets/images/brand/` | Approved black & champagne-gold monogram logo in navbar, loader, footer | WebP (transparent) or SVG, `≥ 512×512` (`1:1`) | Single asset (CSS/container adapts) | **Exists** in old repo (`logo.webp`, `492×507`) — confirm reuse or upload SVG |
| 2 | `hero-background.webp` | `public/assets/images/hero/` | Full-bleed futuristic glowing gold geometry hero background | WebP, `1920×1080` (`16:9`), `< 350 KB` | Single asset across all 4 themes via CSS filters/overlays | **MISSING — User Upload Required** |
| 3 | `favicon.ico` | `public/` | Browser tab icon | ICO (`16×16, 32×32, 48×48`) | Single | Derived from approved logo (needs confirmation/supply) |
| 4 | `favicon-32.png` | `public/assets/icons/` | Modern PNG favicon | PNG, `32×32` | Single | Derived from approved logo |
| 5 | `apple-touch-icon.png` | `public/assets/icons/` | iOS bookmark icon (not PWA) | PNG, `180×180` | Single | Derived from approved logo |
| 6 | `og-cover.webp` | `public/assets/images/brand/` | Open Graph & social link preview card | WebP, `1200×630` (`1.91:1`) | Single | **User Upload or Compose from Brand/Hero** |

### Project Screenshots Checklist (Migrated from Advanced Hub — 32 Existing `.webp` Files)

All 32 verified `.webp` files from `projects-hub-snowy.vercel.app/assets/` can be mirrored locally into `public/assets/images/projects/` using standardized `project-[unique-id]-cover.webp` filenames:

- `project-website-design-1-cover.webp`, `project-blogo-static-page-cover.webp`, `project-blogo-static-page-2-cover.webp`, `project-foodie-static-page-cover.webp`, `project-dashboard-static-page-cover.webp`, `project-shopora-static-page-cover.webp`, `project-modern-todo-cover.webp`, `project-calculator-app-cover.webp`, `project-todo-app-cover.webp`, `project-password-generator-cover.webp`, `project-quiz-app-cover.webp`, `project-stopwatch-app-cover.webp`, `project-weather-app-cover.webp`, `project-my-portfolio-cover.webp`, `project-shopping-website-cover.webp`, `project-real-estate-website-cover.webp`, `project-learn-com-cover.webp`, `project-nexora-cover.webp`, `project-business-service-website-cover.webp`, `project-gym-fitness-website-cover.webp`, `project-classic-food-web-cover.webp`, `project-digital-agency-cover.webp`, `project-dental-website-cover.webp`, `project-foodie-com-cover.webp`, `project-web-loaders-cover.webp`, `project-navbar-collections-cover.webp`, `project-backend-phase-1-cover.webp` through `project-backend-phase-6-cover.webp`.
- **Optional User Uploads (Currently Reused or Missing)**:
  - `project-stayora-cover.webp` (`16:10` WebP) — currently reuses `real-estate.webp` on the hub.
  - `project-saas-project-cover.webp` (`16:10` WebP) — currently reuses `business-service.webp` on the hub.
  - `project-expense-tracker-cover.webp` (`16:10` WebP) — only listed on old `pages/projects.html` with no image/URL.

### Optional Media & Icons

| Exact Filename | Exact Folder Path | Purpose | Notes |
|---|---|---|---|
| `brand-logo-svg.svg` | `public/assets/images/brand/` | Crisp vector monogram if you have original SVG source | Optional if `brand-monogram.webp` is used |
| `technology-[name].svg` | `public/assets/images/technologies/` | Individual tech icons (`html5`, `css3`, `javascript`, `react`, `nodejs`, `express`, `mongodb`, `python`, `cpp`, `git`) | Can use crisp inline/local SVG icons; no duplicate theme copies needed |
| `hero-background.mp4` / `.webm` | `public/assets/videos/hero/` | Optional subtle looping motion backdrop | **Not recommended** unless you specifically want to upload one; the supplied `hero-background.webp` + subtle Three.js/CSS lighting keeps load fast |

---

## 5. Hosting, Security & Cost Considerations

### Render Contact-Only Backend (24/7 Availability)
- **Render Free Web Service Limitation**: Render's Free tier **spins down after 15 minutes of inactivity**, causing **30–60+ second cold starts** on the next contact form submission (which can cause frontend fetch timeouts or poor UX).
- **Recommended Always-On Plan**: **Render Starter Instance ($7/month)** keeps the Node/Express contact service running 24/7 independently of your PC, VS Code, or home internet, with zero idle spin-down.
- **Uptime Disclaimer**: Neither Render nor Vercel provides an unconditional 100% uptime guarantee on standard plans; actual availability depends on Render/Vercel infrastructure SLAs (we will pair `GET /api/health` with a free external uptime monitor such as **UptimeRobot** or **Better Stack** free tier for outage alerts).

### Free-First Contact Security & Email Delivery Limits
- **Protections Implemented & Tested**: Strict server-side schema validation (`zod`), input normalization/XSS HTML-escaping, email header injection (`\r`/`\n`) rejection, honeypot trap, duplicate-submission window throttling, IP rate limiting (`express-rate-limit`), Cloudflare Turnstile verification, strict CORS allowlist (new Vercel domain only), Helmet security headers, `16 KB` JSON body cap, and sanitized structured logs (never logging message bodies or PII).
- **Free Tier Trade-Offs**: In-memory rate limiting resets on container restart (acceptable for a single-instance contact endpoint without a database); Cloudflare Turnstile free tier has generous quotas; **Resend** free tier allows 3,000 emails/month (100/day) and requires domain DNS verification (or sending to your verified account email `arslansahil850@gmail.com`); **SMTP fallback** via Nodemailer (e.g., Gmail App Password or Brevo SMTP) activates only when its Render environment variables are configured.

---

## 6. Phased Implementation Plan (Post-Approval)

1. **Phase 2–4 Artifacts & Asset Ingestion**: Write `docs/existing-project-data-inventory.md`, `src/data/imported/inventory.json`, `docs/asset-inventory.md`, and `docs/asset-naming-guide.md`; verify and place `hero-background.webp`, approved brand monogram, and mirrored project `.webp` thumbnails.
2. **Phase 5 Design System & Core Engines**: Implement CSS variable tokens for `original`, `system`, `light`, and `black` themes, `EN`/`UR` (`RTL`) i18n dictionary + switcher, cinematic initial loader, circular media loader component, preferences panel, and toast notification system.
3. **Phase 6 Frontend Pages & Interactive Modules**: Build the 6 preserved routes (`/`, `/projects`, `/services` with all 8 editorial services, `/about`, `/case-studies`, `/contact`) + `/404`, `/403`, `/500`, `Explore My Project Universe` dual hub showcase, skills/project marquees (`prefers-reduced-motion` aware), and `Ctrl+K` frontend Global Search.
4. **Phase 7 Contact-Only Backend (`backend/`)**: Build, harden, and isolate the Express contact service (`POST /api/contact`, `GET /api/health`) with dual email delivery (Resend API + Nodemailer SMTP fallback) and zero non-contact routes.
5. **Phase 8–9 Integrations, SEO & Testing**: Configure dynamic bilingual SEO (`sitemap.xml`, `robots.txt`, JSON-LD without fabricated claims), consent-aware external analytics, and execute unit, integration, security, accessibility, responsive, and production build tests.
6. **Phase 10–11 Documentation & Deployment Handover**: Complete all 13 `docs/*.md` files with step-by-step Vercel + Render deployment and rollback guides without touching the old Netlify site or GitHub repository.
