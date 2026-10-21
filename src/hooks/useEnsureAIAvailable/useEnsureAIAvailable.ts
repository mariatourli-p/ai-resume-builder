import { toggleDialog } from "@/redux/resume/resume-reducer";
import { useAppDispatch } from "@/redux/store";
import { useAISettings } from "@/routes/AISettings/useAISettings";
import { useCallback } from "react";

/**
 * Guards AI actions: returns `false` and explains why when the built-in AI
 * model can't run - in another browser, or on a computer that doesn't meet
 * Chrome's requirements.
 */
export const useEnsureAIAvailable = () => {
  const dispatch = useAppDispatch();
  const { unsupportedReason } = useAISettings();

  const ensureAIAvailable = useCallback((): boolean => {
    if (unsupportedReason) {
      dispatch(toggleDialog({ type: "aiError", message: unsupportedReason }));
      return false;
    }
    return true;
  }, [unsupportedReason, dispatch]);

  return { ensureAIAvailable };
};
