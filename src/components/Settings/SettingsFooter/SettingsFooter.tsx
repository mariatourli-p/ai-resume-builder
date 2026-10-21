import { themeConfig } from "@/theme";
import { Box, Divider, Typography } from "@mui/material";
import { AIStatusPanel, type AIStatusPanelProps } from "../AIStatusPanel";

export type SettingsFooterProps = {
  title: string;
  footerText: string;
  aiStatus: AIStatusPanelProps;
};

/**
 * AI section of the settings panel: which AI the app uses, whether it's
 * ready in this browser, and a short privacy note.
 */
export const SettingsFooter = ({
  title,
  footerText,
  aiStatus,
}: SettingsFooterProps) => (
  <Box sx={{ p: 2.5 }}>
    <Typography
      sx={{
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        mb: 2,
      }}
    >
      {title}
    </Typography>

    <Divider sx={{ mb: 2 }} />

    <AIStatusPanel {...aiStatus} />

    <Typography sx={{ fontSize: 11, color: themeConfig.colors.black, mt: 1.5 }}>
      {footerText}
    </Typography>
  </Box>
);
