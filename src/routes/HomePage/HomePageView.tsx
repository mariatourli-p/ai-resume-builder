import { Box } from "@mui/material";
import { ResumeBuilder } from "../ResumeBuilder";
import { SectionsBarView } from "../SectionsBar";
import { HeaderBarView } from "../HeaderBar";
import { APP_BAR_HEIGHT } from "@/components/AppBars/HeaderBar";

export const HomePageView = () => {
  return (
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
      </Box>
    </Box>
  );
};
