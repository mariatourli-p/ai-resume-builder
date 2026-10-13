import { store } from "@/redux/store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Provider } from "react-redux";
import { HeaderBar } from "./HeaderBar";

const meta: Meta<typeof HeaderBar> = {
  title: "Components/AppBars/HeaderBar",
  component: HeaderBar,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HeaderBar>;

export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<"builder" | "analysis">(
      "builder",
    );
    return (
      <HeaderBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onRefresh={() => {}}
        onExport={() => {}}
        isDefaultState={false}
        aiStatus={{
          label: "AI ready",
          tooltip: "Ready - nothing leaves your device.",
          tone: "success",
        }}
      />
    );
  },
};

export const AnalysisTab: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<"builder" | "analysis">(
      "analysis",
    );
    return (
      <HeaderBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onRefresh={() => {}}
        onExport={() => {}}
        isDefaultState={false}
        aiStatus={{
          label: "AI not supported",
          tooltip:
            "Not supported in this browser. The AI features need a recent desktop version of Google Chrome.",
          tone: "warning",
        }}
      />
    );
  },
};
