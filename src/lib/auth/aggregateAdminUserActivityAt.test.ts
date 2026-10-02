import { describe, expect, it } from "vitest";

import aggregateAdminUserActivityAt from "@/lib/auth/aggregateAdminUserActivityAt";

describe("aggregateAdminUserActivityAt", () => {
  it("returns null when no usable timestamps", () => {
    expect(aggregateAdminUserActivityAt([])).toBeNull();
    expect(aggregateAdminUserActivityAt([null, undefined, ""])).toBeNull();
    expect(aggregateAdminUserActivityAt(["not-a-date"])).toBeNull();
  });

  it("returns the greatest timestamp as ISO", () => {
    expect(
      aggregateAdminUserActivityAt([
        "2026-01-01T00:00:00.000Z",
        "2026-03-15T12:30:00.000Z",
        "2026-02-01T00:00:00.000Z",
        null,
      ]),
    ).toBe("2026-03-15T12:30:00.000Z");
  });
});
