import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextButton } from "./TextButton";

const meta: Meta<typeof TextButton> = {
  title: "Components/Buttons/TextButton",
  component: TextButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof TextButton>;

export const Default: Story = {
  args: {
    text: "Button",
  },
};
