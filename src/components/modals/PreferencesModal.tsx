import { useEffect } from "react";
import { Check, X } from "lucide-react";
import { supportedLanguages } from "../../config/language-config";
import { themeOptions } from "../../config/theme-config";
import { useLanguage } from "../../context/LanguageContext";
import { usePreferences } from "../../context/PreferencesContext";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";
import { useScrollLock } from "../../hooks/useScrollLock";
import { trackEvent } from "../../services/analytics";

export function PreferencesModal() {
  const { isPreferencesOpen, closePreferences, analyticsConsent, setAnalyticsConsent } =
    usePreferences();
  const {
    themeChoice,
    setThemeChoice,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion
  } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { showToast } = useToast();

  useScrollLock(isPreferencesOpen);

  useEffect(() => {
    if (!isPreferencesOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreferences();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPreferencesOpen, closePreferences]);

  if (!isPreferencesOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preferences-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm"
        onClick={closePreferences}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
        style={{
          backgroundColor: "var(--bg-surface-solid)",
          border: "1px solid var(--border-strong)"
        }}
      >
        <div
          className="flex items-start justify-between gap-4 border-b px-6 py-4"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div>
            <h2 id="preferences-title" className="font-display text-lg font-semibold">
              {t("preferences.title")}
            </h2>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
              {t("preferences.subtitle")}
            </p>
          </div>
          <button
            type="button"
            onClick={closePreferences}
            aria-label={t("preferences.close")}
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-secondary)" }}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div
          data-scroll-lock-scrollable="true"
          className="max-h-[75vh] space-y-6 overscroll-contain overflow-y-auto px-6 py-5"
        >
          <div>
            <h3 className="text-sm font-semibold">{t("preferences.themeSection")}</h3>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
              {t("preferences.themeHint")}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {themeOptions.map((opt) => {
                const active = themeChoice === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setThemeChoice(opt.id);
                      trackEvent("theme_selected", { theme: opt.id });
                      showToast(t("preferences.savedToast"), { variant: "success", durationMs: 2200 });
                    }}
                    className="flex flex-col items-start gap-2 rounded-xl p-3 text-start transition-colors"
                    style={{
                      backgroundColor: active ? "var(--accent-soft)" : "var(--bg-elevated)",
                      border: `1px solid ${active ? "var(--border-strong)" : "var(--border-subtle)"}`
                    }}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span
                        className="h-4 w-4 rounded-full border"
                        style={{
                          backgroundColor: opt.swatchPrimary,
                          borderColor: opt.swatchAccent
                        }}
                      />
                      {active && <Check className="h-3.5 w-3.5" style={{ color: "var(--accent-bright)" }} />}
                    </div>
                    <span className="text-xs font-semibold">{t(`themes.${opt.id}`)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t("preferences.languageSection")}</h3>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
              {t("preferences.languageHint")}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {supportedLanguages.map((langDef) => {
                const active = language === langDef.code;
                return (
                  <button
                    key={langDef.code}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setLanguage(langDef.code);
                      trackEvent("language_selected", { language: langDef.code });
                      showToast(t("preferences.savedToast"), { variant: "success", durationMs: 2200 });
                    }}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: active ? "var(--accent-soft)" : "var(--bg-elevated)",
                      border: `1px solid ${active ? "var(--border-strong)" : "var(--border-subtle)"}`,
                      color: active ? "var(--accent-bright)" : "var(--text-primary)"
                    }}
                  >
                    <span>{langDef.nativeName}</span>
                    <span className="text-xs uppercase" style={{ color: "var(--text-muted)" }}>
                      {langDef.dir}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">{t("preferences.accessibilitySection")}</h3>

            <label
              className="flex cursor-pointer items-center justify-between gap-4 rounded-xl p-3.5"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)"
              }}
            >
              <div>
                <div className="text-xs font-semibold">{t("preferences.highContrast")}</div>
                <div className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
                  {t("preferences.highContrastDesc")}
                </div>
              </div>
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="h-4 w-4 accent-amber-500"
              />
            </label>

            <label
              className="flex cursor-pointer items-center justify-between gap-4 rounded-xl p-3.5"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)"
              }}
            >
              <div>
                <div className="text-xs font-semibold">{t("preferences.reducedMotion")}</div>
                <div className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
                  {t("preferences.reducedMotionDesc")}
                </div>
              </div>
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(e) => setReducedMotion(e.target.checked)}
                className="h-4 w-4 accent-amber-500"
              />
            </label>

            <label
              className="flex cursor-pointer items-center justify-between gap-4 rounded-xl p-3.5"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)"
              }}
            >
              <div>
                <div className="text-xs font-semibold">{t("preferences.analyticsConsent")}</div>
                <div className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
                  {t("preferences.analyticsConsentDesc")}
                </div>
              </div>
              <input
                type="checkbox"
                checked={analyticsConsent}
                onChange={(e) => setAnalyticsConsent(e.target.checked)}
                className="h-4 w-4 accent-amber-500"
              />
            </label>
          </div>
        </div>

        <div
          className="flex justify-end border-t px-6 py-3.5"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <button
            type="button"
            onClick={closePreferences}
            className="h-10 rounded-lg px-5 text-xs font-semibold"
            style={{ backgroundColor: "var(--accent)", color: "var(--accent-contrast)" }}
          >
            {t("preferences.close")}
          </button>
        </div>
      </div>
    </div>
  );
}
