import { createContext } from "react";

export type HomePageContextValue = object;

export const HomePageContext = createContext<HomePageContextValue | undefined>(
  undefined,
);
