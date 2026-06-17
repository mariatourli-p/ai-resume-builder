import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorDialog } from "./ErrorDialog";

const meta: Meta<typeof ErrorDialog> = {
  title: "Dialogs/ErrorDialog",
  component: ErrorDialog,
  args: {
    onClose: () => console.log("closed"),
    onRetry: (key) => console.log("retry with key:", key),
  },
};

export default meta;

type Story = StoryObj<typeof ErrorDialog>;

export const Default: Story = {};

export const WithErrorLog: Story = {
  args: {
    errorLog: `{"error":{"code":400,"message":"API key not valid. Please pass a valid API key.","status":"INVALID_ARGUMENT"}}`,
  },
};

export const WithLongErrorLog: Story = {
  args: {
    errorLog: `{"error":{"code":400,"message":"API key not valid. Please pass a valid API key.","status":"INVALID_ARGUMENT","details":[{"@type":"type.googleapis.com/google.rpc.ErrorInfo","reason":"API_KEY_INVALID","domain":"googleapis.com","metadata":{"service":"generativelanguage.googleapis.com"}}]}}`,
  },
};
