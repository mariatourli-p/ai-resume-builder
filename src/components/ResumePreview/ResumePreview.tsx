import { IconEmail, IconLink, IconLocation, IconPhone } from "@/assets/Icons";
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

/** Longest link shown in the header; longer ones end with "…" */
const LINK_MAX_LENGTH = 40;

/**
 * A link as people read it on paper: without `https://`, `www.`, the query
 * or a trailing slash (e.g. `https://www.site.com/me?ref=x` -> `site.com/me`).
 * Cut here, not with CSS, because the PDF capture (html2canvas) doesn't
 * draw `text-overflow: ellipsis`.
 */
const showLink = (url: string) => {
  const link = url
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/[?#].*$/, "")
    .replace(/\/$/, "");
  return link.length > LINK_MAX_LENGTH
    ? `${link.slice(0, LINK_MAX_LENGTH - 1)}…`
    : link;
};

/** Icon size in the contact line: about the height of its letters */
const CONTACT_ICON_SIZE = 11;

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

/** Size of a timeline dot and where it sits, level with the entry's title */
const TIMELINE_DOT = { size: 7, top: 7 } as const;

/**
 * One step of the experience timeline: a dot next to the entry, and a thin
 * line down to the next entry's dot, so the roles read as one career path.
 * `flow-root` keeps the entry's bottom margin inside, so the line reaches
 * the next dot. Memoized like the other entries, so a key press re-renders
 * only the entry being edited.
 */
const TimelineEntryItem = memo(
  ({
    entry,
    accentColor,
    isLast,
  }: {
    entry: WorkExperienceEntry;
    accentColor: string;
    isLast: boolean;
  }) => (
    <Box sx={{ position: "relative", display: "flow-root", pl: "18px" }}>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: TIMELINE_DOT.top,
          width: TIMELINE_DOT.size,
          height: TIMELINE_DOT.size,
          borderRadius: "50%",
          backgroundColor: accentColor,
        }}
      />
      {!isLast && (
        <Box
          sx={{
            position: "absolute",
            left: (TIMELINE_DOT.size - 1) / 2,
            top: TIMELINE_DOT.top + TIMELINE_DOT.size + 3,
            // Stops just above the next dot
            bottom: -TIMELINE_DOT.top + 3,
            width: "1px",
            backgroundColor: accentColor,
            opacity: 0.3,
          }}
        />
      )}
      <WorkEntryItem entry={entry} />
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
    {entry.description.trim() && (
      <Typography
        sx={{
          fontSize: FONT_SIZE.body,
          lineHeight: 1.6,
          color: "#374151",
          mt: 0.25,
          // Keeps the user's line breaks
          whiteSpace: "pre-line",
        }}
      >
        {entry.description.trim()}
      </Typography>
    )}
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
    {entry.description.trim() && (
      <Typography
        sx={{
          fontSize: FONT_SIZE.body,
          lineHeight: 1.6,
          color: "#374151",
          mt: 0.25,
          // Keeps the user's line breaks
          whiteSpace: "pre-line",
        }}
      >
        {entry.description.trim()}
      </Typography>
    )}
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

      const contacts = [
        { field: "location", Icon: IconLocation, text: location },
        { field: "email", Icon: IconEmail, text: emailAddress },
        { field: "phone", Icon: IconPhone, text: phone },
        { field: "portfolio", Icon: IconLink, text: showLink(portfolio) },
      ].filter((contact) => contact.text.trim());

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
            // A long word or link without spaces wraps instead of leaving the page
            overflowWrap: "anywhere",
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
                {fullName || enTokens.preview.namePlaceholder}
              </Typography>

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

              {/**
               * Contact details in one line, each with a small muted icon.
               * A detail that doesn't fit moves whole to the next line,
               * never breaking in the middle.
               */}
              {contacts.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: photo ? "flex-start" : "center",
                    columnGap: 2,
                    rowGap: 0.5,
                    mt: 1,
                  }}
                >
                  {contacts.map(({ field, Icon, text }) => (
                    <Typography
                      key={field}
                      component="span"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.625,
                        whiteSpace: "nowrap",
                        fontSize: FONT_SIZE.meta,
                        color: "text.secondary",
                        letterSpacing: "0.02em",
                        lineHeight: 1.5,
                        fontFamily: "inherit",
                      }}
                    >
                      <Icon
                        size={CONTACT_ICON_SIZE}
                        strokeWidth={1.5}
                        aria-hidden
                        style={{ flexShrink: 0, opacity: 0.7 }}
                      />
                      {text}
                    </Typography>
                  ))}
                </Box>
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

          {/* ── Work Experience ── */}
          {workExperience.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <SectionHeading
                title={enTokens.preview.experience}
                accentColor={accentColor}
              />
              {workExperience.map((entry, i) => (
                <TimelineEntryItem
                  key={entry.id}
                  entry={entry}
                  accentColor={accentColor}
                  isLast={i === workExperience.length - 1}
                />
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
              {volunteering.map((entry, i) => (
                <TimelineEntryItem
                  key={entry.id}
                  entry={entry}
                  accentColor={accentColor}
                  isLast={i === volunteering.length - 1}
                />
              ))}
            </Box>
          )}
        </Box>
      );
    },
  ),
);
