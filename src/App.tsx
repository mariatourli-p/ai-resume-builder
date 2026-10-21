import { BrowserRouter } from "react-router-dom";
import { AppView } from "./AppView";
import { ThemeProvider } from "@mui/material";
import { createMuiTheme } from "./theme";
import { AISettingsProvider } from "./routes/AISettings";
import { useAccentColorSelector } from "@/redux";
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
