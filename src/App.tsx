import { BrowserRouter } from "react-router-dom";
import { AppView } from "./AppView";

export const App = () => {
  return (
    <BrowserRouter>
      <AppView />
    </BrowserRouter>
  );
};

export default App;
