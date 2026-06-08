import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResumeButton } from "./ResumeButton";

const meta: Meta<typeof ResumeButton> = {
  title: "Components/SectionsBarButtons/ResumeButton",
  component: ResumeButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ResumeButton>;

export const DefaultResumeButton: Story = {
  args: {},
};

export const MutedResumeButton: Story = {
  args: {
    style: { color: "text.secondary" },
  },
};
