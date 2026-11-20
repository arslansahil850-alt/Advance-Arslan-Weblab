import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routeSeoMap } from "../../config/seo-config";
import { siteConfig } from "../../config/site-config";
import { useLanguage } from "../../context/LanguageContext";

export function SEOHead({ overridePath }: { overridePath?: string }) {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const key = overridePath || pathname;

  useEffect(() => {
    const meta = routeSeoMap[key] || routeSeoMap["/404"];
    const title = language === "ur" ? meta.titleUr : meta.titleEn;
    const description = language === "ur" ? meta.descriptionUr : meta.descriptionEn;
    const base = siteConfig.canonicalBaseUrl.replace(/\/+$/, "");
    const canonicalUrl = `${base}${meta.path === "/" ? "/" : meta.path}`;

    document.title = title;

    const setMeta = (selector: string, attr: "name" | "property", attrValue: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      meta.noIndex ? "noindex, nofollow" : "index, follow"
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [key, language]);

  return null;
}
