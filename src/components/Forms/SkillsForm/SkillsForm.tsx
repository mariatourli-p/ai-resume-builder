import type { KeyboardEvent } from "react";
import { Box, TextField, Button, Typography, Paper, Chip } from "@mui/material";
import { IconSkills, IconAI } from "@/assets/Icons";
import { themeConfig } from "@/theme/themeConfig";
import { enTokens } from "@/locale/en/en-tokens";

const primary = themeConfig.colors.primary;
const t = enTokens.skillsForm;
const ai = enTokens.ai;

export type SkillsFormProps = {
  /** List of currently applied skills. */
  skills?: string[];
  /** List of AI-suggested skills for the current job title. */
  suggestedSkills?: string[];
  /** The job title used to generate suggestions (shown in the section label). */
  jobTitle?: string;
  /** When `true`, the AI suggest button is disabled. */
  isAIDisabled?: boolean;
  /** When `true`, shows a loading state on the suggest button. */
  isSuggesting?: boolean;
  /** Current value of the skill input field. */
  input: string;
  /** Fired when the input value changes. */
  onInputChange: (value: string) => void;
  /** Fired when Enter is pressed inside the input. */
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  /** Fired when the Add button is clicked. */
  onAdd: (skill: string) => void;
  /** Fired when a skill chip is removed. */
  onRemove?: (skill: string) => void;
  /** Fired when the AI suggest button is clicked. */
  onSuggest?: () => void;
  /** Set of skills already applied — used to highlight suggestion chips. */
  appliedSet?: Set<string>;
};

/**
 * Form section for managing a candidate's skills and core competencies.
 *
 * Renders a text input to add skills by typing and pressing Enter or clicking Add,
 * a list of applied skill chips with remove buttons, and an AI-suggested skills
 * section where clicking a tag adds it instantly.
 *
 * This is a pure UI component — the parent owns all state and must handle
 * `onInputChange`, `onKeyDown`, `onAdd`, and `onRemove` to keep state in sync.
 *
 * @example
 * ```tsx
 * <SkillsForm
 *   input={input}
 *   skills={skills}
 *   suggestedSkills={suggestions}
 *   jobTitle="Senior Product Designer"
 *   appliedSet={new Set(skills)}
 *   onInputChange={setInput}
 *   onKeyDown={handleKeyDown}
 *   onAdd={handleAdd}
 *   onRemove={handleRemove}
 *   onSuggest={handleSuggest}
 * />
 * ```
 */
export const SkillsForm = ({
  skills = [],
  suggestedSkills = [],
  jobTitle,
  isAIDisabled = false,
  isSuggesting = false,
  input,
  onInputChange,
  onKeyDown,
  onAdd,
  onRemove,
  onSuggest,
  appliedSet = new Set(skills),
}: SkillsFormProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
        <IconSkills color={primary.DEFAULT} />
        <Typography
          component="span"
          sx={{ fontWeight: 600, userSelect: "none" }}
        >
          {t.title}
        </Typography>
      </Box>

      {/* Input row */}
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          placeholder={t.inputPlaceholder}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button
          variant="contained"
          onClick={() => onAdd(input)}
          disabled={!input.trim()}
          sx={{
            bgcolor: primary.DEFAULT,
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: 600,
            whiteSpace: "nowrap",
            "&:hover": { bgcolor: primary.text },
          }}
        >
          {t.addButton}
        </Button>
      </Box>

      {/* Current skills */}
      {skills.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "block",
              mb: 1.5,
            }}
          >
            {t.currentSkillsLabel}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={() => onRemove?.(skill)}
                sx={{
                  borderRadius: themeConfig.borderRadius.full,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  fontSize: "0.8rem",
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* AI Suggestions */}
      {suggestedSkills.length > 0 && (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {jobTitle ? `${t.suggestedLabel} "${jobTitle}"` : t.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <IconAI size={13} color={primary.text} />
              <Typography variant="caption" sx={{ color: primary.text }}>
                {t.clickToAdd}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {suggestedSkills.map((skill) => {
              const isApplied = appliedSet.has(skill);
              return (
                <Chip
                  key={skill}
                  onClick={() => !isApplied && onAdd(skill)}
                  sx={{
                    borderRadius: themeConfig.borderRadius.full,
                    fontSize: "0.8rem",
                    cursor: isApplied ? "default" : "pointer",
                    bgcolor: isApplied ? primary.DEFAULT : "background.paper",
                    color: isApplied ? "white" : "text.primary",
                    border: "1px solid",
                    borderColor: isApplied ? primary.DEFAULT : "divider",
                    fontWeight: isApplied ? 600 : 400,
                    "& .MuiChip-label": {
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    },
                    "&:hover": {
                      bgcolor: isApplied ? primary.DEFAULT : primary.surface,
                    },
                  }}
                  label={
                    <Box
                      component="span"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      {skill}
                      {isApplied && <span>✓</span>}
                    </Box>
                  }
                />
              );
            })}
          </Box>
        </Box>
      )}

      {/* Suggest with AI — shown when no suggestions yet */}
      {suggestedSkills.length === 0 && (
        <Button
          size="small"
          disabled={isAIDisabled || isSuggesting}
          onClick={onSuggest}
          startIcon={<IconAI size={13} />}
          sx={{
            borderRadius: themeConfig.borderRadius.full,
            border: `1px solid ${primary.border}`,
            color: primary.text,
            fontSize: "0.75rem",
            textTransform: "none",
            px: 1.5,
            "&:hover": { bgcolor: primary.surface },
          }}
        >
          {isSuggesting ? ai.loading : ai.suggest}
        </Button>
      )}
    </Paper>
  );
};
