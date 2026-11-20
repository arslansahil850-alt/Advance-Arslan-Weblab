import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "../../config/site-config";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

export function InitialLoader() {
  const { t } = useLanguage();
  const { reducedMotion } = useTheme();
  const [visible, setVisible] = useState(true);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const prefersReduced =
      reducedMotion ||
      (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const minDelay = prefersReduced ? 120 : 850;
    let docReady = document.readyState === "complete";
    let timerElapsed = false;

    const tryDismiss = () => {
      if (docReady && timerElapsed) {
        setVisible(false);
      }
    };

    const minTimer = window.setTimeout(() => {
      timerElapsed = true;
      tryDismiss();
    }, minDelay);

    const maxFailsafe = window.setTimeout(() => {
      setVisible(false);
    }, 2600);

    const onLoad = () => {
      docReady = true;
      tryDismiss();
    };

    if (!docReady) {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxFailsafe);
      window.removeEventListener("load", onLoad);
    };
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label={t("loader.initializing")}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6"
          style={{ backgroundColor: "var(--bg-canvas)" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, var(--glow-gold) 0%, transparent 56%)"
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 opacity-30"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)"
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center text-center"
          >
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
              <svg
                aria-hidden="true"
                viewBox="0 0 120 120"
                className="circular-media-ring absolute inset-0 h-full w-full"
              >
                <polygon
                  points="60,6 108,33 108,87 60,114 12,87 12,33"
                  fill="none"
                  stroke="var(--border-subtle)"
                  strokeWidth="1.2"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="var(--accent-bright)"
                  strokeWidth="1.5"
                  strokeDasharray="96 240"
                  strokeLinecap="round"
                />
              </svg>

              {!logoError ? (
                <img
                  src={siteConfig.assets.brandMonogram}
                  alt={t("brand.name")}
                  onError={() => setLogoError(true)}
                  className="relative h-14 w-14 rounded-lg object-contain"
                />
              ) : (
                <span
                  className="font-display text-xl font-bold tracking-wider"
                  style={{ color: "var(--accent-bright)" }}
                >
                  AW
                </span>
              )}
            </div>

            <h2
              className="font-display text-2xl font-semibold tracking-[0.18em] sm:text-3xl"
              style={{ color: "var(--text-primary)" }}
            >
              {t("brand.name")}
            </h2>
            <p className="mt-2 text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>
              {t("loader.kicker")}
            </p>

            <div className="mt-6 h-0.5 w-44 overflow-hidden rounded-full" style={{ backgroundColor: "var(--border-subtle)" }}>
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.15, ease: "easeInOut" }}
                className="h-full w-1/2"
                style={{
                  background: "linear-gradient(90deg, transparent, var(--accent-bright), transparent)"
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => setVisible(false)}
              className="mt-6 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
              style={{
                color: "var(--text-muted)",
                border: "1px solid var(--border-subtle)"
              }}
            >
              {t("loader.skip")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
