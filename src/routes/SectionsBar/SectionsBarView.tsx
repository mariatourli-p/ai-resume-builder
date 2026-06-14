import {
  IconEducation,
  IconExperience,
  IconPersonal,
  IconSkills,
} from "@/assets/Icons";
import { SideDrawer } from "@/components/Drawers/SideDrawer/SideDrawer";
import { enTokens } from "@/locale/en/en-tokens";
import { setActiveTemplate } from "@/redux/resume/resume-reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useScrollStore } from "@/stores/useScrollStore";
import type { SxProps } from "@mui/material";
import { useState } from "react";

export type SectionsBarViewProps = {
  sx?: SxProps;
};
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
export const SectionsBarView = ({ sx }: SectionsBarViewProps) => {
  const { personalInfo, workExperience, education } = enTokens.sections;

  const sectionItems = [
    { text: personalInfo.title, icon: <IconPersonal /> },
    { text: workExperience.title, icon: <IconExperience /> },
    { text: education.title, icon: <IconEducation /> },
    { text: "Skills", icon: <IconSkills /> },
  ];

  const [activeSection, setActiveSection] = useState<string>(
    personalInfo.title,
  );

  const dispatch = useAppDispatch();
  const activeTemplate = useAppSelector((s) => s.resume.activeTemplate);

  const templateItems = [
    { text: "Executive Serif", icon: null },
    { text: "Classic Modern", icon: null },
    { text: "Technical Mono", icon: null },
  ];

  const handleTemplateClick = (text: string) => {
    dispatch(setActiveTemplate(text));
  };

  const scrollTo = useScrollStore((s) => s.scrollTo);

  const handleSectionClick = (title: string) => {
    setActiveSection(title);
    scrollTo(title);
  };

  return (
    <SideDrawer
      sectionItems={sectionItems}
      templateItems={templateItems}
      activeSection={activeSection}
      onSectionClick={handleSectionClick}
      activeTemplate={activeTemplate}
      onTemplateClick={handleTemplateClick}
      sx={sx}
    />
  );
};
