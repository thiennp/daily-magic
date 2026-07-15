import { describe, expect, it } from "vitest";

import { AGENT_AUTOMATION_SCHEDULE_PRESETS } from "@/lib/automations/AgentAutomationSchedulePreset.constant";
import { computeNextScheduleRun } from "@/lib/automations/computeNextScheduleRun";

describe("computeNextScheduleRun", () => {
  it("schedules hourly runs on the next hour boundary", () => {
    const from = new Date("2026-07-15T10:30:00.000Z");
    const next = computeNextScheduleRun({
      preset: AGENT_AUTOMATION_SCHEDULE_PRESETS.HOURLY,
      scheduleHour: null,
      timeZone: "UTC",
      from,
    });

    expect(next.toISOString()).toBe("2026-07-15T11:00:00.000Z");
  });

  it("schedules daily runs later the same day when before the hour", () => {
    const from = new Date("2026-07-15T08:00:00.000Z");
    const next = computeNextScheduleRun({
      preset: AGENT_AUTOMATION_SCHEDULE_PRESETS.DAILY,
      scheduleHour: 9,
      timeZone: "UTC",
      from,
    });

    expect(next.toISOString()).toBe("2026-07-15T09:00:00.000Z");
  });

  it("schedules weekday runs on the next weekday morning", () => {
    const from = new Date("2026-07-17T10:00:00.000Z");
    const next = computeNextScheduleRun({
      preset: AGENT_AUTOMATION_SCHEDULE_PRESETS.WEEKDAYS,
      scheduleHour: 9,
      timeZone: "UTC",
      from,
    });

    expect(next.getUTCDay()).toBe(1);
    expect(next.getUTCHours()).toBe(9);
  });
});
