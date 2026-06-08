// TopBar.tsx
import { useState } from "react";
import { AppHeader } from "@/components/AppBars/AppHeader/AppHeader";

export type Tab = "builder" | "analysis";

export const TopBar = () => {
  const [activeTab, setActiveTab] = useState<Tab>("builder");
  const [settingsAnchor, setSettingsAnchor] =
    useState<HTMLButtonElement | null>(null);

  return (
    <AppHeader
      activeTab={activeTab}
      onTabChange={setActiveTab}
      settingsAnchor={settingsAnchor}
      onSettingsOpen={(e) => setSettingsAnchor(e.currentTarget)}
      onSettingsClose={() => setSettingsAnchor(null)}
    />
  );
};
