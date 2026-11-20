import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import {
  HIGH_CONTRAST_STORAGE_KEY,
  REDUCED_MOTION_STORAGE_KEY,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemeChoice
} from "../config/theme-config";

interface ThemeContextValue {
  themeChoice: ThemeChoice;
  resolvedTheme: ResolvedTheme;
  setThemeChoice: (choice: ThemeChoice) => void;
  cycleTheme: () => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_ORDER: ThemeChoice[] = ["original", "system", "light", "black"];

function getSystemResolvedTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) return "original";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "original" : "light";
}

function getInitialThemeChoice(): ThemeChoice {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "original" || stored === "system" || stored === "light" || stored === "black") {
      return stored;
    }
  } catch {
    return "original";
  }
  return "original";
}

function getInitialBool(key: string): boolean {
  try {
    return localStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeChoice, setThemeChoiceState] = useState<ThemeChoice>(getInitialThemeChoice);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemResolvedTheme);
  const [highContrast, setHighContrastState] = useState<boolean>(() =>
    getInitialBool(HIGH_CONTRAST_STORAGE_KEY)
  );
  const [reducedMotion, setReducedMotionState] = useState<boolean>(() =>
    getInitialBool(REDUCED_MOTION_STORAGE_KEY)
  );

  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemTheme(media.matches ? "original" : "light");
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const resolvedTheme: ResolvedTheme = themeChoice === "system" ? systemTheme : themeChoice;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-selected-theme", themeChoice);
    root.setAttribute("data-theme", resolvedTheme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      const color =
        resolvedTheme === "light" ? "#f8f9fc" : resolvedTheme === "black" ? "#050507" : "#060b16";
      metaTheme.setAttribute("content", color);
    }
  }, [themeChoice, resolvedTheme]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.setAttribute("data-high-contrast", "true");
    } else {
      root.removeAttribute("data-high-contrast");
    }
    try {
      localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, String(highContrast));
    } catch {
      return;
    }
  }, [highContrast]);

  useEffect(() => {
    const root = document.documentElement;
    if (reducedMotion) {
      root.setAttribute("data-reduced-motion", "true");
    } else {
      root.removeAttribute("data-reduced-motion");
    }
    try {
      localStorage.setItem(REDUCED_MOTION_STORAGE_KEY, String(reducedMotion));
    } catch {
      return;
    }
  }, [reducedMotion]);

  const setThemeChoice = useCallback((choice: ThemeChoice) => {
    setThemeChoiceState(choice);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, choice);
    } catch {
      return;
    }
  }, []);

  const cycleTheme = useCallback(() => {
    const idx = THEME_ORDER.indexOf(themeChoice);
    const next = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
    setThemeChoice(next);
  }, [themeChoice, setThemeChoice]);

  const setHighContrast = useCallback((enabled: boolean) => {
    setHighContrastState(enabled);
  }, []);

  const setReducedMotion = useCallback((enabled: boolean) => {
    setReducedMotionState(enabled);
  }, []);

  const value = useMemo(
    () => ({
      themeChoice,
      resolvedTheme,
      setThemeChoice,
      cycleTheme,
      highContrast,
      setHighContrast,
      reducedMotion,
      setReducedMotion
    }),
    [
      themeChoice,
      resolvedTheme,
      setThemeChoice,
      cycleTheme,
      highContrast,
      setHighContrast,
      reducedMotion,
      setReducedMotion
    ]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
