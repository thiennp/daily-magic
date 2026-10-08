import { describe, expect, it } from "vitest";

import { formatWakeAgo } from "@/features/projects/members/utils/formatAssistantWakeHealth";

const NOW = new Date(2026, 9, 8, 12, 0).getTime();
const at = (minutesAgo: number): string =>
  new Date(NOW - minutesAgo * 60_000).toISOString();

describe("formatWakeAgo", () => {
  it("buckets relative wake time", () => {
    expect(formatWakeAgo(at(0), NOW)).toBe("just now");
    expect(formatWakeAgo(at(59), NOW)).toBe("59 min ago");
    expect(formatWakeAgo(at(180), NOW)).toBe("3 h ago");
    expect(formatWakeAgo(at(60 * 49), NOW)).toBe("2 d ago");
  });
});
