import { Box, Chip, Tooltip } from "@mui/material";

export type AIStatusTone = "success" | "info" | "warning" | "error" | "neutral";

export type AIStatusBadgeProps = {
  /** Short status, e.g. "AI ready" */
  label: string;
  /** What the status means and what the user can do, shown on hover */
  tooltip: string;
  tone: AIStatusTone;
};

/** Dot color per tone */
const TONE_COLOR: Record<AIStatusTone, string> = {
  success: "success.main",
  info: "info.main",
  warning: "warning.main",
  error: "error.main",
  neutral: "text.disabled",
};

/**
 * Small header badge that tells the user, before they click an AI button,
 * whether the built-in AI can run on their computer. Hovering shows why.
 * Purely presentational - the parent decides the status.
 *
 * @example
 * <AIStatusBadge label="AI ready" tooltip="Ready - nothing leaves your device." tone="success" />
 */
export const AIStatusBadge = ({ label, tooltip, tone }: AIStatusBadgeProps) => (
  <Tooltip title={tooltip} arrow>
    <Chip
      size="small"
      variant="outlined"
      label={label}
      icon={
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: TONE_COLOR[tone],
          }}
        />
      }
      sx={{ fontWeight: 600, fontSize: 12, "& .MuiChip-icon": { ml: 1 } }}
    />
  </Tooltip>
);
