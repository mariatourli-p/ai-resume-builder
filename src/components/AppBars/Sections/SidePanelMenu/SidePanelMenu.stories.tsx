import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconPersonal,
  IconExperience,
  IconEducation,
  IconSkills,
  IconProjects,
} from "@/assets/Icons";
import { useState } from "react";
import { enTokens } from "@/locale/en/en-tokens";
import { themeConfig } from "@/theme";
import { SidePanelMenu } from "./SidePanelMenu";

const { personalInfo, workExperience, education } = enTokens.sections;

const defaultItems = [
  { text: personalInfo.title, icon: <IconPersonal /> },
  { text: workExperience.title, icon: <IconExperience /> },
  { text: education.title, icon: <IconEducation /> },
  { text: "Skills", icon: <IconSkills /> },
  { text: "Projects", icon: <IconProjects /> },
];

const templateItems = [
  { text: "Executive Serif", icon: null },
  { text: "Classic Modern", icon: null },
  { text: "Compact Minimalist", icon: null },
  { text: "Technical Mono", icon: null },
];

const meta: Meta<typeof SidePanelMenu> = {
  title: "Components/SidePanel/SidePanelMenu",
  tags: ["nav", "sidebar", "list"],
  component: SidePanelMenu,
  decorators: [
    (Story) => (
      <div style={{ width: 280, padding: 16, background: "#f8fafc" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    items: defaultItems,
    activeItem: personalInfo.title,
  },
  argTypes: {
    activeItem: {
      control: "select",
      options: defaultItems.map((i) => i.text),
      description: "Currently active item",
      table: { type: { summary: "string" } },
    },
    onItemClick: {
      action: "itemClicked",
      description: "Callback fired when an item is clicked",
      table: { type: { summary: "(text: string) => void" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SidePanelMenu>;

export const Menu: Story = {
  render: () => {
    const [active, setActive] = useState<string>(personalInfo.title);
    return (
      <SidePanelMenu
        items={defaultItems.map((item) => ({
          ...item,
          style: {
            backgroundColor: themeConfig.colors.primary.DEFAULT,
            color: "#ffffff",
          },
        }))}
        activeItem={active}
        onItemClick={setActive}
      />
    );
  },
};

export const Template: Story = {
  render: () => {
    const [active, setActive] = useState<string>("Classic Modern");
    return (
      <SidePanelMenu
        items={templateItems.map((item) => ({
          ...item,
          style: {
            border: "1.5px solid #6366f1",
            backgroundColor: "#f0f0ff",
            color: "#6366f1",
          },
        }))}
        activeItem={active}
        onItemClick={setActive}
      />
    );
  },
};
