import { MissingApiKeyDialog } from "@/components/Dialogs/MissingApiKeyDialog";
import { toggleDialog } from "@/redux/resume/resume-reducer";
import { useAppDispatch } from "@/redux/store";
import { useDialogType } from "@hooks/useDialogType";

export const ErrorDialogView = () => {
  const dialogType = useDialogType();
  const dispatch = useAppDispatch();
  const close = () => dispatch(toggleDialog(null));

  return (
    dialogType === "missingApiKey" && <MissingApiKeyDialog onClose={close} />
  );
};
