import { Box, Stack, Divider, Drawer, type SxProps } from "@mui/material";
import { IconAI } from "@/assets/Icons";
import { themeConfig } from "@/theme";
import { ResumeButton } from "@/components/Buttons/SectionsBarButtons/ResumeButton";
import { AIOptimizedButton } from "@/components/Buttons/SectionsBarButtons/AIOptimizedButton";
import { TemplateButton } from "@/components/Buttons/SectionsBarButtons/TemplateButton";
import { OptimizeResumeButton } from "@/components/Buttons/SectionsBarButtons/OptimizeResumeButton/OptimizeResumeButton";
import { SidePanelMenu } from "@/components/AppBars/SectionsBar";
import { APP_BAR_HEIGHT } from "@/components/AppBars/HeaderBar";

export const DRAWER_WIDTH = 280;

export type SideDrawerProps = {
  sectionItems: { text: string; icon: React.ReactNode }[];
  templateItems: { text: string; icon: React.ReactNode | null }[];
  brandingColors: string[];
  activeSection: string;
  onSectionClick: (text: string) => void;
  activeTemplate: string;
  onTemplateClick: (text: string) => void;
  activeColor: string;
  onColorClick: (color: string) => void;
  sx?: SxProps;
};

export const SideDrawer = ({
  sectionItems,
  templateItems,
  brandingColors,
  activeSection,
  onSectionClick,
  activeTemplate,
  onTemplateClick,
  activeColor,
  onColorClick,
  sx,
}: SideDrawerProps) => {
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
                backgroundColor: themeConfig.colors.primary.DEFAULT,
                color: "#ffffff",
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
                border: `1.5px solid ${themeConfig.colors.primary.DEFAULT}`,
                backgroundColor: themeConfig.colors.primary.surface,
                color: themeConfig.colors.primary.text,
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
            {brandingColors.map((color) => (
              <Box
                key={color}
                onClick={() => onColorClick(color)}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: color,
                  cursor: "pointer",
                  border:
                    activeColor === color
                      ? `2px solid ${themeConfig.colors.sidebar.cta}`
                      : "2px solid transparent",
                  outline:
                    activeColor === color
                      ? `2px solid ${color}`
                      : "2px solid transparent",
                  transition: "outline 0.15s ease",
                }}
              />
            ))}
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
