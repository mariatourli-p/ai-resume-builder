import { IconDownload, IconHistory, IconRefresh } from "@/assets/Icons";
import { PopOverButton } from "@/components/Buttons/PopOverButton";
import { enTokens } from "@/locale/en/en-tokens";
import { useAccentColorSelector } from "@/redux/selectors";
import { SettingsView } from "@/routes/HeaderBar/SettingsView";
import { PALETTE_MAP, themeConfig } from "@/theme";
import { Button, IconButton, Stack, Typography } from "@mui/material";

export const HeaderRightSide = () => {
  const accentColor = useAccentColorSelector((s) => s);

  return (
    <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
      <Typography
        sx={{
          fontSize: themeConfig.fontSize.xs,
          color: themeConfig.colors.sidebar.textMuted,
        }}
      >
        {enTokens.export.draft_saved}
      </Typography>

      <IconButton size="small">
        <IconRefresh size={16} color={themeConfig.colors.sidebar.textMuted} />
      </IconButton>

      <IconButton size="small">
        <IconHistory size={16} color={themeConfig.colors.sidebar.textMuted} />
      </IconButton>

      <PopOverButton>
        <SettingsView />
      </PopOverButton>

      <Button
        variant="outlined"
        size="small"
        sx={{
          textTransform: "none",
          fontWeight: 600,
          borderColor: themeConfig.colors.sidebar.border,
          color: accentColor,
          "& .Mui-selected": {
            backgroundColor: PALETTE_MAP[accentColor]?.light,
          },
          borderRadius: themeConfig.borderRadius[8],
        }}
      >
        {enTokens.export.save_draft}
      </Button>

      <Button
        variant="contained"
        size="small"
        startIcon={<IconDownload size={14} />}
        sx={{
          textTransform: "none",
          fontWeight: 600,
          backgroundColor: accentColor,
          borderRadius: themeConfig.borderRadius[8],
          boxShadow: "none",
          "& .Mui-selected": {
            backgroundColor: PALETTE_MAP[accentColor]?.light,
          },
        }}
      >
        {enTokens.export.export_pdf}
      </Button>
    </Stack>
  );
};
