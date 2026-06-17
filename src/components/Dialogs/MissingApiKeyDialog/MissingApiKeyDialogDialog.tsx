import { enTokens } from "@/locale/en/en-tokens";
import {
  KeyRounded,
  OpenInNewRounded,
  SettingsRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const t = enTokens.missingApiKeyDialog;

type MissingApiKeyDialogProps = {
  onClose: () => void;
};

export const MissingApiKeyDialog = ({ onClose }: MissingApiKeyDialogProps) => {
  return (
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
            backgroundColor: "#FAEEDA",
            border: "1.5px solid #FAC775",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <KeyRounded sx={{ color: "#BA7517", fontSize: 28 }} />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
            {t.title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              letterSpacing: 1.2,
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            {t.subtitle}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", lineHeight: 1.8, px: 1 }}
        >
          {t.description}{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
              fontWeight: 500,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 0.3,
            }}
          >
            {t.settingsLink}{" "}
            <SettingsRounded sx={{ fontSize: 14, verticalAlign: "middle" }} />
          </Box>{" "}
          {t.descriptionSuffix}
        </Typography>

        <Divider sx={{ width: "100%" }} />

        <Stack direction="row" spacing={1.5} sx={{ width: "100%", pt: 0.5 }}>
          <Button
            fullWidth
            variant="outlined"
            href={t.getFreeKeyUrl}
            target="_blank"
            endIcon={<OpenInNewRounded fontSize="small" />}
            sx={{ borderRadius: 2, textTransform: "none", py: 1.2 }}
          >
            {t.getFreeKey}
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            sx={{ borderRadius: 2, textTransform: "none", py: 1.2 }}
          >
            {t.addItNow}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
