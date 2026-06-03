import {
  type ReactNode,
  memo,
  useState,
  useLayoutEffect,
  useMemo,
} from "react";
import { Location, type LocationProps } from "../Location";
import { useRouter } from "../useRouter";
import { useRouteSwitch } from "../useRouteSwitch";
import { RouteContext } from "./RouteContext";

/**
 * Props for the Route component.
 */
export type RouteProps = LocationProps & {
  /**
   * Path or array of paths associated with this route.
   * The route will be rendered when the current location matches any of these paths.
   */
  path: string | string[];
  /**
   * Route content as React children.
   * Cannot be used together with the component prop.
   */
  children?: ReactNode;
  /**
   * Route content as a component.
   * Cannot be used together with children.
   * Note: If children exist, an error will be thrown!
   */
  component?: ReactNode;
};

/**
 * Route component for declarative route definition.
 * Integrated with the Router system to automatically register/unregister routes.
 * Similar to React Router's `<Route />` component, but much simpler and optimized for signals.
 *
 * The Route component:
 * - Registers itself in the Router context on mount
 * - Renders its content only when the current location matches its path
 * - Provides the current location and route object via RouteContext
 * - Automatically unregisters itself on unmount
 *
 * @example
 * Using the component prop:
 * ```tsx
 * <Route path="/home" component={<Home />} />
 * ```
 *
 * @example
 * Using children:
 * ```tsx
 * <Route path="/home">
 *   <Home />
 * </Route>
 * ```
 *
 * @example
 * Multiple paths:
 * ```tsx
 * <Route path={["/dashboard", "/home"]} component={<Dashboard />} />
 * ```
 *
 * @example
 * With props:
 * ```tsx
 * <Route path="/profile" userId={123} component={<Profile />} />
 * ```
 */
export const Route = memo(function Route({
  path,
  component,
  children,
  ...props
}: RouteProps) {
  if (!component && !children) {
    throw new Error(
      "Route: You must provide either `component` prop or `children` nodes!",
    );
  }

  if (component && children) {
    throw new Error(
      "Route: You can only use either `component` prop or `children` nodes, not both!",
    );
  }
  const content = component || children;
  const { routes } = useRouteSwitch();
  const { location } = useRouter();
  const [routeLocation, setRouteLocation] = useState<Location>();
  const route = useMemo(() => new Location({ path, props }), [path, props]);

  // add route to router
  useLayoutEffect(() => {
    routes.add(route);
    return () => {
      routes.remove(route); // cleanup on unmount
    };
  }, [route, routes]);

  // Subscribe to location signal using subscribe pattern
  useLayoutEffect(
    () =>
      location.subscribe((loc) => {
        const show = loc.isEqual(route);
        if (show) {
          // if the route
          setRouteLocation(loc);
        } else {
          setRouteLocation(undefined);
        }
      }),
    [location, route],
  );

  // if this isn't the current route, return null
  if (!routeLocation) {
    return null;
  }
  return (
    <RouteContext.Provider value={{ location: routeLocation, route }}>
      {content}
    </RouteContext.Provider>
  );
});
