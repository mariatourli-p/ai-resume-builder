import { BrowserRouter } from "react-router-dom";
import { AppView } from "./AppView";
import { ThemeProvider } from "@mui/material";
import { muiThemeConfig } from "./theme/muiThemeConfig";
import { ApiKeyProvider } from "./routes/ApiKey/ApiKeyProvider";

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={muiThemeConfig}>
        <ApiKeyProvider>
          <AppView />
        </ApiKeyProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
