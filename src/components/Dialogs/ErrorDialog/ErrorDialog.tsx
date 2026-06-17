import { enTokens } from "@/locale/en/en-tokens";
import {
  KeyRounded,
  OpenInNewRounded,
  WarningAmberRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const t = enTokens.errorDialog;

type ErrorDialogProps = {
  onClose: () => void;
  onRetry: (newKey: string) => void;
  errorLog?: string;
};

export const ErrorDialog = ({
  onClose,
  onRetry,
  errorLog,
}: ErrorDialogProps) => {
  const [key, setKey] = useState("");

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
            {t.title}
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
            {t.subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            border: "0.5px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: 1.5,
            textAlign: "left",
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Stack
              sx={{ flexDirection: "row", alignItems: "center", gap: 0.5 }}
            >
              <KeyRounded sx={{ fontSize: 14, color: "text.secondary" }} />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "text.secondary",
                }}
              >
                {t.inputLabel}
              </Typography>
            </Stack>
            <Link
              href={t.getFreeKeyUrl}
              target="_blank"
              variant="caption"
              sx={{ display: "flex", alignItems: "center", gap: 0.3 }}
            >
              {t.getFreeKey} <OpenInNewRounded sx={{ fontSize: 12 }} />
            </Link>
          </Stack>
          <TextField
            fullWidth
            size="small"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="sk-ant-..."
            variant="standard"
            slotProps={{ input: { disableUnderline: true } }}
          />
        </Box>

        {errorLog && (
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#FCEBEB",
              border: "0.5px solid #F7C1C1",
              borderRadius: 2,
              p: 1.5,
              textAlign: "left",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: "error.main",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {t.responsLogLabel}
            </Typography>
            <Typography
              variant="caption"
              component="pre"
              sx={{
                display: "block",
                mt: 0.5,
                color: "error.dark",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
                fontSize: 11,
              }}
            >
              {errorLog}
            </Typography>
          </Box>
        )}

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", lineHeight: 1.8 }}
        >
          {t.description}
        </Typography>

        <Divider sx={{ width: "100%" }} />

        <Stack direction="row" spacing={1.5} sx={{ width: "100%", pt: 0.5 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={onClose}
            sx={{ borderRadius: 2, textTransform: "none", py: 1.2 }}
          >
            {t.cancel}
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => onRetry(key)}
            sx={{ borderRadius: 2, textTransform: "none", py: 1.2 }}
          >
            {t.saveAndRetry}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
