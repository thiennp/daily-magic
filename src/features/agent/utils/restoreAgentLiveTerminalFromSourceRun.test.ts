import { beforeEach, describe, expect, it } from "vitest";

import { setAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";
import { restoreAgentLiveTerminalFromSourceRun } from "@/features/agent/utils/restoreAgentLiveTerminalFromSourceRun";
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
  status: AgentRunStatus.COMPLETED,
  dispatchPolicy: DispatchPolicy.OPEN,
  resultOutput: "Planned auth tests.",
  resultExitCode: 0,
  denialReason: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  startedAt: "2026-01-01T00:00:00.000Z",
  completedAt: "2026-01-01T00:00:00.000Z",
  approvalExpiresAt: null,
  capabilityId: null,
  capabilityVersionId: null,
  deviceId: "mac-1",
  writerAgent: "cursor",
  lastRunHeartbeatAt: null,
  ...overrides,
});

describe("restoreAgentLiveTerminalFromSourceRun", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  it("AGENT-044 restores writer, device, and output for a cached run", () => {
    upsertAgentRunLocalCache(sampleRun());
    setAgentRunTerminalOutput("run-1", "terminal mirror");

    expect(restoreAgentLiveTerminalFromSourceRun("run-1")).toEqual({
      activeRunId: "run-1",
      output: "terminal mirror",
      status: "finished",
      pendingCommandLine: null,
      pendingInput: null,
      sessionWriterAgent: "cursor",
      sessionDeviceId: "mac-1",
      sessionWriterSessionId: null,
    });
  });

  it("returns null when the run is not in local cache", () => {
    expect(restoreAgentLiveTerminalFromSourceRun("missing")).toBeNull();
  });
});
