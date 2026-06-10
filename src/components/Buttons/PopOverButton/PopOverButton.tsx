import { useState } from "react";
import { IconSettings } from "@/assets/Icons";
import { themeConfig } from "@/theme";
import { IconButton, Popover } from "@mui/material";

export type PopOverButtonProps = {
  children: React.ReactNode;
};

export const PopOverButton = ({ children }: PopOverButtonProps) => {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchor);

  return (
    <>
      <IconButton size="small" onClick={(e) => setAnchor(e.currentTarget)}>
        <IconSettings size={16} color={themeConfig.colors.sidebar.textMuted} />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 340,
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              mt: 1,
            },
          },
        }}
      >
        {children}
      </Popover>
    </>
  );
};
