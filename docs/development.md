# Development Guide

## Running Locally

Start the full local development server (Vite frontend + `/api/contact` & `/api/health` on port `3000`):

```bash
npm run dev
```

To run only the standalone Render backend locally (default port `10000` in `backend/.env.example`):

```bash
cd backend
npm run dev
```

## Available Scripts (Root)

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `dev` | `tsx server.ts` | Start Vite middleware + Contact API on `http://localhost:3000` |
| `build` | `vite build` | Build production static bundle into `dist/` |
| `start` | `tsx server.ts` | Run built `dist/` + `/api/*` in Express (`NODE_ENV=production`) |
| `lint` | `tsc --noEmit` | Run TypeScript typechecking across the workspace |
| `test` | `tsx --test tests/**/*.test.ts backend/tests/**/*.test.ts` | Run frontend data/i18n/search and backend contact security suites |

## Adding or Updating Content

- **Projects**: Update `src/data/imported/inventory.json` and `src/data/projects.ts`. Place matching cover images in `public/assets/images/projects/`.
- **Services / Skills / FAQs**: Update `src/data/services.ts`, `src/data/skills.ts`, and `src/data/faqs.ts`, plus matching translation keys in `src/i18n/en/translation.json` and `src/i18n/ur/translation.json`.
- **Themes**: Edit CSS tokens inside `src/themes/original.css`, `light.css`, `black.css`, `system.css`, and `theme-variables.css`.
- **Code Style**: TypeScript strict practices with zero source comments across application modules.
