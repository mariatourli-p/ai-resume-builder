import { Box, MenuList } from "@mui/material";
import { type SidePanelItemProps } from "../Buttons/SidePanelItem/SidePanelItem";
import { SidePanelItemView } from "../Buttons/SidePanelItem/SidePanelItemView";

export type SidePanelProps = {
  items: SidePanelItemProps[];
  activeItem: string;
  onItemClick: (text: string) => void;
};

/**
 * A vertical navigation panel that renders a list of menu items.
 * Highlights the currently active item and notifies the parent when
 * the user selects a different one.
 *
 * @param items - The list of items to render in the panel.
 * @param activeItem - The text of the currently selected item.
 * @param onItemClick - Callback fired when the user clicks an item, receives the item text.
 */
export const SidePanel = ({
  items,
  activeItem,
  onItemClick,
}: SidePanelProps) => {
  return (
    <Box sx={{ width: 250 }}>
      <MenuList
        sx={{
          width: 250,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {items.map((item) => (
          <SidePanelItemView
            key={item.text}
            text={item.text}
            icon={item.icon}
            focused={activeItem === item.text}
            style={item.style}
            onClick={() => onItemClick(item.text)}
          />
        ))}
      </MenuList>
    </Box>
  );
};
