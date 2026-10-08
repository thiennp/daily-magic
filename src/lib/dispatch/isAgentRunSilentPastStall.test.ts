import { describe, expect, it } from "vitest";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { isAgentRunSilentPastStall } from "@/lib/dispatch/isAgentRunSilentPastStall";

const nowMs = Date.parse("2026-10-08T21:00:00.000Z");
const hoursAgo = (hours: number) =>
  new Date(nowMs - hours * 60 * 60 * 1000).toISOString();

describe("isAgentRunSilentPastStall (6253aa7e Home stale runs)", () => {
  it("flags a running run last seen alive 10 h ago", () => {
    expect(
      isAgentRunSilentPastStall(
        {
          status: AgentRunStatus.RUNNING,
          lastRunHeartbeatAt: hoursAgo(10),
          startedAt: hoursAgo(11),
          createdAt: hoursAgo(11),
        },
        nowMs,
      ),
    ).toBe(true);
  });

  it("flags a run still waiting for its first heartbeat after 6 h", () => {
    expect(
      isAgentRunSilentPastStall(
        {
          status: AgentRunStatus.RUNNING,
          lastRunHeartbeatAt: null,
          startedAt: hoursAgo(6),
          createdAt: hoursAgo(6),
        },
        nowMs,
      ),
    ).toBe(true);
  });

  it("keeps fresh runs and non-running runs as they are", () => {
    const fresh = {
      lastRunHeartbeatAt: hoursAgo(0.01),
      startedAt: hoursAgo(1),
      createdAt: hoursAgo(1),
    };
    expect(
      isAgentRunSilentPastStall(
        { ...fresh, status: AgentRunStatus.RUNNING },
        nowMs,
      ),
    ).toBe(false);
    expect(
      isAgentRunSilentPastStall(
        {
          ...fresh,
          lastRunHeartbeatAt: hoursAgo(10),
          status: AgentRunStatus.PENDING_APPROVAL,
        },
        nowMs,
      ),
    ).toBe(false);
  });
});
