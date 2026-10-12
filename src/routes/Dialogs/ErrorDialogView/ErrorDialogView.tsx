import { ErrorDialog } from "@/components/Dialogs/ErrorDialog";
import { MissingApiKeyDialog } from "@/components/Dialogs/MissingApiKeyDialog";
import { MoreContextDialog } from "@/components/Dialogs/MoreContextDialog";
import { enTokens } from "@/locale/en/en-tokens";
import { toggleDialog } from "@/redux/resume/resume-reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useApiKey } from "@/routes/ApiKey/useApiKey";
import { useDialogType } from "@hooks/useDialogType";

export const ErrorDialogView = () => {
  const t = enTokens.settings;
  const dialogType = useDialogType();
  const dialogMessage = useAppSelector((s) => s.resume.dialogMessage);
  const dispatch = useAppDispatch();
  const { setApiKey, apiKey } = useApiKey();

  const close = () => dispatch(toggleDialog(null));

  const handleRetry = (newKey: string) => {
    if (newKey.trim()) {
      setApiKey(newKey.trim());
    }
    close();
  };

  return (
    <>
      {dialogType === "missingApiKey" && (
        <MissingApiKeyDialog
          onClose={close}
          apiKey={apiKey}
          onSave={setApiKey}
          inputPlaceholder={t.addApiKey}
        />
      )}
      {dialogType === "keyError" && (
        <ErrorDialog onClose={close} onRetry={handleRetry} />
      )}
      {dialogType === "moreContext" && (
        <MoreContextDialog
          onClose={close}
          response={dialogMessage ?? undefined}
        />
      )}
    </>
  );
};
