import type { Meta, StoryObj } from "@storybook/react-vite";
import { AIStatusPanel } from "./AIStatusPanel";

const meta: Meta<typeof AIStatusPanel> = {
  title: "Components/Settings/AIStatusPanel",
  component: AIStatusPanel,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Built-in browser AI",
    description: "Free · no account or key · runs on your device",
  },
};

export default meta;

type Story = StoryObj<typeof AIStatusPanel>;

export const Ready: Story = {
  args: {
    note: "Ready - nothing leaves your device.",
  },
};

export const Downloadable: Story = {
  args: {
    note: "The AI model needs a one-time download (a few minutes). You can start it now or it starts on first use.",
    action: {
      label: "Download AI model",
      onClick: () => console.log("download"),
    },
  },
};

export const Downloading: Story = {
  args: {
    note: "Downloading the AI model (one time)… 45%",
    progress: 0.45,
  },
};

export const Unsupported: Story = {
  args: {
    note: "Not supported in this browser. The AI features need a recent desktop version of Google Chrome.",
    noteSeverity: "warning",
  },
};
