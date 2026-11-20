# Asset Inventory

Every referenced visual asset lives under `public/assets/`. No placeholder images or unverified external asset URLs are referenced in runtime components.

## 1. Brand Assets

| Filename | Path in Repo | Runtime URL | Status | Details |
| :--- | :--- | :--- | :--- | :--- |
| `brand-monogram.webp` | `public/assets/images/brand/brand-monogram.webp` | `/assets/images/brand/brand-monogram.webp` | Present | 492x507 WebP with alpha transparency from original repository (`logo.webp`). Used in Navbar, Footer, InitialLoader, favicon, Apple touch icon, and OpenGraph image. |

## 2. Hero Assets

| Filename | Path in Repo | Runtime URL | Status | Details |
| :--- | :--- | :--- | :--- | :--- |
| `hero-background.webp` | `public/assets/images/hero/hero-background.webp` | `/assets/images/hero/hero-background.webp` | **Missing — Awaiting User Upload** | Futuristic hero backdrop. `HomePage.tsx` loads this path directly when present and falls back cleanly to a theme-aware radial glow + Three.js wireframe geometry if not yet uploaded. |

## 3. Project Thumbnails (32 Unique `.webp` Files Serving 34 Projects)

Downloaded directly from `https://projects-hub-snowy.vercel.app/assets/*` into `public/assets/images/projects/`:

- `project-website-design-1-cover.webp`
- `project-blogo-static-page-cover.webp`
- `project-blogo-static-page-2-cover.webp`
- `project-foodie-static-page-cover.webp`
- `project-dashboard-static-page-cover.webp`
- `project-shopora-static-page-cover.webp`
- `project-modern-todo-cover.webp`
- `project-calculator-app-cover.webp`
- `project-todo-app-cover.webp`
- `project-password-generator-cover.webp`
- `project-quiz-app-cover.webp`
- `project-stopwatch-app-cover.webp`
- `project-weather-app-cover.webp`
- `project-my-portfolio-cover.webp`
- `project-shopping-website-cover.webp`
- `project-real-estate-website-cover.webp` (also mapped to `stayora`)
- `project-learn-com-cover.webp`
- `project-nexora-cover.webp`
- `project-business-service-website-cover.webp` (also mapped to `saas-project`)
- `project-gym-fitness-website-cover.webp`
- `project-classic-food-web-cover.webp`
- `project-digital-agency-cover.webp`
- `project-dental-website-cover.webp`
- `project-foodie-com-cover.webp`
- `project-web-loaders-cover.webp`
- `project-navbar-collections-cover.webp`
- `project-backend-phase-1-cover.webp`
- `project-backend-phase-2-cover.webp`
- `project-backend-phase-3-cover.webp`
- `project-backend-phase-4-cover.webp`
- `project-backend-phase-5-cover.webp`
- `project-backend-phase-6-cover.webp`
