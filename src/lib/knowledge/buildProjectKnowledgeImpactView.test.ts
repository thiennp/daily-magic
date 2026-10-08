import { describe, expect, it } from "vitest";

import {
  buildProjectKnowledgeImpactView,
  startOfUtcWeekFromDay,
  type KnowledgeComputerRow,
  type KnowledgeDailyRow,
} from "@/lib/knowledge/buildProjectKnowledgeImpactView";

describe("buildProjectKnowledgeImpactView", () => {
  const row = (overrides: Partial<KnowledgeDailyRow>): KnowledgeDailyRow => ({
    day: "2026-10-05",
    deviceId: "d1",
    runs: 4,
    holdoutRuns: 1,
    runsWith: 3,
    repeatsWith: 0,
    repeatsHoldout: 1,
    cardsInjected: 5,
    injectedTokens: 600,
    mistakesAvoided: 2,
    estTokensSaved: 3000,
    correctionTurns: 0,
    ...overrides,
  });
  const computer = (
    status: KnowledgeComputerRow["status"],
  ): KnowledgeComputerRow => ({
    deviceId: status,
    label: status,
    ownerName: null,
    status,
    cardCount: 1,
    installBundleVersion: null,
    lastReportAt: null,
  });

  it("sums totals, computes rates and groups by UTC week", () => {
    const view = buildProjectKnowledgeImpactView({
      rows: [
        row({ day: "2026-10-05" }),
        row({ day: "2026-10-06", deviceId: "d2" }),
        row({ day: "2026-10-13", repeatsWith: 1 }),
      ],
      computers: [],
      windowDays: 30,
      includeComputers: false,
    });
    expect(view.totals.runs).toBe(12);
    expect(view.totals.mistakesAvoided).toBe(6);
    expect(view.totals.injectedTokensPerRun).toBe(200);
    expect(view.totals.repeatRateWithKnowledge).toBeCloseTo(1 / 9);
    expect(view.totals.repeatRateHoldout).toBe(1);
    expect(view.weekly.map((week) => week.weekStart)).toEqual([
      "2026-10-05",
      "2026-10-12",
    ]);
  });

  it("returns null rates with no runs and hides computers from non-owners", () => {
    const view = buildProjectKnowledgeImpactView({
      rows: [],
      computers: [computer("ready"), computer("degraded"), computer("off")],
      windowDays: 30,
      includeComputers: false,
    });
    expect(view.totals.repeatRateWithKnowledge).toBeNull();
    expect(view.computers).toBeNull();
    expect(view.computerSummary).toEqual({
      total: 3,
      ready: 1,
      degraded: 1,
      other: 1,
    });
  });

  it("starts weeks on Monday", () => {
    expect(startOfUtcWeekFromDay("2026-10-11")).toBe("2026-10-05");
  });
});
