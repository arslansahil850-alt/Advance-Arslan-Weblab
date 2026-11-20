# Monitoring & Analytics

## 1. Contact Backend Health Monitoring (Render)

- **Endpoint**: `GET /api/health` (returns HTTP `200` with `{ ok: true, service: "arslan-weblab-contact-only", uptimeSeconds, providersConfigured, timestamp }`).
- **Render Native Health Check**: Configured in `backend/render.yaml` (`healthCheckPath: /api/health`).
- **External Uptime Ping**: Configure an external HTTP monitor (e.g., UptimeRobot or Better Stack) against `https://<your-render-service>.onrender.com/api/health` on a 5-minute interval to receive downtime alerts.
- **Structured Logs**: Backend outputs single-line JSON events (`contact_delivered`, `contact_provider_unconfigured`, `contact_delivery_failed`, `preview_server_started`) containing provider mode and 8-character digest prefix without PII or secrets.

## 2. Frontend External Analytics (`src/services/analytics.ts`)

- Configured via `VITE_ANALYTICS_PROVIDER` (`none`, `plausible`, `umami`, or `ga4`).
- Respects privacy and user choice: third-party analytics scripts only initialize when `ANALYTICS_CONSENT_KEY` (`arslan_weblab_analytics_consent`) is enabled in the **Preferences** modal.
- No custom backend analytics endpoints or database tables exist.
