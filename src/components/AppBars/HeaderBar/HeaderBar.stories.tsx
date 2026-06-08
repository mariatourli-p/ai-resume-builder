import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { HeaderBar } from "./HeaderBar";

const meta: Meta<typeof HeaderBar> = {
  title: "Components/AppBars/HeaderBar",
  component: HeaderBar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof HeaderBar>;

export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<"builder" | "analysis">(
      "builder",
    );
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
  },
};

export const AnalysisTab: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<"builder" | "analysis">(
      "analysis",
    );
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
  },
};
