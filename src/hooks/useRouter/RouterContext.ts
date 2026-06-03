import { createContext } from "react";
import { History } from "./History";
import type { Routes } from "./Routes";
import type { Signal } from "@preact/signals-react";
import type { LocationProps, To } from "./Location";
import type { NavigateOptions } from "react-router-dom";

/**
 * Options for navigating to a new location.
 */
export interface NavigateOptions {
  /**
   * Whether to replace the current history entry.
   * This will not add a new entry to the history stack.
   * @default false
   */
  replace?: boolean;
  /**
   * Whether to reset the entire history stack.
   * This will remove all previous entries and set the new location as the only entry.
   * Useful for scenarios like post-authentication navigation.
   * @default false
   */
  resetHistory?: boolean;
}

/**
 * Function signature for the navigate function.
 * @param to - The destination path (string) or location object with path and props
 * @param options - Optional navigation options (replace, resetHistory)
 */
export type Navigate = (to: To, options?: NavigateOptions) => void;

/**
 * The value provided by RouterContext, containing all router functionality.
 */
export interface RouterContextValue {
  /**
   * Gets current location as a Location object (not a signal).
   * @returns The current location object
   */
  getLocation: () => Location;
  /**
   * Get the props of the current location.
   * @returns A copy of the current location's props
   */
  getProps: () => LocationProps;
  /**
   * Navigates back in the history stack.
   * @param steps - Number of steps to go back (defaults to 1)
   * @returns True if navigation was successful, false if already at start
   */
  goBack: History["back"];
  /**
   * The history instance for this router.
   * Provides low-level access to history operations.
   */
  history: History;
  /**
   * Checks if the current location is at the start of the history stack.
   * @returns True if at the bottom of history stack, false otherwise
   */
  isAtStart: History["isAtStart"];
  /**
   * The current location as a Preact signal.
   * Subscribe to this signal to reactively respond to location changes.
   */
  location: Signal<Location>;
  /**
   * Custom navigate function for absolute paths, preventing duplicate entries.
   * Automatically handles route registration and activation.
   * @param to - Target location (string path or location object)
   * @param options - Navigation options
   */
  navigate: Navigate;
  /**
   * The previous location in the navigation history as a Preact signal.
   * Holds the location that the user navigated from. If there is no
   * previous location, it will have the same value as the current location.
   */
  previousLocation: Signal<Location>;
  /**
   * Registry of all routes defined within this router.
   * Used internally by Route components for registration/deregistration.
   */
  routes: Routes;
}

/**
 * React context for RouteSwitch functionality.
 * Provides the routes registry to child Route components.
 */
export const RouterContext = createContext<RouterContextValue | undefined>(
  undefined,
);
