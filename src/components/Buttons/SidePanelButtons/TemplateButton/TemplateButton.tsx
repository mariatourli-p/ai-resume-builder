import { IconTemplate } from "@/assets/Icons";
import { enTokens } from "@/locale/en/en-tokens";
import { Typography } from "@mui/material";
import type { SxProps } from "node_modules/@mui/material";

export type TemplateButtonProps = {
  sx: SxProps;
};

/**
 * A pre-labeled typography button for the Templates settings entry point.
 *
 * Renders an overline `Typography` with a template icon and a label sourced
 * from `enTokens.settings.templates` — no text prop needed.
 * Accepts `sx` for style overrides.
 *
 * @example
 * <TemplateButton sx={{}} />
 */
export const TemplateButton = ({ sx }: TemplateButtonProps) => {
  const { templates } = enTokens.settings;

  return (
    <Typography
      variant="overline"
      sx={{ display: "flex", alignItems: "center", gap: 1, ...sx }}
    >
      <IconTemplate size={16} />
      {templates}
    </Typography>
  );
};
