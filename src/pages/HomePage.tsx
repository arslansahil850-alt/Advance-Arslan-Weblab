import { useState } from "react";
import { ArrowRight, ArrowUpRight, Code2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroGeometry } from "../components/3d/HeroGeometry";
import { ProjectCard } from "../components/cards/ProjectCard";
import { siteConfig } from "../config/site-config";
import { useLanguage } from "../context/LanguageContext";
import { featuredHomeProjectIds, projectsData } from "../data/projects";
import { processStepsData, servicesData } from "../data/services";
import { FaqSection } from "../sections/FaqSection";
import { ProjectUniverseSection } from "../sections/ProjectUniverseSection";
import { SkillsShowcaseSection } from "../sections/SkillsShowcaseSection";
import { trackEvent } from "../services/analytics";

export function HomePage() {
  const { t } = useLanguage();
  const [heroImgLoaded, setHeroImgLoaded] = useState(false);
  const [heroImgMissing, setHeroImgMissing] = useState(false);

  const featuredProjects = featuredHomeProjectIds
    .map((id) => projectsData.find((p) => p.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const capabilityKeys = ["html", "css", "js", "rwd", "api", "backend"] as const;

  return (
    <div>
      <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--border-subtle)" }}>
        {!heroImgMissing && (
          <img
            src={siteConfig.assets.heroBackground}
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setHeroImgLoaded(true)}
            onError={() => setHeroImgMissing(true)}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${
              heroImgLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ filter: "var(--hero-filter)" }}
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: heroImgMissing
              ? "radial-gradient(circle at 72% 38%, var(--glow-gold) 0%, transparent 48%), var(--bg-canvas)"
              : "var(--hero-scrim)"
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-20 lg:pt-24">
          <div className="grid items-stretch gap-12 lg:grid-cols-12">
            <div className="flex flex-col justify-center lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent-bright)" }}>
                {t("hero.kicker")}
              </p>

              <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {t("hero.titleLine1")}{" "}
                <span className="gold-gradient-text">{t("hero.titleAccent")}</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
                {t("hero.description")}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/projects"
                  className="inline-flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-semibold transition-transform duration-150 hover:-translate-y-0.5 whitespace-nowrap"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-contrast)"
                  }}
                >
                  <span>{t("hero.ctaPrimary")}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-semibold transition-colors whitespace-nowrap"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-strong)",
                    color: "var(--text-primary)"
                  }}
                >
                  <span>{t("hero.ctaSecondary")}</span>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs" style={{ color: "var(--text-muted)" }}>
                <span className="font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                  {t("hero.techHighlightsLabel")}:
                </span>
                <span>HTML5</span>
                <span aria-hidden="true">·</span>
                <span>CSS3</span>
                <span aria-hidden="true">·</span>
                <span>JavaScript</span>
                <span aria-hidden="true">·</span>
                <span>React</span>
                <span aria-hidden="true">·</span>
                <span>Node.js</span>
                <span aria-hidden="true">·</span>
                <span>Express.js</span>
              </div>
            </div>

            <div className="flex items-center justify-center lg:col-span-5">
              <div
                className="surface-panel relative flex h-80 w-full flex-col justify-between overflow-hidden rounded-2xl p-6 sm:h-96 lg:h-full lg:min-h-[380px]"
              >
                <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                  <span className="font-display font-semibold tracking-widest" style={{ color: "var(--accent-bright)" }}>
                    {t("brand.name")}
                  </span>
                  <span className="font-mono-num">2026</span>
                </div>

                <HeroGeometry className="absolute inset-0 h-full w-full" />

                <div className="relative z-10 flex items-center justify-between border-t pt-4 text-xs" style={{ borderColor: "var(--border-subtle)" }}>
                  <span style={{ color: "var(--text-secondary)" }}>{t("brand.owner")}</span>
                  <span className="font-mono-num" style={{ color: "var(--accent)" }}>
                    {siteConfig.handle}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-12 grid grid-cols-1 gap-4 border-t pt-8 sm:grid-cols-3"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="surface-panel rounded-xl px-5 py-4">
              <div className="font-mono-num text-2xl font-semibold" style={{ color: "var(--accent-bright)" }}>
                {t("hero.statProjectsValue")}
              </div>
              <div className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                {t("hero.statProjectsLabel")}
              </div>
            </div>
            <div className="surface-panel rounded-xl px-5 py-4">
              <div className="font-mono-num text-2xl font-semibold" style={{ color: "var(--accent-bright)" }}>
                {t("hero.statExperienceValue")}
              </div>
              <div className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                {t("hero.statExperienceLabel")}
              </div>
            </div>
            <div className="surface-panel rounded-xl px-5 py-4">
              <div className="font-mono-num text-2xl font-semibold" style={{ color: "var(--accent-bright)" }}>
                {t("hero.statResponsiveValue")}
              </div>
              <div className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                {t("hero.statResponsiveLabel")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" aria-labelledby="capabilities-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              {t("capabilities.kicker")}
            </p>
            <h2 id="capabilities-heading" className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              {t("capabilities.title")}
            </h2>
            <p className="mt-3 text-base" style={{ color: "var(--text-secondary)" }}>
              {t("capabilities.subtitle")}
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilityKeys.map((key, idx) => (
              <article key={key} className="surface-panel rounded-2xl p-6">
                <div className="font-mono-num text-xs font-semibold" style={{ color: "var(--accent)" }}>
                  0{idx + 1}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold">
                  {t(`capabilities.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t(`capabilities.items.${key}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-y py-20"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-elevated)"
        }}
        aria-labelledby="about-preview-heading"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              {t("about.kicker")}
            </p>
            <h2 id="about-preview-heading" className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              {t("about.previewTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {t("about.previewBody1")}
            </p>
            <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {t("about.previewBody2")}
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold transition-transform duration-150 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-contrast)"
              }}
            >
              <span>{t("about.moreAboutBtn")}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
            {(["clean", "ux", "responsive", "growth"] as const).map((itemKey) => (
              <div key={itemKey} className="surface-panel rounded-2xl p-5">
                <h3 className="font-display text-base font-semibold" style={{ color: "var(--accent-bright)" }}>
                  {t(`about.philosophyItems.${itemKey}.title`)}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t(`about.philosophyItems.${itemKey}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SkillsShowcaseSection />

      <section
        className="border-y py-20"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-elevated)"
        }}
        aria-labelledby="services-preview-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                {t("services.kicker")}
              </p>
              <h2 id="services-preview-heading" className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                {t("services.homeTitle")}
              </h2>
              <p className="mt-3 text-base" style={{ color: "var(--text-secondary)" }}>
                {t("services.homeSubtitle")}
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl px-5 text-xs font-semibold whitespace-nowrap"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-strong)",
                color: "var(--text-primary)"
              }}
            >
              <span>{t("services.exploreAll")}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {servicesData.map((service) => (
              <Link
                key={service.id}
                to={`/services#${service.id}`}
                className="surface-panel group flex flex-col justify-between rounded-2xl p-5"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-num" style={{ color: "var(--accent)" }}>
                    <span>{service.number}</span>
                    <span>{service.code}</span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold group-hover:underline">
                    {t(service.titleKey)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {t(service.descriptionKey)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" aria-labelledby="featured-projects-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                {t("projects.kicker")}
              </p>
              <h2 id="featured-projects-heading" className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                {t("projects.featuredTitle")}
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl px-5 text-xs font-semibold whitespace-nowrap"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-contrast)"
              }}
            >
              <span>{t("projects.viewAll")}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
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
        <ProjectUniverseSection />
      </div>

      <section className="py-20" aria-labelledby="home-process-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                {t("services.processKicker")}
              </p>
              <h2 id="home-process-heading" className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                {t("services.processTitle")}
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {processStepsData.map((step) => (
                  <div key={step.key} className="surface-panel flex items-start gap-4 rounded-2xl p-4">
                    <span className="font-mono-num text-sm font-semibold" style={{ color: "var(--accent-bright)" }}>
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold">
                        {t(`services.process.${step.key}.title`)}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {t(`services.process.${step.key}.desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center lg:col-span-7">
              <div className="surface-panel flex w-full flex-col justify-between rounded-2xl p-8">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-xl font-display text-base font-bold"
                        style={{
                          backgroundColor: "var(--accent)",
                          color: "var(--accent-contrast)"
                        }}
                      >
                        AS
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-semibold">{siteConfig.ownerName}</h3>
                        <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                          {siteConfig.handle}
                        </p>
                      </div>
                    </div>
                    <Code2 className="h-6 w-6" style={{ color: "var(--accent)" }} aria-hidden="true" />
                  </div>

                  <p className="mt-6 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {t("about.previewBody2")}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: "var(--border-subtle)" }}>
                  <a
                    href="https://github.com/arslansahil850-alt"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("github_click", { source: "home_card" })}
                    className="inline-flex h-11 items-center gap-2 rounded-xl px-5 text-xs font-semibold"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--accent-contrast)"
                    }}
                  >
                    <span>{t("social.github")}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <Link
                    to="/contact"
                    className="inline-flex h-11 items-center gap-2 rounded-xl px-5 text-xs font-semibold"
                    style={{
                      backgroundColor: "var(--bg-elevated)",
                      border: "1px solid var(--border-strong)",
                      color: "var(--text-primary)"
                    }}
                  >
                    <Sparkles className="h-4 w-4" style={{ color: "var(--accent)" }} aria-hidden="true" />
                    <span>{t("contact.homeTitle")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="border-t"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-elevated)"
        }}
      >
        <FaqSection />
      </div>
    </div>
  );
}
