import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SideDrawer } from "./SideDrawer";
import {
  IconPersonal,
  IconExperience,
  IconEducation,
  IconSkills,
  IconProjects,
} from "@/assets/Icons";
import { enTokens } from "@/locale/en/en-tokens";
import { themeConfig } from "@/theme";

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

const brandingColors = [
  themeConfig.colors.palette.indigo.primary,
  themeConfig.colors.palette.emerald.primary,
  themeConfig.colors.palette.amber.primary,
  themeConfig.colors.palette.rose.primary,
  themeConfig.colors.palette.slate.primary,
];

const meta: Meta<typeof SideDrawer> = {
  title: "Components/Drawers/SideDrawer",
  component: SideDrawer,
  parameters: {
    layout: "fullscreen",
  },
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
    const [activeColor, setActiveColor] = useState<string>(
      themeConfig.colors.palette.indigo.primary,
    );

    return (
      <SideDrawer
        sectionItems={sectionItems}
        templateItems={templateItems}
        brandingColors={brandingColors}
        activeSection={activeSection}
        onSectionClick={setActiveSection}
        activeTemplate={activeTemplate}
        onTemplateClick={setActiveTemplate}
        activeColor={activeColor}
        onColorClick={setActiveColor}
      />
    );
  },
};
