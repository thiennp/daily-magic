import { beforeEach, describe, expect, it } from "vitest";

import { listRunningAgentRunsLocalCache } from "@/features/agent/utils/listRunningAgentRunsLocalCache";
import { upsertAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

const sampleRun = (
  overrides: Partial<AgentRunRecord> = {},
): AgentRunRecord => ({
  id: "run-1",
  groupId: null,
  requesterUserId: "user-1",
  executorUserId: "user-1",
  prompt: "Ship auth tests",
  status: AgentRunStatus.RUNNING,
  dispatchPolicy: DispatchPolicy.OPEN,
  resultOutput: null,
  resultExitCode: null,
  denialReason: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  startedAt: "2026-01-01T00:00:00.000Z",
  completedAt: null,
  approvalExpiresAt: null,
  capabilityId: null,
  capabilityVersionId: null,
  deviceId: "mac-1",
  writerAgent: "cursor",
  lastRunHeartbeatAt: null,
  ...overrides,
});

describe("listRunningAgentRunsLocalCache (AGENT-053)", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  it("returns only running and pending-approval jobs", () => {
    upsertAgentRunLocalCache(sampleRun({ id: "run-a" }));
    upsertAgentRunLocalCache(
      sampleRun({
        id: "run-b",
        status: AgentRunStatus.PENDING_APPROVAL,
        createdAt: "2026-01-02T00:00:00.000Z",
      }),
    );
    upsertAgentRunLocalCache(
      sampleRun({ id: "run-c", status: AgentRunStatus.COMPLETED }),
    );

    expect(listRunningAgentRunsLocalCache().map((run) => run.id)).toEqual([
      "run-b",
      "run-a",
    ]);
  });
});
