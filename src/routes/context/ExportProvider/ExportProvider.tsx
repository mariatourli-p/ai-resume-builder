import { useCallback, useRef, type PropsWithChildren } from "react";
import { ExportContext } from "./ExportContext";

export function ExportProvider({ children }: PropsWithChildren) {
  const exportFnRef = useRef<() => void>(() => {});

  const registerExport = useCallback((fn: () => void) => {
    exportFnRef.current = fn;
  }, []);

  const triggerExport = useCallback(() => {
    exportFnRef.current();
  }, []);

  return (
    <ExportContext.Provider value={{ registerExport, triggerExport }}>
      {children}
    </ExportContext.Provider>
  );
}
