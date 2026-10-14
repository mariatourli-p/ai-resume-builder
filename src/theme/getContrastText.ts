import { getContrastRatio } from "@mui/material/styles";

const LIGHT_TEXT = "#ffffff";
const DARK_TEXT = "rgba(0, 0, 0, 0.87)";

/**
 * Text color that stays readable on a background: light on dark colors
 * (e.g. the Slate accent), dark on light ones. Uses the same contrast
 * threshold (3:1) as MUI's own `getContrastText`.
 *
 * @example
 * getContrastText("#334155"); // "#ffffff"
 * getContrastText("#f1f5f9"); // "rgba(0, 0, 0, 0.87)"
 */
export const getContrastText = (background: string): string =>
  getContrastRatio(background, LIGHT_TEXT) >= 3 ? LIGHT_TEXT : DARK_TEXT;
