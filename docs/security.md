# Security Architecture

## 1. Contact Backend Controls (`backend/`)

- **Scope Isolation**: No database, no user accounts, no admin panels, and no arbitrary endpoints. Unknown `/api/*` paths return `404`.
- **Strict CORS Allowlist** (`backend/src/config/cors.ts`): Rejects requests from unlisted browser `Origin` headers with `403` and sets `Vary: Origin`.
- **HTTP Security Headers** (`backend/src/middleware/security.ts`, `vercel.json`): Helmet security headers, `X-Powered-By` disabled, CSP, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, strict `Referrer-Policy`, and locked `Permissions-Policy`.
- **Body Size Limit**: `express.json({ limit: "16kb" })` prevents payload-flooding DoS.
- **Input Validation & Injection Guards** (`backend/src/validators/contact.validator.ts`):
  - Strict Zod schema enforcement (`.strict()` rejects unexpected keys).
  - Control character stripping and CR/LF header-injection rejection (`hasHeaderInjection`).
  - Complete HTML entity escaping (`escapeHtml`) before building outbound email HTML bodies.
- **Abuse & Bot Prevention**:
  - IP-based rate limiting (`express-rate-limit`, default `5` requests per `15` minutes).
  - SHA-256 digest deduplication (`DUPLICATE_WINDOW_MS`, default `5` minutes).
  - Hidden honeypot field (`website`) silently traps automated bots.
  - Optional Cloudflare Turnstile verification (`TURNSTILE_SECRET_KEY`).
- **Safe Logging & Errors** (`backend/src/middleware/error-handler.ts`): Logs only masked event metadata (`provider`, 8-char `digestPrefix`, timestamp) — never raw email bodies, API keys, or stack traces in HTTP responses.

## 2. Frontend Controls

- No secrets or API credentials exist in `src/` or `VITE_*` variables.
- External analytics scripts stay disabled (`VITE_ANALYTICS_PROVIDER="none"`) until explicitly configured and enabled by user opt-in inside the Preferences modal.
- `vercel.json` enforces `nosniff`, `DENY` framing, `Referrer-Policy`, and `Permissions-Policy` on every static response.
