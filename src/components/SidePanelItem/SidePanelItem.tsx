import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export type SidePanelItemProps = {
  text: string;
  icon: React.ReactNode;
  focused?: boolean;
  onClick?: () => void;
};

export const SidePanelItem = ({
  text,
  icon,
  focused,
  onClick,
}: SidePanelItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={focused}
        onClick={onClick}
        sx={{
          borderRadius: "10px",
          "&.Mui-selected": {
            backgroundColor: "#6C63FF",
            color: "#fff",
            "& .MuiListItemIcon-root": { color: "#fff" },
            "&:hover": { backgroundColor: "#5a52e0" },
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};
