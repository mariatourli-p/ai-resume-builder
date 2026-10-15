import type { Meta, StoryObj } from "@storybook/react-vite";
import { LicensesDialog } from "./LicensesDialog";

const meta: Meta<typeof LicensesDialog> = {
  title: "Components/Dialogs/LicensesDialog",
  component: LicensesDialog,
  args: {
    open: true,
    onClose: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof LicensesDialog>;

export const Default: Story = {};
