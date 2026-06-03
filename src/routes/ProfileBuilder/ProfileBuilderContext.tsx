import { createContext } from "react";

export type ProfileBuilderContextValues = {};

export const ProfileBuilderContext = createContext<
  ProfileBuilderContextValues | undefined
>(undefined);
