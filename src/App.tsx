import { BrowserRouter } from "react-router-dom";
import { AppView } from "./AppView";
import { ThemeProvider } from "@mui/material";
import { createMuiTheme } from "./theme/muiThemeConfig";
import { AISettingsProvider } from "./routes/AISettings/AISettingsProvider";
import { useAccentColorSelector } from "@/redux/selectors";
import { useMemo } from "react";

export const App = () => {
  const accentColor = useAccentColorSelector((s) => s);
  const theme = useMemo(() => createMuiTheme(accentColor), [accentColor]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AISettingsProvider>
          <AppView />
        </AISettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
