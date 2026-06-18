import type { Meta, StoryObj } from "@storybook/react-vite";
import { MoreContextDialog } from "./MoreContextDialog";

const meta: Meta<typeof MoreContextDialog> = {
  title: "Dialogs/MoreContextDialog",
  component: MoreContextDialog,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof MoreContextDialog>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
};
