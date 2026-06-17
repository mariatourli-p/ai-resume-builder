import { toggleDialog } from "@/redux/resume/resume-reducer";
import { useAppDispatch } from "@/redux/store";
import { useApiKey } from "@/routes/ApiKey/useApiKey";
import { useCallback } from "react";

export const useRequireApiKey = () => {
  const dispatch = useAppDispatch();
  const { apiKey } = useApiKey();

  const requireApiKey = useCallback((): boolean => {
    if (!apiKey) {
      dispatch(toggleDialog("missingApiKey"));
      return false;
    }
    return true;
  }, [apiKey, dispatch]);

  return { requireApiKey };
};
