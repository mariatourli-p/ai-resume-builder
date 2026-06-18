import { enTokens } from "@/locale/en/en-tokens";
import { themeConfig } from "@/theme/themeConfig";
import { AutoFixHighRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const t = enTokens.moreContextDialog;

type MoreContextDialogProps = {
  onClose: () => void;
};

export const MoreContextDialog = ({ onClose }: MoreContextDialogProps) => {
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
            backgroundColor: themeConfig.colors.ai.surface,
            border: `1.5px solid ${themeConfig.colors.ai.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AutoFixHighRounded
            sx={{ color: themeConfig.colors.ai.accent, fontSize: 28 }}
          />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
            {t.title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: themeConfig.colors.ai.accent,
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
          {t.description}
        </Typography>

        <Box
          sx={{
            width: "100%",
            backgroundColor: themeConfig.colors.primary.surface,
            border: `1px solid ${themeConfig.colors.primary.border}`,
            borderLeft: `3px solid ${themeConfig.colors.primary.DEFAULT}`,
            borderRadius: "0 8px 8px 0",
            p: 1.5,
            textAlign: "left",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: themeConfig.colors.primary.text,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontWeight: 600,
              display: "block",
              mb: 0.5,
            }}
          >
            {t.structureLabel}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontStyle: "italic",
              lineHeight: 1.7,
            }}
          >
            {t.structureExample}
          </Typography>
        </Box>

        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {t.hint}
        </Typography>

        <Divider sx={{ width: "100%" }} />

        <Stack direction="row" sx={{ width: "100%", pt: 0.5 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              py: 1.2,
              backgroundColor: themeConfig.colors.sidebar.cta,
              "&:hover": { backgroundColor: "#1f2937" },
            }}
          >
            {t.cta}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
