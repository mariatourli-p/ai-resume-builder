import {
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  AppBar,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export type NavBarProps = {
  title: string;
  storedInfoStatus?: "saved" | "unsaved";
};
export const NavBar = ({ title, storedInfoStatus, ...props }: NavBarProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountBoxIcon />
            <Typography>{title}</Typography>
          </IconButton>
          <Typography>{storedInfoStatus}</Typography>
          <Button color="inherit">Export PDF</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
