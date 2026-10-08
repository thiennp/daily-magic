import { beforeEach, describe, expect, it, vi } from "vitest";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/dispatch/dispatchAgentRunInputRegistry", () => ({
  dispatchAgentRunInputRegistry: {
    listAgentRunIds: () => [],
  },
}));

vi.mock("@/lib/dispatch/broadcastAgentRunRecord", () => ({
  broadcastAgentRunRecord: vi.fn(),
}));

import { reconcileRunningAgentRunsOnDeviceDisconnect } from "@/lib/dispatch/reconcileRunningAgentRunsOnDeviceDisconnect";

const disconnectedRow = {
  id: "run-1",
  group_id: null,
  requester_user_id: "user-1",
  executor_user_id: "user-1",
  prompt: "run tests",
  status: AgentRunStatus.FAILED,
  dispatch_policy: "open",
  result_output: null,
  result_exit_code: null,
  denial_reason: "Lost connection to the host before the result arrived.",
  created_at: "2026-07-19T10:00:00.000Z",
  updated_at: "2026-07-19T10:05:00.000Z",
  started_at: "2026-07-19T10:00:00.000Z",
  completed_at: "2026-07-19T10:05:00.000Z",
  approval_expires_at: null,
  capability_id: null,
  capability_version_id: null,
  device_id: "device-1",
  writer_agent: "antigravity",
  last_run_heartbeat_at: null,
};

describe("reconcileRunningAgentRunsOnDeviceDisconnect", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("marks stale running device jobs failed on agent disconnect", async () => {
    sqlMock.mockResolvedValue([disconnectedRow]);

    const reconciled = await reconcileRunningAgentRunsOnDeviceDisconnect(
      {} as never,
      { userId: "user-1", deviceId: "device-1" },
    );

    expect(reconciled).toHaveLength(1);
    expect(reconciled[0]?.id).toBe("run-1");
    expect(sqlMock).toHaveBeenCalledTimes(1);
  });
});
