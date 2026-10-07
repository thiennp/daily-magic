import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { putAgentRunLocalPrompt } from "@/lib/dispatch/agentRunLocalPromptStore";

const registered: { prompt: string; runId: string }[] = [];

vi.mock("@/lib/dispatch/dispatchApprovalRegistry", () => ({
  dispatchApprovalRegistry: {
    register: (pending: { prompt: string; runId: string }) => {
      registered.push({ prompt: pending.prompt, runId: pending.runId });
    },
  },
}));

vi.mock("@/lib/agentWitch/harness/isHarnessWriterAgent", () => ({
  default: () => true,
}));

vi.mock("@/lib/dispatch/resolveDelegatedWriterAgent", () => ({
  DEFAULT_DELEGATED_WRITER_AGENT: "claude-cli",
}));

vi.mock("@/lib/db", () => ({
  asRowArray: (value: unknown) => value,
  getSql: () => async () => [
    {
      id: "run-hydrate-1",
      group_id: null,
      requester_user_id: "req",
      executor_user_id: "exec",
      device_id: null,
      prompt: "NEON_META_ONLY…",
      status: "pending_approval",
      dispatch_policy: "approval",
      writer_agent: "claude-cli",
      capability_id: null,
      capability_version_id: null,
      project_id: null,
      composition_snapshot_id: null,
      approval_expires_at: null,
      result_output: null,
      result_exit_code: null,
      result_outcome_code: null,
      denial_reason: null,
      created_at: "2026-10-07T10:00:00.000Z",
      updated_at: "2026-10-07T10:00:00.000Z",
      started_at: null,
      completed_at: null,
      last_run_heartbeat_at: null,
    },
  ],
}));

vi.mock("@/lib/dispatch/mapAgentRunRow", () => ({
  default: (row: Record<string, unknown>) => ({
    id: row.id as string,
    groupId: null,
    requesterUserId: row.requester_user_id as string,
    executorUserId: row.executor_user_id as string,
    deviceId: null,
    prompt: row.prompt as string,
    status: row.status as string,
    dispatchPolicy: row.dispatch_policy as string,
    writerAgent: row.writer_agent as string,
    capabilityId: null,
    capabilityVersionId: null,
    projectId: null,
    compositionSnapshotId: null,
    approvalExpiresAt: null,
    resultOutput: null,
    resultExitCode: null,
    resultOutcomeCode: null,
    denialReason: null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    startedAt: null,
    completedAt: null,
    lastRunHeartbeatAt: null,
  }),
}));

describe("ensureDispatchApprovalsHydrated local prompt", () => {
  let tempDir: string;
  let prevEnv: string | undefined;

  beforeEach(() => {
    registered.length = 0;
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "awc-hydrate-prompts-"));
    prevEnv = process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR;
    process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR = tempDir;
  });

  afterEach(() => {
    if (prevEnv === undefined) {
      delete process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR;
    } else {
      process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR = prevEnv;
    }
    fs.rmSync(tempDir, { recursive: true, force: true });
    vi.resetModules();
  });

  it("registers full local prompt instead of Neon meta", async () => {
    const full = "FULL pending approval prompt body for hydrate";
    putAgentRunLocalPrompt("run-hydrate-1", full);
    const { ensureDispatchApprovalsHydrated } = await import(
      "@/lib/dispatch/restoreDispatchApprovalRegistry"
    );
    await ensureDispatchApprovalsHydrated();
    expect(registered).toHaveLength(1);
    expect(registered[0]?.runId).toBe("run-hydrate-1");
    expect(registered[0]?.prompt).toBe(full);
  });
});
