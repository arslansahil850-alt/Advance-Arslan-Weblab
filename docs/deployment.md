# Deployment Guide

ARSLAN WEBLAB deploys as **two completely independent services** on **Vercel** (frontend) and **Render** (contact-only backend). Neither touches `https://arslan-weblab.netlify.app/` or `https://github.com/arslansahil850-alt/Arslan-Weblab`.

## 1. Upload Required Hero Asset Before Production Build

Before building for production, place your supplied futuristic hero background image at:
`public/assets/images/hero/hero-background.webp`

## 2. Deploy Contact-Only Backend to Render

Use `backend/render.yaml` (`rootDir: backend`, `buildCommand: npm ci && npm run build`, `startCommand: npm start`, `healthCheckPath: /api/health`).

### Hosting Tier & Cost Considerations

| Render Plan | Cost | Always-On Behavior | Recommendation |
| :--- | :--- | :--- | :--- |
| **Free** | $0/mo | Spins down after ~15 minutes of inactivity; cold-start delay (tens of seconds) on first inquiry | Suitable only for low-traffic testing, **not** reliable always-on production |
| **Starter (`plan: starter`)** | ~$7/mo | Always-on container (no idle sleep); predictable response latency | **Configured in `backend/render.yaml`** for continuous availability |

Note: No third-party cloud host guarantees 100% SLA uptime without multi-region redundancy. Pair Render's health check with external uptime monitoring and keep direct email (`arslansahil850@gmail.com`) and WhatsApp (`+92 343 7773393`) clearly visible on `/contact`.

### Required Render Environment Variables

- `NODE_ENV=production`
- `ALLOWED_ORIGINS=https://your-new-vercel-domain.vercel.app` (comma-separated if using a custom domain too)
- `CONTACT_RECIPIENT_EMAIL=arslansahil850@gmail.com`
- **Primary Email API (Resend)**: `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (Resend free tier: ~100 emails/day, 3,000/month subject to current provider terms)
- **SMTP Fallback (Nodemailer)**: `SMTP_HOST`, `SMTP_PORT` (`587`), `SMTP_SECURE` (`false`), `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_EMAIL`
- **Bot Protection (Recommended)**: `TURNSTILE_SECRET_KEY` (Cloudflare Turnstile free tier)

## 3. Deploy Frontend to a New Vercel Project

Create a **new** Vercel project pointing to the new repository:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Routing & Headers**: Handled by `vercel.json` (SPA rewrite + security headers + asset cache headers)

### Vercel Environment Variables

- `VITE_SITE_URL`: `https://your-new-vercel-domain.vercel.app`
- `VITE_CONTACT_API_URL`: `https://your-render-service.onrender.com`
- `VITE_TURNSTILE_SITE_KEY`: Your Cloudflare Turnstile site key (if enabled)
- `VITE_ANALYTICS_PROVIDER`: `none` (or `plausible`, `umami`, `ga4` with corresponding ID/domain)

## 4. Rollback Plan

- **Vercel**: Use Vercel Dashboard -> Deployments -> **Instant Rollback** to promote the previous immutable deployment.
- **Render**: Use Render Dashboard -> Events / Deploys -> **Rollback** to redeploy the prior passing commit/build.
- **Legacy Fallback**: `https://arslan-weblab.netlify.app/` remains untouched and independently live throughout.
