// Accent colors users can pick for their resume
import { themeConfig } from "./themeConfig";

export const BRANDING_PALETTES = [
  { label: "Navy", value: themeConfig.colors.palette.navy.primary },
  { label: "Charcoal", value: themeConfig.colors.palette.charcoal.primary },
  { label: "Forest", value: themeConfig.colors.palette.forest.primary },
  { label: "Burgundy", value: themeConfig.colors.palette.burgundy.primary },
  { label: "Teal", value: themeConfig.colors.palette.teal.primary },
] as const;

export const DEFAULT_ACCENT_COLOR = themeConfig.colors.palette.navy.primary;

/**
 * The bright accents of earlier versions, mapped to the closest formal one,
 * so a saved resume keeps a similar look.
 */
export const LEGACY_ACCENT_COLORS: Record<string, string> = {
  "#4b41e1": themeConfig.colors.palette.navy.primary, // indigo
  "#059669": themeConfig.colors.palette.forest.primary, // emerald
  "#d97706": themeConfig.colors.palette.burgundy.primary, // amber
  "#e11d48": themeConfig.colors.palette.burgundy.primary, // rose
  "#334155": themeConfig.colors.palette.charcoal.primary, // slate
};
