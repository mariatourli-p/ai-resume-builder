import { createContext } from "react";

export type RouteContextValue = {
  /**
   * The current location that matched this route.
   * Contains the actual navigation state and props.
   */
  location: Location;
  /**
   * The route definition/template that was used to create this route.
   * Contains the original path patterns and default props.
   */
  route: Location;
};

export const RouteContext = createContext<RouteContextValue | undefined>(
  undefined,
);
