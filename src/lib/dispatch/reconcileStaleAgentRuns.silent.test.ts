import { beforeEach, describe, expect, it, vi } from "vitest";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { dispatchAgentRunInputRegistry } from "@/lib/dispatch/dispatchAgentRunInputRegistry";
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

const staleRow = {
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
    "No run heartbeat from your computer — the job was marked stale.",
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
};

describe("reconcileStaleAgentRuns (6253aa7e)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    broadcastAgentRunRecord.mockReset();
  });

  it("fails runs silent past the stall window even when awaiting input (6253aa7e)", async () => {
    dispatchAgentRunInputRegistry.register({
      agentRunId: "run-waiting",
      requesterUserId: "user-1",
      executorUserId: "user-1",
      question: "Codex isn't signed in",
      partialOutput: "",
    });
    const silent = { ...staleRow, id: "run-waiting" };
    sqlMock
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([silent]);

    const reconciled = await reconcileStaleAgentRuns({} as never);

    expect(reconciled.map((run) => run.id)).toEqual(["run-waiting"]);
    const sqlText = (
      sqlMock.mock.calls[2]?.[0] as TemplateStringsArray | undefined
    )?.join("");
    expect(sqlText).toContain(
      "COALESCE(last_run_heartbeat_at, started_at, created_at)",
    );
    expect(sqlText).not.toContain("NOT (id = ANY(");
  });
});
