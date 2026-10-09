import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";

export type AIStatusPanelProps = {
  /** Name of the AI, e.g. "Built-in browser AI" */
  label: string;
  /** Short summary under the name, e.g. "Free · runs on your device" */
  description: string;
  /** Status note shown under the name */
  note?: string;
  noteSeverity?: "info" | "warning";
  /** Shows a progress bar under the note (`0`–`1`) */
  progress?: number;
  /** Optional button under the note, e.g. to start the model download */
  action?: { label: string; onClick: () => void };
};

/**
 * Shows which AI the app uses and whether it's ready in this browser.
 * Purely presentational - the parent owns all state.
 *
 * @example
 * ```tsx
 * <AIStatusPanel
 *   label="Built-in browser AI"
 *   description="Free · runs on your device"
 *   note="Ready - nothing leaves your device."
 * />
 * ```
 */
export const AIStatusPanel = ({
  label,
  description,
  note,
  noteSeverity = "info",
  progress,
  action,
}: AIStatusPanelProps) => (
  <Stack spacing={1.5} sx={{ width: "100%", textAlign: "left" }}>
    <Box>
      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{label}</Typography>
      <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
        {description}
      </Typography>
    </Box>

    {note && (
      <Typography
        sx={{
          fontSize: 11,
          lineHeight: 1.6,
          color: noteSeverity === "warning" ? "warning.dark" : "text.secondary",
        }}
      >
        {note}
      </Typography>
    )}

    {progress !== undefined && (
      <LinearProgress
        variant={progress > 0 ? "determinate" : "indeterminate"}
        value={progress * 100}
        sx={{ borderRadius: 1 }}
      />
    )}

    {action && (
      <Button
        size="small"
        variant="outlined"
        onClick={action.onClick}
        sx={{ alignSelf: "flex-start", borderRadius: 2, textTransform: "none" }}
      >
        {action.label}
      </Button>
    )}
  </Stack>
);
