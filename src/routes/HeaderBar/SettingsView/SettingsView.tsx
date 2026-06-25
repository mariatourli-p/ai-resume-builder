import { setAccentColor } from "@/redux/resume/resume-reducer";
import { useAccentColorSelector } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import { Box } from "@mui/material";
import { useCallback, useState } from "react";

import { BRANDING_PALETTES } from "@/components/AppBars/SectionsBar/BrandingColors/constants";
import { SettingsColorPalette } from "@/components/Settings/SettingsColorPalette";
import { SettingsFooter } from "@/components/Settings/SettingsFooter";
import { SettingsHeader } from "@/components/Settings/SettingsHeader";
import { enTokens } from "@/locale/en/en-tokens";
import { useApiKey } from "@/routes/ApiKey/useApiKey";

const t = enTokens.settings;

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
        title={t.apiKey}
        inputLabel={t.apiKey}
        linkLabel={`${enTokens.missingApiKeyDialog.getFreeKey} ↗`}
        linkHref={enTokens.missingApiKeyDialog.getFreeKeyUrl}
        inputPlaceholder={t.apiKeyPlaceholder}
        footerText={enTokens.errors.missingKey}
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
