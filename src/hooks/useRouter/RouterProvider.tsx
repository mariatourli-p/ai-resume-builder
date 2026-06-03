import { useCallback, useLayoutEffect, useMemo, type ReactNode } from "react";
import { History } from "./History";
import { type To, Location } from "./Location";
import { useSignal } from "@preact/signals-react";
import { RouterContext } from "./RouterContext";

export interface RouterConfig {
  /**
   * Prepopulated history with initial locations.
   * The first entry becomes the starting location in the history stack.
   * @example ['/', '/dashboard', { path: '/profile', props: { userId: 123 } }]
   */
  initialEntries?: To[];
  /**
   * Name of the router instance. You can have multiple routers,
   * just make sure to set unique names to differentiate them in logs.
   * @default 'main'
   */
  name?: string;
  /**
   * Callback fired when the current location changes.
   * @param location - The new current location
   */
  onChange?: (location: Location) => void;
}

export const RouterProvider = ({
  children,
  initialEntries = [],
  name = "main",
  onChange,
}: RouterConfig & {
  children: ReactNode;
}) => {
  const history = useMemo(
    () =>
      new History({
        locations: [...initialEntries.map(Location.toLocation)],
        name,
      }),
    [initialEntries, name],
  );

  const location = useSignal<Location>(history.getCurrent());
  const previousLocation = useSignal<Location>(location.value);

  const onLocation = useCallback(
    (newLocation: Location) => {
      // eslint-disable-next-line react-hooks/immutability
      previousLocation.value = history.getPrevious();
      // eslint-disable-next-line react-hooks/immutability
      location.value = newLocation;
      onChange?.(newLocation);
    },
    [history, location, onChange, previousLocation],
  );

  // Update the location when the history changes
  useLayoutEffect(() => {
    history.on("location", onLocation);
    return () => {
      history.off("location", onLocation);
    };
  }, [history, onLocation]);

  return (
    <RouterContext.Provider value={{ history }}>
      {children}
    </RouterContext.Provider>
  );
};
