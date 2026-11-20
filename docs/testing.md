# Testing Guide & Verified Results

## Test Suites Included

1. **Frontend Data, i18n & Search (`tests/unit/search-and-data.test.ts`)**
   - Verifies all 34 projects from `inventory.json` map to existing files in `public/assets/images/projects/`.
   - Verifies Basic Hub (`https://myprojects-hub.netlify.app/`) and Advanced Hub (`https://projects-hub-snowy.vercel.app/`) stay separate with verified URLs.
   - Verifies all 8 services (`src/data/services.ts`), 6 navigation pages (`src/data/navigation.ts`), verified monogram (`public/assets/images/brand/brand-monogram.webp`), and `arslansahil850@gmail.com`.
   - Verifies English (`en`) and Urdu (`ur`) dictionary key parity and non-empty translations.
   - Verifies `searchPortfolio` across projects, services, technologies, and pages in both English and Urdu.
2. **Backend Security, Validation, CORS & Email Fallback (`backend/tests/contact-security.test.ts`)**
   - Verifies Zod schema rejection of CR/LF header injection and complete HTML entity escaping (`<script>` -> `&lt;script&gt;`).
   - Verifies automatic SMTP fallback when the primary Resend API transport throws.
   - Verifies HTTP `200`, `400` (honeypot / invalid schema), `403` (disallowed CORS `Origin`), and `429` (duplicate submission digest guard) against an ephemeral Express server.

## Commands

```bash
npm test                                  # Run all unit, integration & security tests
npm run lint                              # TypeScript check (root + preview)
npx tsc -p backend/tsconfig.json --noEmit # Standalone Render backend TypeScript check
npm run build                             # Production Vite build
```

## Verified Local Execution Results

- `npm test`: **9 / 9 passed** (`0` failed, `0` skipped).
- `npm run lint` (`tsc --noEmit`): **passed** (`0` errors).
- `npx tsc -p backend/tsconfig.json --noEmit`: **passed** (`0` errors).
