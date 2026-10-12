import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

/** How a month is saved in the resume, e.g. `2020-03` */
const MONTH_FORMAT = "YYYY-MM";

export type MonthFieldProps = {
  label: string;
  /** Month as `YYYY-MM`, or `""` for none */
  value: string;
  /** Receives the month as `YYYY-MM`, or `""` when cleared */
  onChange: (value: string) => void;
  disabled?: boolean;
  /** Earliest month that can be picked, as `YYYY-MM` */
  minMonth?: string;
};

/**
 * MUI date picker for a month and year only (no day), saved as `YYYY-MM`.
 * Default export so the form can load it with `lazy()`: the date picker
 * library is large and not needed for the first paint.
 */
const MonthField = ({
  label,
  value,
  onChange,
  disabled,
  minMonth,
}: MonthFieldProps) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label={label}
      views={["year", "month"]}
      openTo="year"
      format="MMM YYYY"
      disabled={disabled}
      value={value ? dayjs(value) : null}
      minDate={minMonth ? dayjs(minMonth) : undefined}
      // Work dates end at the current month; the year list stops at this year
      maxDate={dayjs()}
      onChange={(date) =>
        onChange(date?.isValid() ? date.format(MONTH_FORMAT) : "")
      }
      slotProps={{ textField: { fullWidth: true } }}
    />
  </LocalizationProvider>
);

export default MonthField;
