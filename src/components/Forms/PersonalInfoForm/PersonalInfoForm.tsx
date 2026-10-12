import { IconPersonal } from "@/assets/Icons";
import { enTokens } from "@/locale/en/en-tokens";
import { useAccentColorSelector } from "@/redux/selectors";
import { PALETTE_MAP, themeConfig } from "@/theme";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export type PersonalInfoData = {
  fullName: string;
  professionalTitle: string;
  emailAddress: string;
  phone: string;
  location: string;
  portfolio: string;
  professionalSummary: string;
  /** Photo as an image URL (e.g. a data URL), or `""` for none */
  photo: string;
};

/**
 * Props for the `PersonalInfoForm` component.
 */
export type PersonalInfoFormProps = {
  /** All field values for the personal info section. When omitted, all fields render empty. */
  data: PersonalInfoData;
  /** When `true`, the Smart Rewrite button shows a loading label and is disabled. */
  isRewriting: boolean;
  /** Disables the Smart Rewrite button (e.g. when there is no professional title). */
  isRewriteDisabled: boolean;
  /** Fired when the Smart Rewrite button inside the summary field is clicked. */
  onSmartRewrite: () => void;
  /** Fired on every field change. Receives the field key and the new value. */
  onChange: (field: keyof PersonalInfoData, value: string) => void;
  /** Fired when the user picks an image file for the photo. */
  onPhotoSelect: (file: File) => void;
  /** Fired when the user removes the photo. */
  onPhotoRemove: () => void;
};

/**
 * Form section for collecting and editing a candidate's personal information.
 *
 * Renders an optional photo picker, a two-column grid of fields (name, title, email, phone, location, portfolio)
 * and a full-width professional summary textarea with an inline Smart Rewrite button.
 *
 * **Smart Rewrite** (inside the summary textarea) asks the AI to write the
 * summary from the professional title.
 *
 * This is a controlled component - the parent owns `data` and must handle `onChange`
 * to keep field values in sync.
 *
 * @example
 * ```tsx
 * <PersonalInfoForm
 *   data={personalInfo}
 *   isRewriteDisabled={!data.professionalTitle}
 *   onChange={(field, value) => update(field, value)}
 *   onSmartRewrite={handleSmartRewrite}
 * />
 * ```
 */
export const PersonalInfoForm = ({
  data,
  isRewriting = false,
  onChange,
  onSmartRewrite,
  onPhotoSelect,
  onPhotoRemove,
  isRewriteDisabled,
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
      </Box>

      {/* Photo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Avatar
          src={data?.photo || undefined}
          alt={personalInfo.fields.photo.alt}
          sx={{ width: 64, height: 64 }}
        />
        <Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              component="label"
              size="small"
              variant="outlined"
              sx={{
                textTransform: "none",
                color: accentColor,
                borderColor: accentColor,
              }}
            >
              {data?.photo
                ? personalInfo.fields.photo.change
                : personalInfo.fields.photo.upload}
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onPhotoSelect(file);
                  // Lets the user pick the same file again after removing it
                  e.target.value = "";
                }}
              />
            </Button>
            {data?.photo && (
              <Button
                size="small"
                onClick={onPhotoRemove}
                sx={{ textTransform: "none", color: "text.secondary" }}
              >
                {personalInfo.fields.photo.remove}
              </Button>
            )}
          </Box>
          <Typography variant="caption" color="text.secondary">
            {personalInfo.fields.photo.hint}
          </Typography>
        </Box>
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
            disabled={isRewriting || isRewriteDisabled}
            onClick={onSmartRewrite}
            startIcon={
              isRewriting ? (
                <CircularProgress size={12} color="inherit" />
              ) : (
                <AutoAwesomeIcon sx={{ fontSize: 14 }} />
              )
            }
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
