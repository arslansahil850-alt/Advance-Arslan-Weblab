import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ANALYTICS_CONSENT_KEY } from "../config/analytics-config";

interface PreferencesContextValue {
  isPreferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  analyticsConsent: boolean;
  setAnalyticsConsent: (allowed: boolean) => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function getInitialConsent(): boolean {
  try {
    const stored = localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return stored !== "false";
  } catch {
    return true;
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [analyticsConsent, setAnalyticsConsentState] = useState<boolean>(getInitialConsent);

  const openPreferences = useCallback(() => setIsPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setIsPreferencesOpen(false), []);

  const setAnalyticsConsent = useCallback((allowed: boolean) => {
    setAnalyticsConsentState(allowed);
    try {
      localStorage.setItem(ANALYTICS_CONSENT_KEY, String(allowed));
    } catch {
      return;
    }
  }, []);

  const value = useMemo(
    () => ({
      isPreferencesOpen,
      openPreferences,
      closePreferences,
      analyticsConsent,
      setAnalyticsConsent
    }),
    [isPreferencesOpen, openPreferences, closePreferences, analyticsConsent, setAnalyticsConsent]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
