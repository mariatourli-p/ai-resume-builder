import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloudConsentDialog } from "./CloudConsentDialog";

const meta: Meta<typeof CloudConsentDialog> = {
  title: "Components/Dialogs/CloudConsentDialog",
  component: CloudConsentDialog,
  args: {
    open: true,
    onChoose: () => {},
    onClose: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof CloudConsentDialog>;

export const Default: Story = {};
