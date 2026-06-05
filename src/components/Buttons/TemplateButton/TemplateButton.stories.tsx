import type { Meta, StoryObj } from "@storybook/react-vite";
import { TemplateButton } from "./TemplateButton";

const meta: Meta<typeof TemplateButton> = {
  title: "Components/SidePanel/TemplateButton",
  component: TemplateButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof TemplateButton>;

export const Default: Story = {
  args: {},
};

export const Muted: Story = {
  args: {
    sx: { color: "text.secondary" },
  },
};
