import {
  isWeekday,
  nextCalendarDayParts,
  toUtcDateInTimeZone,
  type ZonedDateParts,
} from "@/lib/automations/scheduleRunZonedTime.util";

export const findNextWeekdayScheduleRun = (
  start: ZonedDateParts,
  hour: number,
  minute: number,
  timeZone: string,
  attemptsLeft = 8,
): Date => {
  const next = nextCalendarDayParts(start);

  if (isWeekday(next.weekday) || attemptsLeft <= 1) {
    return toUtcDateInTimeZone(next, timeZone, hour, minute);
  }

  return findNextWeekdayScheduleRun(
    next,
    hour,
    minute,
    timeZone,
    attemptsLeft - 1,
  );
};
