export type LanguageCode = "en" | "ur";

export const LANGUAGE_STORAGE_KEY = "arslan_weblab_lang";

export interface LanguageDefinition {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}

export const supportedLanguages: ReadonlyArray<LanguageDefinition> = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "ur", name: "Urdu", nativeName: "اردو", dir: "rtl" }
];
