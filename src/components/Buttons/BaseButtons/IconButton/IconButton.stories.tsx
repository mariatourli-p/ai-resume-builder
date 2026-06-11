import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./IconButton";
import { SparkleIcon } from "lucide-react";

const meta: Meta<typeof IconButton> = {
  title: "Components/Buttons/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: <SparkleIcon />,
    text: "AI Optimized Engine",
  },
};
