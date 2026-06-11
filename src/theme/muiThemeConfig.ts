import { createTheme } from "@mui/material";
import { themeConfig } from "./themeConfig";

const { palette } = themeConfig.colors;

export const PALETTE_MAP: Record<
  string,
  { main: string; light: string; dark: string; contrastText: string }
> = {
  [palette.indigo.primary]: {
    main: palette.indigo.primary,
    light: "#eef2ff",
    dark: "#4338ca",
    contrastText: "#ffffff",
  },
  [palette.emerald.primary]: {
    main: palette.emerald.primary,
    light: "#ecfdf5",
    dark: "#047857",
    contrastText: "#ffffff",
  },
  [palette.amber.primary]: {
    main: palette.amber.primary,
    light: "#fffbeb",
    dark: "#b45309",
    contrastText: "#ffffff",
  },
  [palette.rose.primary]: {
    main: palette.rose.primary,
    light: "#fff1f2",
    dark: "#be123c",
    contrastText: "#ffffff",
  },
  [palette.slate.primary]: {
    main: palette.slate.primary,
    light: "#f1f5f9",
    dark: "#1e293b",
    contrastText: "#ffffff",
  },
};

export const createMuiTheme = (accentColor: string) =>
  createTheme({
    palette: {
      primary: PALETTE_MAP[accentColor] ?? PALETTE_MAP[palette.indigo.primary],
    },
    typography: {
      fontFamily: themeConfig.fontFamily.sans.join(", "),
    },
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: themeConfig.borderRadius[6],
            "&.Mui-selected": {
              backgroundColor: accentColor,
              color: "#ffffff",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: accentColor,
              },
            },
          },
        },
      },
    },
  });
