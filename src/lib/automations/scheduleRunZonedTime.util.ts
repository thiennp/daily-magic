interface ZonedDateParts {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly hour: number;
  readonly minute: number;
  readonly weekday: number;
}

const weekdayMap: Readonly<Record<string, number>> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export const readZonedDateParts = (
  date: Date,
  timeZone: string,
): ZonedDateParts => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  });
  const parts = formatter.formatToParts(date);
  const read = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? "0";

  return {
    year: Number(read("year")),
    month: Number(read("month")),
    day: Number(read("day")),
    hour: Number(read("hour")),
    minute: Number(read("minute")),
    weekday: weekdayMap[read("weekday")] ?? 0,
  };
};

export const toUtcDateInTimeZone = (
  parts: ZonedDateParts,
  timeZone: string,
  hour: number,
  minute: number,
): Date => {
  const guess = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day, hour, minute, 0, 0),
  );
  const zoned = readZonedDateParts(guess, timeZone);
  const offsetMinutes =
    (zoned.hour - hour) * 60 +
    (zoned.minute - minute) +
    (zoned.day - parts.day) * 24 * 60;

  return new Date(guess.getTime() - offsetMinutes * 60_000);
};

export const nextCalendarDayParts = (parts: ZonedDateParts): ZonedDateParts => {
  const nextDay = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day + 1),
  );

  return readZonedDateParts(nextDay, "UTC");
};

export const isWeekday = (weekday: number): boolean =>
  weekday >= 1 && weekday <= 5;

export type { ZonedDateParts };
