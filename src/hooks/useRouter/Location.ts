export type LocationProps = Record<string, unknown>;

/**
 * Type representing a route destination.
 * Can be either a simple string path or an object with path and optional props.
 *
 * @example
 * ```tsx
 * // Simple string path
 * const destination1: To = '/home'
 *
 * // Object with path and props
 * const destination2: To = {
 *   path: '/profile',
 *   props: { userId: 123, tab: 'settings' }
 * }
 * ```
 */
export type To =
  | string
  | {
      path: string;
      props?: LocationProps;
    };

/**
 * Convert "To" type to a Location object.
 * @param to - The destination (string or object)
 * @returns A new Location instance
 */
const toLocation = (to: To): Location => {
  if (typeof to === "string") {
    return new Location({
      path: to,
    });
  }
  return new Location(to);
};

export class Location<T extends LocationProps = LocationProps> {
  /** Array of paths associated with this location */
  paths: string[];
  /** Props to pass to the route component */
  props: T;
  /** Currently active path for this location (when activated) */
  activePath: string | undefined;
  /** Whether this location is currently active */
  isActive: boolean = false;
  /** Static method to convert a To type to a Location object */
  static toLocation = toLocation;

  constructor({ path, props }: { path: string | string[]; props?: T }) {
    this.paths =
      typeof path === "string" ? [path] : Array.isArray(path) ? path : [];
    if (!this.paths.length) {
      throw new Error("Paths must be a string or an array of strings");
    }
    this.props = props || ({} as T);
  }

  /**
   * Check if this location is equal to another location.
   * Locations are considered equal if they share any common paths.
   * Since no two routes can have the same path, this is sufficient for equality.
   * @param location - The location to compare with
   * @returns True if the locations share any paths
   */
  isEqual(location: Location): boolean {
    return this.paths.some((path) => location.paths.includes(path));
  }

  /**
   * Get a copy of the props for this location.
   * @returns A shallow copy of the props object
   */
  getProps(): T {
    return { ...this.props };
  }

  /**
   * Check if this location owns the given path.
   * @param path - The path to check
   * @returns True if this location owns the path
   */
  ownsPath(path: string): boolean {
    return this.paths.includes(path);
  }

  /**
   * Set the active path for this location.
   * @param path - The path to activate (must be owned by this location)
   * @throws Error if the path is not owned by this location
   */
  activate(path: string): void {
    if (!this.ownsPath(path)) {
      throw new Error(`Path "${path}" is not owned by this route`);
    }
    this.activePath = path;
    this.isActive = true;
  }

  /**
   * Deactivate this location, clearing the active path and status.
   */
  deactivate(): void {
    this.activePath = undefined;
    this.isActive = false;
  }
}
