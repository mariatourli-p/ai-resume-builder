import { IconAI } from "@/assets/Icons";
import { enTokens } from "@/locale/en/en-tokens";
import { useAccentColorSelector } from "@/redux/selectors";
import { PALETTE_MAP, themeConfig } from "@/theme";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";

export type HeaderLeftSideProps = {
  activeTab: "builder" | "analysis";
  onTabChange: (tab: "builder" | "analysis") => void;
};

export const HeaderLeftSide = ({
  activeTab,
  onTabChange,
}: HeaderLeftSideProps) => {
  const accentColor = useAccentColorSelector((s) => s);

  return (
    <Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>
      {/* Logo */}
      <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: themeConfig.borderRadius[8],
            backgroundColor: accentColor,
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
          {`${enTokens.app.title}  `}
          <Box component="span">AI</Box>
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
