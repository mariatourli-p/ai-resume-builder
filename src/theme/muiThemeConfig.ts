import { createTheme } from "@mui/material";
import { themeConfig } from "./themeConfig";

export const muiThemeConfig = createTheme({
  palette: {
    primary: {
      main: themeConfig.colors.primary.DEFAULT,
      light: themeConfig.colors.primary.surface,
      dark: themeConfig.colors.primary.text,
    },
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
            backgroundColor: themeConfig.colors.primary.DEFAULT,
            color: "#ffffff",
            fontWeight: 700,
            "&:hover": {
              backgroundColor: themeConfig.colors.primary.DEFAULT,
            },
          },
        },
      },
    },
  },
});
