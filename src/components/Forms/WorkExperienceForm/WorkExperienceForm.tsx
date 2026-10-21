import { IconAdd, IconAI, IconDelete, IconExperience } from "@/assets/Icons";
import { enTokens } from "@/locale/en";
import { useAccentColorSelector } from "@/redux";
import { PALETTE_MAP } from "@/theme";
import { themeConfig } from "@/theme";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { PRESENT } from "@/utils/formatDateRange";
import { lazy, memo, Suspense, type ComponentType } from "react";

const workExperienceFields = enTokens.sections.workExperience.fields;
const achievementsTokens = workExperienceFields.achievements;
const datesTokens = workExperienceFields.dates;

/** Tips shown when hovering the lamp: what to write and how to separate it */
const AchievementsTips = () => (
  <Box sx={{ p: 0.5 }}>
    <Typography
      variant="caption"
      component="p"
      sx={{ fontWeight: 600, mb: 0.5 }}
    >
      {achievementsTokens.tips.title}
    </Typography>
    <Box component="ul" sx={{ m: 0, pl: 2 }}>
      {achievementsTokens.tips.items.map((tip) => (
        <Typography key={tip} variant="caption" component="li">
          {tip}
        </Typography>
      ))}
    </Box>
    <Typography variant="caption" component="p" sx={{ fontWeight: 600, mt: 1 }}>
      {achievementsTokens.tips.exampleTitle}
    </Typography>
    <Box
      sx={{
        mt: 0.5,
        p: 1,
        borderRadius: 1,
        bgcolor: "rgba(255, 255, 255, 0.12)",
        fontFamily: "monospace",
        fontSize: "0.7rem",
        whiteSpace: "pre-line",
      }}
    >
      {achievementsTokens.tips.example.join("\n")}
    </Box>
  </Box>
);

export type WorkExperienceEntry = {
  id: string;
  roleTitle: string;
  company: string;
  /** Start month as `YYYY-MM`, or `""` */
  startDate: string;
  /** End month as `YYYY-MM`, `PRESENT` while still in the role, or `""` */
  endDate: string;
  location: string;
  achievements: string;
};

/**
 * Texts and icon of the section. Volunteering reuses this form with its own
 * labels, because a volunteering role has the same fields as a job.
 */
export type ExperienceLabels = {
  title: string;
  addButton: string;
  /** Label of the company / organization field */
  organization: string;
  /** Label of the "still doing this" checkbox */
  current: string;
  icon: ComponentType<{ color?: string }>;
};

const WORK_EXPERIENCE_LABELS: ExperienceLabels = {
  title: enTokens.sections.workExperience.title,
  addButton: enTokens.sections.workExperience.addButton,
  organization: workExperienceFields.company.label,
  current: datesTokens.current,
  icon: IconExperience,
};

/**
 * Props for the `WorkExperienceForm` component.
 */
export type WorkExperienceFormProps = {
  /** List of work experience entries. Each entry is identified by a unique `id`. */
  entries?: WorkExperienceEntry[];
  /** When `true`, all AI buttons are disabled (e.g. when the browser can't run the AI). */
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
  /**
   * Fired when the user picks a start or end month. Receives the month and
   * the entry `id`. Must be stable: the date pickers are memoized and would
   * otherwise re-render on every key press in the card.
   */
  onStartDateChange?: (value: string, id: string) => void;
  onEndDateChange?: (value: string, id: string) => void;

  onGenerateAchievements?: (id: string, roleTitle: string) => Promise<void>;
  /** Ids of entries whose achievements are being generated - shows a spinner on their button. */
  generatingIds?: string[];
  /** Section texts and icon. Defaults to Work Experience. Must be a stable object. */
  labels?: ExperienceLabels;
};

/**
 * The date picker library is large, so it loads in its own file after the
 * page. Until then, a plain disabled field holds its place.
 */
const MonthField = lazy(() => import("../MonthField"));

// Same function every render, so a card without date callbacks stays memoized
const NOOP = () => {};

const MonthFieldPlaceholder = ({ label }: { label: string }) => (
  <TextField label={label} fullWidth disabled />
);

type WorkExperienceEntryCardProps = Pick<
  WorkExperienceFormProps,
  | "isAIDisabled"
  | "onChange"
  | "onStartDateChange"
  | "onEndDateChange"
  | "onDelete"
  | "onGenerateAchievements"
> & {
  entry: WorkExperienceEntry;
  accentColor: string;
  isGenerating: boolean;
  labels: ExperienceLabels;
};

/**
 * One work experience entry. Memoized so typing in one entry doesn't
 * re-render the others - the parent must pass stable callbacks.
 */
