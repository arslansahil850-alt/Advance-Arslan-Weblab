import { ArrowUpRight, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { MediaFrame } from "../components/loaders/MediaFrame";
import { useLanguage } from "../context/LanguageContext";
import { caseStudiesData, projectsData } from "../data/projects";
import { processStepsData } from "../data/services";
import { trackEvent } from "../services/analytics";

export function CaseStudiesPage() {
  const { t } = useLanguage();

  return (
    <div>
      <section className="border-b py-16 sm:py-20" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            {t("caseStudies.kicker")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
            {t("caseStudies.pageTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-base" style={{ color: "var(--text-secondary)" }}>
            {t("caseStudies.pageSubtitle")}
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {caseStudiesData.map((study) => {
              const linked = projectsData.find((p) => p.id === study.linkedProjectId);
              return (
                <article key={study.id} className="surface-panel flex flex-col overflow-hidden rounded-2xl">
                  {linked && (
                    <MediaFrame
                      src={linked.image}
                      alt={study.title}
                      fallbackLabel={study.id.toUpperCase()}
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--accent)" }}>
                      <span className="font-mono-num">{study.number}</span>
                      <span aria-hidden="true">·</span>
                      <span>{study.category}</span>
                      <span aria-hidden="true">·</span>
                      <span style={{ color: "var(--text-muted)" }}>{study.stack}</span>
                    </div>

                    <h2 className="mt-2.5 font-display text-xl font-semibold">{study.title}</h2>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {study.summary}
                    </p>

                    <div
                      className="mt-5 grid grid-cols-2 gap-3 border-t pt-4 text-xs"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      <div>
                        <span style={{ color: "var(--text-muted)" }}>{t("caseStudies.roleLabel")}</span>
                        <div className="mt-0.5 font-semibold">{study.role}</div>
                      </div>
                      <div>
                        <span style={{ color: "var(--text-muted)" }}>{t("caseStudies.focusLabel")}</span>
                        <div className="mt-0.5 font-semibold">{study.focus}</div>
                      </div>
                    </div>

                    {linked && (
                      <div className="mt-5 flex flex-wrap gap-2.5">
                        <a
                          href={linked.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent("project_demo_click", { id: linked.id })}
                          className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-xs font-semibold"
                          style={{
                            backgroundColor: "var(--accent)",
                            color: "var(--accent-contrast)"
                          }}
                        >
                          <span>{t("caseStudies.viewLive")}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                        <a
                          href={linked.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent("github_click", { id: linked.id })}
                          className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-xs font-medium"
                          style={{
                            backgroundColor: "var(--bg-elevated)",
                            border: "1px solid var(--border-subtle)",
                            color: "var(--text-primary)"
                          }}
                        >
                          <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{t("caseStudies.viewRepo")}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            {t("caseStudies.approachKicker")}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            {t("caseStudies.approachTitle")}
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processStepsData.map((step) => (
              <div key={step.key} className="surface-panel rounded-2xl p-6">
                <span className="font-mono-num text-sm font-semibold" style={{ color: "var(--accent-bright)" }}>
                  {step.number}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold">
                  {t(`services.process.${step.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t(`services.process.${step.key}.desc`)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/services"
              className="inline-flex h-11 items-center rounded-xl px-5 text-xs font-semibold"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-strong)",
                color: "var(--text-primary)"
              }}
            >
              {t("services.exploreAll")}
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center rounded-xl px-5 text-xs font-semibold"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-contrast)"
              }}
            >
              {t("nav.letsTalk")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
