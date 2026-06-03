import { createContext } from "react";

export type HomePageContextValue = {};

export const HomePageContext = createContext<HomePageContextValue | undefined>(
  undefined,
);
