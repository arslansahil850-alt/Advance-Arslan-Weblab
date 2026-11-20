# System Architecture

ARSLAN WEBLAB enforces a clean separation between a static-first React SPA frontend (deployed independently to **Vercel**) and a stateless, contact-only Express API service (deployed independently to **Render**).

## 1. Architectural Boundaries

| Concern | Owner | Notes |
| :--- | :--- | :--- |
| Routing & 6 Core Pages + 403/404/500 | Frontend (`src/app/router.tsx`) | Client-side React Router with Vercel SPA rewrite fallback |
| Theme Engine (`original`, `system`, `light`, `black`) | Frontend (`src/themes/`, `src/context/ThemeContext.tsx`) | Pre-paint inline script in `index.html` prevents FOUC |
| Bilingual EN / Urdu RTL Switching | Frontend (`src/i18n/`, `src/context/LanguageContext.tsx`) | Updates `document.documentElement.lang` & `dir` |
| Global Search (`Ctrl+K`) | Frontend (`src/services/searchEngine.ts`) | Instant in-memory search across verified data |
| Portfolio Data & Hubs | Frontend (`src/data/*.ts`, `inventory.json`) | Zero database; centralized TypeScript/JSON modules |
| Media Loading & Initial Loader | Frontend (`src/components/loaders/`) | Circular media loaders on images; branded `InitialLoader` |
| SEO & Structured Data | Frontend (`src/components/common/SEOHead.tsx`, `public/sitemap.xml`) | Dynamic title, description, canonical, OpenGraph, and JSON-LD |
| External Analytics (Opt-In) | Frontend (`src/services/analytics.ts`) | Plausible / Umami / GA4 only after user consent in Preferences |
| **Contact Form Submission & Delivery** | **Backend (`backend/src/`)** | **Exclusive backend responsibility: `POST /api/contact` and `GET /api/health`** |

## 2. Local Preview vs. Independent Production

- **AI Studio / Local Preview**: Root `server.ts` mounts `/api/health` and `/api/contact` directly from `backend/src/` alongside `vite.middlewares` on port `3000`.
- **Production Split**:
  - **Vercel** serves `dist/` (static Vite bundle) with `VITE_CONTACT_API_URL` pointing to the Render service origin.
  - **Render** builds and runs `backend/` (`npm ci && npm run build`, `npm start`) with `ALLOWED_ORIGINS` strictly restricted to the Vercel frontend origin.
