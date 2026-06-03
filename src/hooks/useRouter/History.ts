import { StrictEventEmitter } from "../../utils/StrictEventEmitter/StrictEventEmitter";
import { Location } from "./Location";

type HistoryEvents = "location" | "push" | "back" | "reset" | "replace";

type EventHandler = (location: Location) => boolean | undefined | void;

export type Events = Record<HistoryEvents, EventHandler>;

/**
 * Specialized history class for managing navigation history.
 * Where current location is always the last entry in the history.
 * Only backward navigation is supported.
 * All history, for the exception of the current location, is immutable!
 * You're only able to add new locations or replace the current one.
 * This class extends StrictEventEmitter to provide typed event handling.
 */
export class History extends StrictEventEmitter<Events> {
  private locations: Location[] = [];
  private name: string;

  constructor({
    locations = [new Location({ path: "/" })],
    name,
  }: {
    locations: Location[];
    name: string;
  }) {
    super();
    this.locations = locations;
    this.name = name;
  }

  getCurrent(): Location {
    return this.locations[this.locations.length - 1];
  }

  /**
   * Returns the previous location in the navigation history to determine where the user navigated from.
   * If there is a previous location (i.e., the history has more than one entry),
   * it returns that location. If there is no previous location (history has only one entry),
   * it returns the current location.
   */
  getPrevious(): Location {
    return (
      this.locations[this.locations.length - 2] ??
      this.locations[this.locations.length - 1]
    );
  }

  getLocations(): Location[] {
    return [...this.locations];
  }

  /**
   * Because this history only supports backward navigation,
   * the current location is always the last entry in the history.
   */
  isAtStart(): boolean {
    return this.locations.length === 1;
  }
}
