import { Route, Routes } from "react-router-dom";
import { HOME_PAGE_PATH, HomePage } from "./routes/HomePage";
import { ProfileBuilder } from "./routes/ProfileBuilder/ProfileBuilder";
import { PROFILE_BUILDER_PATH } from "./routes/ProfileBuilder/profile-builder-config";

export const AppView = () => {
  return (
    <Routes>
      <Route path={HOME_PAGE_PATH} element={<HomePage />} />
      <Route path={PROFILE_BUILDER_PATH} element={<ProfileBuilder />} />
    </Routes>
  );
};
