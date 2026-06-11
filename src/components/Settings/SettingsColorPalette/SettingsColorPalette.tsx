import { Box, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export type ColorSwatch = {
  label: string;
  value: string;
};

export type SettingsColorPaletteProps = {
  /** List of color swatches to display */
  palettes: readonly ColorSwatch[];
  /** Currently selected color value */
  activeColor: string;
  /** Callback fired when a swatch is clicked */
  onColorSelect: (value: string) => void;
};

/**
 * SettingsColorPalette renders a row of rounded rectangle color swatches.
 *
 * Each swatch shows a tooltip with the palette name on hover,
 * and displays a checkmark with an outline ring when selected.
 *
 * @example
 * ```tsx
 * <BrandingColorPalette
 *   palettes={BRANDING_PALETTES}
 *   activeColor={activeColor}
 *   onColorSelect={handleColorSelect}
 * />
 * ```
 */
export const SettingsColorPalette = ({
  palettes,
  activeColor,
  onColorSelect,
}: SettingsColorPaletteProps) => {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {palettes.map(({ label, value }) => (
        <Tooltip key={value} title={label} placement="top">
          <Box
            onClick={() => onColorSelect(value)}
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              backgroundColor: value,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline: activeColor === value ? `2px solid ${value}` : "none",
              outlineOffset: "2px",
              transition: "transform 0.15s ease, outline 0.15s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            {activeColor === value && (
              <CheckIcon
                sx={{
                  fontSize: 18,
                  color: "rgba(255,255,255,0.95)",
                  filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.4))",
                }}
              />
            )}
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};
