export const themeConfig = {
  sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
  serif: ["Literata", "Georgia", "serif"],
  mono: ["JetBrains Mono", "ui-monospace", "monospace"],
  display: ["Space Grotesk", "sans-serif"],
  fontFamily: {
    sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
    serif: ["Literata", "Georgia", "serif"],
    mono: ["JetBrains Mono", "ui-monospace", "monospace"],
    display: ["Space Grotesk", "sans-serif"],
    templates: {
      "Executive Serif": ["Literata", "Georgia", "serif"], // elegant serif
      "Classic Modern": ["Inter", "ui-sans-serif", "sans-serif"], // clean sans
      "Technical Mono": ["JetBrains Mono", "ui-monospace", "monospace"], // mono
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
    palette: {
      indigo: {
        primary: "#4b41e1",
        gradient: { from: "#4b41e1", to: "#645efb" },
      },
      emerald: {
        primary: "#059669",
        gradient: { from: "#059669", to: "#10b981" },
      },
      amber: {
        primary: "#d97706",
        gradient: { from: "#d97706", to: "#f59e0b" },
      },
      rose: {
        primary: "#e11d48",
        gradient: { from: "#e11d48", to: "#f43f5e" },
      },
      slate: {
        primary: "#334155",
        gradient: { from: "#334155", to: "#475569" },
      },
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
