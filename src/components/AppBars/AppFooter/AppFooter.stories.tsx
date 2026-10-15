import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppFooter } from "./AppFooter";

const meta: Meta<typeof AppFooter> = {
  title: "Components/AppBars/AppFooter",
  component: AppFooter,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof AppFooter>;

export const Default: Story = {};
