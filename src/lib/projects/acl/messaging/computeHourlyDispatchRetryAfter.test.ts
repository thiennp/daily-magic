import { describe, expect, it } from "vitest";

import { computeHourlyDispatchRetryAfter } from "@/lib/projects/acl/messaging/computeHourlyDispatchRetryAfter";
import { PROJECT_MESSAGE_HOURLY_WINDOW_MS } from "@/lib/projects/acl/messaging/projectMessage.constants";

describe("computeHourlyDispatchRetryAfter", () => {
  it("returns seconds until the oldest counted row ages out of the window", () => {
    const oldestCreatedAt = new Date("2026-10-05T08:00:00.000Z");
    const now = new Date("2026-10-05T08:45:00.000Z");
    expect(computeHourlyDispatchRetryAfter({ oldestCreatedAt, now })).toEqual({
      retryAfterSeconds: 15 * 60,
      retryAfterAt: new Date(
        oldestCreatedAt.getTime() + PROJECT_MESSAGE_HOURLY_WINDOW_MS,
      ).toISOString(),
    });
  });

  it("never returns a negative wait", () => {
    const oldestCreatedAt = new Date("2026-10-05T07:00:00.000Z");
    const now = new Date("2026-10-05T09:00:00.000Z");
    expect(
      computeHourlyDispatchRetryAfter({ oldestCreatedAt, now }).retryAfterSeconds,
    ).toBe(0);
  });
});
