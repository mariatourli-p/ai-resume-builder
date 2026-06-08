import { HeaderBar } from "@/components/AppBars/HeaderBar/HeaderBar";
import { useState } from "react";

export type Tab = "builder" | "analysis";

/**
 * TopBar manages the state for the application's top navigation bar
 * and delegates all rendering to `HeaderBar`.
 *
 * Owns the active tab (Builder / Analysis) and the settings popover anchor,
 * keeping `HeaderBar` purely presentational.
 *
 * @example
 * <TopBar />
 */
export const TopBar = () => {
  const [activeTab, setActiveTab] = useState<Tab>("builder");
  const [settingsAnchor, setSettingsAnchor] =
    useState<HTMLButtonElement | null>(null);

  return (
    <HeaderBar
      activeTab={activeTab}
      onTabChange={setActiveTab}
      settingsAnchor={settingsAnchor}
      onSettingsOpen={(e) => setSettingsAnchor(e.currentTarget)}
      onSettingsClose={() => setSettingsAnchor(null)}
    />
  );
};
