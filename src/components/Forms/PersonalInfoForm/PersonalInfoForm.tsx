import { IconPersonal } from "@/assets/Icons";
import { enTokens } from "@/locale/en/en-tokens";
import { useAccentColorSelector } from "@/redux/selectors";
import { AI_PROMPTS } from "@/services/aiPrompts";
import { PALETTE_MAP, themeConfig } from "@/theme";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export type PersonalInfoData = {
  fullName: string;
  professionalTitle: string;
  emailAddress: string;
  phone: string;
  location: string;
  portfolio: string;
  professionalSummary: string;
};

/**
 * Props for the `PersonalInfoForm` component.
 */
export type PersonalInfoFormProps = {
  /** All field values for the personal info section. When omitted, all fields render empty. */
  data: PersonalInfoData;
  /** When `true`, the Enhance button shows a loading label and is disabled. */
  isEnhancing: boolean;
  /** When `true`, the Smart Rewrite button shows a loading label and is disabled. */
  isRewriting: boolean;
  /** Disables both the Enhance and Smart Rewrite buttons (e.g. when the API key is missing). */
  isEnhanceDisabled: boolean;
  /** Fired when the Enhance button is clicked. */
  onEnhance: (prompt: keyof typeof AI_PROMPTS) => void;
  /** Fired when the Smart Rewrite button inside the summary field is clicked. */
  onSmartRewrite: (prompt: keyof typeof AI_PROMPTS) => void;
  /** Fired on every field change. Receives the field key and the new value. */
  onChange: (field: keyof PersonalInfoData, value: string) => void;
};

/**
 * Form section for collecting and editing a candidate's personal information.
 *
 * Renders a two-column grid of fields (name, title, email, phone, location, portfolio)
 * and a full-width professional summary textarea with an inline Smart Rewrite button.
 *
 * AI actions are surfaced via two entry points:
 * - **Enhance** — header button that improves all fields at once
 * - **Smart Rewrite** — inline button inside the summary textarea
 *
 * This is a controlled component — the parent owns `data` and must handle `onChange`
 * to keep field values in sync.
 *
 * @example
 * ```tsx
 * <PersonalInfoForm
 *   data={personalInfo}
 *   isEnhanceDisabled={!apiKey}
 *   onChange={(field, value) => update(field, value)}
 *   onEnhance={handleEnhance}
 *   onSmartRewrite={handleSmartRewrite}
 * />
 * ```
 */
export const PersonalInfoForm = ({
  data,
  isEnhancing = false,
  isRewriting = false,
  onEnhance,
  onChange,
  onSmartRewrite,
  isEnhanceDisabled,
}: PersonalInfoFormProps) => {
  const { personalInfo } = enTokens.sections;
  const accentColor = useAccentColorSelector((s) => s);

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconPersonal style={{ color: accentColor }} />
          <Typography
            component="span"
            sx={{ fontWeight: 600, userSelect: "none" }}
          >
            {enTokens.sections.personalInfo.title}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AutoAwesomeIcon />}
          disabled={isEnhanceDisabled || isEnhancing}
          onClick={() => onEnhance("enhance")}
          sx={{
            borderRadius: themeConfig.borderRadius.full,
            bgcolor: accentColor,
            textTransform: "uppercase",
            fontSize: themeConfig.fontSize.xs,
            letterSpacing: "0.08em",
            "&:hover": { bgcolor: accentColor },
          }}
        >
          {isEnhancing ? "Enhancing..." : "Enhance"}
        </Button>
      </Box>

      {/* Row 1 */}
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}
      >
        <TextField
          label="FULL NAME"
          fullWidth
          value={data?.fullName ?? ""}
          onChange={(e) => onChange?.("fullName", e.target.value)}
          sx={{ userSelect: "none" }}
        />
        <TextField
          label="PROFESSIONAL TITLE"
          fullWidth
          value={data?.professionalTitle ?? ""}
          onChange={(e) => onChange?.("professionalTitle", e.target.value)}
        />
      </Box>

      {/* Row 2 */}
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}
      >
        <TextField
          label="EMAIL ADDRESS"
          type="email"
          fullWidth
          value={data?.emailAddress ?? ""}
          onChange={(e) => onChange?.("emailAddress", e.target.value)}
          sx={{ userSelect: "none" }}
        />
        <TextField
          label="PHONE / PROFILE"
          fullWidth
          value={data?.phone ?? ""}
          onChange={(e) => onChange?.("phone", e.target.value)}
          sx={{ userSelect: "none" }}
        />
      </Box>

      {/* Row 3 */}
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}
      >
        <TextField
          label="LOCATION"
          fullWidth
          value={data?.location ?? ""}
          onChange={(e) => onChange?.("location", e.target.value)}
        />
        <TextField
          label="PORTFOLIO / WEBSITE"
          fullWidth
          value={data?.portfolio ?? ""}
          onChange={(e) => onChange?.("portfolio", e.target.value)}
          sx={{ userSelect: "none" }}
        />
      </Box>

      {/* Professional Summary */}
      <Box sx={{ position: "relative" }}>
        <TextField
          label="PROFESSIONAL SUMMARY"
          multiline
          fullWidth
          value={data?.professionalSummary ?? ""}
          onChange={(e) => onChange?.("professionalSummary", e.target.value)}
          slotProps={{
            htmlInput: {
              sx: {
                resize: "vertical",
                minHeight: "100px",
                overflow: "auto",
              },
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 0.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LightbulbOutlinedIcon sx={{ fontSize: 14 }} />
            <Typography variant="caption" color="text.secondary">
              {personalInfo.fields.professionalSummary.hint}
            </Typography>
          </Box>
          <Button
            size="small"
            disabled={isRewriting || isEnhanceDisabled}
            onClick={() => onSmartRewrite("smartRewrite")}
            startIcon={<AutoAwesomeIcon sx={{ fontSize: 14 }} />}
            sx={{
              borderRadius: "20px",
              border: `1px solid ${accentColor}`,
              color: PALETTE_MAP[accentColor].dark,
              backgroundColor: PALETTE_MAP[accentColor].light,
              fontSize: themeConfig.fontSize.xs,
              textTransform: "none",
              px: 1.5,
            }}
          >
            {isRewriting ? enTokens.ai.rewriting : enTokens.ai.smartRewrite}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
