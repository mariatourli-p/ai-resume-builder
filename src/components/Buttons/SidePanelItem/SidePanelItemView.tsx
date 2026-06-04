import { useEffect, useRef } from "react";
import { SidePanelItem, type SidePanelItemProps } from "./SidePanelItem";

/**
 * Integration part around `SidePanelItem` that handles focus management.
 * Automatically focuses the underlying element when `focused` becomes true,
 * ensuring keyboard and screen-reader accessibility.
 *
 * @param props - Same props as `SidePanelItem`.
 */
export const SidePanelItemView = (props: SidePanelItemProps) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (props.focused) {
      ref.current?.focus();
    }
  }, [props.focused]);

  return <SidePanelItem {...props} ref={ref} />;
};
