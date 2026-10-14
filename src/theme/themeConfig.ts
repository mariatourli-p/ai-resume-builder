export const themeConfig = {
  sans: ["Inter Variable", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
  serif: ["Literata Variable", "Literata", "Georgia", "serif"],
  mono: [
    "JetBrains Mono Variable",
    "JetBrains Mono",
    "ui-monospace",
    "monospace",
  ],
  display: ["Space Grotesk Variable", "Space Grotesk", "sans-serif"],
  fontFamily: {
    sans: [
      "Inter Variable",
      "Inter",
      "ui-sans-serif",
      "system-ui",
      "sans-serif",
    ],
    serif: ["Literata Variable", "Literata", "Georgia", "serif"],
    mono: [
      "JetBrains Mono Variable",
      "JetBrains Mono",
      "ui-monospace",
      "monospace",
    ],
    display: ["Space Grotesk Variable", "Space Grotesk", "sans-serif"],
    templates: {
      "Executive Serif": ["Literata Variable", "Literata", "Georgia", "serif"], // elegant serif
      "Classic Modern": [
        "Inter Variable",
        "Inter",
        "ui-sans-serif",
        "sans-serif",
      ], // clean sans
      "Technical Mono": [
        "JetBrains Mono Variable",
        "JetBrains Mono",
        "ui-monospace",
        "monospace",
      ], // mono
    },
  },
  colors: {
    transparent: "transparent",
    white: "#ffffff",
    black: "#030712",
    // ─── AI / Emerald ──────────────────────────────────
    ai: {
      surface: "#ecfdf5",
      surfaceHover: "#d1fae5",
      accent: "#047857",
      accentLight: "#10b981",
      border: "#d1fae5",
    },
    // ─── Primary / Indigo ──────────────────────────────
    primary: {
      DEFAULT: "#4b41e1",
      surface: "#eef2ff",
      text: "#4338ca",
      border: "#a5b4fc",
    },
    // ─── Sidebar ───────────────────────────────────────
    sidebar: {
      surface: "#f9fafb",
      border: "#e5e7eb",
      textMuted: "#9ca3af",
      textBody: "#4b5563",
      cta: "#030712",
    },
    // ─── Resume Color Palette ──────────────────────────
    /**
     * Muted, dark accents that suit a formal resume and stay readable when
     * printed in black and white. All have light text on them (4.5:1+).
     */
    palette: {
      navy: { primary: "#1e3a5f" },
      charcoal: { primary: "#374151" },
      forest: { primary: "#2f5d50" },
      burgundy: { primary: "#7b2d3b" },
      teal: { primary: "#1f5f6b" },
    },
  },
  spacing: {
    0: "0",
    1: "0.0625rem",
    2: "0.125rem",
    4: "0.25rem",
    6: "0.375rem",
    8: "0.5rem",
    12: "0.75rem",
    16: "1rem",
    20: "1.25rem",
    24: "1.5rem",
    32: "2rem",
    40: "2.5rem",
    48: "3rem",
    56: "3.5rem",
    72: "4.5rem",
  },
  borderRadius: {
    none: "0",
    1: "0.0625rem",
    2: "0.125rem",
    4: "0.25rem",
    6: "0.375rem",
    8: "0.5rem",
    12: "0.75rem",
    16: "1rem",
    20: "1.25rem",
    24: "1.5rem",
    32: "2rem",
    40: "2.5rem",
    48: "3rem",
    56: "3.5rem",
    72: "4.5rem",
    full: "9999px",
  },
  fontSize: {
    "3xs": "0.25rem",
    "2xs": "0.5rem",
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "2.5rem",
    inherit: "inherit",
    DEFAULT: "1rem",
  },
  borderWidth: {
    0: "0",
    1: "0.0625rem",
    2: "0.125rem",
    4: "0.25rem",
    8: "0.5rem",
  },
  backgroundImage: {
    "ai-shimmer":
      "linear-gradient(90deg, #4b41e1, #10b981, #6366f1, #10b981, #4b41e1)",
  },
} as const;

export type ThemeConfig = typeof themeConfig;
