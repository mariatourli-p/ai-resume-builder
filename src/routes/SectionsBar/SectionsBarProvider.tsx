import { memo, useMemo, type ReactNode } from "react";
import { SectionsBarContext } from "./SectionsBarContext";

export type SectionsBarProviderProps = {
  children: ReactNode;
};

export const SectionsBarProvider = memo(function SectionsBarProvider({
  children,
}: SectionsBarProviderProps) {
  const contextValue = useMemo(() => ({}), []);

  return (
    <SectionsBarContext.Provider value={contextValue}>
      {children}
    </SectionsBarContext.Provider>
  );
});
