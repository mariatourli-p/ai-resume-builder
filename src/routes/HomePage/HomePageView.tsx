import { APP_BAR_HEIGHT } from "@/components/AppBars/HeaderBar";
import { ResumePreviewView } from "@/components/ResumePreview/ResumePreviewView";
import { Box } from "@mui/material";
import { ErrorDialogView } from "../Dialogs/ErrorDialogView";
import { HeaderBarView } from "../HeaderBar";
import { ResumeBuilder } from "../ResumeBuilder";
import { SectionsBarView } from "../SectionsBar";
import { ExportProvider } from "../context/ExportProvider/ExportProvider";

export const HomePageView = () => {
  return (
    <ExportProvider>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <HeaderBarView />
        <Box
          sx={{
            display: "flex",
            flex: 1,
            mt: APP_BAR_HEIGHT,
            overflow: "hidden",
          }}
        >
          <SectionsBarView />
          <Box
            sx={{
              flex: 0.5,
              overflowY: "auto",
              overflowX: "hidden",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <ResumeBuilder />
          </Box>
          <ResumePreviewView />
          <ErrorDialogView />
        </Box>
      </Box>
    </ExportProvider>
  );
};
