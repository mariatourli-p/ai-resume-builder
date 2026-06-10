import type { Meta, StoryObj } from "@storybook/react-vite";
import { SettingsHeader } from "./SettingsHeader";
import { IconSettings } from "@/assets/Icons";
import { themeConfig } from "@/theme";

const meta: Meta<typeof SettingsHeader> = {
  title: "Components/Settings/SettingsHeader",
  component: SettingsHeader,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SettingsHeader>;

export const TitleOnly: Story = {
  args: {
    title: "Visual Style Customizer",
  },
};

export const WithDescription: Story = {
  args: {
    title: "Visual Style Customizer",
    description:
      "Adjust configurations here to automatically update both editor fields and resume preview sheets!",
  },
};

export const WithIconAndDescription: Story = {
  args: {
    icon: <IconSettings size={14} color={themeConfig.colors.primary.DEFAULT} />,
    title: "Visual Style Customizer",
    description:
      "Adjust configurations here to automatically update both editor fields and resume preview sheets!",
  },
};

export const WithIconOnly: Story = {
  args: {
    icon: <IconSettings size={14} color={themeConfig.colors.primary.DEFAULT} />,
    title: "Visual Style Customizer",
  },
};
