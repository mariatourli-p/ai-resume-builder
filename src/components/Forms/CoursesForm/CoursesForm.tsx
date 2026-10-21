import { IconAdd, IconCourses, IconDelete } from "@/assets/Icons";
import { enTokens } from "@/locale/en";
import { useAccentColorSelector } from "@/redux";
import { PALETTE_MAP } from "@/theme";
import { themeConfig } from "@/theme";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { lazy, Suspense } from "react";

const { courses } = enTokens.sections;

export type CourseEntry = {
  id: string;
  title: string;
  organizer: string;
  /** Month as `YYYY-MM`, or `""` */
  date: string;
};

/**
 * Props for the `CoursesForm` component.
 */
export type CoursesFormProps = {
  /** List of courses and seminars. Each entry is identified by a unique `id`. */
  entries?: CourseEntry[];
  /** Fired when the user clicks "+ Add Course". */
  onAdd?: () => void;
  /** Fired when the user deletes an entry. Receives the entry `id`. */
  onDelete?: (id: string) => void;
  /** Fired on every field change. Receives the entry `id`, field key, and new value. */
  onChange?: (
    id: string,
    field: keyof Omit<CourseEntry, "id">,
    value: string,
  ) => void;
};

/** The date picker library is large, so it loads after the page */
const MonthField = lazy(() => import("../MonthField"));

/**
 * Form section for courses, seminars and certifications.
 *
 * Each entry has a title, an organizer and the month it took place. Kept
 * short on purpose: a few fields are enough for this section of a resume.
 *
 * This is a controlled component - the parent owns `entries` and must handle
 * `onChange`, `onAdd`, and `onDelete` to keep state in sync.
 *
 * @example
 * ```tsx
 * <CoursesForm
 *   entries={courses}
 *   onAdd={handleAdd}
 *   onDelete={handleDelete}
 *   onChange={handleChange}
 * />
 * ```
 */
export const CoursesForm = ({
  entries = [],
  onAdd,
  onDelete,
  onChange,
}: CoursesFormProps) => {
  const accentColor = useAccentColorSelector((s) => s);

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconCourses color={accentColor} />
          <Typography
            component="span"
            sx={{ fontWeight: 600, userSelect: "none" }}
          >
            {courses.title}
          </Typography>
        </Box>
        <Button
          startIcon={<IconAdd size={16} />}
          onClick={onAdd}
          sx={{
            color: themeConfig.colors.black,
            fontSize: "0.8rem",
            textTransform: "none",
            "&:hover": {
              bgcolor: PALETTE_MAP[accentColor]?.light,
              color: accentColor,
              border: `1px solid ${accentColor}`,
            },
          }}
        >
          {courses.addButton}
        </Button>
      </Box>

      {/* Entries */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {entries.map((entry) => (
          <Paper
            key={entry.id}
            elevation={0}
            sx={{
              p: 2.5,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <TextField
              label={courses.fields.title.label}
              fullWidth
              value={entry.title}
              onChange={(e) => onChange?.(entry.id, "title", e.target.value)}
              sx={{ mb: 2 }}
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <TextField
                label={courses.fields.organizer.label}
                fullWidth
                value={entry.organizer}
                onChange={(e) =>
                  onChange?.(entry.id, "organizer", e.target.value)
                }
              />
              <Suspense
                fallback={
                  <TextField
                    label={courses.fields.date.label}
                    fullWidth
                    disabled
                  />
                }
              >
                <MonthField
                  label={courses.fields.date.label}
                  value={entry.date}
                  onChange={(value) => onChange?.(entry.id, "date", value)}
                />
              </Suspense>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <IconButton
                size="small"
                onClick={() => onDelete?.(entry.id)}
                sx={{ color: "error.main" }}
              >
                <IconDelete size={16} />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
