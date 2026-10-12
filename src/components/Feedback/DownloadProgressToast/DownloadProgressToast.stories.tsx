import type { Meta, StoryObj } from "@storybook/react-vite";
import { DownloadProgressToast } from "./DownloadProgressToast";

const meta: Meta<typeof DownloadProgressToast> = {
  title: "Feedback/DownloadProgressToast",
  component: DownloadProgressToast,
  args: {
    open: true,
  },
};

export default meta;

type Story = StoryObj<typeof DownloadProgressToast>;

export const Starting: Story = {
  args: {
    message: "Downloading the AI model (one time)… 0%",
    progress: 0,
  },
};

export const HalfWay: Story = {
  args: {
    message: "Downloading the AI model (one time)… 45%",
    progress: 0.45,
  },
};
