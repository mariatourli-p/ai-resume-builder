import type { Meta, StoryObj } from "@storybook/react-vite";
import { AIOptimizedButton } from "./AIOptimizedButton";
import { SparkleIcon } from "lucide-react";

const meta: Meta<typeof AIOptimizedButton> = {
  title: "Components/SidePanel/Buttons/AIOptimizedButton",
  component: AIOptimizedButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof AIOptimizedButton>;

export const DefaultAIOptimizedButton: Story = {
  args: {
    icon: <SparkleIcon />,
    text: "AI Optimized",
  },
};
