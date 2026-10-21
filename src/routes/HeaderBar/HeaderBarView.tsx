import { HeaderBar } from "@/components/AppBars/HeaderBar";
import { persistor, resetAll, useAppDispatch } from "@/redux";
import type { SxProps } from "@mui/material";
import { useCallback, useState } from "react";
import { useAIStatusBadge } from "../AISettings";
import { useExportContext } from "../context/ExportProvider";

export type Tab = "builder" | "analysis";

export type HeaderBarViewProps = {
  sx?: SxProps;
  /** Opens the sections drawer; passed only on mobile, where the drawer is hidden */
  onMenuClick?: () => void;
};

/**
 * TopBar manages the state for the application's top navigation bar
 * and delegates all rendering to `HeaderBar`.
 *
 * Owns the active tab (Builder / Analysis) and the settings popover anchor,
 * keeping `HeaderBar` purely presentational.
 *
 * @example
 * <HeaderBar />
 */
export const HeaderBarView = ({ onMenuClick }: HeaderBarViewProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("builder");
  const dispatch = useAppDispatch();
  const { triggerExport } = useExportContext();
  const aiStatus = useAIStatusBadge();
  const onRefresh = useCallback(async () => {
    // clears localStorage
    await persistor.purge();
    dispatch(resetAll()); // resets redux state
  }, [dispatch]);

  const onExport = useCallback(async () => {
    triggerExport();
  }, [triggerExport]);

  return (
    <HeaderBar
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onMenuClick={onMenuClick}
      onRefresh={onRefresh}
      onExport={onExport}
      aiStatus={aiStatus}
    />
  );
};
