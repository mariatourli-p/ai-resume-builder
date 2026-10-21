import { CloudConsentDialog } from "@/components/Dialogs/CloudConsentDialog";
import { useCallback } from "react";
import { useAISettings } from "./useAISettings";

/**
 * Shows {@link CloudConsentDialog} when an AI button asks where the AI may
 * run, and saves the answer in the AI settings.
 */
export const CloudConsentDialogView = () => {
  const { isConsentDialogOpen, answerCloudConsent } = useAISettings();

  /**
   * Runs when the dialog is closed without a choice (Esc, a click outside).
   * Nothing is saved, so the next AI click asks again.
   */
  const dismiss = useCallback(
    () => answerCloudConsent(null),
    [answerCloudConsent],
  );

  return (
    <CloudConsentDialog
      open={isConsentDialogOpen}
      onChoose={answerCloudConsent}
      onClose={dismiss}
    />
  );
};
