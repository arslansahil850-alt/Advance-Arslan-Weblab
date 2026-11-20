import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, SlidersHorizontal, SunMoon, X } from "lucide-react";
import { siteConfig } from "../../config/site-config";
import { themeOptions, type ThemeChoice } from "../../config/theme-config";
import { useLanguage } from "../../context/LanguageContext";
import { usePreferences } from "../../context/PreferencesContext";
import { useSearch } from "../../context/SearchContext";
import { useTheme } from "../../context/ThemeContext";
import { primaryNavItems } from "../../data/navigation";
import { trackEvent } from "../../services/analytics";

export function Navbar() {
  const { t } = useLanguage();
  const { themeChoice, setThemeChoice } = useTheme();
  const { openPreferences } = usePreferences();
  const { openSearch } = useSearch();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setThemeMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setThemeMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSelectTheme = (choice: ThemeChoice) => {
    setThemeChoice(choice);
    setThemeMenuOpen(false);
    trackEvent("theme_selected", { theme: choice });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled ? "border-b shadow-sm" : "border-b border-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? "var(--bg-glass)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderColor: scrolled ? "var(--border-subtle)" : "transparent"
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-3 focus:z-50 focus:rounded-md focus:px-3 focus:py-2 focus:text-sm focus:font-semibold"
        style={{ backgroundColor: "var(--accent)", color: "var(--accent-contrast)" }}
      >
        {t("nav.skipToContent")}
      </a>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap"
          aria-label={t("brand.name")}
        >
          <img
            src={siteConfig.assets.brandMonogram}
            alt={t("brand.name")}
            className="h-8 w-8 rounded-md object-contain"
          />
          <span
            className="font-display text-base font-semibold tracking-[0.12em] sm:text-lg"
            style={{ color: "var(--text-primary)" }}
          >
            {t("brand.name")}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 lg:flex"
        >
          {primaryNavItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive ? "font-semibold" : "hover:opacity-100 opacity-80"
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? "var(--accent-bright)" : "var(--text-primary)"
              })}
            >
              {({ isActive }) => (
                <>
                  <span>{t(item.labelKey)}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full"
                      style={{ backgroundColor: "var(--accent-bright)" }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={openSearch}
            aria-label={t("nav.searchLabel")}
            className="flex h-10 items-center gap-2 rounded-lg px-2.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)"
            }}
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="hidden xl:inline">{t("nav.searchLabel")}</span>
            <kbd
              className="hidden rounded px-1.5 py-0.5 font-mono text-[10px] sm:inline-block"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-muted)"
              }}
            >
              {t("nav.searchShortcut")}
            </kbd>
          </button>

          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setThemeMenuOpen((prev) => !prev)}
              aria-expanded={themeMenuOpen}
              aria-haspopup="menu"
              aria-label={t("nav.themeLabel")}
              className="flex h-10 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-secondary)"
              }}
            >
              <SunMoon className="h-4 w-4" style={{ color: "var(--accent-bright)" }} aria-hidden="true" />
              <span className="hidden md:inline">{t(`themes.${themeChoice}`)}</span>
            </button>

            {themeMenuOpen && (
              <div
                role="menu"
                aria-label={t("preferences.themeSection")}
                className="absolute end-0 mt-2 w-40 rounded-xl p-1.5 shadow-2xl"
                style={{
                  backgroundColor: "var(--bg-surface-solid)",
                  border: "1px solid var(--border-strong)"
                }}
              >
                {themeOptions.map((opt) => {
                  const active = themeChoice === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="menuitemradio"
                      aria-checked={active}
                      onClick={() => handleSelectTheme(opt.id)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-start text-xs font-medium transition-colors"
                      style={{
                        backgroundColor: active ? "var(--accent-soft)" : "transparent",
                        color: active ? "var(--accent-bright)" : "var(--text-primary)"
                      }}
                    >
                      <span>{t(`themes.${opt.id}`)}</span>
                      <span
                        aria-hidden="true"
                        className="h-3 w-3 rounded-full border"
                        style={{
                          backgroundColor: opt.swatchPrimary,
                          borderColor: opt.swatchAccent
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={openPreferences}
            aria-label={t("nav.preferencesLabel")}
            title={t("nav.preferencesLabel")}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors shrink-0"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)"
            }}
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          </button>

          <Link
            to="/contact"
            className="hidden h-10 items-center rounded-lg px-4 text-xs font-semibold transition-transform duration-150 hover:-translate-y-0.5 sm:inline-flex whitespace-nowrap shrink-0"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-contrast)"
            }}
          >
            {t("nav.letsTalk")}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden shrink-0"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)"
            }}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="border-t px-4 pb-5 pt-3 lg:hidden"
          style={{
            backgroundColor: "var(--bg-surface-solid)",
            borderColor: "var(--border-subtle)"
          }}
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                end={item.to === "/"}
                className="flex h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "var(--accent-soft)" : "transparent",
                  color: isActive ? "var(--accent-bright)" : "var(--text-primary)"
                })}
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-2 flex h-11 items-center justify-center rounded-lg px-4 text-sm font-semibold"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-contrast)"
              }}
            >
              {t("nav.letsTalk")}
            </Link>
          </nav>

          <div className="mt-4 border-t pt-3" style={{ borderColor: "var(--border-subtle)" }}>
            <p className="mb-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              {t("preferences.themeSection")}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {themeOptions.map((opt) => {
                const active = themeChoice === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectTheme(opt.id)}
                    className="flex h-10 items-center justify-between rounded-lg px-3 text-xs font-medium"
                    style={{
                      backgroundColor: active ? "var(--accent-soft)" : "var(--bg-elevated)",
                      border: `1px solid ${active ? "var(--border-strong)" : "var(--border-subtle)"}`,
                      color: active ? "var(--accent-bright)" : "var(--text-primary)"
                    }}
                  >
                    <span>{t(`themes.${opt.id}`)}</span>
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: opt.swatchAccent }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
