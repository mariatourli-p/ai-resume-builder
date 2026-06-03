import EventEmitter from "eventemitter3";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventArg = any;

// Utility types for strict event typing
export type EventMap = {
  [K in string | symbol]: (...args: EventArg[]) => void;
};
export type EventNames<T extends EventMap> = Extract<keyof T, string | symbol>;
export type EventHandler<T extends EventMap, K extends EventNames<T>> = T[K];
export type EventArgs<T extends EventMap, K extends EventNames<T>> = Parameters<
  T[K]
>;

/**
 * Strictly typed EventEmitter for eventemitter3.
 * Extend this class and specify your Events map for strict typing.
 *
 * - All event keys must be string or symbol (not number).
 * - Listeners returning false will stop the event propagation to further listeners if `interrupt` is true (default).
 * - Errors in listeners are caught and logged to avoid breaking the emission loop.
 * - If no events are registered for an emitted event, emit will return true.
 */
export class StrictEventEmitter<
  Events extends EventMap = EventMap,
  Context = undefined,
> extends EventEmitter {
  /**
   * Whether event emission can be interrupted if a listener returns false
   * Any listener returning false will stop the event propagation to further listeners
   */
  readonly interrupt: boolean;

  constructor({ interrupt = true } = {}) {
    super();
    this.interrupt = interrupt;
  }

  override on<K extends keyof Events>(
    event: K,
    fn: Events[K],
    context?: Context,
  ): this {
    return super.on(
      event as string | symbol,
      fn as (...args: EventArg[]) => void,
      context,
    );
  }

  override off<K extends keyof Events>(
    event: K,
    fn?: Events[K],
    context?: Context,
    once?: boolean,
  ): this {
    return super.off(
      event as string | symbol,
      fn as (...args: EventArg[]) => void,
      context,
      once,
    );
  }

  /**
   * If `interrupt` is true, stops propagation when a listener returns false
   * Otherwise, behaves like normal EventEmitter.emit,
   * except will not return false if no listeners are registered for the event.
   */
  override emit<K extends keyof Events>(
    event: K,
    ...args: Parameters<Events[K]>
  ): boolean {
    for (const listener of this.listeners(event)) {
      // ensure errors in listeners do not break the emission loop
      try {
        // @ts-expect-error TS is not able to infer listener type here
        if (listener(...args) === false && this.interrupt) {
          return false;
        }
      } catch (error) {
        // -- Swallow errors
        // NOTE: Using regular `console` to avoid a circular dependency with `$console`
        // eslint-disable no-console
        console.error(
          "Error in event listener for event",
          String(event),
          error,
        );
      }
    }
    return true;
  }

  override once<K extends keyof Events>(
    event: K,
    fn: Events[K],
    context?: Context,
  ): this {
    return super.once(
      event as string | symbol,
      fn as (...args: EventArg[]) => void,
      context,
    );
  }

  override listeners<K extends keyof Events>(event: K): Events[K][] {
    return super.listeners(event as string | symbol) as Events[K][];
  }

  override removeListener<K extends keyof Events>(
    event: K,
    fn?: Events[K],
    context?: Context,
    once?: boolean,
  ): this {
    return super.removeListener(
      event as string | symbol,
      fn as (...args: EventArg[]) => void,
      context,
      once,
    );
  }

  override removeAllListeners<K extends keyof Events>(event?: K): this {
    return super.removeAllListeners(event as string | symbol);
  }

  override addListener<T extends keyof Events>(
    event: T,
    fn: Events[T],
    context?: Context,
  ): this {
    return super.addListener(
      event as string | symbol,
      fn as (...args: EventArg[]) => void,
      context,
    );
  }

  override listenerCount<T extends keyof Events>(event: T): number {
    return super.listenerCount(event as string | symbol);
  }
}
