import {
  IconAdd,
  IconAI,
  IconChevronDown,
  IconChevronUp,
  IconDelete,
  IconEdit,
  IconExperience,
} from "@/assets/Icons";
import { useAccentColorSelector } from "@/redux/selectors";
import { PALETTE_MAP } from "@/theme";
import { themeConfig } from "@/theme/themeConfig";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export type WorkExperienceEntry = {
  id: string;
  roleTitle: string;
  company: string;
  duration: string;
  location: string;
  achievements: string;
};

/**
 * Props for the `WorkExperienceForm` component.
 */
export type WorkExperienceFormProps = {
  /** List of work experience entries. Each entry is identified by a unique `id`. */
  entries?: WorkExperienceEntry[];
  /** When `true`, all AI buttons are disabled (e.g. when the API key is missing). */
  isAIDisabled?: boolean;
  /** Fired when the user clicks "+ Add Experience". */
  onAdd?: () => void;
  /** Fired when the user deletes an entry. Receives the entry `id`. */
  onDelete?: (id: string) => void;
  /** Fired on every field change. Receives the entry `id`, field key, and new value. */
  onChange?: (
    id: string,
    field: keyof Omit<WorkExperienceEntry, "id">,
    value: string,
  ) => void;
  /** Fired when the AI improve button is clicked for an entry. Receives the entry `id`. */
  onImprove?: (id: string) => void;
  /** Set of entry ids currently being improved by AI. */
  improvingIds?: Set<string>;
};

/**
 * Form section for collecting and editing a candidate's work experience.
 *
 * Renders a list of experience entries, each with role title, company, duration,
 * location, and a key achievements textarea with inline AI improvement chips.
 * The user can add new entries or delete existing ones.
 *
 * This is a controlled component — the parent owns `entries` and must handle
 * `onChange`, `onAdd`, and `onDelete` to keep state in sync.
 *
 * @example
 * ```tsx
 * <WorkExperienceForm
 *   entries={experiences}
 *   isAIDisabled={!apiKey}
 *   onAdd={handleAdd}
 *   onDelete={handleDelete}
 *   onChange={handleChange}
 *   onImprove={handleImprove}
 *   improvingIds={improvingIds}
 * />
 * ```
 */
export const WorkExperienceForm = ({
  entries = [],
  isAIDisabled = false,
  onAdd,
  onDelete,
  onChange,
  onImprove,
  improvingIds = new Set(),
}: WorkExperienceFormProps) => {
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
          <IconExperience color={accentColor} />
          <Typography
            component="span"
            sx={{ fontWeight: 600, userSelect: "none" }}
          >
            Work Experience
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
          Add Experience
        </Button>
      </Box>

      {/* Entries */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {entries.map((entry) => {
          const isImproving = improvingIds.has(entry.id);
          return (
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
              {/* Row 1 */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                  mb: 2,
                }}
              >
                <TextField
                  label="ROLE TITLE"
                  fullWidth
                  value={entry.roleTitle}
                  onChange={(e) =>
                    onChange?.(entry.id, "roleTitle", e.target.value)
                  }
                />
                <TextField
                  label="COMPANY / ORG"
                  fullWidth
                  value={entry.company}
                  onChange={(e) =>
                    onChange?.(entry.id, "company", e.target.value)
                  }
                />
              </Box>

              {/* Row 2 */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                  mb: 2,
                }}
              >
                <TextField
                  label="DURATION"
                  fullWidth
                  placeholder="2020 – Present"
                  value={entry.duration}
                  onChange={(e) =>
                    onChange?.(entry.id, "duration", e.target.value)
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

              {/* Achievements */}
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: themeConfig.colors.black,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Key Achievements & Milestones
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: themeConfig.colors.black }}
                  >
                    Separate points with a new line
                  </Typography>
                </Box>
                <TextField
                  multiline
                  minRows={4}
                  fullWidth
                  value={entry.achievements}
                  onChange={(e) =>
                    onChange?.(entry.id, "achievements", e.target.value)
                  }
                  slotProps={{
                    input: {
                      endAdornment: (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignSelf: "flex-start",
                            mt: 1,
                            gap: 0.5,
                          }}
                        >
                          <IconButton size="small">
                            <IconChevronUp size={16} />
                          </IconButton>
                          <IconButton size="small">
                            <IconChevronDown size={16} />
                          </IconButton>
                          <IconButton size="small">
                            <IconEdit size={16} />
                          </IconButton>
                        </Box>
                      ),
                    },
                  }}
                />

                {/* AI chips */}
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Button
                    size="small"
                    disabled={isAIDisabled || isImproving}
                    onClick={() => onImprove?.(entry.id)}
                    startIcon={<IconAI size={13} />}
                    sx={{
                      borderRadius: themeConfig.borderRadius.full,
                      border: `1px solid ${accentColor}`,
                      color: accentColor,
                      fontSize: "0.7rem",
                      textTransform: "none",
                      px: 1.5,
                      "&:hover": { bgcolor: PALETTE_MAP[accentColor].light },
                    }}
                  >
                    {isImproving ? "Improving..." : "quantify metrics"}
                  </Button>
                  <Button
                    size="small"
                    disabled={isAIDisabled || isImproving}
                    onClick={() => onImprove?.(entry.id)}
                    startIcon={<IconAI size={13} />}
                    sx={{
                      borderRadius: themeConfig.borderRadius.full,
                      border: `1px solid ${accentColor}`,
                      color: accentColor,
                      fontSize: "0.7rem",
                      textTransform: "none",
                      px: 1.5,
                      "&:hover": { bgcolor: PALETTE_MAP[accentColor].light },
                    }}
                  >
                    stronger verbs
                  </Button>
                  <Box sx={{ ml: "auto" }}>
                    <IconButton
                      size="small"
                      onClick={() => onDelete?.(entry.id)}
                      sx={{ color: "error.main" }}
                    >
                      <IconDelete size={16} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};
