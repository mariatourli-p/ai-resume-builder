import { type PropsWithChildren } from "react";
import { ResumeBuilderContext } from "./ResumeBuilderContext";

export function ResumeBuilderProvider({ children }: PropsWithChildren) {
  return (
    <ResumeBuilderContext.Provider value={{}}>
      {children}
    </ResumeBuilderContext.Provider>
  );
}
