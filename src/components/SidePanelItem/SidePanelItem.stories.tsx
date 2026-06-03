import type { Meta, StoryObj } from "@storybook/react-vite";
import { List } from "@mui/material";
import {
  IconPersonal,
  IconExperience,
  IconEducation,
  IconSkills,
} from "@/assets/icons";
import { SidePanelItem } from "./SidePanelItem";
import { loremIpsum } from "lorem-ipsum";

const meta: Meta<typeof SidePanelItem> = {
  title: "Navigation/SidePanelItem",
  tags: ["nav", "sidebar", "list", "item"],
  component: SidePanelItem,
  decorators: [
    (Story, context) => (
      <List sx={{ width: 250, p: 1 }}>
        <Story args={{ ...context.args, focused: false }} />
        <Story args={{ ...context.args, focused: true }} />
      </List>
    ),
  ],
  args: {
    text: "Personal",
    icon: <IconPersonal />,
    focused: false,
  },
  argTypes: {
    text: {
      control: "text",
      description: "The label displayed inside the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Personal" },
      },
    },
    focused: {
      control: "boolean",
      description: "Whether this item is currently focused",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Callback fired when the item is clicked",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SidePanelItem>;

export const Standard: Story = {};

export const Experience: Story = {
  args: {
    text: "Experience",
    icon: <IconExperience />,
  },
};

export const Education: Story = {
  args: {
    text: "Education",
    icon: <IconEducation />,
  },
};

export const Skills: Story = {
  args: {
    text: "Skills",
    icon: <IconSkills />,
  },
};

export const LongText: Story = {
  args: {
    text: loremIpsum({ count: 10, units: "sentences" }),
    icon: <IconPersonal />,
  },
};

export const NoIcon: Story = {
  args: {
    icon: null,
  },
};
