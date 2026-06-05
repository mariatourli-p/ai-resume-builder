import { createContext } from "react";

export type ProfileBuilderContextValues = object;

export const ProfileBuilderContext = createContext<
  ProfileBuilderContextValues | undefined
>(undefined);
