import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { SideDrawer } from "./SideDrawer";
import {
  IconPersonal,
  IconExperience,
  IconEducation,
  IconSkills,
  IconProjects,
} from "@/assets/Icons";
import { enTokens } from "@/locale/en/en-tokens";

const { personalInfo, workExperience, education } = enTokens.sections;

const sectionItems = [
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

const meta: Meta<typeof SideDrawer> = {
  title: "Components/Drawers/SideDrawer",
  component: SideDrawer,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SideDrawer>;

export const Default: Story = {
  render: () => {
    const [activeSection, setActiveSection] = useState<string>(
      personalInfo.title,
    );
    const [activeTemplate, setActiveTemplate] =
      useState<string>("Classic Modern");

    return (
      <SideDrawer
        sectionItems={sectionItems}
        templateItems={templateItems}
        activeSection={activeSection}
        onSectionClick={setActiveSection}
        activeTemplate={activeTemplate}
        onTemplateClick={setActiveTemplate}
      />
    );
  },
};
