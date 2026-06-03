import { Box, List } from "@mui/material";
import { SidePanelItem } from "../SidePanelItem/SidePanelItem";

export type SidePanelEntry = {
  text: string;
  icon: React.ReactNode;
};

export type SidePanelProps = {
  items: SidePanelEntry[];
  activeItem: string;
  onItemClick: (text: string) => void;
};

export const SidePanel = ({
  items,
  activeItem,
  onItemClick,
}: SidePanelProps) => {
  return (
    <Box sx={{ width: 250 }}>
      <List>
        {items.map((item) => (
          <SidePanelItem
            key={item.text}
            text={item.text}
            icon={item.icon}
            isActive={activeItem === item.text}
            onClick={() => onItemClick(item.text)}
          />
        ))}
      </List>
    </Box>
  );
};
