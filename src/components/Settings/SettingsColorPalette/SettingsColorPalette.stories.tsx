import { BRANDING_PALETTES } from "@/components/AppBars/SectionsBar/BrandingColors/constants";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SettingsColorPalette } from "./SettingsColorPalette";

const meta: Meta<typeof SettingsColorPalette> = {
  title: "Components/Settings/SettingsColorPalette",
  component: SettingsColorPalette,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SettingsColorPalette>;

export const Default: Story = {
  args: {
    palettes: BRANDING_PALETTES,
    activeColor: BRANDING_PALETTES[0].value,
  },
  render: (args) => {
    const [activeColor, setActiveColor] = useState(args.activeColor);
    return (
      <SettingsColorPalette
        {...args}
        activeColor={activeColor}
        onColorSelect={setActiveColor}
      />
    );
  },
};

export const NoneSelected: Story = {
  args: {
    palettes: BRANDING_PALETTES,
    activeColor: "",
  },
};

export const RoseSelected: Story = {
  args: {
    palettes: BRANDING_PALETTES,
    activeColor: BRANDING_PALETTES[3].value,
  },
};
