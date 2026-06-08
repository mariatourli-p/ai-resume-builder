import { useCallback, useState } from "react";
import { BrandingColors } from "./BrandingColors";
import { DEFAULT_ACCENT_COLOR } from "./constants";

export const BrandingColorsView = () => {
  const [activeColor, setActiveColor] = useState<string>(DEFAULT_ACCENT_COLOR);

  const handleColorSelect = useCallback((value: string) => {
    setActiveColor(value);
  }, []);

  return (
    <BrandingColors
      activeColor={activeColor}
      onColorSelect={handleColorSelect}
    />
  );
};
