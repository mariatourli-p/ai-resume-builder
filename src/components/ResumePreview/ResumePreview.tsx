import type {
  CourseEntry,
  EducationEntry,
  PersonalInfoData,
  WorkExperienceEntry,
} from "@/redux/resume";
import { enTokens } from "@/locale/en";
import { formatDateRange } from "@/utils/formatDateRange";
import { themeConfig } from "@/theme";
import { Box, Divider, Typography } from "@mui/material";
import { forwardRef, memo } from "react";

// ─── Props ────────────────────────────────────────────────────────────────────

export type ResumePreviewProps = {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  volunteering: WorkExperienceEntry[];
  education: EducationEntry[];
  courses: CourseEntry[];
  skills: string[];
  accentColor: string;
  fontFamily: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Text sizes in px. The page is 210mm (793px) wide, so these print at the
 * same size in the PDF: 13px is about 10pt, the usual resume body size.
 */
const FONT_SIZE = {
  name: 30,
  heading: 12,
  entryTitle: 13.5,
  body: 13,
  meta: 11.5,
} as const;

/**
 * Leading bullet a line may start with (`- `, `* `, `• `, `– `), but not a
 * minus sign before a number (`-5% churn`)
 */
const BULLET_MARKER = /^\s*[-*•–](?!\d)\s*/;

/**
 * One list item per non-empty line. The list draws its own bullets, so the
 * markers the user or the AI typed are dropped to avoid showing two.
 */
const toBulletLines = (text: string) =>
  text
    .split("\n")
    .map((line) => line.replace(BULLET_MARKER, "").trim())
    .filter(Boolean);

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * The parts below are memoized: Redux keeps the same objects for entries
 * that didn't change, so a key press re-renders only the entry being edited
 * instead of the whole page.
 */
const SectionHeading = memo(
  ({ title, accentColor }: { title: string; accentColor: string }) => (
    <Box sx={{ mb: 1 }}>
      <Typography
        sx={{
          fontSize: FONT_SIZE.heading,
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
  ),
);

const WorkEntryItem = memo(({ entry }: { entry: WorkExperienceEntry }) => (
  <Box sx={{ mb: 1.5 }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <Typography sx={{ fontSize: FONT_SIZE.entryTitle, fontWeight: 700 }}>
        {entry.roleTitle}
      </Typography>
      <Typography sx={{ fontSize: FONT_SIZE.meta, color: "text.secondary" }}>
        {formatDateRange(entry.startDate, entry.endDate)}
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
        sx={{
          fontSize: FONT_SIZE.meta,
          fontStyle: "italic",
          color: "text.secondary",
        }}
      >
        {entry.company}
      </Typography>
      <Typography sx={{ fontSize: FONT_SIZE.meta, color: "text.secondary" }}>
        {entry.location}
      </Typography>
    </Box>
    {entry.achievements && (
      <Box component="ul" sx={{ m: 0, pl: 2, mt: 0.5 }}>
        {toBulletLines(entry.achievements).map((line, i) => (
          <Box
            component="li"
            key={i}
            sx={{ fontSize: FONT_SIZE.body, lineHeight: 1.6, color: "#374151" }}
          >
            {line}
          </Box>
        ))}
      </Box>
    )}
  </Box>
));

const EducationEntryItem = memo(({ entry }: { entry: EducationEntry }) => (
  <Box sx={{ mb: 1.5 }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <Typography sx={{ fontSize: FONT_SIZE.entryTitle, fontWeight: 700 }}>
        {entry.institution}
      </Typography>
      <Typography sx={{ fontSize: FONT_SIZE.meta, color: "text.secondary" }}>
        {entry.graduationDate}
      </Typography>
    </Box>
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography
        sx={{
          fontSize: FONT_SIZE.meta,
          fontStyle: "italic",
          color: "text.secondary",
        }}
      >
        {entry.degree}
      </Typography>
      <Typography sx={{ fontSize: FONT_SIZE.meta, color: "text.secondary" }}>
        {entry.location}
      </Typography>
    </Box>
  </Box>
));

const CourseEntryItem = memo(({ entry }: { entry: CourseEntry }) => (
  <Box sx={{ mb: 1 }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <Typography sx={{ fontSize: FONT_SIZE.entryTitle, fontWeight: 700 }}>
        {entry.title}
      </Typography>
      <Typography sx={{ fontSize: FONT_SIZE.meta, color: "text.secondary" }}>
        {formatDateRange(entry.date, "")}
      </Typography>
    </Box>
    <Typography
      sx={{
        fontSize: FONT_SIZE.meta,
        fontStyle: "italic",
        color: "text.secondary",
      }}
    >
      {entry.organizer}
    </Typography>
  </Box>
));

// ─── Main Component ───────────────────────────────────────────────────────────

// Memoized: the preview only re-renders when its data actually changes
export const ResumePreview = memo(
  forwardRef<HTMLDivElement, ResumePreviewProps>(
    (
      {
        personalInfo,
        workExperience,
        volunteering,
        education,
        courses,
        skills,
        accentColor,
        fontFamily,
      },
      ref,
    ) => {
      const {
        fullName,
        professionalTitle,
        emailAddress,
        phone,
        location,
        portfolio,
        professionalSummary,
        photo,
      } = personalInfo;

      const contactParts = [location, emailAddress, phone, portfolio].filter(
        Boolean,
      );

      return (
        <Box
          ref={ref}
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
          {/* With a photo: photo on the left, text next to it. Without: centered */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: photo ? "flex-start" : "center",
              gap: "6mm",
              mb: 2,
            }}
          >
            {/* Already cropped to a square, so a plain round image fits the PDF export */}
            {photo && (
              <Box
                component="img"
                src={photo}
                alt={enTokens.sections.personalInfo.fields.photo.alt}
                sx={{
                  display: "block",
                  flexShrink: 0,
                  width: "24mm",
                  height: "24mm",
                  borderRadius: "50%",
                }}
              />
            )}
            <Box sx={{ textAlign: photo ? "left" : "center", minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: FONT_SIZE.name,
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
                    fontSize: FONT_SIZE.meta,
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
                    fontSize: FONT_SIZE.heading,
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
          </Box>

          {/* ── Professional Summary ── */}
          {professionalSummary && (
            <Box sx={{ mb: 2 }}>
              <SectionHeading
                title={enTokens.preview.summary}
                accentColor={accentColor}
              />
              <Typography
                sx={{
                  fontSize: FONT_SIZE.body,
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
              <SectionHeading
                title={enTokens.preview.experience}
                accentColor={accentColor}
              />
              {workExperience.map((entry) => (
                <WorkEntryItem key={entry.id} entry={entry} />
              ))}
            </Box>
          )}

          {/* ── Education ── */}
          {education.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <SectionHeading
                title={enTokens.sections.education.title}
                accentColor={accentColor}
              />
              {education.map((entry) => (
                <EducationEntryItem key={entry.id} entry={entry} />
              ))}
            </Box>
          )}

          {/* ── Skills ── */}
          {skills.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <SectionHeading
                title={enTokens.sections.skills.title}
                accentColor={accentColor}
              />
              <Typography
                sx={{
                  fontSize: FONT_SIZE.body,
                  lineHeight: 1.7,
                  color: "#374151",
                  fontFamily: "inherit",
                }}
              >
                {skills.join("  ·  ")}
              </Typography>
            </Box>
          )}

          {/* ── Courses & Seminars ── */}
          {courses.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <SectionHeading
                title={enTokens.sections.courses.title}
                accentColor={accentColor}
              />
              {courses.map((entry) => (
                <CourseEntryItem key={entry.id} entry={entry} />
              ))}
            </Box>
          )}

          {/* ── Volunteering ── */}
          {volunteering.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <SectionHeading
                title={enTokens.sections.volunteering.title}
                accentColor={accentColor}
              />
              {volunteering.map((entry) => (
                <WorkEntryItem key={entry.id} entry={entry} />
              ))}
            </Box>
          )}
        </Box>
      );
    },
  ),
);
