import { themeConfig } from "@/theme";
import { AppBar, Toolbar } from "@mui/material";
import {
  HeaderLeftSide,
  type HeaderLeftSideProps,
} from "./HeaderLeftSide/HeaderLeftSide";
import { HeaderRightSide, type HeaderRightSideProps } from "./HeaderRightSide";

export const APP_BAR_HEIGHT = "65px";

export type HeaderBarProps = HeaderLeftSideProps & HeaderRightSideProps;

/**
 * HeaderBar is the pure UI component for the application's top navigation bar.
 *
 * Renders the app name, Builder/Analysis tab switcher, the AI status,
 * the refresh and settings buttons and the Export PDF button.
 *
 * All state is managed externally and passed in as props - this component is purely presentational.
 *
 * @param activeTab - The currently selected tab ("builder" or "analysis").
 * @param onTabChange - Callback fired when the user switches tabs.
 * @param onMenuClick - When set, shows a menu button that opens the sections drawer (mobile).
 *
 * @example
 * <HeaderBar
 *   activeTab="builder"
 *   onTabChange={setActiveTab}
 *   onRefresh= {onRefresh}
 * />
 */
export const HeaderBar = ({
  activeTab,
  onTabChange,
  onMenuClick,
  onRefresh,
  onExport,
  aiStatus,
}: HeaderBarProps) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: themeConfig.colors.white,
        borderBottom: `1px solid ${themeConfig.colors.sidebar.border}`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          gap: { xs: 1, sm: 2 },
          // MUI shrinks the toolbar on phones, but the page is laid out for APP_BAR_HEIGHT
          minHeight: 64,
        }}
      >
        <HeaderLeftSide
          activeTab={activeTab}
          onTabChange={onTabChange}
          onMenuClick={onMenuClick}
        />
        <HeaderRightSide
          onRefresh={onRefresh}
          onExport={onExport}
          aiStatus={aiStatus}
        />
      </Toolbar>
    </AppBar>
  );
};
