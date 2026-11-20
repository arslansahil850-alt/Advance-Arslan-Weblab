import en from "./en/translation.json";
import ur from "./ur/translation.json";
import type { LanguageCode } from "../config/language-config";

type TranslationTree = typeof en;

const dictionaries: Record<LanguageCode, TranslationTree> = {
  en,
  ur
};

export function translate(
  lang: LanguageCode,
  key: string,
  params?: Record<string, string | number>
): string {
  const parts = key.split(".");
  let current: unknown = dictionaries[lang] || dictionaries.en;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      current = undefined;
      break;
    }
  }

  if (typeof current !== "string") {
    let fallback: unknown = dictionaries.en;
    for (const part of parts) {
      if (fallback && typeof fallback === "object" && part in fallback) {
        fallback = (fallback as Record<string, unknown>)[part];
      } else {
        fallback = key;
        break;
      }
    }
    current = typeof fallback === "string" ? fallback : key;
  }

  let result = current as string;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      result = result.replaceAll(`{{${k}}}`, String(v));
    }
  }
  return result;
}

export function getTranslationList(lang: LanguageCode, key: string): string[] {
  const parts = key.split(".");
  let current: unknown = dictionaries[lang] || dictionaries.en;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return [];
    }
  }
  return Array.isArray(current) ? current.map(String) : [];
}
