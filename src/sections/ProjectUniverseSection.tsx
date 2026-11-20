import { ArrowUpRight, Layers, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { projectHubs } from "../data/projects";
import { trackEvent } from "../services/analytics";

export function ProjectUniverseSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20" aria-labelledby="project-universe-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            {t("projects.universeKicker")}
          </p>
          <h2 id="project-universe-heading" className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            {t("projects.universeTitle")}
          </h2>
          <p className="mt-3 text-base" style={{ color: "var(--text-secondary)" }}>
            {t("projects.universeSubtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {projectHubs.map((hub) => {
            const isAdvanced = hub.id === "advanced";
            return (
              <article
                key={hub.id}
                className="surface-panel relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                      {isAdvanced ? t("projects.advancedHubCount") : t("projects.basicHubCount")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: "var(--accent-soft)",
                        color: "var(--accent-bright)"
                      }}
                    >
                      {isAdvanced ? <Sparkles className="h-5 w-5" /> : <Layers className="h-5 w-5" />}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-semibold">
                    {isAdvanced ? t("projects.advancedHubTitle") : t("projects.basicHubTitle")}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {isAdvanced ? t("projects.advancedHubDesc") : t("projects.basicHubDesc")}
                  </p>

                  <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
                    {hub.categories.join(" · ")}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-5" style={{ borderColor: "var(--border-subtle)" }}>
                  <span className="truncate font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                    {hub.url}
                  </span>
                  <a
                    href={hub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("project_hub_click", { hub: hub.id })}
                    className="inline-flex h-10 items-center gap-2 rounded-xl px-5 text-xs font-semibold transition-transform duration-150 hover:-translate-y-0.5 whitespace-nowrap"
                    style={{
                      backgroundColor: isAdvanced ? "var(--accent)" : "var(--bg-elevated)",
                      color: isAdvanced ? "var(--accent-contrast)" : "var(--text-primary)",
                      border: isAdvanced ? "none" : "1px solid var(--border-strong)"
                    }}
                  >
                    <span>
                      {isAdvanced ? t("projects.advancedHubCta") : t("projects.basicHubCta")}
                    </span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
