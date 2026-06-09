import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { IconPersonal } from "@/assets/Icons";
import { enTokens } from "@/locale/en/en-tokens";
import { themeConfig } from "@/theme";

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
  onEnhance: () => void;
  /** Fired when the Smart Rewrite button inside the summary field is clicked. */
  onSmartRewrite?: () => void;
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
  onSmartRewrite,
  onChange,
  isEnhanceDisabled,
}: PersonalInfoFormProps) => {
  const { personalInfo } = enTokens.sections;
  const primary = themeConfig.colors.primary;

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
          <IconPersonal style={{ color: primary.DEFAULT }} />
          <Typography
            component="span"
            sx={{ fontWeight: 600, userSelect: "none" }}
          >
            Personal Info
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AutoAwesomeIcon />}
          disabled={isEnhanceDisabled || isEnhancing}
          onClick={onEnhance}
          sx={{
            borderRadius: themeConfig.borderRadius.full,
            bgcolor: primary.DEFAULT,
            textTransform: "uppercase",
            fontSize: themeConfig.fontSize.xs,
            letterSpacing: "0.08em",
            "&:hover": { bgcolor: primary.text },
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
            <LightbulbOutlinedIcon
              sx={{ fontSize: 14, color: "text.secondary" }}
            />
            <Typography variant="caption" color="text.secondary">
              {personalInfo.fields.professionalSummary.hint}
            </Typography>
          </Box>
          <Button
            size="small"
            disabled={isRewriting || isEnhanceDisabled}
            onClick={onSmartRewrite}
            startIcon={<AutoAwesomeIcon sx={{ fontSize: 14 }} />}
            sx={{
              borderRadius: "20px",
              border: `1px solid ${primary.border}`,
              color: primary.text,
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
