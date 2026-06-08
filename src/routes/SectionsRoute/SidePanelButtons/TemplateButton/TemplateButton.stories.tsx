import type { Meta, StoryObj } from "@storybook/react-vite";
import { TemplateButton } from "./TemplateButton";

const meta: Meta<typeof TemplateButton> = {
  title: "Components/SectionsButtons/TemplateButton",
  component: TemplateButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof TemplateButton>;

export const DefaultTemplateButton: Story = {
  args: {},
};

export const MutedTemplateButton: Story = {
  args: {
    sx: { color: "text.secondary" },
  },
};
