import { toggleDialog } from "@/redux/resume/resume-reducer";
import { useAppDispatch } from "@/redux/store";
import { useAISettings } from "@/routes/AISettings/useAISettings";
import { useCallback } from "react";

/**
 * Guards AI actions: returns `false` and explains why when this browser
 * can't run the built-in AI model.
 */
export const useRequireAIProvider = () => {
  const dispatch = useAppDispatch();
  const { isReady } = useAISettings();

  const requireAIProvider = useCallback((): boolean => {
    if (!isReady) {
      dispatch(toggleDialog({ type: "aiError", message: "unsupported" }));
      return false;
    }
    return true;
  }, [isReady, dispatch]);

  return { requireAIProvider };
};
