import {
  IconEducation,
  IconExperience,
  IconPersonal,
  IconProjects,
  IconSkills,
} from "@/assets/Icons";
import { SideDrawer } from "@/components/Drawers/SideDrawer/SideDrawer";
import { enTokens } from "@/locale/en/en-tokens";
import { themeConfig } from "@/theme";
import { useState } from "react";

/**
 * SectionsBarView manages all state for the resume builder's side navigation drawer.
 *
 * Owns the active section, active template, active branding color, and the
 * static lists of section items, template items, and branding colors.
 * Delegates all rendering to `SideDrawer`, keeping it purely presentational.
 *
 * @example
 * <SectionsBarView />
 */
export const SectionsBarView = () => {
  const { personalInfo, workExperience, education } = enTokens.sections;

  const sectionItems = [
    { text: personalInfo.title, icon: <IconPersonal /> },
    { text: workExperience.title, icon: <IconExperience /> },
    { text: education.title, icon: <IconEducation /> },
    { text: "Skills", icon: <IconSkills /> },
    { text: "Projects", icon: <IconProjects /> },
  ];

  const [activeSection, setActiveSection] = useState<string>(
    personalInfo.title,
  );
  const [activeTemplate, setActiveTemplate] =
    useState<string>("Classic Modern");
  const [activeColor, setActiveColor] = useState<string>(
    themeConfig.colors.palette.indigo.primary,
  );

  const brandingColors = [
    themeConfig.colors.palette.indigo.primary,
    themeConfig.colors.palette.emerald.primary,
    themeConfig.colors.palette.amber.primary,
    themeConfig.colors.palette.rose.primary,
    themeConfig.colors.palette.slate.primary,
  ];

  const templateItems = [
    { text: "Executive Serif", icon: null },
    { text: "Classic Modern", icon: null },
    { text: "Compact Minimalist", icon: null },
    { text: "Technical Mono", icon: null },
  ];

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
};
