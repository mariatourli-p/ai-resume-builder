import { Box, MenuList } from "@mui/material";
import type { SidePanelItemProps } from "../SidePanelItem";
import { SidePanelItemView } from "../SidePanelItem/SidePanelItemView";
import type { SxProps } from "node_modules/@mui/material/styles";

export type SidePanelMenuProps = {
  items: SidePanelItemProps[];
  itemStyle?: SxProps;
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
export const SidePanelMenu = ({
  items,
  activeItem,
  onItemClick,
}: SidePanelMenuProps) => {
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
            {...item}
            focused={activeItem === item.text}
            onClick={() => onItemClick(item.text)}
          />
        ))}
      </MenuList>
    </Box>
  );
};
