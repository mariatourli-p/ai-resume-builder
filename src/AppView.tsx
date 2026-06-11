import { Route, Routes } from "react-router-dom";
import { HOME_PAGE_PATH, HomePage } from "./routes/HomePage";

export const AppView = () => {
  return (
    <Routes>
      <Route path={HOME_PAGE_PATH} element={<HomePage />} />
    </Routes>
  );
};
