import { describe, expect, it } from "vitest";

import { formatHomeRunningJobAliveLabel } from "@/features/home/utils/formatHomeRunningJobAliveLabel";

describe("formatHomeRunningJobAliveLabel (AGENT-058)", () => {
  const nowMs = Date.parse("2026-07-21T10:02:00.000Z");

  it("formats last heartbeat as last seen alive", () => {
    expect(
      formatHomeRunningJobAliveLabel({
        lastRunHeartbeatAt: "2026-07-21T10:01:48.000Z",
        startedAt: "2026-07-21T10:00:00.000Z",
        createdAt: "2026-07-21T10:00:00.000Z",
        nowMs,
      }),
    ).toBe("Last seen alive 12s ago");
  });

  it("shows waiting when no heartbeat yet", () => {
    expect(
      formatHomeRunningJobAliveLabel({
        lastRunHeartbeatAt: null,
        startedAt: "2026-07-21T10:00:00.000Z",
        createdAt: "2026-07-21T10:00:00.000Z",
        nowMs,
      }),
    ).toBe("Waiting for first heartbeat · started 2m ago");
  });
});
