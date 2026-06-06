import { BrowserRouter } from "react-router-dom";
import { AppView } from "./AppView";
import { ThemeProvider } from "@mui/material";
import { muiThemeConfig } from "./theme/muiThemeConfig";

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={muiThemeConfig}>
        <AppView />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
