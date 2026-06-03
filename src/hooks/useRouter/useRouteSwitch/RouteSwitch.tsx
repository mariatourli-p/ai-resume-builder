import { useLayoutEffect, type ReactNode } from "react";
import { type To } from "../Location";
import { useRouter } from "../useRouter";
import { RouteSwitchContext } from "./RouteSwitchContext";

/**
 * RouteSwitch component props.
 */
export interface RouteSwitchProps {
  /**
   * Children Route components to manage.
   * Only Route components should be direct children.
   */
  children: ReactNode;
  /**
   * The location to navigate to immediately when this RouteSwitch mounts.
   * This will override the default history of the Router.
   */
  location: To;
}

export const RouteSwitch = ({ children, location }: RouteSwitchProps) => {
  // if not using Router, useRouter will throw an error
  // this is to ensure that Routes is used within <Router />
  const { navigate, routes } = useRouter();

  // immediately navigate to the provided location
  // this will override the default history of the Router
  useLayoutEffect(() => {
    if (location) {
      navigate(location);
    } else {
      throw new Error("Routes: location prop is required");
    }
  }, [location, navigate]);

  return (
    <RouteSwitchContext.Provider value={{ routes }}>
      {children}
    </RouteSwitchContext.Provider>
  );
};
