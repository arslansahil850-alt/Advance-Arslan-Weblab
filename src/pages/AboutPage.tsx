import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/site-config";
import { useLanguage } from "../context/LanguageContext";
import { SkillsShowcaseSection } from "../sections/SkillsShowcaseSection";

export function AboutPage() {
  const { t, tList } = useLanguage();
  const timelineKeys = ["foundation", "practice", "focus", "vision"] as const;

  return (
    <div>
      <section className="border-b py-16 sm:py-20" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            {t("about.pageKicker")}
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">
            {t("about.pageTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-base" style={{ color: "var(--text-secondary)" }}>
            {t("about.pageSubtitle")}
          </p>
        </div>
      </section>

      <section id="developer" className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
          <div className="space-y-4 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              {t("about.storyKicker")}
            </p>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              {t("about.storyTitle")}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {t("about.storyP1")}
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {t("about.storyP2")}
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {t("about.storyP3")}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="surface-panel rounded-2xl p-8">
              <div className="flex items-center gap-4">
                <img
                  src={siteConfig.assets.brandMonogram}
                  alt={t("brand.name")}
                  className="h-14 w-14 rounded-xl object-contain"
                />
                <div>
                  <h3 className="font-display text-xl font-semibold">{siteConfig.ownerName}</h3>
                  <p className="text-xs" style={{ color: "var(--accent-bright)" }}>
                    {t("about.roleBadge")} · {t("brand.name")}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t pt-6" style={{ borderColor: "var(--border-subtle)" }}>
                <div>
                  <div className="font-mono-num text-2xl font-semibold" style={{ color: "var(--accent-bright)" }}>
                    34
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {t("hero.statProjectsLabel")}
                  </div>
                </div>
                <div>
                  <div className="font-mono-num text-2xl font-semibold" style={{ color: "var(--accent-bright)" }}>
                    2
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {t("projects.universeTitle")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="border-y"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-elevated)"
        }}
      >
        <SkillsShowcaseSection />
      </div>

      <section id="journey" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              {t("about.journeyKicker")}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              {t("about.journeyTitle")}
            </h2>
            <p className="mt-3 text-base" style={{ color: "var(--text-secondary)" }}>
              {t("about.journeySubtitle")}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {timelineKeys.map((key) => {
              const tags = tList(`about.timeline.${key}.tags`);
              return (
                <article key={key} className="surface-panel rounded-2xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    {t(`about.timeline.${key}.stage`)}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold">
                    {t(`about.timeline.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {t(`about.timeline.${key}.desc`)}
                  </p>
                  <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
                    {tags.join(" · ")}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="border-t py-16"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-elevated)"
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              {t("about.visionKicker")}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              {t("about.visionTitle")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {t("about.visionBody")}
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-xl px-5 text-sm font-semibold lg:self-center whitespace-nowrap"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-contrast)"
            }}
          >
            <span>{t("nav.letsTalk")}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
