import { HOME_PAGE_PATH } from "@/routes/HomePage";
import { PROFILE_BUILDER_PATH } from "@/routes/ProfileBuilder/profile-builder-config";
import { useNavigate } from "react-router-dom";

export function useAppNavigate() {
  const navigate = useNavigate();

  return {
    goHome: () => navigate(HOME_PAGE_PATH),
    goToBuilder: () => navigate(PROFILE_BUILDER_PATH),
  };
}
