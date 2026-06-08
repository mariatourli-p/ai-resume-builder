import type { Meta, StoryObj } from "@storybook/react-vite";
import { OptimizeResumeButton } from "./OptimizeResumeButton";
import { IconAI } from "@/assets/Icons";

const meta: Meta<typeof OptimizeResumeButton> = {
  title: "Components/SectionsBarButtons/OptimizeResumeButton",
  component: OptimizeResumeButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof OptimizeResumeButton>;

export const DefaultOptimizeResumeButton: Story = {
  args: {
    icon: <IconAI />,
    onOptimize: async () => {
      await new Promise((res) => setTimeout(res, 3000));
    },
  },
};
