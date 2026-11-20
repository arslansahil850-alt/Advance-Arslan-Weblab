import { ANALYTICS_CONSENT_KEY, analyticsConfig } from "../config/analytics-config";

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
    umami?: { track: (eventName: string, data?: Record<string, string>) => void };
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

let initialized = false;

function isConsentGranted(): boolean {
  try {
    return localStorage.getItem(ANALYTICS_CONSENT_KEY) !== "false";
  } catch {
    return false;
  }
}

export function initExternalAnalytics(): void {
  if (initialized || typeof document === "undefined") return;
  if (!isConsentGranted() || analyticsConfig.provider === "none") return;

  if (analyticsConfig.provider === "plausible" && analyticsConfig.plausibleDomain) {
    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-domain", analyticsConfig.plausibleDomain);
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
    initialized = true;
  } else if (
    analyticsConfig.provider === "umami" &&
    analyticsConfig.umamiWebsiteId &&
    analyticsConfig.umamiSrc
  ) {
    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-website-id", analyticsConfig.umamiWebsiteId);
    script.src = analyticsConfig.umamiSrc;
    document.head.appendChild(script);
    initialized = true;
  } else if (analyticsConfig.provider === "ga4" && analyticsConfig.gaMeasurementId) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      analyticsConfig.gaMeasurementId
    )}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", analyticsConfig.gaMeasurementId, { anonymize_ip: true });
    initialized = true;
  }
}

export function trackEvent(eventName: string, props?: Record<string, string>): void {
  if (!isConsentGranted() || analyticsConfig.provider === "none") return;
  initExternalAnalytics();

  try {
    if (analyticsConfig.provider === "plausible" && window.plausible) {
      window.plausible(eventName, { props });
    } else if (analyticsConfig.provider === "umami" && window.umami) {
      window.umami.track(eventName, props);
    } else if (analyticsConfig.provider === "ga4" && window.gtag) {
      window.gtag("event", eventName, props || {});
    }
  } catch {
    return;
  }
}
