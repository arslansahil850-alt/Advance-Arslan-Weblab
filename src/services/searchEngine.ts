import { faqsData } from "../data/faqs";
import { footerNavItems } from "../data/navigation";
import { projectsData } from "../data/projects";
import { servicesData } from "../data/services";
import { technologiesData } from "../data/skills";
import { translate } from "../i18n";
import type { LanguageCode } from "../config/language-config";

export type SearchItemCategory = "page" | "project" | "service" | "technology" | "faq";

export interface SearchIndexItem {
  id: string;
  category: SearchItemCategory;
  title: string;
  subtitle: string;
  keywords: string[];
  to?: string;
  externalUrl?: string;
}

export function buildSearchIndex(lang: LanguageCode): SearchIndexItem[] {
  const items: SearchIndexItem[] = [];

  for (const nav of footerNavItems) {
    items.push({
      id: `page-${nav.id}`,
      category: "page",
      title: translate(lang, nav.labelKey),
      subtitle: nav.to,
      keywords: [nav.id, nav.to, translate("en", nav.labelKey), translate("ur", nav.labelKey)],
      to: nav.to
    });
  }

  for (const proj of projectsData) {
    items.push({
      id: `project-${proj.id}`,
      category: "project",
      title: proj.title,
      subtitle: `${proj.category} · ${proj.tags.join(", ")}`,
      keywords: [proj.description, proj.category, proj.subcategory, ...proj.tags],
      externalUrl: proj.live,
      to: `/projects?highlight=${encodeURIComponent(proj.id)}`
    });
  }

  for (const svc of servicesData) {
    items.push({
      id: `service-${svc.id}`,
      category: "service",
      title: translate(lang, svc.titleKey),
      subtitle: translate(lang, svc.descriptionKey),
      keywords: [
        ...svc.tags,
        translate("en", svc.titleKey),
        translate("ur", svc.titleKey)
      ],
      to: `/services#${svc.id}`
    });
  }

  for (const tech of technologiesData) {
    items.push({
      id: `tech-${tech.id}`,
      category: "technology",
      title: tech.name,
      subtitle: translate(lang, tech.summaryKey),
      keywords: [tech.shortCode, tech.category, translate("en", tech.summaryKey)],
      to: "/about#skills"
    });
  }

  for (const faq of faqsData) {
    items.push({
      id: `faq-${faq.id}`,
      category: "faq",
      title: translate(lang, faq.questionKey),
      subtitle: translate(lang, faq.answerKey),
      keywords: [translate("en", faq.questionKey), translate("ur", faq.questionKey)],
      to: "/#faq"
    });
  }

  return items;
}

export function searchFrontendIndex(query: string, lang: LanguageCode): SearchIndexItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const index = buildSearchIndex(lang);

  return index
    .map((item) => {
      const titleLower = item.title.toLowerCase();
      const subLower = item.subtitle.toLowerCase();
      const kwLower = item.keywords.join(" ").toLowerCase();

      let score = 0;
      if (titleLower === q) score += 100;
      else if (titleLower.startsWith(q)) score += 60;
      else if (titleLower.includes(q)) score += 40;
      if (subLower.includes(q)) score += 20;
      if (kwLower.includes(q)) score += 15;

      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 24)
    .map((entry) => entry.item);
}
