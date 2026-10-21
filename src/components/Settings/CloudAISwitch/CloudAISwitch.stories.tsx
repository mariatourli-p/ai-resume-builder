import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloudAISwitch } from "./CloudAISwitch";

const meta: Meta<typeof CloudAISwitch> = {
  title: "Components/Settings/CloudAISwitch",
  component: CloudAISwitch,
  args: {
    checked: true,
    onChange: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof CloudAISwitch>;

export const On: Story = {};

export const Off: Story = { args: { checked: false } };
