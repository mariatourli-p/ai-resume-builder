import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionButton } from "./SectionButton";

const meta: Meta<typeof SectionButton> = {
  title: "Components/Buttons/SectionButton",
  component: SectionButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SectionButton>;

export const Default: Story = {
  args: {
    text: "Button",
  },
};
