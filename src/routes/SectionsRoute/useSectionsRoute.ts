import { useContext } from "react";
import { SectionsRouteContext } from ".";

export function useSectionsRoute() {
  const context = useContext(SectionsRouteContext);

  if (!context) {
    throw new Error(
      "useSectionsRoute must be used within a <SectionsRouteProvider />",
    );
  }
  return context;
}
