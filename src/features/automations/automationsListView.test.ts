import { describe, expect, it } from "vitest";

import {
  countAutomationsByFilter,
  selectVisibleAutomations,
} from "@/features/automations/automationsListView";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";

const make = (over: Partial<AgentAutomationRecord>): AgentAutomationRecord =>
  ({
    id: "x",
    name: "A",
    triggerType: "schedule",
    schedulePreset: "daily",
    scheduleHour: 9,
    scheduleTimezone: "UTC",
    enabled: true,
    lastRunAt: null,
    nextRunAt: null,
    lastRunStatus: null,
    lastError: null,
    ...over,
  }) as AgentAutomationRecord;

const ids = (list: readonly AgentAutomationRecord[]): string[] =>
  list.map((item) => item.id);

describe("automationsListView", () => {
  const list = [
    make({ id: "1", name: "Zeta", nextRunAt: "2026-10-09T10:00:00Z" }),
    make({ id: "2", name: "Alpha", enabled: false }),
    make({
      id: "3",
      name: "Mid",
      nextRunAt: "2026-10-08T10:00:00Z",
      lastRunAt: "2026-10-07T10:00:00Z",
      lastRunStatus: "failed",
    }),
  ];

  it("sorts by next run with paused last", () => {
    expect(ids(selectVisibleAutomations(list, "", "all", "next"))).toEqual([
      "3",
      "1",
      "2",
    ]);
  });

  it("sorts by last run and by name", () => {
    expect(selectVisibleAutomations(list, "", "all", "last")[0]?.id).toBe("3");
    expect(selectVisibleAutomations(list, "", "all", "name")[0]?.id).toBe("2");
  });

  it("filters by status and query and counts", () => {
    expect(ids(selectVisibleAutomations(list, "", "error", "name"))).toEqual([
      "3",
    ]);
    expect(ids(selectVisibleAutomations(list, "zet", "all", "name"))).toEqual([
      "1",
    ]);
    expect(countAutomationsByFilter(list, "paused")).toBe(1);
  });
});
