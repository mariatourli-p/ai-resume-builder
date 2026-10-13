import type { Meta, StoryObj } from "@storybook/react-vite";
import { AIStatusBadge } from "./AIStatusBadge";

const meta: Meta<typeof AIStatusBadge> = {
  title: "Components/Feedback/AIStatusBadge",
  component: AIStatusBadge,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof AIStatusBadge>;

export const Ready: Story = {
  args: {
    label: "AI ready",
    tooltip: "Ready - nothing leaves your device.",
    tone: "success",
  },
};

export const Downloading: Story = {
  args: {
    label: "AI downloading 45%",
    tooltip: "Downloading the AI model (one time)… 45%",
    tone: "info",
  },
};

export const NotSupported: Story = {
  args: {
    label: "AI not supported",
    tooltip:
      "Your Chrome supports the AI, but this computer doesn't meet its requirements (graphics card, memory or free disk space).",
    tone: "warning",
  },
};

export const DownloadFailed: Story = {
  args: {
    label: "AI download failed",
    tooltip:
      "The AI model download didn't finish. Check that you have at least 22 GB of free disk space and a stable internet connection, then try again.",
    tone: "error",
  },
};
