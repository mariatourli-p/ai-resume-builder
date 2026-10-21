import { enTokens } from "@/locale/en/en-tokens";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";

export type CloudAISwitchProps = {
  /** Whether the user allows the online AI */
  checked: boolean;
  onChange: (checked: boolean) => void;
};

/**
 * Settings switch for the online AI, so the user can change the choice they
 * made in the consent dialog at any time.
 *
 * @example
 * <CloudAISwitch checked={isCloud} onChange={updateConsent} />
 */
export const CloudAISwitch = ({ checked, onChange }: CloudAISwitchProps) => {
  const { label, description } = enTokens.cloudSwitch;

  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
          />
        }
        label={
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
            {label}
          </Typography>
        }
        sx={{ ml: 0, gap: 1 }}
      />
      <Typography
        sx={{ fontSize: 11, lineHeight: 1.6, color: "text.secondary", mt: 0.5 }}
      >
        {description}
      </Typography>
    </Box>
  );
};
