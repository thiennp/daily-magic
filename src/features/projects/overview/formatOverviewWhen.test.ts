import { describe, expect, it } from "vitest";

import {
  formatOverviewDate,
  formatOverviewWhen,
} from "@/features/projects/overview/formatOverviewWhen";

const NOW = Date.parse("2026-10-06T14:00:00+02:00");

describe("formatOverviewWhen (I10)", () => {
  it("formats calendar days as 27 Sept (never sept / Sept lowercase alone)", () => {
    expect(formatOverviewDate("2026-09-27T12:00:00+02:00", NOW)).toBe(
      "27 Sept",
    );
    expect(formatOverviewDate("2026-10-01T08:00:00+02:00", NOW)).toBe("1 Oct");
  });

  it("formats yesterday mid-sentence and line-start", () => {
    const y = "2026-10-05T15:15:00+02:00";
    expect(formatOverviewWhen(y, { nowMs: NOW })).toBe("yesterday 15:15");
    expect(formatOverviewWhen(y, { nowMs: NOW, lineStart: true })).toBe(
      "Yesterday 15:15",
    );
  });

  it("formats today mid-sentence", () => {
    expect(
      formatOverviewWhen("2026-10-06T09:05:00+02:00", { nowMs: NOW }),
    ).toBe("today 09:05");
  });

  it("returns null for bad input", () => {
    expect(formatOverviewWhen(null)).toBeNull();
    expect(formatOverviewWhen("not-a-date")).toBeNull();
  });
});
