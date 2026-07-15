export type AgentWitchSchedulePreset = "hourly" | "daily" | "weekdays";

interface ZonedDateParts {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly hour: number;
  readonly minute: number;
  readonly weekday: number;
}

const readZonedParts = (date: Date, timeZone: string): ZonedDateParts => {
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
  const weekdayLabel = read("weekday");
  const weekdayMap: Readonly<Record<string, number>> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    year: Number(read("year")),
    month: Number(read("month")),
    day: Number(read("day")),
    hour: Number(read("hour")),
    minute: Number(read("minute")),
    weekday: weekdayMap[weekdayLabel] ?? 0,
  };
};

const toUtcDate = (
  parts: ZonedDateParts,
  timeZone: string,
  hour: number,
  minute: number,
): Date => {
  const guess = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day, hour, minute, 0, 0),
  );
  const zoned = readZonedParts(guess, timeZone);
  const offsetMinutes =
    (zoned.hour - hour) * 60 +
    (zoned.minute - minute) +
    (zoned.day - parts.day) * 24 * 60;

  return new Date(guess.getTime() - offsetMinutes * 60_000);
};

const isWeekday = (weekday: number): boolean => weekday >= 1 && weekday <= 5;

const nextDayParts = (parts: ZonedDateParts): ZonedDateParts => {
  const nextDay = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day + 1),
  );
  return readZonedParts(nextDay, "UTC");
};

export const computeNextLocalScheduleRun = (input: {
  readonly preset: AgentWitchSchedulePreset;
  readonly scheduleHour: number | null;
  readonly timeZone: string;
  readonly from?: Date;
}): Date => {
  const from = input.from ?? new Date();
  const parts = readZonedParts(from, input.timeZone);

  if (input.preset === "hourly") {
    const targetHour = parts.minute >= 0 ? parts.hour + 1 : parts.hour;
    return toUtcDate(parts, input.timeZone, targetHour, 0);
  }

  const hour = input.scheduleHour ?? 9;
  const sameDayCandidate = toUtcDate(parts, input.timeZone, hour, 0);
  const sameDayParts = readZonedParts(sameDayCandidate, input.timeZone);
  const afterToday = from.getTime() >= sameDayCandidate.getTime();

  if (input.preset === "daily") {
    if (!afterToday) {
      return sameDayCandidate;
    }

    return toUtcDate(nextDayParts(parts), input.timeZone, hour, 0);
  }

  if (!afterToday && isWeekday(sameDayParts.weekday)) {
    return sameDayCandidate;
  }

  let cursor = parts;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    cursor = nextDayParts(cursor);
    if (isWeekday(cursor.weekday)) {
      return toUtcDate(cursor, input.timeZone, hour, 0);
    }
  }

  return toUtcDate(nextDayParts(parts), input.timeZone, hour, 0);
};
