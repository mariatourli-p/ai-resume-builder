import { useContext } from "react";
import { RouterContext } from "./RouterContext";

/**
 * Hook to access the router context from within a RouteSwitch.
 * This is essentially an alias for useRouter() with RouteSwitch-specific error messaging.
 *
 * Provides access to all router functionality including navigation, location, and route management.
 *
 * @returns RouterContextValue containing all router functionality
 * @throws Error if used outside of a RouteSwitch component
 *
 * @example
 * ```tsx
 * function MyRouteSwitchChild() {
 *   const { navigate, location, routes } = useRouteSwitch()
 *
 *   return (
 *     <div>
 *       <p>Current location: {location.value.activePath}</p>
 *       <p>Total routes: {routes.getAll().length}</p>
 *       <button onClick={() => navigate('/other')}>Navigate</button>
 *     </div>
 *   )
 * }
 * ```
 */
export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a <Router />");
  }
  return context;
};
