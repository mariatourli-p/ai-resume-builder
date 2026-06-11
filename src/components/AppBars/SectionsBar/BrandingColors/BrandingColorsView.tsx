import { useCallback } from "react";
import { BrandingColors } from "./BrandingColors";
import { useAppDispatch } from "@/redux/store";
import { useAccentColorSelector } from "@/redux/selectors";
import { setAccentColor } from "@/redux/resume/resume-reducer";

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
