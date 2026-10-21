import {
  IconCourses,
  IconEducation,
  IconExperience,
  IconPersonal,
  IconSkills,
  IconVolunteering,
} from "@/assets/Icons";
import { SideDrawer } from "@/components/Drawers/SideDrawer";
import { enTokens } from "@/locale/en";
import { setActiveTemplate } from "@/redux/resume";
import { useAppDispatch, useAppSelector } from "@/redux";
import { useScrollStore } from "@/stores/useScrollStore";
import type { SxProps } from "@mui/material";
import { useState } from "react";

export type SectionsBarViewProps = {
  sx?: SxProps;
  /** On mobile the drawer is closed until the header's menu button opens it */
  isMobile?: boolean;
  open?: boolean;
  onClose?: () => void;
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
export const SectionsBarView = ({
  sx,
  isMobile,
  open,
  onClose,
}: SectionsBarViewProps) => {
  const { personalInfo, workExperience, volunteering, education, courses } =
    enTokens.sections;

  const sectionItems = [
    { text: personalInfo.title, icon: <IconPersonal /> },
    { text: workExperience.title, icon: <IconExperience /> },
    { text: education.title, icon: <IconEducation /> },
    { text: "Skills", icon: <IconSkills /> },
    { text: courses.title, icon: <IconCourses /> },
    { text: volunteering.title, icon: <IconVolunteering /> },
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
    // On mobile the drawer covers the forms, so it closes to show the section
    if (isMobile) onClose?.();
  };

  return (
    <SideDrawer
      sectionItems={sectionItems}
      templateItems={templateItems}
      activeSection={activeSection}
      onSectionClick={handleSectionClick}
      activeTemplate={activeTemplate}
      onTemplateClick={handleTemplateClick}
      isMobile={isMobile}
      open={open}
      onClose={onClose}
      sx={sx}
    />
  );
};
