import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { captureKnowledgeHookOutcome } from "./captureKnowledgeHookOutcome";
import { closeKnowledgeDbsForTests, getKnowledgeDb } from "./knowledgeDb";
import { recordKnowledgeHookRun } from "./recordKnowledgeHookRun";

const tempDirs: string[] = [];
const makeDir = (prefix: string): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  tempDirs.push(dir);
  return dir;
};

const PROMPT = "please fix the login redirect loop again in auth.ts now";
const turn = (output: string, failed: boolean): string =>
  [
    { type: "user", message: { content: PROMPT } },
    {
      type: "assistant",
      message: {
        content: [{ type: "tool_use", id: "b1", name: "Bash", input: {} }],
      },
    },
    {
      type: "user",
      message: {
        content: [
          {
            type: "tool_result",
            tool_use_id: "b1",
            content: output,
            is_error: failed,
          },
        ],
      },
    },
  ]
    .map((l) => JSON.stringify(l))
    .join("\n");

beforeEach(() => {
  vi.stubEnv("AGENT_WITCH_KNOWLEDGE_HOLDOUT_PERCENT", "0");
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("no ollama")));
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  closeKnowledgeDbsForTests();
  for (const dir of tempDirs.splice(0))
    fs.rmSync(dir, { recursive: true, force: true });
});

describe("captureKnowledgeHookOutcome", () => {
  it("learns a mistake from a failed turn, then counts the avoided repeat", async () => {
    const layout = {
      installDir: makeDir("aw-hook-capture-"),
      profileEmail: null,
    } as AgentWitchLocalLayout;
    const cwd = makeDir("aw-hook-cwd-");
    const base = {
      layout,
      projectKey: "p1",
      projectFolderPath: cwd,
      message: PROMPT,
    };
    const db = getKnowledgeDb(layout);
    if (db === null) throw new Error("knowledge db unavailable");

    recordKnowledgeHookRun({ ...base, sessionId: "s1" });
    const captured = await captureKnowledgeHookOutcome({
      layout,
      sessionId: "s1",
      cwd,
      transcriptText: turn(
        "Exit code 1\nTypeError: cannot read properties of undefined",
        true,
      ),
    });
    expect(captured).toBe(true);
    const learned = db
      .prepare("SELECT kind, takeaway FROM episodes WHERE project_key = 'p1'")
      .all() as unknown as { kind: string; takeaway: string }[];
    expect(learned.map((e) => e.kind)).toContain("mistake");
    const first = db
      .prepare(
        "SELECT outcome, created_mistake FROM knowledge_events WHERE run_id LIKE 'hook:s1:%'",
      )
      .get() as unknown as { outcome: string; created_mistake: number };
    expect(first).toMatchObject({ outcome: "fail", created_mistake: 1 });

    const notes = recordKnowledgeHookRun({ ...base, sessionId: "s2" });
    expect(notes).not.toBe("");
    await captureKnowledgeHookOutcome({
      layout,
      sessionId: "s2",
      cwd,
      transcriptText: turn("all green", false),
    });
    const avoided = db
      .prepare("SELECT COUNT(*) AS n FROM mistake_hits WHERE prevented = 1")
      .get() as unknown as { n: number };
    expect(avoided.n).toBe(1);
  });

  it("does nothing when the prompt never opened a run", async () => {
    const layout = {
      installDir: makeDir("aw-hook-capture-"),
      profileEmail: null,
    } as AgentWitchLocalLayout;
    expect(
      await captureKnowledgeHookOutcome({
        layout,
        sessionId: "nope",
        cwd: makeDir("aw-hook-cwd-"),
        transcriptText: turn("boom", true),
      }),
    ).toBe(false);
  });
});
