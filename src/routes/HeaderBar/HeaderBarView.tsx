import { HeaderBar } from "@/components/AppBars/HeaderBar/HeaderBar";
import { persistor, resetAll, useAppDispatch } from "@/redux/store";
import { useIsDefaultState } from "@hooks/useIsDefaultState";
import type { SxProps } from "@mui/material";
import { useCallback, useState } from "react";
import { useApiKey } from "../ApiKey/useApiKey";

export type Tab = "builder" | "analysis";

export type HeaderBarViewProps = {
  sx?: SxProps;
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
export const HeaderBarView = () => {
  const [activeTab, setActiveTab] = useState<Tab>("builder");
  const dispatch = useAppDispatch();
  const isDefault = useIsDefaultState();
  const { clearApiKey } = useApiKey();

  const onRefresh = useCallback(async () => {
    // clears localStorage
    await persistor.purge();
    clearApiKey();
    dispatch(resetAll()); // resets redux state
  }, [clearApiKey, dispatch]);

  return (
    <HeaderBar
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onRefresh={onRefresh}
      isDefaultState={isDefault}
    />
  );
};
