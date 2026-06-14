import { enTokens } from "@/locale/en/en-tokens";
import { useScrollStore } from "@/stores/useScrollStore";
import { Box, type SxProps } from "@mui/material";
import { useEffect, useRef } from "react";
import { EducationFormView } from "./ResumeForms/EducationFormView";
import { PersonalInfoFormView } from "./ResumeForms/PersonalInfoFormView";
import { SkillsFormView } from "./ResumeForms/SkillsFormView";
import { WorkExperienceFormView } from "./ResumeForms/WorkExperienceFormView";

export type ResumeBuilderViewProps = {
  sx?: SxProps;
};

export const ResumeBuilderView = ({ sx }: ResumeBuilderViewProps) => {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { personalInfo, workExperience, education, skills } = enTokens.sections;

  const scrollTarget = useScrollStore((s) => s.scrollTarget);
  const clearScrollTarget = useScrollStore((s) => s.clearScrollTarget);

  useEffect(() => {
    if (!scrollTarget) return;
    sectionRefs.current[scrollTarget]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    clearScrollTarget();
  }, [scrollTarget, clearScrollTarget]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3, ...sx }}>
      <div
        ref={(el) => {
          sectionRefs.current[personalInfo.title] = el;
        }}
      >
        <PersonalInfoFormView />
      </div>
      <div
        ref={(el) => {
          sectionRefs.current[workExperience.title] = el;
        }}
      >
        <WorkExperienceFormView />
      </div>
      <div
        ref={(el) => {
          sectionRefs.current[education.title] = el;
        }}
      >
        <EducationFormView />
      </div>
      <div
        ref={(el) => {
          sectionRefs.current[skills.skills] = el;
        }}
      >
        <SkillsFormView />
      </div>
    </Box>
  );
};
