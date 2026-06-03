import { createContext } from "react";
import type { Routes } from "../Routes";

/**
 * Context value provided by RouteSwitch components.
 * Provides access to the routes registry for Route children.
 */
export type RouteSwitchContextValue = {
  /**
   * The routes registry for managing route registration and deregistration.
   * Used by Route components to register themselves with the router.
   */
  routes: Routes;
};

/**
 * React context for RouteSwitch functionality.
 * Provides the routes registry to child Route components.
 */
export const RouteSwitchContext = createContext<
  RouteSwitchContextValue | undefined
>(undefined);
