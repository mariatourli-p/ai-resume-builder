import { BrowserRouter } from "react-router-dom";
import { AppView } from "./AppView";
import { ThemeProvider } from "@mui/material";
import { createMuiTheme } from "./theme/muiThemeConfig";
import { ApiKeyProvider } from "./routes/ApiKey/ApiKeyProvider";
import { useAccentColorSelector } from "@/redux/selectors";
import { useMemo } from "react";

export const App = () => {
  const accentColor = useAccentColorSelector((s) => s);
  const theme = useMemo(() => createMuiTheme(accentColor), [accentColor]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ApiKeyProvider>
          <AppView />
        </ApiKeyProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
