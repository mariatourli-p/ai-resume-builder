import { useAccentColorSelector } from "@/redux/selectors";
import { useAppSelector } from "@/redux/store";
import { useExportContext } from "@/routes/context/ExportProvider/ExportContext";
import { themeConfig } from "@/theme";
import { Box } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef } from "react";
import { ResumePreview } from "./ResumePreview";

export const ResumePreviewView = () => {
  const { personalInfo, workExperience, education, skills } = useAppSelector(
    (state) => state.resume,
  );
  const accentColor = useAccentColorSelector((s) => s);
  const activeTemplate = useAppSelector((s) => s.resume.activeTemplate);
  const fontFamily =
    themeConfig.fontFamily.templates[
      activeTemplate as keyof typeof themeConfig.fontFamily.templates
    ] ?? themeConfig.fontFamily.sans;
  const previewRef = useRef<HTMLDivElement>(null);
  const { registerExport } = useExportContext();

  useEffect(() => {
    registerExport(async () => {
      const element = previewRef.current;
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const name = personalInfo.fullName || "resume";
      pdf.save(`${name.toLowerCase().replace(/\s+/g, "-")}-resume.pdf`);
    });
  }, [registerExport, personalInfo.fullName]);

  return (
    <Box
      sx={{
        flex: 0.5,
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        justifyContent: "center",
        p: 4,
        backgroundColor: "#f1f5f9",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <ResumePreview
        ref={previewRef}
        personalInfo={personalInfo}
        workExperience={workExperience}
        education={education}
        skills={skills}
        accentColor={accentColor}
        fontFamily={fontFamily.join(", ")}
      />
    </Box>
  );
};
