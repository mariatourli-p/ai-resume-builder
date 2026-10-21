import { ErrorDialog } from "@/components/Dialogs/ErrorDialog";
import { MoreContextDialog } from "@/components/Dialogs/MoreContextDialog";
import { enTokens } from "@/locale/en";
import { toggleDialog } from "@/redux/resume";
import { useAppDispatch, useAppSelector } from "@/redux";
import { useDialogType } from "@hooks/useDialogType";

type AIErrorCode = keyof Omit<typeof enTokens.aiErrors, "gotIt">;

const isAIErrorCode = (code: string | null): code is AIErrorCode =>
  code !== null && code !== "gotIt" && code in enTokens.aiErrors;

export const ErrorDialogView = () => {
  const dialogType = useDialogType();
  const dialogMessage = useAppSelector((s) => s.resume.dialogMessage);
  const dispatch = useAppDispatch();

  const close = () => dispatch(toggleDialog(null));

  const aiError = isAIErrorCode(dialogMessage)
    ? enTokens.aiErrors[dialogMessage]
    : enTokens.aiErrors.request_failed;

  return (
    <>
      {dialogType === "aiError" && (
        <ErrorDialog
          onClose={close}
          title={aiError.title}
          subtitle={aiError.subtitle}
          description={aiError.description}
        />
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
