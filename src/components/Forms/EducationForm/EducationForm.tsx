import { IconAdd, IconDelete, IconEducation } from "@/assets/Icons";
import { enTokens } from "@/locale/en";
import { useAccentColorSelector } from "@/redux";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export type EducationEntry = {
  id: string;
  institution: string;
  degree: string;
  graduationDate: string;
  location: string;
  /** Thesis, key modules, grade, in the user's own words; may be `""` */
  description: string;
};

/**
 * Props for the `EducationForm` component.
 */
export type EducationFormProps = {
  /** List of education entries. Each entry is identified by a unique `id`. */
  entries?: EducationEntry[];
  /** Fired when the user clicks "+ Add Degree". */
  onAdd?: () => void;
  /** Fired when the user deletes an entry. Receives the entry `id`. */
  onDelete?: (id: string) => void;
  /** Fired on every field change. Receives the entry `id`, field key, and new value. */
  onChange?: (
    id: string,
    field: keyof Omit<EducationEntry, "id">,
    value: string,
  ) => void;
};

/**
 * Form section for collecting and editing a candidate's education history.
 *
 * Renders a list of education entries, each with institution name, degree,
 * graduation date, location and optional details in the user's own words
 * (thesis, key modules, grade). The user can add new entries or delete
 * existing ones.
 *
 * This is a controlled component - the parent owns `entries` and must handle
 * `onChange`, `onAdd`, and `onDelete` to keep state in sync.
 *
 * @example
 * ```tsx
 * <EducationForm
 *   entries={education}
 *   onAdd={handleAdd}
 *   onDelete={handleDelete}
 *   onChange={handleChange}
 * />
 * ```
 */
/**
 * Chrome guesses these fields are name / phone / job title and autofills the
 * user's personal info into them - they describe a school, not the user.
 */
const NO_AUTOFILL = { htmlInput: { autoComplete: "off" } };

const { education } = enTokens.sections;

export const EducationForm = ({
  entries = [],
  onAdd,
  onDelete,
  onChange,
}: EducationFormProps) => {
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
          <IconEducation color={accentColor} />
          <Typography
            component="span"
            sx={{ fontWeight: 600, userSelect: "none" }}
          >
            {education.title}
          </Typography>
        </Box>
        <Button
          startIcon={<IconAdd size={16} />}
          onClick={onAdd}
          sx={{
            color: accentColor,
            fontSize: "0.8rem",
            textTransform: "none",
          }}
        >
          {education.addButton}
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
            {/* Delete button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
              <IconButton
                size="small"
                onClick={() => onDelete?.(entry.id)}
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "error.main" },
                }}
              >
                <IconDelete size={16} />
              </IconButton>
            </Box>

            {/* Institution - full width */}
            <TextField
              label={education.fields.institution.label}
              fullWidth
              slotProps={NO_AUTOFILL}
              value={entry.institution}
              onChange={(e) =>
                onChange?.(entry.id, "institution", e.target.value)
              }
              sx={{ mb: 2 }}
            />

            {/* Degree - full width, degree names are long */}
            <TextField
              label={education.fields.degree.label}
              fullWidth
              slotProps={NO_AUTOFILL}
              value={entry.degree}
              onChange={(e) => onChange?.(entry.id, "degree", e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* Graduation Date / Location */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <TextField
                label={education.fields.graduationDate.label}
                fullWidth
                slotProps={NO_AUTOFILL}
                placeholder={education.fields.graduationDate.placeholder}
                value={entry.graduationDate}
                onChange={(e) =>
                  onChange?.(entry.id, "graduationDate", e.target.value)
                }
              />
              <TextField
                label={education.fields.location.label}
                fullWidth
                slotProps={NO_AUTOFILL}
                value={entry.location}
                onChange={(e) =>
                  onChange?.(entry.id, "location", e.target.value)
                }
              />
            </Box>

            {/* Optional: thesis, key modules, grade, in the user's own words */}
            <TextField
              label={education.fields.description.label}
              placeholder={education.fields.description.placeholder}
              fullWidth
              multiline
              minRows={2}
              slotProps={NO_AUTOFILL}
              value={entry.description}
              onChange={(e) =>
                onChange?.(entry.id, "description", e.target.value)
              }
              sx={{ mt: 2 }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
