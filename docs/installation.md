# Installation Guide

## Prerequisites

- **Node.js**: `v22.x` recommended (verified on `v22.23.2`)
- **npm**: `v10.x` or newer

## 1. Install Frontend / Preview Workspace

From the repository root:

```bash
npm install
cp .env.example .env
```

Review `.env`:
- Leave `VITE_CONTACT_API_URL=""` when running the integrated local preview (`server.ts`), so the frontend calls `/api/contact` on port `3000`.
- Populate `RESEND_API_KEY` or `SMTP_*` values if you want real outbound emails during local testing.

## 2. Install Standalone Backend Dependencies (For Independent Backend Runs / Render)

```bash
cd backend
npm install
cp .env.example .env
```

Configure `backend/.env` with `ALLOWED_ORIGINS`, `CONTACT_RECIPIENT_EMAIL`, email provider credentials (`RESEND_API_KEY` and/or `SMTP_*`), and optional `TURNSTILE_SECRET_KEY`.
