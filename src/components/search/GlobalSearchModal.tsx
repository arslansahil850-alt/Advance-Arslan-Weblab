import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useSearch } from "../../context/SearchContext";
import { searchFrontendIndex, type SearchIndexItem } from "../../services/searchEngine";

const SUGGESTIONS = ["React", "Node.js", "Redesign", "Stayora", "WhatsApp"];

function highlightText(text: string, query: string) {
  const clean = query.trim();
  if (!clean) return text;
  const escaped = clean.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, idx) =>
    part.toLowerCase() === clean.toLowerCase() ? (
      <mark
        key={idx}
        className="rounded px-0.5"
        style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent-bright)" }}
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export function GlobalSearchModal() {
  const { isSearchOpen, closeSearch, recentSearches, addRecentSearch, clearRecentSearches } =
    useSearch();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);

  const results = useMemo(() => searchFrontendIndex(query, language), [query, language]);

  useEffect(() => {
    if (isSearchOpen) {
      setActiveIdx(0);
      window.setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  useEffect(() => {
    setActiveIdx(0);
  }, [results.length, query]);

  const handleSelect = (item: SearchIndexItem) => {
    if (query.trim().length >= 2) {
      addRecentSearch(query.trim());
    }
    closeSearch();
    if (item.to) {
      navigate(item.to);
    } else if (item.externalUrl) {
      window.open(item.externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    if (!isSearchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSearch();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((prev) => (results.length ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((prev) =>
          results.length ? (prev - 1 + results.length) % results.length : 0
        );
      } else if (e.key === "Enter" && results[activeIdx]) {
        e.preventDefault();
        handleSelect(results[activeIdx]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  if (!isSearchOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("search.title")}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-14 sm:pt-24"
    >
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm"
        onClick={closeSearch}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl"
        style={{
          backgroundColor: "var(--bg-surface-solid)",
          border: "1px solid var(--border-strong)"
        }}
      >
        <div
          className="flex items-center gap-3 border-b px-4 py-3.5"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <Search className="h-5 w-5 shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            aria-label={t("search.title")}
            className="w-full bg-transparent text-sm outline-none sm:text-base"
            style={{ color: "var(--text-primary)" }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t("search.clear")}
              className="rounded-md px-2 py-1 text-xs font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              {t("search.clearHistory")}
            </button>
          )}
          <button
            type="button"
            onClick={closeSearch}
            aria-label={t("search.close")}
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              backgroundColor: "var(--bg-elevated)",
              color: "var(--text-secondary)"
            }}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {!query.trim() ? (
            <div className="space-y-5">
              {recentSearches.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                    <span>{t("search.recentLabel")}</span>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="hover:underline"
                      style={{ color: "var(--accent)" }}
                    >
                      {t("search.clearHistory")}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                        style={{
                          backgroundColor: "var(--bg-elevated)",
                          border: "1px solid var(--border-subtle)",
                          color: "var(--text-primary)"
                        }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="mb-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  {t("search.suggestionsLabel")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setQuery(topic)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                      style={{
                        backgroundColor: "var(--accent-soft)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--accent-bright)"
                      }}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="rounded-xl p-4 text-center"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <p className="text-sm font-medium">{t("search.emptyTitle")}</p>
                <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  {t("search.emptyDesc")}
                </p>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div
              className="rounded-xl p-6 text-center"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)"
              }}
            >
              <p className="text-sm font-semibold">{t("search.noResultsTitle")}</p>
              <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                {t("search.noResultsDesc")}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setQuery(topic)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium"
                    style={{
                      backgroundColor: "var(--accent-soft)",
                      color: "var(--accent-bright)"
                    }}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
                {t("search.resultsCount", { count: results.length })}
              </p>
              <ul role="listbox" className="space-y-1.5">
                {results.map((item, idx) => {
                  const active = idx === activeIdx;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={active}
                        onMouseEnter={() => setActiveIdx(idx)}
                        onClick={() => handleSelect(item)}
                        className="flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-start transition-colors"
                        style={{
                          backgroundColor: active ? "var(--accent-soft)" : "var(--bg-elevated)",
                          border: `1px solid ${active ? "var(--border-strong)" : "var(--border-subtle)"}`
                        }}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--accent)" }}>
                            <span>{t(`search.categories.${item.category}`)}</span>
                          </div>
                          <p className="truncate text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                            {highlightText(item.title, query)}
                          </p>
                          <p className="truncate text-xs" style={{ color: "var(--text-secondary)" }}>
                            {highlightText(item.subtitle, query)}
                          </p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div
          className="border-t px-4 py-2.5 text-xs"
          style={{
            borderColor: "var(--border-subtle)",
            color: "var(--text-muted)"
          }}
        >
          {t("search.hint")}
        </div>
      </div>
    </div>
  );
}
