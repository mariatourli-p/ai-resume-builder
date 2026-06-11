import { enTokens } from "@/locale/en/en-tokens";
import { useAccentColorSelector } from "@/redux/selectors";
import { PALETTE_MAP } from "@/theme";
import { themeConfig } from "@/theme/themeConfig";
import { IconButton, type IconButtonProps } from "../../BaseButtons/IconButton";

export type AIOptimizedButtonProps = IconButtonProps;

/**
 * A styled variant of `IconButton` that visually indicates AI-optimized content.
 *
 * Renders a green pill-shaped button using the project's `#10b981` AI accent color.
 * Accepts all `IconButtonProps` — any `sx` overrides passed in are merged on top of the default styles.
 *
 * @example
 * <AIOptimizedButton icon={<SparklesIcon />} />
 *
 */
export const AIOptimizedButton = ({ sx, icon }: AIOptimizedButtonProps) => {
  const { ai_optimized } = enTokens.app;
  const accentColor = useAccentColorSelector((s) => s);

  return (
    <IconButton
      text={ai_optimized}
      icon={icon}
      sx={{
        backgroundColor: PALETTE_MAP[accentColor]?.light,
        color: accentColor,
        borderColor: accentColor,
        borderRadius: themeConfig.borderRadius.full,
        borderWidth: themeConfig.borderWidth[1],
        textTransform: "none",
        fontWeight: 700,
        padding: `${themeConfig.spacing[4]} ${themeConfig.spacing[16]}`,
        fontSize: themeConfig.fontSize.xs,
        "&:hover": {
          backgroundColor: themeConfig.colors.ai.surfaceHover,
          borderColor: themeConfig.colors.ai.accent,
        },
        ...sx,
      }}
    />
  );
};
