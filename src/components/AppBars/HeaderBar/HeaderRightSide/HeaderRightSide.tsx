import { IconDownload, IconRefresh } from "@/assets/Icons";
import { PopOverButton } from "@/components/Buttons/PopOverButton";
import {
  AIStatusBadge,
  type AIStatusBadgeProps,
} from "@/components/Feedback/AIStatusBadge";
import { enTokens } from "@/locale/en/en-tokens";
import { useAccentColorSelector } from "@/redux/selectors";
import { SettingsView } from "@/routes/HeaderBar/SettingsView";
import { PALETTE_MAP, themeConfig } from "@/theme";
import { Button, IconButton, Stack, Typography } from "@mui/material";

export type HeaderRightSideProps = {
  onRefresh: () => void;
  onExport: () => void;
  isDefaultState: boolean;
  /** Whether the built-in AI can run here, shown before the user clicks an AI button */
  aiStatus: AIStatusBadgeProps;
};

export const HeaderRightSide = ({
  onRefresh,
  isDefaultState,
  onExport,
  aiStatus,
}: HeaderRightSideProps) => {
  const accentColor = useAccentColorSelector((s) => s);

  return (
    <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
      <AIStatusBadge {...aiStatus} />

      <Typography
        sx={{
          fontSize: themeConfig.fontSize.xs,
          color: themeConfig.colors.sidebar.textMuted,
        }}
      >
        {/* Every change is saved automatically - nothing to show when empty */}
        {!isDefaultState && enTokens.export.draft_saved}
      </Typography>

      <IconButton size="small" onClick={onRefresh}>
        <IconRefresh size={16} color={themeConfig.colors.sidebar.textMuted} />
      </IconButton>

      <PopOverButton>
        <SettingsView />
      </PopOverButton>

      <Button
        onClick={onExport}
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
