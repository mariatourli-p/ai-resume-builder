import { ErrorDialog } from "@/components/Dialogs/ErrorDialog";
import { MissingApiKeyDialog } from "@/components/Dialogs/MissingApiKeyDialog";
import { toggleDialog } from "@/redux/resume/resume-reducer";
import { useAppDispatch } from "@/redux/store";
import { useApiKey } from "@/routes/ApiKey/useApiKey";
import { useDialogType } from "@hooks/useDialogType";

export const ErrorDialogView = () => {
  const dialogType = useDialogType();
  const dispatch = useAppDispatch();
  const { setApiKey } = useApiKey();

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
        <MissingApiKeyDialog onClose={close} />
      )}
      {dialogType === "keyError" && (
        <ErrorDialog onClose={close} onRetry={handleRetry} />
      )}
    </>
  );
};
