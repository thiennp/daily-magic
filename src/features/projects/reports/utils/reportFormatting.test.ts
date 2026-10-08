import { describe, expect, it } from "vitest";

import {
  formatReportDuration,
  resolveReportDurationSeconds,
} from "@/features/projects/reports/utils/formatReportDuration";
import { groupProjectReportsByDay } from "@/features/projects/reports/utils/groupProjectReportsByDay";

describe("formatReportDuration", () => {
  it("formats seconds, minutes and hours", () => {
    expect(formatReportDuration(45)).toBe("45s");
    expect(formatReportDuration(750)).toBe("12m 30s");
    expect(formatReportDuration(600)).toBe("10m");
    expect(formatReportDuration(3720)).toBe("1h 2m");
    expect(formatReportDuration(null)).toBeNull();
    expect(formatReportDuration(-1)).toBeNull();
  });

  it("falls back to completed - started", () => {
    expect(
      resolveReportDurationSeconds({
        actualSeconds: null,
        startedAt: "2026-10-08T10:00:00Z",
        completedAt: "2026-10-08T10:01:30Z",
      }),
    ).toBe(90);
    expect(
      resolveReportDurationSeconds({
        startedAt: null,
        completedAt: null,
      }),
    ).toBeNull();
  });
});

describe("groupProjectReportsByDay", () => {
  it("labels Today / Yesterday / date and keeps order", () => {
    const now = new Date(2026, 9, 8, 12);
    const at = (d: number, h: number): { createdAt: string } => ({
      createdAt: new Date(2026, 9, d, h).toISOString(),
    });
    const groups = groupProjectReportsByDay(
      [at(8, 10), at(8, 9), at(7, 20), at(1, 5)],
      now,
    );
    expect(groups.map((g) => [g.label, g.items.length])).toEqual([
      ["Today", 2],
      ["Yesterday", 1],
      ["1 Oct", 1],
    ]);
  });
});
