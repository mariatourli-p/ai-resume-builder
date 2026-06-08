import {
  SectionButton,
  type SectionButtonProps,
} from "@/components/Buttons/SectionButton";
import { enTokens } from "@/locale/en/en-tokens";

export type ResumeButtonProps = Omit<SectionButtonProps, "text">;

/**
 * A pre-labeled variant of `SectionButton` for the Resume Sections entry point.
 *
 * Text is sourced internally from `enTokens.app.resume_sections` — no `text` prop needed.
 * Accepts all `TextButtonProps` except `text`, so `sx` and `iconStyle` can still be overridden.
 *
 * @example
 * <ResumeButton />
 */
export const ResumeButton = ({ sx, iconStyle }: ResumeButtonProps) => {
  const { resume_sections } = enTokens.app;

  return <SectionButton text={resume_sections} sx={sx} iconStyle={iconStyle} />;
};
