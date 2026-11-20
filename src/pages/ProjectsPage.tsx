import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Code2, Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { ProjectCard } from "../components/cards/ProjectCard";
import { MediaFrame } from "../components/loaders/MediaFrame";
import { useLanguage } from "../context/LanguageContext";
import {
  projectsData,
  projectTypesMarquee,
  type ProjectItem
} from "../data/projects";
import { ProjectUniverseSection } from "../sections/ProjectUniverseSection";
import { trackEvent } from "../services/analytics";

type ProjectFilter = "all" | "static-pages" | "javascript" | "web-projects" | "backend";
type SortOrder = "featured" | "az" | "za";

export function ProjectsPage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const highlightId = searchParams.get("highlight") || "";

  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (highlightId) {
      const found = projectsData.find((p) => p.id === highlightId);
      if (found) setSelectedProject(found);
    }
  }, [highlightId]);

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        if (highlightId) setSearchParams({});
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProject, highlightId, setSearchParams]);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = projectsData.filter((project) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "backend" && project.category === "backend") ||
        (filter !== "backend" && project.subcategory === filter);

      if (!matchesFilter) return false;
      if (!q) return true;

      return (
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        project.category.toLowerCase().includes(q)
      );
    });

    return [...list].sort((a, b) => {
      if (sortOrder === "featured") {
        return Number(b.featured) - Number(a.featured);
      }
      if (sortOrder === "az") return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });
  }, [filter, searchQuery, sortOrder]);

  const filters: Array<{ id: ProjectFilter; labelKey: string }> = [
    { id: "all", labelKey: "projects.filterAll" },
    { id: "static-pages", labelKey: "projects.filterStatic" },
    { id: "javascript", labelKey: "projects.filterJs" },
    { id: "web-projects", labelKey: "projects.filterWeb" },
    { id: "backend", labelKey: "projects.filterBackend" }
  ];

  const closeModal = () => {
    setSelectedProject(null);
    if (highlightId) setSearchParams({});
  };

  return (
    <div>
      <section className="border-b py-16 sm:py-20" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            {t("projects.pageKicker")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
            {t("projects.pageTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-base" style={{ color: "var(--text-secondary)" }}>
            {t("projects.pageSubtitle")}
          </p>

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="tablist"
              aria-label={t("projects.pageTitle")}
              className="flex flex-wrap gap-1.5 rounded-xl p-1"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)"
              }}
            >
              {filters.map((tab) => {
                const active = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(tab.id)}
                    className="rounded-lg px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0"
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

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div
                className="flex h-10 items-center gap-2 rounded-xl px-3"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <Search className="h-4 w-4 shrink-0" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("projects.searchPlaceholder")}
                  aria-label={t("projects.searchPlaceholder")}
                  className="w-full bg-transparent text-xs outline-none sm:w-56"
                  style={{ color: "var(--text-primary)" }}
                />
              </div>

              <label className="flex items-center gap-2 text-xs">
                <span style={{ color: "var(--text-muted)" }}>{t("projects.sortLabel")}</span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                  className="h-10 rounded-xl px-3 text-xs font-medium outline-none"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)"
                  }}
                >
                  <option value="featured">{t("projects.sortFeatured")}</option>
                  <option value="az">{t("projects.sortAZ")}</option>
                  <option value="za">{t("projects.sortZA")}</option>
                </select>
              </label>
            </div>
          </div>

          <p className="mt-5 font-mono-num text-xs" style={{ color: "var(--text-muted)" }}>
            {t("projects.resultsCount", { count: filteredProjects.length })}
          </p>

          {filteredProjects.length === 0 ? (
            <div className="surface-panel mt-8 rounded-2xl p-10 text-center">
              <h2 className="font-display text-xl font-semibold">{t("projects.emptyTitle")}</h2>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                {t("projects.emptyDesc")}
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter("all");
                  setSearchQuery("");
                }}
                className="mt-5 h-10 rounded-xl px-5 text-xs font-semibold"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-contrast)"
                }}
              >
                {t("projects.resetFilters")}
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  highlighted={project.id === highlightId}
                  onInspect={setSelectedProject}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <div
        className="marquee-wrapper overflow-hidden border-b py-4"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-elevated)"
        }}
        aria-label="Project categories"
      >
        <div className="marquee-track items-center gap-8 px-4">
          {[...projectTypesMarquee, ...projectTypesMarquee].map((label, idx) => (
            <div
              key={`${label}-${idx}`}
              aria-hidden={idx >= projectTypesMarquee.length}
              className="flex shrink-0 items-center gap-8 text-sm font-medium whitespace-nowrap"
              style={{ color: "var(--text-secondary)" }}
            >
              <span>{label}</span>
              <span aria-hidden="true" style={{ color: "var(--accent)" }}>
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>

      <ProjectUniverseSection />

      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-detail-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
            style={{
              backgroundColor: "var(--bg-surface-solid)",
              border: "1px solid var(--border-strong)"
            }}
          >
            <MediaFrame
              src={selectedProject.image}
              alt={selectedProject.title}
              fallbackLabel={selectedProject.title}
              priority
              aspectClassName="aspect-[16/9]"
            />

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                    {selectedProject.category} · {selectedProject.tags.join(" · ")}
                  </p>
                  <h2 id="project-detail-title" className="mt-1.5 font-display text-2xl font-semibold">
                    {selectedProject.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label={t("projects.closeModal")}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-secondary)" }}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {selectedProject.description}
              </p>

              {selectedProject.reusedImage && (
                <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
                  {t("projects.noteLabel")}: {t("projects.reusedThumbNote")}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("project_demo_click", { id: selectedProject.id })}
                  className="inline-flex h-10 items-center gap-2 rounded-xl px-5 text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-contrast)"
                  }}
                >
                  <span>{t("projects.liveDemo")}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("github_click", { id: selectedProject.id })}
                  className="inline-flex h-10 items-center gap-2 rounded-xl px-5 text-xs font-medium"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)"
                  }}
                >
                  <Code2 className="h-4 w-4" aria-hidden="true" />
                  <span>{t("projects.githubRepo")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
