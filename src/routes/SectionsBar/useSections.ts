import { useContext } from "react";
import { SectionsBarContext } from ".";

export function useSectionsBar() {
  const context = useContext(SectionsBarContext);

  if (!context) {
    throw new Error(
      "useSectionsBar must be used within a <SectionsBarProvider />",
    );
  }
  return context;
}
