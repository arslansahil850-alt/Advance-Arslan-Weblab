# Asset Naming & User Upload Guide

All filenames follow lowercase, hyphen-separated naming (`project-[unique-id]-cover.webp`, `brand-monogram.webp`, `hero-background.webp`).

## 1. Required Assets Checklist

| Exact Filename | Exact Folder Path | Purpose | Format & Dimensions | Theme Variants Needed | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `brand-monogram.webp` | `public/assets/images/brand/` | Navbar, Footer, InitialLoader, favicon, OpenGraph cover | `.webp` (492x507 transparent) | No (styled via CSS shadow/glow) | **Already Exists** |
| `hero-background.webp` | `public/assets/images/hero/` | Hero backdrop image | `.webp` (16:9 landscape, ~1920x1080 recommended) | No (same composition across all 4 themes; CSS scrim + filter adapts contrast) | **Upload Required** |
| `project-[id]-cover.webp` (32 files) | `public/assets/images/projects/` | Project card thumbnails (`MediaFrame` + circular loader) | `.webp` (~16:10 or 16:9) | No | **Already Exists** |

### How to Upload the Required Hero Background

1. Take your chosen futuristic hero background image.
2. Convert/name it **exactly** `hero-background.webp`.
3. Place it inside:
   `public/assets/images/hero/hero-background.webp`
4. Rebuild (`npm run build`) or refresh the dev server. No code changes are required because `src/config/site-config.ts` already points `assets.heroBackground` to `/assets/images/hero/hero-background.webp`.

## 2. Optional Assets Checklist

| Exact Filename | Exact Folder Path | Purpose | Format & Dimensions | Theme Variants Needed | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `project-stayora-cover.webp` | `public/assets/images/projects/` | Dedicated screenshot for Stayora (currently reuses `project-real-estate-website-cover.webp`) | `.webp` (~16:9) | No | Optional |
| `project-saas-project-cover.webp` | `public/assets/images/projects/` | Dedicated screenshot for SAAS Project (currently reuses `project-business-service-website-cover.webp`) | `.webp` (~16:9) | No | Optional |
| `project-expense-tracker-cover.webp` | `public/assets/images/projects/` | Dedicated screenshot for Expense Tracker if live/GitHub URLs are later supplied | `.webp` (~16:9) | No | Optional |
| `og-cover.webp` | `public/assets/images/brand/` | Dedicated 1200x630 OpenGraph banner if preferred over `brand-monogram.webp` | `.webp` (1200x630) | No | Optional |
