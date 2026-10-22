import { Analytics } from "@vercel/analytics/react";
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
        {/* Anonymous visit counts, without cookies; it never sees the resume */}
        <Analytics />
      </ThemeProvider>
    </BrowserRouter>
  );
};
