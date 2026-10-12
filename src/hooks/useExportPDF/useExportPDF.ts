import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function useExportPDF() {
  const exportPDF = async (
    previewRef: React.RefObject<HTMLElement>,
    firstName: string,
    lastName: string,
  ) => {
    const element = previewRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2, // 2x for sharper output
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    // Handle multi-page resumes
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const filename = `${firstName}-${lastName}-resume.pdf`
      .toLowerCase()
      .replace(/\s+/g, "-");
    pdf.save(filename);
  };

  return { exportPDF };
}
