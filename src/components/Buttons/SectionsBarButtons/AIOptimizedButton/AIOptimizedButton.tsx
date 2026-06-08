import { enTokens } from "@/locale/en/en-tokens";
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

  return (
    <IconButton
      text={ai_optimized}
      icon={icon}
      sx={{
        backgroundColor: themeConfig.colors.ai.surface,
        color: themeConfig.colors.ai.accent,
        borderColor: themeConfig.colors.ai.border,
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
