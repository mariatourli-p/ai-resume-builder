import type { DialogType } from "@/redux/resume/resume-reducer";
import { useAppSelector } from "@/redux/store";

export const useDialogType = (): DialogType =>
  useAppSelector((s) => s.resume.dialogType);
