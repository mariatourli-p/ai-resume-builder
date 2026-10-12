import { enTokens } from "@/locale/en/en-tokens";
import {
  KeyRounded,
  OpenInNewRounded,
  SettingsRounded,
} from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const t = enTokens.missingApiKeyDialog;

type MissingApiKeyDialogProps = {
  onClose: () => void;
  apiKey: string;
  onSave: (key: string) => void;
  inputPlaceholder: string;
};

export const MissingApiKeyDialog = ({
  onClose,
  apiKey,
  onSave,
  inputPlaceholder,
}: MissingApiKeyDialogProps) => {
  const [showValue, setShowValue] = useState(false);

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
          <OutlinedInput
            fullWidth
            size="small"
            placeholder={inputPlaceholder}
            type={showValue ? "text" : "password"}
            value={apiKey}
            onChange={(e) => onSave(e.target.value.trim())}
            onBlur={(e) => onSave(e.target.value.trim())}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setShowValue((p) => !p)}
                >
                  {showValue ? (
                    <VisibilityOffIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <VisibilityIcon sx={{ fontSize: 16 }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            sx={{ borderRadius: 2, fontSize: 13 }}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
