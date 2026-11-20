import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../config/site-config";
import { useLanguage } from "../../context/LanguageContext";
import { footerNavItems } from "../../data/navigation";
import { projectHubs } from "../../data/projects";
import { socialLinksData } from "../../data/social-links";
import { trackEvent } from "../../services/analytics";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden border-t pt-16 pb-10"
      style={{
        backgroundColor: "var(--bg-elevated)",
        borderColor: "var(--border-subtle)"
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 end-0 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-8 border-b pb-12 lg:flex-row lg:items-end" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="max-w-xl">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={siteConfig.assets.brandMonogram}
                alt={t("brand.name")}
                className="h-10 w-10 rounded-lg object-contain"
              />
              <span className="font-display text-xl font-semibold tracking-[0.14em]">
                {t("brand.name")}
              </span>
            </Link>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {t("footer.statement")}
            </h2>
          </div>

          <Link
            to="/contact"
            className="inline-flex h-12 items-center gap-2 self-start rounded-xl px-6 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 lg:self-end whitespace-nowrap"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-contrast)"
            }}
          >
            <span>{t("nav.letsTalk")}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              {t("footer.navigationHeading")}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {footerNavItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    className="transition-colors hover:underline"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              {t("footer.hubsHeading")}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {projectHubs.map((hub) => (
                <li key={hub.id}>
                  <a
                    href={hub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("project_hub_click", { hub: hub.id })}
                    className="inline-flex items-center gap-1.5 transition-colors hover:underline"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span>
                      {hub.id === "basic" ? t("projects.basicHubTitle") : t("projects.advancedHubTitle")}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              {t("footer.connectHeading")}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {socialLinksData.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  onClick={() => {
                    if (social.id === "github") trackEvent("github_click", { source: "footer" });
                    if (social.id === "whatsapp") trackEvent("whatsapp_click", { source: "footer" });
                  }}
                  className="surface-panel flex items-center justify-between rounded-xl px-4 py-3 text-sm"
                >
                  <div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {t(social.labelKey)}
                    </div>
                    <div className="font-medium" style={{ color: "var(--text-primary)" }}>
                      {social.value}
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center"
          style={{
            borderColor: "var(--border-subtle)",
            color: "var(--text-muted)"
          }}
        >
          <p>{t("footer.copyright", { year })}</p>
          <p className="font-mono-num">{siteConfig.publicEmail}</p>
        </div>
      </div>
    </footer>
  );
}
