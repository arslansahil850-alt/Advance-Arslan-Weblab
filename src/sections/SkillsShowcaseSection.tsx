import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  skillsMarqueeItems,
  technologiesData,
  type SkillCategory
} from "../data/skills";

type FilterOption = "all" | SkillCategory;

export function SkillsShowcaseSection() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterOption>("all");

  const filteredTech = useMemo(
    () =>
      filter === "all"
        ? technologiesData
        : technologiesData.filter((item) => item.category === filter),
    [filter]
  );

  const filterTabs: Array<{ id: FilterOption; labelKey: string }> = [
    { id: "all", labelKey: "skills.filterAll" },
    { id: "frontend", labelKey: "skills.filterFrontend" },
    { id: "backend", labelKey: "skills.filterBackend" },
    { id: "languages", labelKey: "skills.filterLanguages" },
    { id: "workflow", labelKey: "skills.filterWorkflow" }
  ];

  return (
    <section id="skills" className="py-20" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              {t("skills.kicker")}
            </p>
            <h2 id="skills-heading" className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              {t("skills.title")}
            </h2>
            <p className="mt-3 text-base" style={{ color: "var(--text-secondary)" }}>
              {t("skills.subtitle")}
            </p>
          </div>

          <div
            role="tablist"
            aria-label={t("skills.title")}
            className="flex flex-wrap gap-1.5 rounded-xl p-1"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)"
            }}
          >
            {filterTabs.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0"
                  style={{
                    backgroundColor: active ? "var(--accent)" : "transparent",
                    color: active ? "var(--accent-contrast)" : "var(--text-secondary)"
                  }}
                >
                  {t(tab.labelKey)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTech.map((tech) => (
            <article
              key={tech.id}
              className="surface-panel group flex items-start gap-4 rounded-2xl p-5"
            >
              <div
                aria-hidden="true"
                className="font-mono-num flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-semibold transition-transform duration-200 group-hover:scale-105"
                style={{
                  backgroundColor: "var(--accent-soft)",
                  border: "1px solid var(--border-strong)",
                  color: "var(--accent-bright)"
                }}
              >
                {tech.shortCode}
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold">{tech.name}</h3>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t(tech.summaryKey)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        className="marquee-wrapper mt-12 overflow-hidden border-y py-4"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-surface)"
        }}
        aria-label={t("skills.title")}
      >
        <div className="marquee-track items-center gap-8 px-4">
          {[...skillsMarqueeItems, ...skillsMarqueeItems].map((item, index) => (
            <div
              key={`${item}-${index}`}
              aria-hidden={index >= skillsMarqueeItems.length}
              className="flex shrink-0 items-center gap-8 text-sm font-medium whitespace-nowrap"
              style={{ color: "var(--text-secondary)" }}
            >
              <span>{item}</span>
              <span aria-hidden="true" style={{ color: "var(--accent)" }}>
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
