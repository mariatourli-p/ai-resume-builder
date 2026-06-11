import { setAccentColor } from "@/redux/resume/resume-reducer";
import { useAccentColorSelector } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import { Box } from "@mui/material";
import { useCallback, useState } from "react";

import { BRANDING_PALETTES } from "@/components/AppBars/SectionsBar/BrandingColors/constants";
import { SettingsColorPalette } from "@/components/Settings/SettingsColorPalette";
import { SettingsFooter } from "@/components/Settings/SettingsFooter";
import { SettingsHeader } from "@/components/Settings/SettingsHeader";
import { useApiKey } from "@/routes/ApiKey/useApiKey";

export const SettingsView = () => {
  const dispatch = useAppDispatch();
  const activeColor = useAccentColorSelector((s) => s);
  const { apiKey, setApiKey, clearApiKey } = useApiKey();
  const [input, setInput] = useState(apiKey);

  const handleColorSelect = useCallback(
    (value: string) => {
      dispatch(setAccentColor(value));
    },
    [dispatch],
  );

  return (
    <Box>
      <SettingsHeader
        title="Visual Style Customizer"
        description="Adjust configurations here to automatically update both editor fields and resume preview sheets!"
      />
      <Box sx={{ px: 2.5, py: 2 }}>
        <SettingsColorPalette
          palettes={BRANDING_PALETTES}
          activeColor={activeColor}
          onColorSelect={handleColorSelect}
        />
      </Box>
      <SettingsFooter
        title="Personal Anthropic API Key"
        inputLabel="PERSONAL ANTHROPIC API KEY"
        linkLabel="Get free key ↗"
        linkHref="https://console.anthropic.com"
        inputPlaceholder="Anthropic API Key (sk-ant-...)"
        footerText="Provide your own Anthropic API Key to enable AI features. Your key is stored securely in localStorage."
        apiKey={input}
        onSave={(key) => {
          setApiKey(key);
          setInput(key);
        }}
        onClear={() => {
          clearApiKey();
          setInput("");
        }}
      />
    </Box>
  );
};
