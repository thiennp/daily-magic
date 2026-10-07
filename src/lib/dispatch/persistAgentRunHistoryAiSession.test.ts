import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));
const historyStateMock = vi.hoisted(() => ({
  state: "on_ready" as "on_ready" | "off" | "on_configuring" | "degraded",
  throwOnRead: false,
}));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

vi.mock("@/lib/projects/acl/messaging/readProjectComputerHistoryState", () => ({
  readProjectComputerHistoryState: async () => {
    if (historyStateMock.throwOnRead) {
      throw new Error("history_read_failed");
    }
    return historyStateMock.state;
  },
}));

import { writeLocalProjectHistoryState } from "@agent-witch/live-project-history";
import { listProjectHistoryAiSessions } from "@agent-witch/live-project-history";
import {
  deleteAgentRunLocalPrompt,
  getAgentRunLocalPrompt,
  putAgentRunLocalPrompt,
} from "@/lib/dispatch/agentRunLocalPromptStore";
import {
  finalizeAgentRunLocalPromptAtTerminal,
  shouldDeleteAgentRunLocalPromptAfterTerminal,
  tryPersistAgentRunHistoryAiSession,
} from "@/lib/dispatch/persistAgentRunHistoryAiSession";

describe("persistAgentRunHistoryAiSession", () => {
  let tempRoot = "";
  let promptsDir = "";
  let prevEnv: string | undefined;

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "awc-c1-persist-"));
    promptsDir = fs.mkdtempSync(path.join(os.tmpdir(), "awc-prompts-"));
    layoutState.root = tempRoot;
    prevEnv = process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR;
    process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR = promptsDir;
    historyStateMock.state = "on_ready";
    historyStateMock.throwOnRead = false;
  });

  afterEach(() => {
    if (prevEnv === undefined) {
      delete process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR;
    } else {
      process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR = prevEnv;
    }
    fs.rmSync(tempRoot, { recursive: true, force: true });
    fs.rmSync(promptsDir, { recursive: true, force: true });
  });

  it("create path: History ON + projectId → C1 has full promptBody (not only ≤280)", () => {
    writeLocalProjectHistoryState({ projectId: "proj-1", state: "on_ready" });
    const full = `Long create prompt ${"p".repeat(300)}`;
    const ok = tryPersistAgentRunHistoryAiSession({
      projectId: "proj-1",
      agentRunId: "run-create-1",
      status: "pending_approval",
      promptBody: full,
      resultBody: null,
      writerAgent: "claude-cli",
      completedAt: null,
    });
    expect(ok).toBe(true);
    const sessions = listProjectHistoryAiSessions("proj-1");
    expect(sessions).toHaveLength(1);
    const record = sessions[0]!;
    expect(record.promptBody).toBe(full);
    expect(record.promptBody!.length).toBeGreaterThan(280);
    expect(record.promptSummary.length).toBeLessThanOrEqual(280);
    expect(record.resultBody).toBeNull();
  });

  it("terminal complete: C1 gets full resultBody; local deleted only after C1 ok", async () => {
    writeLocalProjectHistoryState({ projectId: "proj-1", state: "on_ready" });
    const fullPrompt = `Terminal prompt ${"q".repeat(300)}`;
    const fullResult = `Terminal result ${"r".repeat(300)}`;
    putAgentRunLocalPrompt("run-term-1", fullPrompt);

    const shouldDelete = await finalizeAgentRunLocalPromptAtTerminal({
      agentRunId: "run-term-1",
      projectId: "proj-1",
      status: "completed",
      resultBody: fullResult,
      writerAgent: "claude-cli",
      completedAt: "2026-10-07T11:00:00.000Z",
    });
    expect(shouldDelete).toBe(true);

    const sessions = listProjectHistoryAiSessions("proj-1");
    expect(sessions).toHaveLength(1);
    const record = sessions[0]!;
    expect(record.promptBody).toBe(fullPrompt);
    expect(record.resultBody).toBe(fullResult);
    expect(record.promptSummary.length).toBeLessThanOrEqual(280);
    expect(record.resultSummary.length).toBeLessThanOrEqual(280);

    // Caller deletes when shouldDelete — simulate.
    deleteAgentRunLocalPrompt("run-term-1");
    expect(getAgentRunLocalPrompt("run-term-1")).toBeNull();
  });

  it("History OFF: no C1 write; delete local allowed (explicit drop)", async () => {
    writeLocalProjectHistoryState({ projectId: "proj-off", state: "off" });
    historyStateMock.state = "off";
    const full = `Off-path prompt ${"z".repeat(200)}`;
    putAgentRunLocalPrompt("run-off-1", full);

    const c1Ok = tryPersistAgentRunHistoryAiSession({
      projectId: "proj-off",
      agentRunId: "run-off-1",
      status: "completed",
      promptBody: full,
      resultBody: "result body",
    });
    expect(c1Ok).toBe(false);
    expect(listProjectHistoryAiSessions("proj-off")).toHaveLength(0);

    const shouldDelete = await shouldDeleteAgentRunLocalPromptAfterTerminal({
      projectId: "proj-off",
      c1WriteOk: false,
    });
    expect(shouldDelete).toBe(true);
  });

  it("no projectId: delete local allowed (Neon meta-only accepted)", async () => {
    const shouldDelete = await shouldDeleteAgentRunLocalPromptAfterTerminal({
      projectId: null,
      c1WriteOk: false,
    });
    expect(shouldDelete).toBe(true);
  });

  it("History ON but C1 not writable (unknown local): keep local bridge", async () => {
    // No local History state file → write returns history_unknown.
    historyStateMock.state = "on_ready";
    const c1Ok = tryPersistAgentRunHistoryAiSession({
      projectId: "proj-remote",
      agentRunId: "run-remote-1",
      status: "completed",
      promptBody: "full",
      resultBody: "full result",
    });
    expect(c1Ok).toBe(false);
    const shouldDelete = await shouldDeleteAgentRunLocalPromptAfterTerminal({
      projectId: "proj-remote",
      c1WriteOk: false,
    });
    expect(shouldDelete).toBe(false);
  });
});
