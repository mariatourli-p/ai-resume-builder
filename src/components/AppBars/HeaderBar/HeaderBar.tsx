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
 * Renders the CareerFlow AI logo, Builder/Analysis tab switcher, autosave status,
 * action icon buttons (refresh, history, settings), a settings popover placeholder,
 * and the Save Draft / Export PDF action buttons.
 *
 * All state is managed externally and passed in as props — this component is purely presentational.
 *
 * @param activeTab - The currently selected tab ("builder" or "analysis").
 * @param onTabChange - Callback fired when the user switches tabs.
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
  onRefresh,
  isDefaultState,
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
      <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
        <HeaderLeftSide activeTab={activeTab} onTabChange={onTabChange} />
        <HeaderRightSide
          onRefresh={onRefresh}
          isDefaultState={isDefaultState}
        />
      </Toolbar>
    </AppBar>
  );
};
