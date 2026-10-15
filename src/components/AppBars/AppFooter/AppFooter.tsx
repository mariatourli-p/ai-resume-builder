import { LicensesDialog } from "@/components/Dialogs/LicensesDialog";
import { enTokens } from "@/locale/en/en-tokens";
import { themeConfig } from "@/theme";
import { Box, Link, Stack, Typography, type SxProps } from "@mui/material";
import { useState } from "react";

export type AppFooterProps = {
  sx?: SxProps;
};

/**
 * Page footer with the copyright, a short privacy note and a button that
 * opens a summary of the open-source packages and fonts the app uses.
 *
 * The app sets no cookies and has no tracking, so there is no cookie banner:
 * the resume is kept only in the browser's localStorage, which the app needs
 * to work.
 *
 * @example
 * <AppFooter />
 */
export const AppFooter = ({ sx }: AppFooterProps) => {
  const { copyright, privacy, licenses } = enTokens.footer;
  const [isLicensesOpen, setIsLicensesOpen] = useState(false);

  return (
    <Box
      component="footer"
      sx={{
        px: { xs: 2, sm: 3 },
        py: 3,
        borderTop: `1px solid ${themeConfig.colors.sidebar.border}`,
        color: themeConfig.colors.sidebar.textBody,
        fontSize: themeConfig.fontSize.xs,
        ...sx,
      }}
    >
      <Stack spacing={0.5}>
        <Typography sx={{ fontSize: "inherit" }}>{privacy}</Typography>
        <Typography sx={{ fontSize: "inherit" }}>
          {copyright.replace("{year}", String(new Date().getFullYear()))}
          {" · "}
          <Link
            component="button"
            onClick={() => setIsLicensesOpen(true)}
            color="inherit"
            sx={{ fontSize: "inherit", verticalAlign: "baseline" }}
          >
            {licenses}
          </Link>
        </Typography>
      </Stack>

      <LicensesDialog
        open={isLicensesOpen}
        onClose={() => setIsLicensesOpen(false)}
      />
    </Box>
  );
};
