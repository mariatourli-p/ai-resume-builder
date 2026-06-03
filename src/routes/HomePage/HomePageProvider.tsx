import type { PropsWithChildren } from "react";
import { HomePageContext } from "./HomePageContext";

export function HomePageProvider({ children }: PropsWithChildren) {
  return (
    <HomePageContext.Provider value={{}}> {children}</HomePageContext.Provider>
  );
}
