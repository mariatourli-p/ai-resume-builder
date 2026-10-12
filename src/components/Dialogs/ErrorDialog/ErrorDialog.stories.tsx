import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorDialog } from "./ErrorDialog";

const meta: Meta<typeof ErrorDialog> = {
  title: "Dialogs/ErrorDialog",
  component: ErrorDialog,
  args: {
    onClose: () => console.log("closed"),
  },
};

export default meta;

type Story = StoryObj<typeof ErrorDialog>;

export const RequestFailed: Story = {
  args: {
    title: "AI request failed",
    subtitle: "Something went wrong",
    description:
      "The AI couldn't complete the request. Please try again in a moment.",
  },
};

export const BrowserUnsupported: Story = {
  args: {
    title: "AI not available in this browser",
    subtitle: "Unsupported browser",
    description:
      "The AI features run inside Google Chrome on your computer, for free. Open this page in a recent desktop version of Chrome to use them.",
  },
};

export const DeviceUnsupported: Story = {
  args: {
    title: "AI not available on this computer",
    subtitle: "Unsupported device",
    description:
      "Your Chrome supports the AI features, but this computer doesn't meet their requirements: a capable graphics card or enough memory, and free disk space for the model. Try another computer to use them.",
  },
};
