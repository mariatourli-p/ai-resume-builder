import type { Meta, StoryObj } from "@storybook/react-vite";
import { MissingApiKeyDialog } from "./MissingApiKeyDialogDialog";

const meta: Meta<typeof MissingApiKeyDialog> = {
  title: "Dialogs/MissingApiKeyDialog",
  component: MissingApiKeyDialog,
  args: {
    onClose: () => console.log("closed"),
  },
};

export default meta;

type Story = StoryObj<typeof MissingApiKeyDialog>;

export const Default: Story = {};
