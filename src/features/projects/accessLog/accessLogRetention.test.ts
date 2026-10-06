import { describe, expect, it } from "vitest";

import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";

/** Retention line is built only when API returns retention (hide if absent). */
const retentionText = (
  retention: { maxEvents: number; maxAgeDays: number } | null | undefined,
): string | null =>
  retention != null
    ? C.retention
        .replace("{maxEvents}", String(retention.maxEvents))
        .replace("{maxAgeDays}", String(retention.maxAgeDays))
    : null;

describe("access log retention copy", () => {
  it("hides retention when API omits it", () => {
    expect(retentionText(null)).toBeNull();
    expect(retentionText(undefined)).toBeNull();
  });

  it("fills maxEvents / maxAgeDays from API", () => {
    expect(retentionText({ maxEvents: 500, maxAgeDays: 180 })).toBe(
      "Shows the last 500 changes from the past 180 days.",
    );
  });
});
