import { IconCloud, IconDevice } from "@/assets/Icons";
import { enTokens } from "@/locale/en/en-tokens";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

type Choice = "cloud" | "device";

export type CloudConsentDialogProps = {
  open: boolean;
  /** The user picked the online AI or the on-device one */
  onChoose: (choice: Choice) => void;
  /** The dialog was closed without a choice */
  onClose: () => void;
};

const ICONS = { cloud: IconCloud, device: IconDevice };

/**
 * One choice as a card: an icon, a short name, three plain points and a
 * button, so users who don't know much about AI can compare at a glance.
 */
const ChoiceCard = ({
  choice,
  isRecommended,
  onChoose,
}: {
  choice: Choice;
  isRecommended: boolean;
  onChoose: (choice: Choice) => void;
}) => {
  const { title, points, button } = enTokens.cloudConsent.options[choice];
  const Icon = ICONS[choice];

  return (
    <Stack
      spacing={1.5}
      sx={{
        p: 2,
        borderRadius: 2,
        border: 1,
        borderColor: isRecommended ? "primary.main" : "divider",
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: "50%",
            color: isRecommended ? "primary.contrastText" : "text.primary",
            backgroundColor: isRecommended ? "primary.main" : "action.hover",
          }}
        >
          <Icon aria-hidden />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, lineHeight: 1.3 }}>
            {title}
          </Typography>
          {isRecommended && (
            <Chip
              label={enTokens.cloudConsent.recommended}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mt: 0.5, height: 20, fontSize: 11 }}
            />
          )}
        </Box>
      </Stack>

      <Box component="ul" sx={{ m: 0, pl: 2.5, flexGrow: 1 }}>
        {points.map((point) => (
          <Typography
            key={point}
            component="li"
            variant="body2"
            sx={{ color: "text.secondary", lineHeight: 1.6, mb: 0.5 }}
          >
            {point}
          </Typography>
        ))}
      </Box>

      <Button
        fullWidth
        variant={isRecommended ? "contained" : "outlined"}
        onClick={() => onChoose(choice)}
        sx={{ borderRadius: 2, textTransform: "none" }}
      >
        {button}
      </Button>
    </Stack>
  );
};

/**
 * Asks, before the first AI request, where the AI may work: online or only
 * on this computer. Each choice is a card in plain words - what it's good
 * at and what it sends - so the user can pick quickly and knowingly.
 *
 * @example
 * <CloudConsentDialog open={isOpen} onChoose={save} onClose={close} />
 */
export const CloudConsentDialog = ({
  open,
  onChoose,
  onClose,
}: CloudConsentDialogProps) => {
  const { title, intro, note } = enTokens.cloudConsent;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      slotProps={{
        paper: {
          sx: { borderRadius: 3, p: 1, maxWidth: 640, width: "100%" },
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

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <ChoiceCard choice="cloud" isRecommended onChoose={onChoose} />
            <ChoiceCard
              choice="device"
              isRecommended={false}
              onChoose={onChoose}
            />
          </Box>

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {note}
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
