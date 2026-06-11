import { createContext } from "react";

export type ResumeBuilderContextValues = object;

export const ResumeBuilderContext = createContext<
  ResumeBuilderContextValues | undefined
>(undefined);
