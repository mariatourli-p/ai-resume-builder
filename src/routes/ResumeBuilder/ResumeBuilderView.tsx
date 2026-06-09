import { Box, type SxProps } from "@mui/material";
import { PersonalInfoFormView } from "./ResumeForms/PersonalInfoFormView";
import { WorkExperienceFormView } from "./ResumeForms/WorkExperienceFormView";
import { EducationFormView } from "./ResumeForms/EducationFormView";
import { SkillsFormView } from "./ResumeForms/SkillsFormView";

export type ResumeBuilderViewProps = {
  sx?: SxProps;
};

export const ResumeBuilderView = ({ sx }: ResumeBuilderViewProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3, ...sx }}>
      <PersonalInfoFormView />
      <WorkExperienceFormView />
      <EducationFormView />
      <SkillsFormView />
    </Box>
  );
};
