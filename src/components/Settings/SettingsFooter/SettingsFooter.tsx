import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { themeConfig } from "@/theme";

export type SettingsFooterProps = {
  /** Title shown at the top of the settings panel */
  title: string;
  /** Label shown above the input field */
  inputLabel: string;
  /** Label and href for the helper link next to the input label */
  linkLabel: string;
  linkHref: string;
  /** Placeholder text for the input */
  inputPlaceholder: string;
  /** Footer description text below the input */
  footerText: string;
  /** localStorage key to persist the value */
  storageKey: string;
};

export const SettingsFooter = ({
  title,
  inputLabel,
  linkLabel,
  linkHref,
  inputPlaceholder,
  footerText,
  storageKey,
}: SettingsFooterProps) => {
  const [value, setValue] = useState(
    () => localStorage.getItem(storageKey) ?? "",
  );
  const [showValue, setShowValue] = useState(false);

  const primary = themeConfig.colors.primary;

  return (
    <Box sx={{ p: 2.5 }}>
      {/* Header */}
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

      {/* Input label + link */}
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
          sx={{ fontSize: 11, color: primary.DEFAULT }}
        >
          {linkLabel}
        </Link>
      </Box>

      {/* Input */}
      <OutlinedInput
        fullWidth
        size="small"
        placeholder={inputPlaceholder}
        type={showValue ? "text" : "password"}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          localStorage.setItem(storageKey, e.target.value);
        }}
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

      {/* Footer text */}
      <Typography sx={{ fontSize: 11, color: "text.secondary", mt: 1 }}>
        {footerText}
      </Typography>
    </Box>
  );
};
