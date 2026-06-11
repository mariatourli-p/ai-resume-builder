import { useAccentColorSelector } from "@/redux/selectors";
import { themeConfig } from "@/theme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useState } from "react";

export type SettingsFooterProps = {
  title: string;
  inputLabel: string;
  linkLabel: string;
  linkHref: string;
  inputPlaceholder: string;
  footerText: string;
  apiKey: string;
  onSave: (key: string) => void;
  onClear: () => void;
};

export const SettingsFooter = ({
  title,
  inputLabel,
  linkLabel,
  linkHref,
  inputPlaceholder,
  footerText,
  apiKey,
  onSave,
}: SettingsFooterProps) => {
  const [showValue, setShowValue] = useState(false);
  const accentColor = useAccentColorSelector((s) => s);

  return (
    <Box sx={{ p: 2.5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "text.secondary",
          }}
        >
          {inputLabel}
        </Typography>
        <Link
          href={linkHref}
          target="_blank"
          sx={{ fontSize: 11, color: accentColor }}
        >
          {linkLabel}
        </Link>
      </Box>

      <OutlinedInput
        fullWidth
        size="small"
        placeholder={inputPlaceholder}
        type={showValue ? "text" : "password"}
        value={apiKey}
        onChange={(e) => onSave(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton size="small" onClick={() => setShowValue((p) => !p)}>
              {showValue ? (
                <VisibilityOffIcon sx={{ fontSize: 16 }} />
              ) : (
                <VisibilityIcon sx={{ fontSize: 16 }} />
              )}
            </IconButton>
          </InputAdornment>
        }
        sx={{ borderRadius: 2, fontSize: 13 }}
      />

      <Typography sx={{ fontSize: 11, color: themeConfig.colors.black, mt: 1 }}>
        {footerText}
      </Typography>
    </Box>
  );
};
