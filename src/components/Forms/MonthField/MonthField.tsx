import { enTokens } from "@/locale/en";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { memo } from "react";

/** How a month is saved in the resume, e.g. `2020-03` */
const MONTH_FORMAT = "YYYY-MM";

// The year list starts here instead of MUI's default 1900, which no resume needs
const EARLIEST_MONTH = dayjs("1950-01");

/**
 * An empty field shows "Month Year" instead of the format code "MMMM YYYY",
 * which means nothing to the user. Module-level, so every render gets the
 * same object.
 */
const LOCALE_TEXT = {
  fieldMonthPlaceholder: () => enTokens.monthField.monthPlaceholder,
  fieldYearPlaceholder: () => enTokens.monthField.yearPlaceholder,
};

export type MonthFieldProps = {
  label: string;
  /** Month as `YYYY-MM`, or `""` for none */
  value: string;
  /**
   * Receives the month as `YYYY-MM` (or `""` when cleared) and the field's
   * `name`. The name lets one shared callback serve many fields, so the
   * parent can pass the same function to every card instead of a new one.
   */
  onChange: (value: string, name: string) => void;
  /** Passed back to `onChange`, e.g. the id of the card the field is in */
  name?: string;
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
  name = "",
  disabled,
  minMonth,
}: MonthFieldProps) => (
  <LocalizationProvider dateAdapter={AdapterDayjs} localeText={LOCALE_TEXT}>
    <DatePicker
      label={label}
      views={["year", "month"]}
      openTo="year"
      format="MMM YYYY"
      disabled={disabled}
      value={value ? dayjs(value) : null}
      minDate={minMonth ? dayjs(minMonth) : EARLIEST_MONTH}
      // Work dates end at the current month; the year list stops at this year
      maxDate={dayjs()}
      onChange={(date) =>
        onChange(date?.isValid() ? date.format(MONTH_FORMAT) : "", name)
      }
      slotProps={{
        textField: { fullWidth: true },
        // Room under the last row of years, which otherwise touches the edge
        layout: { sx: { "& .MuiYearCalendar-root": { pb: 2 } } },
      }}
    />
  </LocalizationProvider>
);

/**
 * Memoized: a date picker is heavy to render, so it skips re-rendering while
 * the user types in the other fields of the same card. Pass a stable
 * `onChange` (with `name` instead of a closure per card) for this to work.
 */
export default memo(MonthField);
