import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Typography } from "@mui/material";
import { PopOverButton } from "./PopOverButton";

const meta: Meta<typeof PopOverButton> = {
  title: "Components/Buttons/PopOverButton",
  component: PopOverButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof PopOverButton>;

export const WithSimpleContent: Story = {
  args: {
    children: (
      <Box sx={{ p: 2 }}>
        <Typography>Simple popover content</Typography>
      </Box>
    ),
  },
};

export const WithSettingsContent: Story = {
  args: {
    children: (
      <Box sx={{ p: 2.5 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 13,
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          ⚙️ Settings
        </Typography>
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
          Anthropic API Key goes here
        </Typography>
      </Box>
    ),
  },
};
