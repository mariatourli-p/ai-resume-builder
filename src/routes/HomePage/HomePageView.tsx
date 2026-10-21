import { AppFooter } from "@/components/AppBars/AppFooter";
import { APP_BAR_HEIGHT } from "@/components/AppBars/HeaderBar";
import { ResumePreviewView } from "@/components/ResumePreview/ResumePreviewView";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useCallback, useState } from "react";
import { BrowserAIDownloadView } from "../AISettings/BrowserAIDownloadView";
import { ErrorDialogView } from "../Dialogs/ErrorDialogView";
import { HeaderBarView } from "../HeaderBar";
import { ResumeBuilder } from "../ResumeBuilder";
import { SectionsBarView } from "../SectionsBar";
import { ExportProvider } from "../context/ExportProvider/ExportProvider";

/**
 * The app page: header, sections drawer, forms and resume preview.
 *
 * Below the `md` breakpoint (phones, small tablets) there is room only for
 * the forms. The drawer opens from the header's menu button, and the preview
 * is kept off screen so Export PDF still works.
 */
export const HomePageView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Runs on the header's menu button (mobile only). The header stays above
   * the open drawer, so the same button also closes it.
   */
  const toggleMenu = useCallback(() => setIsMenuOpen((open) => !open), []);

  /** Runs when the mobile drawer is dismissed or a section is picked in it */
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <ExportProvider>
      {/* dvh, unlike vh, excludes the mobile browser's address bar */}
      <Box sx={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
        <HeaderBarView onMenuClick={isMobile ? toggleMenu : undefined} />
        <Box
          sx={{
            display: "flex",
            flex: 1,
            mt: APP_BAR_HEIGHT,
            overflow: "hidden",
          }}
        >
          <SectionsBarView
            isMobile={isMobile}
            open={isMenuOpen}
            onClose={closeMenu}
          />
          <Box
            sx={{
              flex: isMobile ? 1 : 0.5,
              overflowY: "auto",
              overflowX: "hidden",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <ResumeBuilder sx={{ p: { xs: 2, sm: 3 } }} />
            {/* Inside the forms' scroll area, so it shows after the last section */}
            <AppFooter />
          </Box>
          <ResumePreviewView offscreen={isMobile} />
          <ErrorDialogView />
          <BrowserAIDownloadView />
        </Box>
      </Box>
    </ExportProvider>
  );
};
