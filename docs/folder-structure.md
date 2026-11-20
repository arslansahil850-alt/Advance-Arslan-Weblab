# Folder Structure

The workspace contains the Vite + React + TypeScript frontend at the root (`src/`, `public/`, `index.html`, `vercel.json`), a unified local preview runner (`server.ts`), and the standalone Render contact-only backend in `backend/`.

```text
/
├── backend/                          # Independent Render service (Contact + Health only)
│   ├── src/
│   │   ├── config/
│   │   │   ├── cors.ts               # Strict origin allowlist middleware
│   │   │   └── environment.ts        # Environment loader & defaults
│   │   ├── controllers/
│   │   │   ├── contact.controller.ts # Validation, Turnstile, honeypot, duplicate guard, email dispatch
│   │   │   └── health.controller.ts  # Minimal /api/health endpoint
│   │   ├── middleware/
│   │   │   ├── error-handler.ts      # Safe JSON error responses (no stack leaks)
│   │   │   ├── rate-limit.ts         # IP-based contact throttling
│   │   │   └── security.ts           # Helmet security headers
│   │   ├── routes/
│   │   │   ├── contact.routes.ts     # POST /api/contact
│   │   │   └── health.routes.ts      # GET /api/health
│   │   ├── services/
│   │   │   └── email/
│   │   │       ├── api.provider.ts   # Resend HTTPS API provider
│   │   │       ├── smtp.provider.ts  # Nodemailer SMTP fallback provider
│   │   │       └── email.service.ts  # Primary + automatic fallback orchestration
│   │   ├── validators/
│   │   │   └── contact.validator.ts  # Zod schema, header-injection guard, HTML escaper
│   │   ├── app.ts                    # Isolated Express application factory
│   │   └── server.ts                 # Standalone Render entry point
│   ├── tests/
│   │   └── contact-security.test.ts  # Security, validation, CORS, and email fallback tests
│   ├── .env.example
│   ├── package.json
│   ├── render.yaml
│   └── tsconfig.json
├── docs/                             # Project, architecture, asset, API & deployment documentation
├── public/
│   ├── assets/
│   │   └── images/
│   │       ├── brand/
│   │       │   └── brand-monogram.webp
│   │       ├── hero/                 # Upload hero-background.webp here
│   │       └── projects/             # 32 verified project-*.webp covers
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── providers.tsx             # Theme, Language, Preferences, Toast & Search providers
│   │   └── router.tsx                # 6 core routes + /403, /500, and * (404)
│   ├── components/
│   │   ├── 3d/HeroGeometry.tsx       # Three.js wireframe accent with WebGL fallback
│   │   ├── cards/ProjectCard.tsx
│   │   ├── common/                   # ErrorBoundary, ScrollControls, SEOHead
│   │   ├── loaders/                  # CircularMediaLoader, InitialLoader, MediaFrame
│   │   ├── modals/PreferencesModal.tsx
│   │   ├── navigation/               # Navbar, Footer
│   │   ├── notifications/ToastViewport.tsx
│   │   └── search/GlobalSearchModal.tsx
│   ├── config/                       # site-config, theme-config, language-config, seo-config, analytics-config
│   ├── context/                      # ThemeContext, LanguageContext, PreferencesContext, SearchContext, ToastContext
│   ├── data/
│   │   ├── imported/inventory.json   # Verified snapshot of legacy audit
│   │   ├── faqs.ts
│   │   ├── navigation.ts
│   │   ├── projects.ts
│   │   ├── services.ts
│   │   ├── skills.ts
│   │   └── social-links.ts
│   ├── i18n/
│   │   ├── en/translation.json
│   │   ├── ur/translation.json
│   │   └── index.ts
│   ├── layouts/MainLayout.tsx
│   ├── pages/                        # Home, Projects, Services, About, CaseStudies, Contact, ErrorPage
│   ├── sections/                     # FaqSection, ProjectUniverseSection, SkillsShowcaseSection
│   ├── services/                     # analytics.ts, contactClient.ts, searchEngine.ts
│   ├── themes/                       # theme-variables.css, original.css, light.css, black.css, system.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── tests/
│   └── unit/search-and-data.test.ts  # Data integrity, i18n parity, and search engine tests
├── .env.example
├── index.html
├── package.json
├── README.md
├── server.ts                         # Combined dev/preview Express + Vite middleware server
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

## Layout Rationale

- Root `src/` + `vite.config.ts` matches standard Vite/AI Studio/Vercel expectations without extra monorepo tooling.
- `backend/` stays self-contained with its own `package.json`, `tsconfig.json`, `.env.example`, and `render.yaml` so Render builds and deploys it independently of Vercel.
- Unused empty folders (such as `public/assets/icons`) were omitted.
