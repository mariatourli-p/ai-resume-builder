import { themeConfig } from "@/theme";
import { Box, Divider, Typography } from "@mui/material";
import { AIStatusPanel, type AIStatusPanelProps } from "../AIStatusPanel";
import { CloudAISwitch, type CloudAISwitchProps } from "../CloudAISwitch";

export type SettingsFooterProps = {
  title: string;
  footerText: string;
  aiStatus: AIStatusPanelProps;
  /** Switch for the online AI, shown above the built-in AI status */
  cloudSwitch?: CloudAISwitchProps;
};

/**
 * AI section of the settings panel: whether the online AI is allowed, the
 * built-in AI's status in this browser, and a short privacy note.
 */
export const SettingsFooter = ({
  title,
  footerText,
  aiStatus,
  cloudSwitch,
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

    {cloudSwitch && (
      <Box sx={{ mb: 2 }}>
        <CloudAISwitch {...cloudSwitch} />
      </Box>
    )}

    <AIStatusPanel {...aiStatus} />

    <Typography sx={{ fontSize: 11, color: themeConfig.colors.black, mt: 1.5 }}>
      {footerText}
    </Typography>
  </Box>
);
