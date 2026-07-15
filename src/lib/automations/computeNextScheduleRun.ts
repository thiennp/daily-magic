import { AGENT_AUTOMATION_SCHEDULE_PRESETS } from "@/lib/automations/AgentAutomationSchedulePreset.constant";
import type { AgentAutomationSchedulePresetValue } from "@/lib/automations/AgentAutomationSchedulePreset.constant";
import { findNextWeekdayScheduleRun } from "@/lib/automations/findNextWeekdayScheduleRun.util";
import {
  isWeekday,
  nextCalendarDayParts,
  readZonedDateParts,
  toUtcDateInTimeZone,
} from "@/lib/automations/scheduleRunZonedTime.util";

export const computeNextScheduleRun = (input: {
  readonly preset: AgentAutomationSchedulePresetValue;
  readonly scheduleHour: number | null;
  readonly timeZone: string;
  readonly from?: Date;
}): Date => {
  const from = input.from ?? new Date();
  const parts = readZonedDateParts(from, input.timeZone);

  if (input.preset === AGENT_AUTOMATION_SCHEDULE_PRESETS.HOURLY) {
    const targetHour = parts.minute >= 0 ? parts.hour + 1 : parts.hour;
    return toUtcDateInTimeZone(parts, input.timeZone, targetHour, 0);
  }

  const hour = input.scheduleHour ?? 9;
  const sameDayCandidate = toUtcDateInTimeZone(parts, input.timeZone, hour, 0);
  const sameDayParts = readZonedDateParts(sameDayCandidate, input.timeZone);
  const afterToday = from.getTime() >= sameDayCandidate.getTime();

  if (input.preset === AGENT_AUTOMATION_SCHEDULE_PRESETS.DAILY) {
    return afterToday
      ? toUtcDateInTimeZone(
          nextCalendarDayParts(parts),
          input.timeZone,
          hour,
          0,
        )
      : sameDayCandidate;
  }

  if (!afterToday && isWeekday(sameDayParts.weekday)) {
    return sameDayCandidate;
  }

  return findNextWeekdayScheduleRun(parts, hour, 0, input.timeZone);
};
