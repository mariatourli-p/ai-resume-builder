import { createContext } from "react";

export type SectionsRouteContextValues = object;

export const SectionsRouteContext = createContext<
  SectionsRouteContextValues | undefined
>(undefined);
