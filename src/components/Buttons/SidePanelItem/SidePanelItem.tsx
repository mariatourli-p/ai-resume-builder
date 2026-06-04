// SidePanelItem.tsx - pure UI, no logic
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  type SxProps,
} from "@mui/material";
import { forwardRef, useMemo } from "react";

export type SidePanelItemProps = {
  text: string;
  icon: React.ReactNode;
  focused?: boolean;
  onClick?: () => void;
  style?: SxProps;
};

/**
 * Pure UI component for a single side panel menu item.
 * Renders an icon, a label, and applies custom styles when selected.
 * Forwards its ref to the underlying `<li>` element for focus management.
 *
 * @param text - The label displayed for the item.
 * @param icon - The icon displayed to the left of the label.
 * @param focused - Whether this item is currently selected/focused.
 * @param onClick - Callback fired when the item is clicked.
 * @param style - Optional MUI `SxProps` applied when the item is selected.
 */
export const SidePanelItem = forwardRef<HTMLLIElement, SidePanelItemProps>(
  ({ text, icon, focused, onClick, style }, ref) => {
    const computedSx = useMemo(
      () => ({
        "&.Mui-selected": { ...style },
        "&.Mui-selected:hover": { ...style },
      }),
      [style],
    );

    return (
      <MenuItem
        ref={ref}
        selected={focused}
        onClick={onClick}
        sx={{ borderRadius: "6px", ...computedSx }}
      >
        <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          slotProps={{
            primary: {
              sx: {
                wordBreak: "break-word",
                whiteSpace: "normal",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              },
            },
          }}
        />
      </MenuItem>
    );
  },
);

SidePanelItem.displayName = "SidePanelItem";
