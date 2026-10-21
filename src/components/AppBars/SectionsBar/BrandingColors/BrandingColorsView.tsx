import { useCallback } from "react";
import { BrandingColors } from "./BrandingColors";
import { useAppDispatch } from "@/redux";
import { useAccentColorSelector } from "@/redux";
import { setAccentColor } from "@/redux/resume";

export const BrandingColorsView = () => {
  const dispatch = useAppDispatch();
  const activeColor = useAccentColorSelector((s) => s);

  const handleColorSelect = useCallback(
    (value: string) => {
      dispatch(setAccentColor(value));
    },
    [dispatch],
  );

  return (
    <BrandingColors
      activeColor={activeColor}
      onColorSelect={handleColorSelect}
    />
  );
};
