import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { writeLocalProjectHistoryState } from "./localProjectHistoryState";
import { PROJECT_HISTORY_TASKS_DIR_NAME } from "./projectHistoryPaths.constant";
import { ensureProjectDataTree } from "./resolveProjectDataDir";
import { writeProjectHistoryAiSession } from "./writeProjectHistoryAiSession";

describe("writeProjectHistoryAiSession", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-ai-session-"));
    layoutState.root = tempRoot;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("writes scrubbed tasks/<agentRunId>.json when History is ON", () => {
    writeLocalProjectHistoryState({ projectId: "p1", state: "on_ready" });
    const result = writeProjectHistoryAiSession({
      projectId: "p1",
      taskId: "run-abc",
      agentRunId: "run-abc",
      status: "completed",
      promptSummary: "fix sk-abcdefghijklmnopqrstuvwxyz123456 the app",
      resultSummary: "done, email me at a@b.com",
      writerAgent: "claude-cli",
      createdAt: "2026-01-02T00:00:00.000Z",
      completedAt: "2026-01-02T00:01:00.000Z",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.record.agentRunId).toBe("run-abc");
    expect(result.record.promptSummary).not.toMatch(/sk-/);
    expect(result.record.resultSummary).toContain("[redacted-email]");
    expect(result.record.promptBody).toBeNull();
    expect(result.record.resultBody).toBeNull();
    const filePath = path.join(
      ensureProjectDataTree("p1"),
      PROJECT_HISTORY_TASKS_DIR_NAME,
      "run-abc.json",
    );
    expect(fs.existsSync(filePath)).toBe(true);
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as {
      taskId: string;
      agentRunId: string;
    };
    expect(parsed.taskId).toBe("run-abc");
    expect(parsed.agentRunId).toBe("run-abc");
  });

  it("stores full secret-scrubbed promptBody/resultBody (uncapped) and merges", () => {
    writeLocalProjectHistoryState({ projectId: "p1", state: "on_ready" });
    const longPrompt = `Please do a long task. ${"x".repeat(400)} sk-abcdefghijklmnopqrstuvwxyz123456`;
    const create = writeProjectHistoryAiSession({
      projectId: "p1",
      taskId: "run-full",
      agentRunId: "run-full",
      status: "running",
      promptBody: longPrompt,
      resultBody: null,
      writerAgent: "claude-cli",
      completedAt: null,
    });
    expect(create.ok).toBe(true);
    if (!create.ok) return;
    expect(create.record.promptBody).not.toBeNull();
    expect(create.record.promptBody!.length).toBeGreaterThan(280);
    expect(create.record.promptBody).not.toMatch(/sk-/);
    expect(create.record.promptSummary.length).toBeLessThanOrEqual(280);
    expect(create.record.promptSummary).not.toMatch(/sk-/);
    expect(create.record.resultBody).toBeNull();
    expect(create.record.completedAt).toBeNull();

    const longResult = `All done. ${"y".repeat(350)} email a@b.com`;
    const terminal = writeProjectHistoryAiSession({
      projectId: "p1",
      taskId: "run-full",
      agentRunId: "run-full",
      status: "completed",
      resultBody: longResult,
      completedAt: "2026-01-02T00:02:00.000Z",
    });
    expect(terminal.ok).toBe(true);
    if (!terminal.ok) return;
    // Prompt body preserved across terminal merge.
    expect(terminal.record.promptBody).toBe(create.record.promptBody);
    expect(terminal.record.resultBody).not.toBeNull();
    expect(terminal.record.resultBody!.length).toBeGreaterThan(280);
    expect(terminal.record.resultBody).toContain("[redacted-email]");
    expect(terminal.record.resultSummary.length).toBeLessThanOrEqual(280);
    expect(terminal.record.status).toBe("completed");
  });

  it("skips write when History is off or unknown", () => {
    expect(
      writeProjectHistoryAiSession({
        projectId: "p1",
        taskId: "r1",
        agentRunId: "r1",
        status: "completed",
        promptSummary: "x",
        resultSummary: "y",
        promptBody: "full prompt body that must not be written",
      }).ok,
    ).toBe(false);

    writeLocalProjectHistoryState({ projectId: "p1", state: "off" });
    expect(
      writeProjectHistoryAiSession({
        projectId: "p1",
        taskId: "r1",
        agentRunId: "r1",
        status: "completed",
        promptSummary: "x",
        resultSummary: "y",
        promptBody: "full prompt body that must not be written",
      }),
    ).toEqual({ ok: false, reason: "history_off" });
  });
});
