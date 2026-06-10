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
    title: "⚙️ Settings",
    inputLabel: "PERSONAL ANTHROPIC API KEY",
    linkLabel: "Get free key ↗",
    linkHref: "https://console.anthropic.com",
    inputPlaceholder: "Anthropic API Key (sk-ant-...)",
    footerText:
      "Provide your own Anthropic API Key to enable AI features. Your key is stored securely in localStorage.",
    storageKey: "resume_anthropic_key",
  },
};
