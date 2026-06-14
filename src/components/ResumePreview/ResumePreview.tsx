import type {
  EducationEntry,
  PersonalInfoData,
  WorkExperienceEntry,
} from "@/redux/resume/resume-reducer";
import { themeConfig } from "@/theme";
import { Box, Divider, Typography } from "@mui/material";

// ─── Props ────────────────────────────────────────────────────────────────────

export type ResumePreviewProps = {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  accentColor: string;
  fontFamily: string;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionHeading = ({
  title,
  accentColor,
}: {
  title: string;
  accentColor: string;
}) => (
  <Box sx={{ mb: 1 }}>
    <Typography
      sx={{
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: accentColor,
        mb: 0.5,
      }}
    >
      {title}
    </Typography>
    <Divider sx={{ borderColor: accentColor, borderWidth: 1.5 }} />
  </Box>
);

const WorkEntryItem = ({ entry }: { entry: WorkExperienceEntry }) => (
  <Box sx={{ mb: 1.5 }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <Typography sx={{ fontSize: 9, fontWeight: 700 }}>
        {entry.roleTitle}
      </Typography>
      <Typography sx={{ fontSize: 8, color: "text.secondary" }}>
        {entry.duration}
      </Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <Typography
        sx={{ fontSize: 8, fontStyle: "italic", color: "text.secondary" }}
      >
        {entry.company}
      </Typography>
      <Typography sx={{ fontSize: 8, color: "text.secondary" }}>
        {entry.location}
      </Typography>
    </Box>
    {entry.achievements && (
      <Box component="ul" sx={{ m: 0, pl: 2, mt: 0.5 }}>
        {entry.achievements
          .split("\n")
          .filter(Boolean)
          .map((line, i) => (
            <Box
              component="li"
              key={i}
              sx={{ fontSize: 8, lineHeight: 1.6, color: "#374151" }}
            >
              {line}
            </Box>
          ))}
      </Box>
    )}
  </Box>
);

const EducationEntryItem = ({ entry }: { entry: EducationEntry }) => (
  <Box sx={{ mb: 1.5 }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <Typography sx={{ fontSize: 9, fontWeight: 700 }}>
        {entry.institution}
      </Typography>
      <Typography sx={{ fontSize: 8, color: "text.secondary" }}>
        {entry.graduationDate}
      </Typography>
    </Box>
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography
        sx={{ fontSize: 8, fontStyle: "italic", color: "text.secondary" }}
      >
        {entry.degree}
      </Typography>
      <Typography sx={{ fontSize: 8, color: "text.secondary" }}>
        {entry.location}
      </Typography>
    </Box>
  </Box>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const ResumePreview = ({
  personalInfo,
  workExperience,
  education,
  skills,
  accentColor,
  fontFamily,
}: ResumePreviewProps) => {
  const {
    fullName,
    professionalTitle,
    emailAddress,
    phone,
    location,
    portfolio,
    professionalSummary,
  } = personalInfo;

  const contactParts = [location, emailAddress, phone, portfolio].filter(
    Boolean,
  );

  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: themeConfig.colors.white,
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        borderRadius: 1,
        p: "12mm",
        fontFamily,
        boxSizing: "border-box",
      }}
    >
      {/* ── Header ── */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "-0.01em",
            color: themeConfig.colors.sidebar.cta,
            lineHeight: 1.1,
            fontFamily: "inherit",
          }}
        >
          {fullName || "Your Name"}
        </Typography>

        {contactParts.length > 0 && (
          <Typography
            sx={{
              fontSize: 8,
              color: "text.secondary",
              mt: 0.5,
              letterSpacing: "0.02em",
              fontFamily: "inherit",
            }}
          >
            {contactParts.join("  ·  ")}
          </Typography>
        )}

        {professionalTitle && (
          <Typography
            sx={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: accentColor,
              mt: 0.75,
              fontFamily: "inherit",
            }}
          >
            {professionalTitle}
          </Typography>
        )}
      </Box>

      {/* ── Professional Summary ── */}
      {professionalSummary && (
        <Box sx={{ mb: 2 }}>
          <SectionHeading
            title="Professional Summary"
            accentColor={accentColor}
          />
          <Typography
            sx={{
              fontSize: 8.5,
              lineHeight: 1.7,
              color: "#374151",
              fontFamily: "inherit",
            }}
          >
            {professionalSummary}
          </Typography>
        </Box>
      )}

      {/* ── Work Experience ── */}
      {workExperience.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <SectionHeading title="Experience" accentColor={accentColor} />
          {workExperience.map((entry) => (
            <WorkEntryItem key={entry.id} entry={entry} />
          ))}
        </Box>
      )}

      {/* ── Education ── */}
      {education.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <SectionHeading title="Education" accentColor={accentColor} />
          {education.map((entry) => (
            <EducationEntryItem key={entry.id} entry={entry} />
          ))}
        </Box>
      )}

      {/* ── Skills ── */}
      {skills.length > 0 && (
        <Box>
          <SectionHeading
            title="Skills & Core Competencies"
            accentColor={accentColor}
          />
          <Typography
            sx={{
              fontSize: 8.5,
              lineHeight: 1.7,
              color: "#374151",
              fontFamily: "inherit",
            }}
          >
            {skills.join("  ·  ")}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
