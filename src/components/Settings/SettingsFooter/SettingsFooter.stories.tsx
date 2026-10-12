import type { Meta, StoryObj } from "@storybook/react-vite";
import { SettingsFooter } from "./SettingsFooter";

const meta: Meta<typeof SettingsFooter> = {
  title: "Components/Settings/SettingsFooter",
  component: SettingsFooter,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SettingsFooter>;

export const Default: Story = {
  args: {
    title: "AI Assistant",
    footerText:
      "Free for everyone. The AI runs inside Chrome on your computer, so your resume is never sent to an AI service.",
    aiStatus: {
      label: "Built-in browser AI",
      description: "Free · no account or key · runs on your device",
      note: "Ready - nothing leaves your device.",
    },
  },
};
