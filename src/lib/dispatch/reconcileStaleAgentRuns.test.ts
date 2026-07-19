import { beforeEach, describe, expect, it, vi } from "vitest";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { reconcileStaleAgentRuns } from "@/lib/dispatch/reconcileStaleAgentRuns";

const sqlMock = vi.fn();
const broadcastAgentRunRecord = vi.fn();

vi.mock("@/lib/db", () => ({
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
  getSql: () => sqlMock,
}));

vi.mock("@/lib/dispatch/broadcastAgentRunRecord", () => ({
  broadcastAgentRunRecord: (...args: unknown[]) =>
    broadcastAgentRunRecord(...args),
}));

vi.mock("@/lib/auth/resolveDevDashboardActor", () => ({
  isAgentWitchDevDashboardEnabled: () => false,
}));

describe("reconcileStaleAgentRuns (AGENT-039)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    broadcastAgentRunRecord.mockReset();
  });

  it("marks stale running jobs failed and broadcasts updated records", async () => {
    sqlMock.mockResolvedValue([
      {
        id: "run-stale",
        group_id: null,
        requester_user_id: "user-1",
        executor_user_id: "user-1",
        prompt: "run tests",
        status: AgentRunStatus.FAILED,
        dispatch_policy: "open",
        result_output: null,
        result_exit_code: null,
        denial_reason:
          "No run heartbeat from your Mac — the job was marked stale.",
        created_at: "2026-07-19T10:00:00.000Z",
        updated_at: "2026-07-19T10:05:00.000Z",
        started_at: "2026-07-19T10:00:00.000Z",
        completed_at: "2026-07-19T10:05:00.000Z",
        approval_expires_at: null,
        capability_id: null,
        capability_version_id: null,
        device_id: "device-1",
        writer_agent: "claude-cli",
        last_run_heartbeat_at: "2026-07-19T10:00:30.000Z",
      },
    ]);

    const runtime = {} as never;
    const reconciled = await reconcileStaleAgentRuns(runtime);

    expect(reconciled).toHaveLength(1);
    expect(reconciled[0]?.status).toBe(AgentRunStatus.FAILED);
    expect(reconciled[0]?.denialReason).toContain("stale");
    expect(broadcastAgentRunRecord).toHaveBeenCalledWith(
      runtime,
      reconciled[0],
    );
  });

  it("returns an empty list when no runs are stale", async () => {
    sqlMock.mockResolvedValue([]);

    const reconciled = await reconcileStaleAgentRuns({} as never);

    expect(reconciled).toEqual([]);
    expect(broadcastAgentRunRecord).not.toHaveBeenCalled();
  });
});
