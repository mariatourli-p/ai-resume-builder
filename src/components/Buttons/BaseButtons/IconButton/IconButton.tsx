import { Button } from "@mui/material";
import type { SxProps } from "node_modules/@mui/material";

export type IconButtonProps = {
  sx?: SxProps;
  text?: string;
  icon: React.ReactNode;
  onPress?: () => void;
};

export const IconButton = ({ sx, text, icon, onPress }: IconButtonProps) => {
  return (
    <Button variant="outlined" startIcon={icon} onClick={onPress} sx={sx}>
      {text}
    </Button>
  );
};
