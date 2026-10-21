import { enTokens } from "@/locale/en";

/** Saved as the end date while the user still works in the role */
export const PRESENT = "present";

/**
 * Created once: `toLocaleDateString` with options builds a new formatter on
 * every call, which made each key press format every date on the resume slowly
 */
const MONTH_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** `"2020-01"` (a month input's value) -> `"Jan 2020"` */
const formatMonth = (value: string): string => {
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return value;
  return MONTH_FORMAT.format(new Date(Date.UTC(year, month - 1)));
};

/**
 * Formats a work period for the resume.
 *
 * @param start - Start month as `YYYY-MM`, or `""`
 * @param end - End month as `YYYY-MM`, {@link PRESENT}, or `""`
 * @returns e.g. `"Jan 2020 - Present"`, or `""` when there are no dates
 *
 * @example
 * formatDateRange("2020-01", "2023-06"); // "Jan 2020 - Jun 2023"
 * formatDateRange("2020-01", PRESENT); // "Jan 2020 - Present"
 */
export const formatDateRange = (start: string, end: string): string => {
  const to =
    end === PRESENT
      ? enTokens.sections.workExperience.fields.dates.present
      : end && formatMonth(end);
  return [start && formatMonth(start), to].filter(Boolean).join(" - ");
};
