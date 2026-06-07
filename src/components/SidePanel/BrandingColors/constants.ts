// BrandingColors.constants.ts
import { themeConfig } from "@/theme/themeConfig";

export const BRANDING_PALETTES = [
  { label: "Indigo", value: themeConfig.colors.palette.indigo.primary },
  { label: "Emerald", value: themeConfig.colors.palette.emerald.primary },
  { label: "Amber", value: themeConfig.colors.palette.amber.primary },
  { label: "Rose", value: themeConfig.colors.palette.rose.primary },
  { label: "Slate", value: themeConfig.colors.palette.slate.primary },
] as const;

export const DEFAULT_ACCENT_COLOR = themeConfig.colors.palette.slate.primary; // "#334155"
