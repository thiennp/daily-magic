import { beforeEach, describe, expect, it, vi } from "vitest";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

vi.mock("@/features/agent/utils/preferredMacDeviceStorage", () => ({
  clearPreferredMacDeviceIdIfMatches: vi.fn(),
}));

vi.mock("@/features/reports/agentRunLocalCache", () => ({
  listAgentRunsLocalCache: vi.fn(),
  removeAgentRunLocalCache: vi.fn(),
}));

vi.mock("@/features/reports/agentRunLocalCacheTombstones", () => ({
  addAgentRunLocalCacheTombstone: vi.fn(),
}));

vi.mock(
  "@/features/agent/utils/removePersistedAgentLiveTerminalSessionByRunId",
  () => ({
    removePersistedAgentLiveTerminalSessionByRunId: vi.fn(),
  }),
);

vi.mock("@/features/agent/utils/agentRunTerminalOutputStore", () => ({
  removeAgentRunTerminalOutput: vi.fn(),
}));

import { clearPreferredMacDeviceIdIfMatches } from "@/features/agent/utils/preferredMacDeviceStorage";
import { removeAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";
import { removePersistedAgentLiveTerminalSessionByRunId } from "@/features/agent/utils/removePersistedAgentLiveTerminalSessionByRunId";
import {
  listAgentRunsLocalCache,
  removeAgentRunLocalCache,
} from "@/features/reports/agentRunLocalCache";
import { addAgentRunLocalCacheTombstone } from "@/features/reports/agentRunLocalCacheTombstones";
import { purgeLocalAgentTasksForRevokedDevice } from "@/features/reports/utils/purgeLocalAgentTasksForRevokedDevice";

const buildRun = (
  overrides: Partial<AgentRunRecord> & Pick<AgentRunRecord, "id" | "status">,
): AgentRunRecord => ({
  id: overrides.id,
  status: overrides.status,
  deviceId: overrides.deviceId ?? "device-1",
  prompt: "test",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  startedAt: null,
  completedAt: null,
  requesterUserId: "user-1",
  executorUserId: "user-1",
  dispatchPolicy: DispatchPolicy.OPEN,
  writerAgent: "claude-cli",
  groupId: null,
  resultOutput: null,
  resultExitCode: null,
  denialReason: null,
  capabilityId: null,
  capabilityVersionId: null,
  projectId: null,
  approvalExpiresAt: null,
  lastRunHeartbeatAt: null,
});

describe("purgeLocalAgentTasksForRevokedDevice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("purges only active runs tied to the revoked Mac", () => {
    vi.mocked(listAgentRunsLocalCache).mockReturnValue([
      buildRun({ id: "run-active", status: AgentRunStatus.RUNNING }),
      buildRun({
        id: "run-done",
        status: AgentRunStatus.COMPLETED,
        deviceId: "device-1",
      }),
      buildRun({
        id: "run-other-mac",
        status: AgentRunStatus.RUNNING,
        deviceId: "device-2",
      }),
    ]);

    const purged = purgeLocalAgentTasksForRevokedDevice("device-1");

    expect(purged).toEqual(["run-active"]);
    expect(clearPreferredMacDeviceIdIfMatches).toHaveBeenCalledWith("device-1");
    expect(removeAgentRunLocalCache).toHaveBeenCalledWith("run-active");
    expect(addAgentRunLocalCacheTombstone).toHaveBeenCalledWith("run-active");
    expect(removePersistedAgentLiveTerminalSessionByRunId).toHaveBeenCalledWith(
      "run-active",
    );
    expect(removeAgentRunTerminalOutput).toHaveBeenCalledWith("run-active");
  });
});
