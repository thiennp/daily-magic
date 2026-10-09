/**
 * createPushNeonMetaPort wires History PushNeonMetaPort → allowlisted upsert.
 * T15 I/O: terminal rows never resurrect (updatedAgentRunIds empty).
 */
import { describe, expect, it, vi, beforeEach } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn(async () => [] as unknown[]));
const registerCache = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/dispatch/agentRunSessionRegistry", () => ({
  registerAgentRunSession: registerCache,
}));

import {
  createPushNeonMetaPort,
  upsertProjectTaskNeonMeta,
} from "@/features/projects/sync/adapters/upsertProjectTaskNeonMeta";
import { pickProjectTaskNeonMetaAllowlist } from "@/features/projects/sync/adapters/projectTasksNeonMeta";

const baseMeta = (partial: Record<string, unknown> = {}) =>
  pickProjectTaskNeonMetaAllowlist({
    id: "1",
    projectId: "proj-1",
    title: "t",
    status: "done",
    createdAt: "2026-10-07T00:00:00.000000Z",
    updatedAt: "2026-10-07T01:00:00.000000Z",
    version: 2,
    assistantMembershipId: null,
    startedAt: null,
    endedAt: "2026-10-07T01:00:00.000000Z",
    sessionId: "1",
    agentRunId: "1",
    branch: null,
    worktree: null,
    localClaimedAt: "2026-10-07T00:00:00.000000Z",
    ...partial,
  });

const OWNER = { userId: "owner-1", isOwner: true } as const;

describe("upsertProjectTaskNeonMeta forward write", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sqlMock.mockResolvedValue([]);
  });

  it("forward write running→completed updates and syncs cache", async () => {
    sqlMock.mockImplementation(async (...args: unknown[]) => {
      const strings = args[0] as TemplateStringsArray;
      const sqlText = strings.join(" ");
      if (sqlText.includes("SELECT") && !sqlText.includes("UPDATE")) {
        return [
          {
            id: "1",
            status: "running",
            updated_at: "2026-10-07T00:30:00.000000Z",
          },
        ];
      }
      if (sqlText.includes("UPDATE")) {
        return [
          {
            id: "1",
            group_id: null,
            requester_user_id: "u1",
            executor_user_id: "u1",
            prompt: "p",
            status: "completed",
            dispatch_policy: "approval",
            result_output: null,
            result_exit_code: null,
            result_outcome_code: null,
            denial_reason: null,
            created_at: "2026-10-07T00:00:00.000000Z",
            updated_at: "2026-10-07T01:00:00.000000Z",
            started_at: "2026-10-07T00:30:00.000000Z",
            completed_at: "2026-10-07T01:00:00.000000Z",
            approval_expires_at: null,
            capability_id: null,
            capability_version_id: null,
            device_id: null,
            project_id: "proj-1",
            composition_snapshot_id: null,
            writer_agent: "claude-cli",
            last_run_heartbeat_at: null,
            stop_requested_at: null,
            estimate_seconds: null,
            actual_seconds: null,
          },
        ];
      }
      return [];
    });

    const result = await upsertProjectTaskNeonMeta({
      projectId: "proj-1",
      actor: OWNER,
      batch: [baseMeta({ status: "done" })],
    });
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("unreachable");
    expect(result.updatedAgentRunIds).toEqual(["1"]);
    expect(registerCache).toHaveBeenCalledOnce();
  });
});
