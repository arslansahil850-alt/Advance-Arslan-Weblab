# ARSLAN WEBLAB

Independent web development portfolio and project showcase built for **Arslan Sahil (`ARSLAN WEBLAB`)**.

This codebase is completely separate from the legacy deployments:
- Old Website (untouched): `https://arslan-weblab.netlify.app/`
- Old GitHub Repository (untouched): `https://github.com/arslansahil850-alt/Arslan-Weblab`
- Basic Projects Hub (untouched external link): `https://myprojects-hub.netlify.app/` (28 projects)
- Advanced Projects Hub (untouched external link): `https://projects-hub-snowy.vercel.app/` (34 projects)

## Key Capabilities

- **Preserved 6-Page Portfolio Architecture**: `/` (Home), `/projects`, `/services`, `/about`, `/case-studies`, `/contact`, plus dedicated `403`, `404`, and `500` error views.
- **4 Global Themes**: `original` (deep navy & champagne gold, default), `system`, `light`, and `black` driven by CSS variables with zero-flash initial hydration.
- **Bilingual Support**: English (`LTR`) and Urdu (`RTL` with Noto Sans Arabic / Noto Nastaliq Urdu typography) via centralized translation dictionaries in `src/i18n/`.
- **Centralized Verified Data**: All 34 verified hub projects, 8 web development services, 3 case studies, skills, FAQs, and verified contact/social links live in `src/data/`.
- **Frontend Global Search (`Ctrl+K` / `Cmd+K`)**: Pure client-side instant search across pages, projects, services, technologies, and FAQs.
- **Contact-Only Backend (`backend/`)**: Isolated Express + TypeScript service for Render handling `POST /api/contact` and `GET /api/health` only, with Zod validation, header-injection checks, HTML escaping, honeypot, Cloudflare Turnstile verification, rate limiting, duplicate throttling, strict CORS, and dual email delivery (Resend API + Nodemailer SMTP fallback).
- **No Database & No PWA**: Zero database dependencies and zero service-worker/PWA footprint.

## Missing / User-Supplied Asset Notice

- **Required upload**: `public/assets/images/hero/hero-background.webp` (not present in legacy sources; the hero renders a styled atmospheric/3D fallback until uploaded).

## Quick Start

```bash
npm install
npm run dev
```

See [docs/installation.md](docs/installation.md), [docs/deployment.md](docs/deployment.md), and [docs/asset-naming-guide.md](docs/asset-naming-guide.md) for full details.
