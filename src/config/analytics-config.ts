export type AnalyticsProvider = "none" | "plausible" | "umami" | "ga4";

export const ANALYTICS_CONSENT_KEY = "arslan_weblab_analytics_consent";

export const analyticsConfig = {
  provider: (import.meta.env.VITE_ANALYTICS_PROVIDER || "none") as AnalyticsProvider,
  plausibleDomain: import.meta.env.VITE_PLAUSIBLE_DOMAIN || "",
  umamiWebsiteId: import.meta.env.VITE_UMAMI_WEBSITE_ID || "",
  umamiSrc: import.meta.env.VITE_UMAMI_SRC || "",
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || ""
};
