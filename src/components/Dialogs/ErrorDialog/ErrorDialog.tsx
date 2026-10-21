import { enTokens } from "@/locale/en";
import { WarningAmberRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";

type ErrorDialogProps = {
  onClose: () => void;
  title: string;
  subtitle: string;
  description: string;
  confirmLabel?: string;
};

/**
 * Explains why an AI action couldn't run, with a single confirm button.
 *
 * @example
 * <ErrorDialog
 *   onClose={close}
 *   title="AI request failed"
 *   subtitle="Something went wrong"
 *   description="Please try again in a moment."
 * />
 */
export const ErrorDialog = ({
  onClose,
  title,
  subtitle,
  description,
  confirmLabel = enTokens.aiErrors.gotIt,
}: ErrorDialogProps) => (
  <Dialog
    open
    onClose={onClose}
    slotProps={{
      paper: {
        sx: { borderRadius: 3, p: 1, maxWidth: 440, width: "100%" },
      },
    }}
  >
    <DialogContent
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        pt: 4,
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          backgroundColor: "#FCEBEB",
          border: "1.5px solid #F7C1C1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WarningAmberRounded sx={{ color: "#A32D2D", fontSize: 28 }} />
      </Box>

      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "error.main",
            letterSpacing: 1.2,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", lineHeight: 1.8 }}
      >
        {description}
      </Typography>

      <Divider sx={{ width: "100%" }} />

      <Button
        fullWidth
        variant="contained"
        onClick={onClose}
        sx={{ borderRadius: 2, textTransform: "none", py: 1.2 }}
      >
        {confirmLabel}
      </Button>
    </DialogContent>
  </Dialog>
);
