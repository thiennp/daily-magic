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

  it("skips write when History is off or unknown", () => {
    expect(
      writeProjectHistoryAiSession({
        projectId: "p1",
        taskId: "r1",
        agentRunId: "r1",
        status: "completed",
        promptSummary: "x",
        resultSummary: "y",
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
      }),
    ).toEqual({ ok: false, reason: "history_off" });
  });
});
