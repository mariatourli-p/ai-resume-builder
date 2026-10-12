import { useAccentColorSelector } from "@/redux/selectors";
import { useAppSelector } from "@/redux/store";
import { useExportContext } from "@/routes/context/ExportProvider/ExportContext";
import { themeConfig } from "@/theme";
import { Box } from "@mui/material";
import { useDeferredValue, useEffect, useRef } from "react";
import { ResumePreview } from "./ResumePreview";

/** Content below the page bottom that still doesn't start a new PDF page */
const PAGE_OVERFLOW_TOLERANCE_MM = 1;

export const ResumePreviewView = () => {
  const resume = useAppSelector((state) => state.resume);
  console.log("🚀 ~ ResumePreviewView ~ resume:", resume);
  /**
   * The preview updates at low priority, so typing in the forms never waits
   * for the whole resume to re-render
   */
  const {
    personalInfo,
    workExperience,
    volunteering,
    education,
    courses,
    skills,
  } = useDeferredValue(resume);
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

      // Loaded only when the user exports, to keep the first page load small
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        /**
         * On screen the page shrinks to fit the preview panel but keeps its
         * A4 height, so the capture would be taller than A4 and spill onto a
         * second page. The copy html2canvas renders gets the real A4 width.
         */
        onclone: (_document, clone) => {
          clone.style.width = "210mm";
          clone.style.flexShrink = "0";
        },
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

      /**
       * A one-page resume is exactly A4 tall, but rounding to canvas pixels
       * makes the image a fraction of a millimeter taller. Without this
       * margin, that fraction adds an empty second page.
       */
      while (heightLeft > PAGE_OVERFLOW_TOLERANCE_MM) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // "John Doe" -> john-doe-resume.pdf, no name -> resume.pdf
      const name = personalInfo.fullName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      pdf.save(name ? `${name}-resume.pdf` : "resume.pdf");
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
        /**
         * Without this, flex stretches the page to the panel height and its
         * A4 minimum, so a longer resume spills out of the white page
         */
        alignItems: "flex-start",
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
        volunteering={volunteering}
        education={education}
        courses={courses}
        skills={skills}
        accentColor={accentColor}
        fontFamily={fontFamily.join(", ")}
      />
    </Box>
  );
};
