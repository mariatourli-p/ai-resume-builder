import { enTokens } from "@/locale/en/en-tokens";
import { themeConfig } from "@/theme";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

export type LicensesDialogProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Explains in plain words which open-source software, icons and fonts the
 * app uses and under which licenses. The full license texts ship with the
 * build in `licenses.md`; this is the readable summary.
 *
 * @example
 * <LicensesDialog open={isOpen} onClose={close} />
 */
export const LicensesDialog = ({ open, onClose }: LicensesDialogProps) => {
  const { title, intro, groups, ai, close } = enTokens.licensesDialog;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      slotProps={{
        paper: {
          sx: { borderRadius: 3, p: 1, maxWidth: 480, width: "100%" },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", lineHeight: 1.7 }}
          >
            {intro}
          </Typography>

          <Stack
            component="dl"
            spacing={1.5}
            sx={{
              m: 0,
              p: 2,
              borderRadius: 2,
              backgroundColor: themeConfig.colors.sidebar.surface,
              border: `1px solid ${themeConfig.colors.sidebar.border}`,
            }}
          >
            {groups.map((group) => (
              <Box key={group.title}>
                <Typography
                  component="dt"
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                >
                  {group.title}
                  <Box
                    component="span"
                    sx={{ fontWeight: 400, color: "text.secondary" }}
                  >
                    {` - ${group.license}`}
                  </Box>
                </Typography>
                <Typography
                  component="dd"
                  variant="body2"
                  sx={{ m: 0, color: "text.secondary" }}
                >
                  {group.items}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Typography
            variant="body2"
            sx={{ color: "text.secondary", lineHeight: 1.7 }}
          >
            {ai}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          {close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
