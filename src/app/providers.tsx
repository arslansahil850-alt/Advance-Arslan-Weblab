import type { ReactNode } from "react";
import { LanguageProvider } from "../context/LanguageContext";
import { PreferencesProvider } from "../context/PreferencesContext";
import { SearchProvider } from "../context/SearchContext";
import { ThemeProvider } from "../context/ThemeContext";
import { ToastProvider } from "../context/ToastContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <PreferencesProvider>
            <SearchProvider>{children}</SearchProvider>
          </PreferencesProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
