import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AppHeader } from "./AppHeader";

const meta: Meta<typeof AppHeader> = {
  title: "Components/AppBars/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof AppHeader>;

export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<"builder" | "analysis">(
      "builder",
    );
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
      <AppHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        settingsAnchor={settingsAnchor}
        onSettingsOpen={(e) => setSettingsAnchor(e.currentTarget)}
        onSettingsClose={() => setSettingsAnchor(null)}
      />
    );
  },
};
