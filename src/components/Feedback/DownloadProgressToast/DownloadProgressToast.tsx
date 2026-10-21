import { DownloadRounded } from "@mui/icons-material";
import {
  Box,
  LinearProgress,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";

export type DownloadProgressToastProps = {
  open: boolean;
  message: string;
  /** `0`-`1`; `0` shows an indeterminate bar while the download starts */
  progress: number;
};

/**
 * Small bottom-left notification with a progress bar, used while the
 * built-in AI model downloads. Purely presentational.
 */
export const DownloadProgressToast = ({
  open,
  message,
  progress,
}: DownloadProgressToastProps) => (
  <Snackbar
    open={open}
    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
  >
    <Paper
      elevation={4}
      sx={{ borderRadius: 2, p: 1.5, width: 320, maxWidth: "100%" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <DownloadRounded sx={{ fontSize: 18, color: "primary.main" }} />
        <Typography sx={{ fontSize: 13 }}>{message}</Typography>
      </Box>
      <LinearProgress
        variant={progress > 0 ? "determinate" : "indeterminate"}
        value={progress * 100}
        sx={{ borderRadius: 1 }}
      />
    </Paper>
  </Snackbar>
);
