import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { LANGUAGE_STORAGE_KEY, type LanguageCode } from "../config/language-config";
import { getTranslationList, translate } from "../i18n";

interface LanguageContextValue {
  language: LanguageCode;
  dir: "ltr" | "rtl";
  isRtl: boolean;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  tList: (key: string) => string[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): LanguageCode {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "en" || stored === "ur") return stored;
  } catch {
    return "en";
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);
  const dir: "ltr" | "rtl" = language === "ur" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", dir);
  }, [language, dir]);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      return;
    }
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => translate(language, key, params),
    [language]
  );

  const tList = useCallback((key: string) => getTranslationList(language, key), [language]);

  const value = useMemo(
    () => ({
      language,
      dir,
      isRtl: dir === "rtl",
      setLanguage,
      t,
      tList
    }),
    [language, dir, setLanguage, t, tList]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
