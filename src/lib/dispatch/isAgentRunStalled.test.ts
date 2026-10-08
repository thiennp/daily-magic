import { describe, expect, it } from "vitest";

import { AGENT_RUN_LOST_CONNECTION_REASONS } from "@/lib/dispatch/agentRunLostConnectionReasons.constant";
import { isAgentRunStalled } from "@/lib/dispatch/isAgentRunStalled";

const base = {
  lastRunHeartbeatAt: "2026-10-08T10:00:00.000Z",
  startedAt: "2026-10-08T10:00:00.000Z",
  createdAt: "2026-10-08T10:00:00.000Z",
};
const NOW = Date.parse("2026-10-08T22:00:00.000Z");

describe("isAgentRunStalled (41888ea3)", () => {
  it("treats a swept stale run as Stalled", () => {
    expect(
      isAgentRunStalled(
        {
          ...base,
          status: "failed",
          denialReason: AGENT_RUN_LOST_CONNECTION_REASONS.STALE,
        },
        NOW,
      ),
    ).toBe(true);
  });

  it("keeps other failures Failed", () => {
    expect(
      isAgentRunStalled(
        { ...base, status: "failed", denialReason: "killed by SIGKILL" },
        NOW,
      ),
    ).toBe(false);
  });
});
