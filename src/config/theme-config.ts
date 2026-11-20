export type ThemeChoice = "original" | "system" | "light" | "black";
export type ResolvedTheme = "original" | "light" | "black";

export const THEME_STORAGE_KEY = "arslan_weblab_theme";
export const HIGH_CONTRAST_STORAGE_KEY = "arslan_weblab_high_contrast";
export const REDUCED_MOTION_STORAGE_KEY = "arslan_weblab_reduced_motion";

export const themeOptions: ReadonlyArray<{
  id: ThemeChoice;
  swatchPrimary: string;
  swatchAccent: string;
}> = [
  { id: "original", swatchPrimary: "#060B16", swatchAccent: "#D4AF37" },
  { id: "system", swatchPrimary: "#111827", swatchAccent: "#C5A028" },
  { id: "light", swatchPrimary: "#F8F9FC", swatchAccent: "#9A7214" },
  { id: "black", swatchPrimary: "#050507", swatchAccent: "#E2C15A" }
];
