import { Button } from "@mui/material";
import type { SxProps } from "node_modules/@mui/material";

export type IconButtonProps = {
  sx?: SxProps;
  text: string;
  icon: React.ReactNode;
};

export const IconButton = ({ sx, text, icon }: IconButtonProps) => {
  return (
    <Button variant="outlined" startIcon={icon} sx={sx}>
      {text}
    </Button>
  );
};
