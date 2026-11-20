import { Home, RefreshCw, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "../components/common/SEOHead";
import { useLanguage } from "../context/LanguageContext";
import { useSearch } from "../context/SearchContext";

interface ErrorPageProps {
  code: 403 | 404 | 500;
  onReset?: () => void;
}

export function ErrorPage({ code, onReset }: ErrorPageProps) {
  const { t } = useLanguage();
  const { openSearch } = useSearch();
  const key = `errors.e${code}`;

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-20">
      <SEOHead overridePath={`/${code}`} />
      <div className="surface-panel max-w-lg rounded-2xl p-8 text-center sm:p-10">
        <div
          className="font-mono-num text-6xl font-semibold tracking-tight sm:text-7xl"
          style={{ color: "var(--accent-bright)" }}
        >
          {t(`${key}.code`)}
        </div>
        <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
          {t(`${key}.title`)}
        </h1>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {t(`${key}.desc`)}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {code === 500 && onReset ? (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-10 items-center gap-2 rounded-xl px-5 text-xs font-semibold"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-contrast)"
              }}
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              <span>{t("errors.reloadBtn")}</span>
            </button>
          ) : (
            <Link
              to="/"
              className="inline-flex h-10 items-center gap-2 rounded-xl px-5 text-xs font-semibold"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-contrast)"
              }}
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span>{t("errors.backHome")}</span>
            </Link>
          )}

          <button
            type="button"
            onClick={openSearch}
            className="inline-flex h-10 items-center gap-2 rounded-xl px-5 text-xs font-medium"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)"
            }}
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span>{t("errors.openSearch")}</span>
          </button>

          <Link
            to="/contact"
            className="inline-flex h-10 items-center rounded-xl px-4 text-xs font-medium"
            style={{ color: "var(--accent-bright)" }}
          >
            {t("errors.contactSupport")}
          </Link>
        </div>
      </div>
    </section>
  );
}
