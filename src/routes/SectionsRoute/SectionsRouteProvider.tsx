import { memo, useMemo, type ReactNode } from "react";
import { SectionsRouteContext } from "./SectionsRouteContext";

export type SectionsRouteProviderProps = {
  children: ReactNode;
};

export const SectionsRouteProvider = memo(function SectionsRouteProvider({
  children,
}: SectionsRouteProviderProps) {
  const contextValue = useMemo(() => ({}), []);

  return (
    <SectionsRouteContext.Provider value={contextValue}>
      {children}
    </SectionsRouteContext.Provider>
  );
});
