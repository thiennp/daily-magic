import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AGENT_RUN_NEON_META_MAX_CHARS } from "@/lib/dispatch/toAgentRunNeonMetaText";
import {
  getAgentRunLocalPrompt,
  putAgentRunLocalPrompt,
} from "@/lib/dispatch/agentRunLocalPromptStore";

const layoutState = vi.hoisted(() => ({ root: "" }));
const historyStateMock = vi.hoisted(() => ({
  state: "on_ready" as "on_ready" | "off" | "on_configuring" | "degraded",
}));
const updateCalls: {
  resultOutput: unknown;
  denialReason: unknown;
  promptLeft: unknown;
}[] = [];

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

vi.mock("@/lib/projects/acl/messaging/readProjectComputerHistoryState", () => ({
  readProjectComputerHistoryState: async () => historyStateMock.state,
}));

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
      // UPDATE binds: status, result_output, exit, outcome, denial, approval,
      // started, completed, estimate, actual, isTerminal, LEFT chars
      updateCalls.push({
        resultOutput: values[1],
        denialReason: values[4],
        promptLeft: values[11],
      });
      return Promise.resolve([
        {
          id: "run-term-upd",
          group_id: null,
          requester_user_id: "u1",
          executor_user_id: "u2",
          device_id: null,
          prompt: "neon-meta…",
          status: values[0],
          dispatch_policy: "approval",
          writer_agent: "claude-cli",
          capability_id: null,
          capability_version_id: null,
          project_id: "proj-term",
          composition_snapshot_id: null,
          approval_expires_at: null,
          result_output: values[1],
          result_exit_code: values[2],
          result_outcome_code: values[3],
          denial_reason: values[4],
          created_at: "2026-10-07T10:00:00.000Z",
          updated_at: "2026-10-07T11:00:00.000Z",
          started_at: null,
          completed_at: "2026-10-07T11:00:00.000Z",
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
    groupId: null,
    requesterUserId: "u1",
    executorUserId: "u2",
    deviceId: null,
    prompt: row.prompt as string,
    status: row.status as string,
    dispatchPolicy: "approval",
    writerAgent: "claude-cli",
    capabilityId: null,
    capabilityVersionId: null,
    projectId: row.project_id as string | null,
    compositionSnapshotId: null,
    approvalExpiresAt: null,
    resultOutput: row.result_output as string | null,
    resultExitCode: row.result_exit_code as number | null,
    resultOutcomeCode: row.result_outcome_code as string | null,
    denialReason: row.denial_reason as string | null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    startedAt: null,
    completedAt: row.completed_at as string | null,
    lastRunHeartbeatAt: null,
  }),
}));

vi.mock("@/lib/dispatch/agentRunEventQueries", () => ({
  getAgentRunRowById: async () => null,
}));

vi.mock("@/lib/dispatch/agentRunSessionRegistry", () => ({
  getAgentRunSession: () => undefined,
  registerAgentRunSession: (run: unknown) => run,
}));

vi.mock("@/lib/dispatch/updateAgentRunSessionStatus", () => ({
  updateAgentRunSessionStatus: () => null,
}));

describe("updateAgentRunStatus terminal C1 + local delete policy", () => {
  let tempDir: string;
  let tempRoot: string;
  let prevEnv: string | undefined;

  beforeEach(() => {
    updateCalls.length = 0;
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "awc-upd-prompts-"));
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "awc-upd-c1-"));
    layoutState.root = tempRoot;
    prevEnv = process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR;
    process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR = tempDir;
    historyStateMock.state = "on_ready";
  });

  afterEach(() => {
    if (prevEnv === undefined) {
      delete process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR;
    } else {
      process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR = prevEnv;
    }
    fs.rmSync(tempDir, { recursive: true, force: true });
    fs.rmSync(tempRoot, { recursive: true, force: true });
    vi.resetModules();
  });

  it("terminal complete: Neon ≤120; C1 full bodies; local deleted after C1", async () => {
    const { writeLocalProjectHistoryState, listProjectHistoryAiSessions } =
      await import("@agent-witch/live-project-history");
    writeLocalProjectHistoryState({ projectId: "proj-term", state: "on_ready" });

    const fullPrompt = `Full prompt for terminal ${"p".repeat(300)}`;
    const fullResult = `Full result for terminal ${"r".repeat(300)}`;
    putAgentRunLocalPrompt("run-term-upd", fullPrompt);

    const { updateAgentRunStatus } = await import(
      "@/lib/dispatch/agentRunQueries"
    );
    await updateAgentRunStatus("run-term-upd", "completed", {
      resultOutput: fullResult,
      resultExitCode: 0,
    });

    expect(updateCalls).toHaveLength(1);
    const neonResult = updateCalls[0]?.resultOutput;
    expect(typeof neonResult).toBe("string");
    expect((neonResult as string).length).toBeLessThanOrEqual(
      AGENT_RUN_NEON_META_MAX_CHARS,
    );

    const sessions = listProjectHistoryAiSessions("proj-term");
    expect(sessions).toHaveLength(1);
    expect(sessions[0]?.promptBody).toBe(fullPrompt);
    expect(sessions[0]?.resultBody).toBe(fullResult);
    expect(sessions[0]?.promptBody!.length).toBeGreaterThan(280);
    expect(sessions[0]?.resultBody!.length).toBeGreaterThan(280);
    expect(getAgentRunLocalPrompt("run-term-upd")).toBeNull();
  });
});
