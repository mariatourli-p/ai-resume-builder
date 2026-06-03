import type { Location } from "./Location";

/**
 * Registry for managing routes in the Router.
 * This class manages the collection of routes registered by Route components.
 * All registered locations are immutable and can be used to navigate to different parts of the application.
 *
 * Routes enforce uniqueness - no two routes can share the same path.
 */
export class Routes {
  private routes: Set<Location> = new Set();

  /**
   * Register a new route location.
   * @param location - The location object to register as a route
   * @throws Error if any of the location's paths are already owned by another route
   */
  add(location: Location): void {
    // throw error if any location already owns the path
    if (this.getByLocation(location)) {
      throw new Error(
        `Paths "${location.paths}" is already owned by another route`,
      );
    }
    this.routes.add(location);
  }

  /**
   * Check if a location is registered as a route.
   * @param location - The location to check
   * @returns True if the location is registered
   */
  has(location: Location): boolean {
    return this.getByLocation(location) !== undefined;
  }

  /**
   * Remove a route location from the registry.
   * @param location - The location to remove
   * @throws Error if the route is not found
   */
  remove(location: Location): void {
    const existingRoute = this.getByLocation(location);
    if (!existingRoute) {
      throw new Error(`Route not found: ${location.paths}`);
    }
    // remove the route from the set
    this.routes.delete(existingRoute);
  }

  /**
   * Find a route by path.
   * @param path - The path to search for
   * @returns The location object that owns this path, or undefined if not found
   */
  getByPath(path: string): Location | undefined {
    return Array.from(this.routes).find((location) => location.ownsPath(path));
  }

  /**
   * Find a route by location equality.
   * @param location - The location to search for
   * @returns The registered location that equals the given location, or undefined if not found
   */
  getByLocation(location: Location): Location | undefined {
    return Array.from(this.routes).find((route) => route.isEqual(location));
  }

  /**
   * Get all registered routes.
   * @returns An array of all registered route locations
   */
  getAll(): Location[] {
    return Array.from(this.routes);
  }

  /**
   * Activate a route by path, deactivating all others.
   * @param path - The path to activate
   * @throws Error if no route is found for the path
   */
  activatePath(path: string): void {
    const route = this.getByPath(path);
    if (!route) {
      throw new Error(`No route found for path: ${path}`);
    }
    // call deactivate on all other routes
    this.routes.forEach((r) => {
      if (r !== route) {
        r.deactivate();
      } else {
        r.activate(path);
      }
    });
  }

  /**
   * Activate a specific route location, deactivating all others.
   * @param location - The location to activate
   * @throws Error if no matching route is found
   */
  activate(location: Location): void {
    const route = this.getByLocation(location);
    if (!route) {
      throw new Error(`No route found for location: ${location.paths}`);
    }
    // call deactivate on all other routes
    this.routes.forEach((r) => {
      if (r !== route) {
        r.deactivate();
      } else {
        r.activate(location.activePath || location.paths[0]);
      }
    });
  }
}
