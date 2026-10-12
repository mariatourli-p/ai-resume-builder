import { createContext } from "react";

export type SectionsBarContextValues = object;

export const SectionsBarContext = createContext<
  SectionsBarContextValues | undefined
>(undefined);
