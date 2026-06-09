import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { IconEducation, IconDelete, IconAdd } from "@/assets/Icons";
import { themeConfig } from "@/theme/themeConfig";

const primary = themeConfig.colors.primary;

type EducationEntry = {
  id: string;
  institution: string;
  degree: string;
  graduationDate: string;
  location: string;
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
 * graduation date, and location. The user can add new entries or delete existing ones.
 *
 * This is a controlled component — the parent owns `entries` and must handle
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
export const EducationForm = ({
  entries = [],
  onAdd,
  onDelete,
  onChange,
}: EducationFormProps) => {
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
          <IconEducation color={primary.DEFAULT} />
          <Typography
            component="span"
            sx={{ fontWeight: 600, userSelect: "none" }}
          >
            Education
          </Typography>
        </Box>
        <Button
          startIcon={<IconAdd size={16} />}
          onClick={onAdd}
          sx={{
            color: primary.text,
            fontSize: "0.8rem",
            textTransform: "none",
            "&:hover": { bgcolor: primary.surface },
          }}
        >
          Add Degree
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

            {/* Institution — full width */}
            <TextField
              label="INSTITUTION / SCHOOL NAME"
              fullWidth
              value={entry.institution}
              onChange={(e) =>
                onChange?.(entry.id, "institution", e.target.value)
              }
              sx={{ mb: 2 }}
            />

            {/* Degree / Graduation Date / Location */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                gap: 2,
              }}
            >
              <TextField
                label="DEGREE / FIELD & HONORS"
                fullWidth
                value={entry.degree}
                onChange={(e) => onChange?.(entry.id, "degree", e.target.value)}
              />
              <TextField
                label="GRADUATION DATE"
                fullWidth
                placeholder="2011 – 2015"
                value={entry.graduationDate}
                onChange={(e) =>
                  onChange?.(entry.id, "graduationDate", e.target.value)
                }
              />
              <TextField
                label="LOCATION"
                fullWidth
                value={entry.location}
                onChange={(e) =>
                  onChange?.(entry.id, "location", e.target.value)
                }
              />
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
