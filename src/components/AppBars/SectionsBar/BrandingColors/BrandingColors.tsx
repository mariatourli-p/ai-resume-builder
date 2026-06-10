// BrandingColors.tsx
import { Box, Typography, Tooltip } from "@mui/material";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { BRANDING_PALETTES } from "./constants";

export type BrandingColorsProps = {
  activeColor: string;
  onColorSelect: (value: string) => void;
};

/**
 * BrandingColors renders a row of color swatches for selecting the resume accent color.
 *
 * Each swatch shows a tooltip with the palette name on hover, scales up on hover,
 * and displays a checkmark when selected. The active color gets an outline ring.
 *
 * @param activeColor - The currently selected color value (hex string).
 * @param onColorSelect - Callback fired when the user clicks a swatch, receives the color value.
 *
 * @example
 * <BrandingColors
 *   activeColor={activeColor}
 *   onColorSelect={setActiveColor}
 * />
 */
export const BrandingColors = ({
  activeColor,
  onColorSelect,
}: BrandingColorsProps) => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
        <PaletteOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, letterSpacing: 1, color: "text.secondary" }}
        >
          BRANDING COLORS
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        {BRANDING_PALETTES.map(({ label, value }) => (
          <Tooltip key={value} title={label} placement="top">
            <Box
              onClick={() => onColorSelect(value)}
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: value,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                outline: activeColor === value ? `3px solid ${value}` : "none",
                outlineOffset: "2px",
                transition: "outline 0.15s ease, transform 0.15s ease",
                "&:hover": { transform: "scale(1.1)" },
              }}
            >
              {activeColor === value && (
                <CheckIcon
                  sx={{
                    fontSize: 16,
                    color: "rgba(255,255,255,0.9)",
                    filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.5))",
                  }}
                />
              )}
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};
