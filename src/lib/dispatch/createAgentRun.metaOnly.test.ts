import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AGENT_RUN_NEON_META_MAX_CHARS } from "@/lib/dispatch/toAgentRunNeonMetaText";
import { getAgentRunLocalPrompt } from "@/lib/dispatch/agentRunLocalPromptStore";

const insertCalls: { prompt: unknown }[] = [];

vi.mock("@/lib/auth/resolveDevDashboardActor", () => ({
  isAgentWitchDevDashboardEnabled: () => false,
}));

vi.mock("@/lib/db", () => ({
  asRowArray: (value: unknown) => value,
  getSql: () => {
    const sql = (
      strings: TemplateStringsArray,
      ...values: unknown[]
    ): Promise<unknown[]> => {
      // VALUES order matches createAgentRun: runId, groupId, requester, executor,
      // deviceId, prompt, status, ...
      const prompt = values[5];
      insertCalls.push({ prompt });
      return Promise.resolve([
        {
          id: values[0],
          group_id: values[1],
          requester_user_id: values[2],
          executor_user_id: values[3],
          device_id: values[4],
          prompt,
          status: values[6],
          dispatch_policy: values[7],
          writer_agent: values[8],
          capability_id: values[9],
          capability_version_id: values[10],
          project_id: values[11],
          composition_snapshot_id: values[12],
          approval_expires_at: values[13],
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
      ]);
    };
    return sql;
  },
}));

vi.mock("@/lib/dispatch/mapAgentRunRow", () => ({
  default: (row: Record<string, unknown>) => ({
    id: row.id as string,
    groupId: row.group_id as string | null,
    requesterUserId: row.requester_user_id as string,
    executorUserId: row.executor_user_id as string,
    deviceId: row.device_id as string | null,
    prompt: row.prompt as string,
    status: row.status as string,
    dispatchPolicy: row.dispatch_policy as string,
    writerAgent: row.writer_agent as string,
    capabilityId: row.capability_id as string | null,
    capabilityVersionId: row.capability_version_id as string | null,
    projectId: row.project_id as string | null,
    compositionSnapshotId: row.composition_snapshot_id as string | null,
    approvalExpiresAt: row.approval_expires_at as string | null,
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

describe("createAgentRun Neon meta-only", () => {
  let tempDir: string;
  let prevEnv: string | undefined;

  beforeEach(() => {
    insertCalls.length = 0;
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "awc-create-prompts-"));
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

  it("INSERTs capped prompt to Neon and keeps full prompt locally + in return", async () => {
    const { default: createAgentRun } = await import(
      "@/lib/dispatch/createAgentRun"
    );
    const full = `Please do a long task. ${"x".repeat(200)}`;
    const run = await createAgentRun({
      id: "run-meta-1",
      requesterUserId: "u1",
      executorUserId: "u2",
      prompt: full,
      status: "pending_approval",
      dispatchPolicy: "approval",
    });

    expect(insertCalls).toHaveLength(1);
    const neonPrompt = insertCalls[0]?.prompt;
    expect(typeof neonPrompt).toBe("string");
    expect((neonPrompt as string).length).toBeLessThanOrEqual(
      AGENT_RUN_NEON_META_MAX_CHARS,
    );
    expect((neonPrompt as string).endsWith("…")).toBe(true);

    expect(run.prompt).toBe(full);
    expect(getAgentRunLocalPrompt("run-meta-1")).toBe(full);
  });
});
