import { IconMenu } from "@/assets/Icons";
import { enTokens } from "@/locale/en";
import { useAccentColorSelector } from "@/redux";
import { PALETTE_MAP, themeConfig } from "@/theme";
import { IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";

export type HeaderLeftSideProps = {
  activeTab: "builder" | "analysis";
  onTabChange: (tab: "builder" | "analysis") => void;
  /** When set, shows a menu button that opens the sections drawer (mobile) */
  onMenuClick?: () => void;
};

export const HeaderLeftSide = ({
  activeTab,
  onTabChange,
  onMenuClick,
}: HeaderLeftSideProps) => {
  const accentColor = useAccentColorSelector((s) => s);

  return (
    <Stack direction="row" sx={{ alignItems: "center", gap: { xs: 1, sm: 2 } }}>
      {onMenuClick && (
        <IconButton
          size="small"
          onClick={onMenuClick}
          aria-label={enTokens.app.open_menu}
          sx={{ ml: -1 }}
        >
          <IconMenu size={20} color={themeConfig.colors.sidebar.textBody} />
        </IconButton>
      )}

      {/* App name */}
      <Typography
        sx={{
          // Phones keep the room for the Export PDF button
          display: { xs: "none", sm: "block" },
          fontWeight: 800,
          fontSize: themeConfig.fontSize.lg,
          color: themeConfig.colors.sidebar.cta,
          fontFamily: themeConfig.fontFamily.display.join(", "),
          whiteSpace: "nowrap",
        }}
      >
        {enTokens.app.title}
      </Typography>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, val) => onTabChange(val)}
        sx={{
          display: { xs: "none", md: "flex" },
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
          },
        }}
      >
        <Tab
          label={enTokens.app.builder}
          value="builder"
          disableRipple
          sx={{
            color: accentColor,
            "& .Mui-selected": {
              backgroundColor: PALETTE_MAP[accentColor]?.light,
            },
          }}
        />
        {/* <Tab
          value="analysis"
          disableRipple
          sx={{
            color: accentColor,
            "& .Mui-selected": {
              backgroundColor: PALETTE_MAP[accentColor]?.light,
            },
          }}
          label={
            <Stack direction="row" sx={{ alignItems: "center", gap: 0.5 }}>
              {enTokens.app.analysis}
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: PALETTE_MAP[accentColor]?.light,
                }}
              />
            </Stack>
          }
        /> */}
      </Tabs>
    </Stack>
  );
};
