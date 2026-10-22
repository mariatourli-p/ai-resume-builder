import { IconMenu } from "@/assets/Icons";
import { enTokens } from "@/locale/en";
import { themeConfig } from "@/theme";
import { IconButton, Stack, Typography } from "@mui/material";

export type HeaderLeftSideProps = {
  /** When set, shows a menu button that opens the sections drawer (mobile) */
  onMenuClick?: () => void;
};

export const HeaderLeftSide = ({ onMenuClick }: HeaderLeftSideProps) => {
  return (
    <Stack direction="row" sx={{ alignItems: "center", gap: { xs: 1, sm: 2 } }}>
      {onMenuClick && (
        <IconButton
          size="small"
          onClick={onMenuClick}
          aria-label={enTokens.app.open_menu}
          sx={{ ml: -1 }}
        >
          <IconMenu size={20} color={themeConfig.colors.sidebar.textBody} />
        </IconButton>
      )}

      {/* App name */}
      <Typography
        sx={{
          // Phones keep the room for the Export PDF button
          display: { xs: "none", sm: "block" },
          fontWeight: 800,
          fontSize: themeConfig.fontSize.lg,
          color: themeConfig.colors.sidebar.cta,
          fontFamily: themeConfig.fontFamily.display.join(", "),
          whiteSpace: "nowrap",
        }}
      >
        {enTokens.app.title}
      </Typography>
    </Stack>
  );
};
