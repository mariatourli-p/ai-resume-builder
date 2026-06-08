import { Typography } from "@mui/material";
import type { SxProps } from "node_modules/@mui/material";

export type TextButtonProps = {
  sx?: SxProps;
  iconStyle?: string;
  text: string;
};

/**
 * A base typography button with a template icon and a text label.
 *
 * Renders an overline `Typography` with an `IconTemplate` on the left.
 * Used as the base for higher-level buttons like `ResumeButton` and `TemplateButton`.
 *
 * @param text - The label to display next to the icon.
 * @param iconStyle - Optional Tailwind class(es) to style the icon (e.g. `"text-indigo-600"`).
 * @param sx - Optional MUI `sx` overrides merged on top of the base styles.
 *
 * @example
 * <SectionButton text="Resume Sections" />
 *
 */
export const TextButton = ({ sx, text }: TextButtonProps) => {
  return (
    <Typography
      variant="overline"
      sx={{ display: "flex", alignItems: "center", gap: 1, ...sx }}
    >
      {text}
    </Typography>
  );
};