const WorkExperienceEntryCard = memo(
  ({
    entry,
    accentColor,
    isAIDisabled,
    isGenerating,
    labels,
    onChange,
    onStartDateChange = NOOP,
    onEndDateChange = NOOP,
    onDelete,
    onGenerateAchievements,
  }: WorkExperienceEntryCardProps) => {
    const isCurrent = entry.endDate === PRESENT;
    return (
      <Paper
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
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label={workExperienceFields.roleTitle.label}
            fullWidth
            value={entry.roleTitle}
            onChange={(e) => onChange?.(entry.id, "roleTitle", e.target.value)}
          />
          <TextField
            label={labels.organization}
            fullWidth
            value={entry.company}
            onChange={(e) => onChange?.(entry.id, "company", e.target.value)}
          />
        </Box>

        {/* Row 2 */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 2,
          }}
        >
          <Suspense
            fallback={<MonthFieldPlaceholder label={datesTokens.start} />}
          >
            <MonthField
              label={datesTokens.start}
              name={entry.id}
              value={entry.startDate}
              onChange={onStartDateChange}
            />
          </Suspense>
          <Suspense
            fallback={<MonthFieldPlaceholder label={datesTokens.end} />}
          >
            <MonthField
              label={datesTokens.end}
              disabled={isCurrent}
              value={isCurrent ? "" : entry.endDate}
              // The role can't end before it started
              minMonth={entry.startDate}
              name={entry.id}
              onChange={onEndDateChange}
            />
          </Suspense>
        </Box>

        {/* Row 3 */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label={workExperienceFields.location.label}
            fullWidth
            value={entry.location}
            onChange={(e) => onChange?.(entry.id, "location", e.target.value)}
          />
          <FormControlLabel
            label={labels.current}
            control={
              <Checkbox
                checked={isCurrent}
                onChange={(e) =>
                  onChange?.(
                    entry.id,
                    "endDate",
                    e.target.checked ? PRESENT : "",
                  )
                }
                sx={{ "&.Mui-checked": { color: accentColor } }}
              />
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
              {achievementsTokens.label}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: themeConfig.colors.black }}
            >
              {achievementsTokens.separateLines}
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
            placeholder={achievementsTokens.placeholder}
          />

          {/* Hover (or focus) the lamp to see what to write */}
          <Tooltip title={<AchievementsTips />} placement="bottom-start" arrow>
            <Box
              tabIndex={0}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                mt: 0.5,
                cursor: "help",
                color: "text.secondary",
              }}
            >
              <LightbulbOutlinedIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption">
                {achievementsTokens.hint}
              </Typography>
            </Box>
          </Tooltip>

          {/* AI chips */}
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Button
              size="small"
              disabled={
                isAIDisabled || !entry.roleTitle?.trim() || isGenerating
              }
              onClick={() =>
                onGenerateAchievements?.(entry.id, entry.roleTitle)
              }
              startIcon={
                isGenerating ? (
                  <CircularProgress size={12} color="inherit" />
                ) : (
                  <IconAI size={13} />
                )
              }
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
              {isGenerating
                ? enTokens.ai.generating
                : enTokens.ai.generateAchievements}
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
  },
);

/**
 * Form section for collecting and editing a candidate's work experience.
 *
 * Renders a list of experience entries, each with role title, company, start and end dates,
 * location, and a key achievements textarea with inline AI improvement chips.
 * The user can add new entries or delete existing ones.
 *
 * This is a controlled component - the parent owns `entries` and must handle
 * `onChange`, `onAdd`, and `onDelete` to keep state in sync.
 *
 * @example
 * ```tsx
 * <WorkExperienceForm
 *   entries={experiences}
 *   isAIDisabled={!isReady}
 *   onAdd={handleAdd}
 *   onDelete={handleDelete}
 *   onChange={handleChange}
 *   onGenerateAchievements={handleGenerate}
 *   generatingIds={generatingIds}
 * />
 * ```
 */
export const WorkExperienceForm = ({
  entries = [],
  isAIDisabled = false,
  onAdd,
  onDelete,
  onChange,
  onStartDateChange,
  onEndDateChange,
  onGenerateAchievements,
  generatingIds = [],
  labels = WORK_EXPERIENCE_LABELS,
}: WorkExperienceFormProps) => {
  const accentColor = useAccentColorSelector((s) => s);
  const SectionIcon = labels.icon;

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
          <SectionIcon color={accentColor} />
          <Typography
            component="span"
            sx={{ fontWeight: 600, userSelect: "none" }}
          >
            {labels.title}
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
          {labels.addButton}
        </Button>
      </Box>

      {/* Entries */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {entries.map((entry) => (
          <WorkExperienceEntryCard
            key={entry.id}
            entry={entry}
            accentColor={accentColor}
            isAIDisabled={isAIDisabled}
            isGenerating={generatingIds.includes(entry.id)}
            labels={labels}
            onChange={onChange}
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
            onDelete={onDelete}
            onGenerateAchievements={onGenerateAchievements}
          />
        ))}
      </Box>
    </Box>
  );
};
