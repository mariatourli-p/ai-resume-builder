import { type PropsWithChildren } from "react";
import { ProfileBuilderContext } from "./ProfileBuilderContext";

export function ProfileBuilderProvider({ children }: PropsWithChildren) {
  return (
    <ProfileBuilderContext.Provider value={{}}>
      {children}
    </ProfileBuilderContext.Provider>
  );
}
