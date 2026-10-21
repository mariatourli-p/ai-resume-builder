import { toggleDialog } from "@/redux/resume/resume-reducer";
import { useAppDispatch } from "@/redux/store";
import { useAISettings } from "@/routes/AISettings/useAISettings";
import { useCallback } from "react";

/**
 * Guards AI actions. On the first AI click it asks the user whether their
 * text may be sent to the online AI, and waits for the answer.
 *
 * Resolves to `false` when the AI can't run: the user closed the consent
 * dialog, or chose to keep their text on the device and this browser or
 * computer has no built-in AI (the AI error dialog explains why).
 */
export const useEnsureAIAvailable = () => {
  const dispatch = useAppDispatch();
  const { cloudConsent, requestCloudConsent, unsupportedReason } =
    useAISettings();

  const ensureAIAvailable = useCallback(async (): Promise<boolean> => {
    const consent = cloudConsent ?? (await requestCloudConsent());
    if (!consent) return false;
    // The online AI works on any device
    if (consent === "cloud") return true;

    if (unsupportedReason) {
      dispatch(toggleDialog({ type: "aiError", message: unsupportedReason }));
      return false;
    }
    return true;
  }, [cloudConsent, requestCloudConsent, unsupportedReason, dispatch]);

  return { ensureAIAvailable };
};
