# Troubleshooting

## 1. Hero Background Image Does Not Appear

- **Cause**: `public/assets/images/hero/hero-background.webp` has not been uploaded yet (it was missing from legacy sources).
- **Resolution**: Place your `.webp` image at exact path `public/assets/images/hero/hero-background.webp` and refresh/rebuild. Until uploaded, the hero displays its theme-matched radial gradient + interactive 3D geometry fallback without broken image icons.

## 2. Contact Form Returns HTTP `503` ("Email delivery is not configured yet")

- **Cause**: Neither `RESEND_API_KEY` nor complete SMTP credentials (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`) are set in environment variables.
- **Resolution**: Configure `RESEND_API_KEY` and `RESEND_FROM_EMAIL` (and/or `SMTP_*`) on Render (or root `.env` during local preview).

## 3. Contact Form Returns HTTP `403` ("Origin not permitted by CORS policy")

- **Cause**: The frontend's domain is missing from `ALLOWED_ORIGINS` on Render.
- **Resolution**: Add the exact Vercel deployment URL (without trailing slash, e.g. `https://your-site.vercel.app`) to `ALLOWED_ORIGINS` in Render Environment Variables and redeploy.

## 4. Contact Form Returns HTTP `429`

- **Cause**: Either more than `RATE_LIMIT_MAX` (`5`) inquiries were sent from the same IP within `15` minutes, or an identical inquiry was submitted within `DUPLICATE_WINDOW_MS` (`5` minutes).
- **Resolution**: Wait for the cooldown window to expire or adjust message details before retrying.

## 5. Deep Links (e.g. `/projects`, `/case-studies`) Return 404 on Vercel

- **Cause**: Missing SPA rewrite rule.
- **Resolution**: Ensure `vercel.json` is committed at the project root so all routes rewrite to `/index.html`.
