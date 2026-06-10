import { Box, Stack, Divider, Drawer, type SxProps } from "@mui/material";
import { IconAI } from "@/assets/Icons";
import { themeConfig } from "@/theme";
import { ResumeButton } from "@/components/Buttons/SectionsBarButtons/ResumeButton";
import { AIOptimizedButton } from "@/components/Buttons/SectionsBarButtons/AIOptimizedButton";
import { TemplateButton } from "@/components/Buttons/SectionsBarButtons/TemplateButton";
import { OptimizeResumeButton } from "@/components/Buttons/SectionsBarButtons/OptimizeResumeButton/OptimizeResumeButton";
import { SidePanelMenu } from "@/components/AppBars/SectionsBar";
import { APP_BAR_HEIGHT } from "@/components/AppBars/HeaderBar";
import { BrandingColorsView } from "@/components/AppBars/SectionsBar/BrandingColors/BrandingColorsView";
import { useAccentColorSelector } from "@/redux/selectors";

export const DRAWER_WIDTH = 280;

export type SideDrawerProps = {
  sectionItems: { text: string; icon: React.ReactNode }[];
  templateItems: { text: string; icon: React.ReactNode | null }[];
  activeSection: string;
  onSectionClick: (text: string) => void;
  activeTemplate: string;
  onTemplateClick: (text: string) => void;
  sx?: SxProps;
};

export const SideDrawer = ({
  sectionItems,
  templateItems,
  activeSection,
  onSectionClick,
  activeTemplate,
  onTemplateClick,
  sx,
}: SideDrawerProps) => {
  const accentColor = useAccentColorSelector((s) => s);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          top: APP_BAR_HEIGHT,
          height: `calc(100vh - ${APP_BAR_HEIGHT})`,
          backgroundColor: themeConfig.colors.sidebar.surface,
          borderRight: `1px solid ${themeConfig.colors.sidebar.border}`,
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        },
        ...sx,
      }}
    >
      <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
        {/* Top */}
        <Box>
          {/* Resume Sections */}
          <Box sx={{ px: 2, pt: 2, pb: 1 }}>
            <ResumeButton
              style={{ color: themeConfig.colors.sidebar.textMuted }}
            />
            <AIOptimizedButton icon={<IconAI size={14} />} />
          </Box>

          {/* Resume Sections */}
          <SidePanelMenu
            items={sectionItems.map((item) => ({
              ...item,
              baseStyle: { height: themeConfig.spacing[48] },
              style: {
                backgroundColor: accentColor,
              },
            }))}
            activeItem={activeSection}
            onItemClick={onSectionClick}
          />

          <Divider sx={{ mx: 2 }} />

          {/* Templates */}
          <Box sx={{ px: 2, pt: 2, pb: 1 }}>
            <TemplateButton />
          </Box>

          <SidePanelMenu
            items={templateItems.map((item) => ({
              ...item,
              style: {
                border: `1.5px solid ${accentColor}`,
                backgroundColor: `${accentColor}18`,
                color: accentColor,
              },
            }))}
            activeItem={activeTemplate}
            onItemClick={onTemplateClick}
          />

          <Divider sx={{ mx: 2 }} />

          {/* Branding Colors */}
          <Box sx={{ px: 2, pt: 2, pb: 1 }}>
            {/* BrandingColorsLabel goes here when you have it */}
          </Box>

          <Box sx={{ display: "flex", gap: 1, px: 2, pb: 2 }}>
            <BrandingColorsView />
          </Box>
        </Box>

        {/* Bottom — pinned */}
        <Box sx={{ p: 2 }}>
          <OptimizeResumeButton
            icon={<IconAI />}
            onOptimize={async () => {
              await new Promise((res) => setTimeout(res, 3000));
            }}
          />
        </Box>
      </Stack>
    </Drawer>
  );
};
