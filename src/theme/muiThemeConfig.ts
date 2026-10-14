import { createTheme } from "@mui/material";
import { themeConfig } from "./themeConfig";

const { palette } = themeConfig.colors;

export const PALETTE_MAP: Record<
  string,
  { main: string; light: string; dark: string; contrastText: string }
> = {
  [palette.navy.primary]: {
    main: palette.navy.primary,
    light: "#eef2f7",
    dark: "#152a45",
    contrastText: "#ffffff",
  },
  [palette.charcoal.primary]: {
    main: palette.charcoal.primary,
    light: "#f3f4f6",
    dark: "#1f2937",
    contrastText: "#ffffff",
  },
  [palette.forest.primary]: {
    main: palette.forest.primary,
    light: "#edf4f1",
    dark: "#22453b",
    contrastText: "#ffffff",
  },
  [palette.burgundy.primary]: {
    main: palette.burgundy.primary,
    light: "#f8eef0",
    dark: "#5c2029",
    contrastText: "#ffffff",
  },
  [palette.teal.primary]: {
    main: palette.teal.primary,
    light: "#ecf4f6",
    dark: "#16464f",
    contrastText: "#ffffff",
  },
};

export const createMuiTheme = (accentColor: string) =>
  createTheme({
    palette: {
      primary: PALETTE_MAP[accentColor] ?? PALETTE_MAP[palette.navy.primary],
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
