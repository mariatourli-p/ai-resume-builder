import type { Meta, StoryObj } from "@storybook/react-vite";
import { MenuList } from "@mui/material";
import {
  IconPersonal,
  IconExperience,
  IconEducation,
  IconSkills,
  IconProjects,
} from "@/assets/Icons";
import { enTokens } from "@/locale/en/en-tokens";
import { themeConfig } from "@/theme";
import { SidePanelItem } from "./SidePanelItem";

const { personalInfo, workExperience, education } = enTokens.sections;

const meta: Meta<typeof SidePanelItem> = {
  title: "Components/SidePanel/SidePanelItem",
  tags: ["nav", "sidebar", "list", "item"],
  component: SidePanelItem,
  decorators: [
    (Story, context) => (
      <MenuList sx={{ width: 250, p: 1 }}>
        <Story args={{ ...context.args, focused: false }} />
        <Story args={{ ...context.args, focused: true }} />
      </MenuList>
    ),
  ],
  args: {
    text: personalInfo.title,
    icon: <IconPersonal />,
    focused: false,
    style: {
      backgroundColor: themeConfig.colors.primary.DEFAULT,
      color: "#ffffff",
    },
  },
  argTypes: {
    text: {
      control: "text",
      description: "The label displayed inside the button",
    },
    focused: {
      control: "boolean",
      description: "Whether this item is currently selected",
    },
    style: {
      control: "object",
      description: "MUI sx styles applied when the item is selected",
    },
    onClick: {
      action: "clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SidePanelItem>;

export const Standard: Story = {};

export const Experience: Story = {
  args: { text: workExperience.title, icon: <IconExperience /> },
};

export const Education: Story = {
  args: { text: education.title, icon: <IconEducation /> },
};

export const Skills: Story = {
  args: { text: "Skills", icon: <IconSkills /> },
};

export const Projects: Story = {
  args: { text: "Projects", icon: <IconProjects /> },
};

export const NoActiveStyle: Story = {
  args: { style: undefined },
};

export const NoIcon: Story = {
  args: { icon: null },
};
