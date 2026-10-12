import { enTokens } from "@/locale/en/en-tokens";
import type { SxProps } from "node_modules/@mui/material/styles";
import { TextButton } from "../../BaseButtons/TextButton";

export type ResumeButtonProps = { style?: SxProps };

/**
 * A pre-labeled variant of `TextButton` for the Resume Sections entry point.
 *
 * Text is sourced internally from `enTokens.app.resume_sections` — no `text` prop needed.
 * Accepts all `TextButtonProps` except `text`, so `sx` and `iconStyle` can still be overridden.
 *
 * @example
 * <ResumeButton />
 */
export const ResumeButton = ({ style }: ResumeButtonProps) => {
  const { resume_sections } = enTokens.app;

  return <TextButton text={resume_sections} sx={style} />;
};
