import { createContext, useContext } from "react";

interface ExportContextValue {
  registerExport: (fn: () => void) => void;
  triggerExport: () => void;
}

export const ExportContext = createContext<ExportContextValue>({
  registerExport: () => {},
  triggerExport: () => {},
});

export const useExportContext = () => useContext(ExportContext);
