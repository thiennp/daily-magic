import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { closeKnowledgeDbsForTests, getKnowledgeDb } from "./knowledgeDb";
import { upsertEpisode } from "./knowledgeStore";
import {
  isKnowledgeHookRequest,
  recordKnowledgeHookRun,
} from "./recordKnowledgeHookRun";

const tempDirs: string[] = [];
const makeDir = (prefix: string): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  tempDirs.push(dir);
  return dir;
};

const setup = () => {
  const layout = {
    installDir: makeDir("aw-hook-knowledge-"),
    profileEmail: null,
  } as AgentWitchLocalLayout;
  const folder = makeDir("aw-hook-folder-");
  const db = getKnowledgeDb(layout);
  if (db === null) throw new Error("knowledge db unavailable");
  upsertEpisode(db, {
    projectKey: "p1",
    kind: "mistake",
    request: "fix the login redirect loop in auth.ts",
    takeaway: "Clear the stale session cookie before redirecting to login",
    outcome: "failed",
    costTokens: 500,
    sourceRunId: "r0",
  });
  return { layout, folder, db };
};

const events = (db: NonNullable<ReturnType<typeof getKnowledgeDb>>) =>
  db
    .prepare(
      "SELECT run_id, holdout, cards_injected, injected_tokens FROM knowledge_events",
    )
    .all() as unknown as {
    run_id: string;
    holdout: number;
    cards_injected: number;
    injected_tokens: number;
  }[];

const PROMPT = "please fix the login redirect loop again in auth.ts now";

beforeEach(() => {
  vi.stubEnv("AGENT_WITCH_KNOWLEDGE_HOLDOUT_PERCENT", "0");
});
afterEach(() => {
  vi.unstubAllEnvs();
  closeKnowledgeDbsForTests();
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("recordKnowledgeHookRun", () => {
  it("counts only messages that can be a request", () => {
    expect(isKnowledgeHookRequest("ok")).toBe(false);
    expect(isKnowledgeHookRequest("thanks a lot mate")).toBe(false);
    expect(isKnowledgeHookRequest(PROMPT)).toBe(true);
  });

  it("records no run for a short message", () => {
    const { layout, folder, db } = setup();
    const text = recordKnowledgeHookRun({
      layout,
      projectKey: "p1",
      projectFolderPath: folder,
      message: "ok thanks",
    });
    expect(text).toBe("");
    expect(events(db)).toHaveLength(0);
  });

  it("records the run and the injected note, once per session prompt", () => {
    const { layout, folder, db } = setup();
    const call = () =>
      recordKnowledgeHookRun({
        layout,
        projectKey: "p1",
        projectFolderPath: folder,
        message: PROMPT,
        sessionId: "s1",
      });
    expect(call()).toMatch(/stale session cookie/);
    call();
    const rows = events(db);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ holdout: 0, cards_injected: 1 });
    expect(rows[0]?.injected_tokens).toBeGreaterThan(0);
    const injections = db
      .prepare("SELECT COUNT(*) AS n FROM injections WHERE run_id = ?")
      .get(rows[0]?.run_id ?? "") as unknown as { n: number };
    expect(injections.n).toBe(1);
  });

  it("gives the holdout slice no notes but still counts the run", () => {
    vi.stubEnv("AGENT_WITCH_KNOWLEDGE_HOLDOUT_PERCENT", "100");
    const { layout, folder, db } = setup();
    const text = recordKnowledgeHookRun({
      layout,
      projectKey: "p1",
      projectFolderPath: folder,
      message: PROMPT,
      sessionId: "s1",
    });
    expect(text).toBe("");
    expect(events(db)[0]).toMatchObject({ holdout: 1, cards_injected: 0 });
  });
});
