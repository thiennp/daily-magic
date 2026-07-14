import { describe, expect, it, beforeEach } from "vitest";

import { listAgentRunsLocalCache } from "@/features/reports/agentRunLocalCache";
import { syncAgentRunLocalCacheFromSocket } from "@/features/reports/utils/syncAgentRunLocalCacheFromSocket";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("syncAgentRunLocalCacheFromSocket", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  it("stores agent.run.record payloads in local job history", () => {
    const synced = syncAgentRunLocalCacheFromSocket(
      JSON.stringify({
        type: AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD,
        payload: {
          run: {
            id: "run-local-1",
            groupId: null,
            requesterUserId: "user-1",
            executorUserId: "user-1",
            prompt: "run lint",
            status: AgentRunStatus.RUNNING,
            dispatchPolicy: "auto",
            resultOutput: null,
            resultExitCode: null,
            denialReason: null,
            createdAt: "2026-07-14T20:00:00.000Z",
            updatedAt: "2026-07-14T20:00:00.000Z",
            startedAt: "2026-07-14T20:00:00.000Z",
            completedAt: null,
            approvalExpiresAt: null,
            capabilityId: null,
            capabilityVersionId: null,
          },
        },
      }),
    );

    expect(synced).toBe(true);
    expect(listAgentRunsLocalCache()[0]?.id).toBe("run-local-1");
  });
});
