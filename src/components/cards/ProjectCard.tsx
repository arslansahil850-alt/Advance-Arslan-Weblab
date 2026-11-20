import { ArrowUpRight, Code2, Info } from "lucide-react";
import type { ProjectItem } from "../../data/projects";
import { useLanguage } from "../../context/LanguageContext";
import { trackEvent } from "../../services/analytics";
import { MediaFrame } from "../loaders/MediaFrame";

interface ProjectCardProps {
  project: ProjectItem;
  onInspect?: (project: ProjectItem) => void;
  highlighted?: boolean;
}

export function ProjectCard({ project, onInspect, highlighted = false }: ProjectCardProps) {
  const { t } = useLanguage();

  return (
    <article
      className="surface-panel group flex flex-col overflow-hidden rounded-2xl transition-transform duration-200 hover:-translate-y-1"
      style={{
        borderColor: highlighted ? "var(--accent-bright)" : undefined
      }}
    >
      <MediaFrame
        src={project.image}
        alt={project.title}
        fallbackLabel={project.title}
        aspectClassName="aspect-[16/10]"
        imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--accent)" }}>
          <span>
            {project.category === "backend"
              ? t("projects.categoryBackend")
              : t("projects.categoryFrontend")}
          </span>
          <span aria-hidden="true">·</span>
          <span style={{ color: "var(--text-muted)" }}>{project.tags.join(" · ")}</span>
        </div>

        <h3 className="mt-2 font-display text-lg font-semibold leading-snug">
          {project.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>

        <div
          className="mt-5 flex flex-wrap items-center gap-2.5 border-t pt-4"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("project_demo_click", { id: project.id })}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-xs font-semibold transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-contrast)"
            }}
          >
            <span>{t("projects.liveDemo")}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("github_click", { id: project.id })}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-xs font-medium transition-colors whitespace-nowrap"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)"
            }}
          >
            <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("projects.githubRepo")}</span>
          </a>

          {onInspect && (
            <button
              type="button"
              onClick={() => onInspect(project)}
              aria-label={`${t("projects.detailsBtn")}: ${project.title}`}
              className="ms-auto inline-flex h-9 items-center gap-1 rounded-lg px-2.5 text-xs font-medium transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <Info className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t("projects.detailsBtn")}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
