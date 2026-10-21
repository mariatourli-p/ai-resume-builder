import type { DialogType } from "@/redux/resume";
import { useAppSelector } from "@/redux";

export const useDialogType = (): DialogType =>
  useAppSelector((s) => s.resume.dialogType);
