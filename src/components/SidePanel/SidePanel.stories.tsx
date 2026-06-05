import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconPersonal,
  IconExperience,
  IconEducation,
  IconSkills,
  IconProjects,
} from "@/assets/Icons";
import { SidePanel } from "./SidePanel";
import { useState } from "react";
import { enTokens } from "@/locale/en/en-tokens";
import { PALETTE } from "@/styles/palette";

const { personalInfo, workExperience, education } = enTokens.sections;

const defaultItems = [
  {
    text: personalInfo.title,
    icon: <IconPersonal />,
  },
  {
    text: workExperience.title,
    icon: <IconExperience />,
  },
  {
    text: education.title,
    icon: <IconEducation />,
  },
  {
    text: "Skills",
    icon: <IconSkills />,
  },
  {
    text: "Projects",
    icon: <IconProjects />,
  },
];

const meta: Meta<typeof SidePanel> = {
  title: "Components/SidePanel/SidePanel",
  tags: ["nav", "sidebar", "list"],
  component: SidePanel,
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
      table: {
        type: { summary: "string" },
      },
    },
    onItemClick: {
      action: "itemClicked",
      description: "Callback fired when an item is clicked",
      table: {
        type: { summary: "(text: string) => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SidePanel>;

export const MenuPanel: Story = {
  render: () => {
    const [active, setActive] = useState<string>(personalInfo.title);
    return (
      <SidePanel
        items={defaultItems.map((item) => ({
          ...item,
          style: {
            backgroundColor: PALETTE.ocean.accent,
            color: PALETTE.ocean.accentLight,
          },
        }))}
        activeItem={active}
        onItemClick={setActive}
      />
    );
  },
};
