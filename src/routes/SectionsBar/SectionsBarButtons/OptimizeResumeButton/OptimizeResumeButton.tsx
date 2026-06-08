import {
  IconButton,
  type IconButtonProps,
} from "@/components/Buttons/IconButton";
import { enTokens } from "@/locale/en/en-tokens";
import { themeConfig } from "@/theme/themeConfig";
import { useCallback, useState } from "react";

export type OptimizeResumeButtonProps = Omit<IconButtonProps, "text"> & {
  iconClassName?: string;
  onOptimize?: () => Promise<void>;
};

export const OptimizeResumeButton = ({
  icon,
  sx,
  onOptimize,
}: OptimizeResumeButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onPress = useCallback(async () => {
    if (!onOptimize) return;
    if (isLoading) {
      // if loading and button is pressed again, we want to cancel the optimization process
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    await onOptimize();
    setIsLoading(false);
  }, [isLoading, onOptimize]);

  return (
    <IconButton
      text={
        isLoading
          ? enTokens.settings.optimizing
          : enTokens.settings.optimize_resume
      }
      icon={icon}
      onPress={onPress}
      sx={{
        backgroundColor: themeConfig.colors.sidebar.cta,
        color: themeConfig.colors.white,
        borderColor: themeConfig.colors.sidebar.cta,
        "& .MuiButton-startIcon > *": {
          color: themeConfig.colors.ai.accentLight,
          animation: isLoading ? "spin 1.2s steps(4, end) infinite" : "none",
        },
        "&:hover:not(:active)": {
          borderColor: themeConfig.colors.ai.accentLight,
          borderWidth: themeConfig.borderWidth[2],
          cursor: "pointer",
        },
        borderRadius: themeConfig.borderRadius[8],
        borderWidth: themeConfig.borderWidth[1],
        textTransform: "none",
        fontWeight: 700,
        padding: `${themeConfig.spacing[4]} ${themeConfig.spacing[16]}`,
        fontSize: themeConfig.fontSize.xs,
        ...sx,
      }}
    />
  );
};
