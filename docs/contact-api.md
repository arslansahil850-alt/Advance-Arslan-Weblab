# Contact API Specification

The backend exposes **two endpoints exclusively**. All non-contact routes return HTTP `404` (`Endpoint not found. Backend handles Contact inquiries only.`).

## 1. Health Check

- **Method & Path**: `GET /api/health`
- **Response (`200 OK`)**:

```json
{
  "ok": true,
  "service": "arslan-weblab-contact-only",
  "uptimeSeconds": 120,
  "providersConfigured": {
    "resend": true,
    "smtpFallback": true,
    "turnstile": true
  },
  "timestamp": "2026-11-19T11:40:00.000Z"
}
```

## 2. Submit Contact Inquiry

- **Method & Path**: `POST /api/contact`
- **Headers**:
  - `Content-Type: application/json`
  - `Accept: application/json`
- **Request Body Schema (`zod`)**:

| Field | Type | Constraints |
| :--- | :--- | :--- |
| `name` | `string` | Required, `2..100` chars, trimmed, no control/header characters |
| `email` | `string` | Required, valid email, max `160` chars, no CR/LF |
| `projectType` | `string` | Required, `2..80` chars |
| `budget` | `string` | Required, `2..60` chars |
| `timeline` | `string` | Required, `2..60` chars |
| `message` | `string` | Required, `10..3000` chars |
| `website` | `string` | Optional honeypot (`max 120`). Any non-empty value returns `400` |
| `turnstileToken` | `string` | Required when `TURNSTILE_SECRET_KEY` is configured on the server |

- **Status Codes**:
  - `200 OK`: `{ "ok": true, "message": "Your inquiry has been delivered successfully.", "deliveryMode": "resend" | "smtp" }`
  - `400 Bad Request`: Validation error, malformed JSON, payload > `16kb`, or triggered honeypot
  - `403 Forbidden`: Disallowed CORS `Origin` or failed Cloudflare Turnstile verification
  - `429 Too Many Requests`: IP rate limit (`5` req / `15` min default) or identical submission digest within `DUPLICATE_WINDOW_MS` (`5` min default)
  - `502 Bad Gateway`: Email delivery attempted and both primary API and SMTP fallback failed
  - `503 Service Unavailable`: Neither `RESEND_API_KEY` nor `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS` is configured
