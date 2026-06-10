import { IconAI, IconDownload, IconHistory, IconRefresh } from "@/assets/Icons";
import { PopOverButton } from "@/components/Buttons/PopOverButton";
import { enTokens } from "@/locale/en/en-tokens";
import { SettingsView } from "@/routes/HeaderBar/SettingsView";
import { themeConfig } from "@/theme";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  type SxProps,
} from "@mui/material";

export const APP_BAR_HEIGHT = "65px";

export type HeaderBarProps = {
  activeTab: "builder" | "analysis";
  onTabChange: (tab: "builder" | "analysis") => void;
  settingsAnchor: HTMLButtonElement | null;
  onSettingsOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSettingsClose: () => void;
  sx?: SxProps;
};

/**
 * HeaderBar is the pure UI component for the application's top navigation bar.
 *
 * Renders the CareerFlow AI logo, Builder/Analysis tab switcher, autosave status,
 * action icon buttons (refresh, history, settings), a settings popover placeholder,
 * and the Save Draft / Export PDF action buttons.
 *
 * All state is managed externally and passed in as props — this component is purely presentational.
 *
 * @param activeTab - The currently selected tab ("builder" or "analysis").
 * @param onTabChange - Callback fired when the user switches tabs.
 * @param settingsAnchor - The DOM element that anchors the settings popover.
 * @param onSettingsOpen - Callback fired when the settings icon is clicked.
 * @param onSettingsClose - Callback fired when the settings popover is closed.
 * @param sx - Callback fired when the settings popover is closed.
 *
 * @example
 * <HeaderBar
 *   activeTab="builder"
 *   onTabChange={setActiveTab}
 *   settingsAnchor={anchor}
 *   onSettingsOpen={handleOpen}
 *   onSettingsClose={handleClose}
 * />
 */
export const HeaderBar = ({ activeTab, onTabChange, sx }: HeaderBarProps) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: `1px solid ${themeConfig.colors.sidebar.border}`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ...sx,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
        {/* Left — Logo + Tabs */}
        <Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>
          {/* Logo */}
          <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: themeConfig.borderRadius[8],
                backgroundColor: themeConfig.colors.primary.DEFAULT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <IconAI size={18} />
            </Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: themeConfig.fontSize.lg,
                color: themeConfig.colors.sidebar.cta,
                fontFamily: themeConfig.fontFamily.display.join(", "),
              }}
            >
              CareerFlow{" "}
              <Box
                component="span"
                sx={{ color: themeConfig.colors.primary.DEFAULT }}
              >
                AI
              </Box>
            </Typography>
          </Stack>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={(_, val) => onTabChange(val)}
            sx={{
              minHeight: "unset",
              "& .MuiTabs-indicator": { display: "none" },
              "& .MuiTab-root": {
                minHeight: "unset",
                borderRadius: themeConfig.borderRadius[8],
                textTransform: "none",
                fontWeight: 600,
                fontSize: themeConfig.fontSize.sm,
                color: themeConfig.colors.sidebar.textBody,
                px: 2,
                py: 1,
              },
              "& .Mui-selected": {
                backgroundColor: themeConfig.colors.primary.surface,
                color: `${themeConfig.colors.primary.DEFAULT} !important`,
              },
            }}
          >
            <Tab label={enTokens.app.builder} value="builder" disableRipple />
            <Tab
              value="analysis"
              disableRipple
              label={
                <Stack direction="row" sx={{ alignItems: "center", gap: 0.5 }}>
                  {enTokens.app.analysis}
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: themeConfig.colors.ai.accentLight,
                    }}
                  />
                </Stack>
              }
            />
          </Tabs>
        </Stack>

        {/* Right — Actions */}
        <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
          <Typography
            sx={{
              fontSize: themeConfig.fontSize.xs,
              color: themeConfig.colors.sidebar.textMuted,
            }}
          >
            {enTokens.export.save_draft}
          </Typography>

          <IconButton size="small">
            <IconRefresh
              size={16}
              color={themeConfig.colors.sidebar.textMuted}
            />
          </IconButton>

          <IconButton size="small">
            <IconHistory
              size={16}
              color={themeConfig.colors.sidebar.textMuted}
            />
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
              color: themeConfig.colors.sidebar.textBody,
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
              backgroundColor: themeConfig.colors.primary.DEFAULT,
              borderRadius: themeConfig.borderRadius[8],
              boxShadow: "none",
              "&:hover": {
                backgroundColor: themeConfig.colors.primary.text,
                boxShadow: "none",
              },
            }}
          >
            {enTokens.export.export_pdf}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
