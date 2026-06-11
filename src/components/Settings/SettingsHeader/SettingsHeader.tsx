import { useAccentColorSelector } from "@/redux/selectors";
import { PALETTE_MAP } from "@/theme";
import { Box, Typography, type SxProps } from "@mui/material";
import type { ReactNode } from "react";

export type SettingsHeaderProps = {
  /** Icon shown to the left of the title */
  icon?: ReactNode;
  /** Title text */
  title: string;
  /** Description shown in the colored banner below the title */
  description?: string;
  sxHeader?: SxProps;
  sxDescription?: SxProps;
};

/**
 * SettingsHeader is the top section of the settings popover.
 *
 * Renders an optional icon, an uppercase title, and an optional
 * description banner with a colored background.
 *
 * Designed to be composed inside `PopOverButton` alongside `SettingsFooter`.
 *
 * @example
 * ```tsx
 * <SettingsHeader
 *   icon={<IconSettings size={14} />}
 *   title="Visual Style Customizer"
 *   description="Adjust configurations here to automatically update both editor fields and resume preview sheets!"
 * />
 * ```
 */
export const SettingsHeader = ({
  icon,
  title,
  description,
}: SettingsHeaderProps) => {
  const accentColor = useAccentColorSelector((s) => s);

  return (
    <Box sx={{ p: 2.5, pb: 0 }}>
      {/* Title row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: description ? 1.5 : 0,
        }}
      >
        {icon}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Description banner */}
      {description && (
        <Box
          sx={{
            bgcolor: accentColor,
            color: PALETTE_MAP[accentColor]?.light,
            borderRadius: 2,
            p: 1.5,
          }}
        >
          <Typography sx={{ fontSize: 12 }}>{description}</Typography>
        </Box>
      )}
    </Box>
  );
};
