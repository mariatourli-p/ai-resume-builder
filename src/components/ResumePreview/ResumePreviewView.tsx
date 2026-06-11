import { useAccentColorSelector } from "@/redux/selectors";
import { useAppSelector } from "@/redux/store";
import { Box } from "@mui/material";
import { ResumePreview } from "./ResumePreview";

export const ResumePreviewView = () => {
  const { personalInfo, workExperience, education, skills } = useAppSelector(
    (state) => state.resume,
  );
  const accentColor = useAccentColorSelector((s) => s);

  return (
    <Box
      sx={{
        flex: 0.5,
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        justifyContent: "center",
        p: 4,
        backgroundColor: "#f1f5f9",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <ResumePreview
        personalInfo={personalInfo}
        workExperience={workExperience}
        education={education}
        skills={skills}
        accentColor={accentColor}
      />
    </Box>
  );
};
