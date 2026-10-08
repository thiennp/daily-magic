import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import { buildGitSubprocessEnv } from "@agent-witch/shared";

import { captureKnowledgeAfterRun } from "./captureKnowledgeAfterRun";
import { closeKnowledgeDbsForTests, getKnowledgeDb } from "./knowledgeDb";
import { clearKnowledgeRunTrackerForTests } from "./knowledgeRunTracker";
import { listEpisodesWithVectors } from "./knowledgeStore";
import { reconcileUnverifiedKnowledgeFixes } from "./reconcileUnverifiedKnowledgeFixes";

const tempDirs: string[] = [];

const git = (cwd: string, ...args: string[]): string =>
  execFileSync(
    "git",
    [
      "-c",
      "user.name=t",
      "-c",
      "user.email=t@t",
      "-c",
      "commit.gpgsign=false",
      ...args,
    ],
    { cwd, env: buildGitSubprocessEnv(), encoding: "utf8" },
  ).trim();

const makeRepo = (): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-git-"));
  tempDirs.push(dir);
  git(dir, "init", "-q");
  fs.writeFileSync(path.join(dir, "auth.ts"), "export const a = 1;\n");
  git(dir, "add", ".");
  git(dir, "commit", "-q", "-m", "init");
  return dir;
};

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("no ollama")));
});

afterEach(() => {
  vi.unstubAllGlobals();
  closeKnowledgeDbsForTests();
  clearKnowledgeRunTrackerForTests();
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

const layout = (): AgentWitchLocalLayout => {
  const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-git-db-"));
  tempDirs.push(installDir);
  return { installDir, profileEmail: null } as AgentWitchLocalLayout;
};

const runInput = (
  l: AgentWitchLocalLayout,
  folder: string,
  runId: string,
  headBefore: string,
  dirtyBefore = 0,
) => ({
  layout: l,
  projectKey: "p1",
  projectFolderPath: folder,
  runId,
  prompt: "change the constant in auth.ts",
  output: "done",
  exitCode: 0,
  gitBefore: { headSha: headBefore, porcelainLineCount: dirtyBefore },
});

describe("commit linking", () => {
  it("links a committed run, then marks it superseded when the commit is reverted", async () => {
    const l = layout();
    const repo = makeRepo();
    const head0 = git(repo, "rev-parse", "HEAD");

    fs.writeFileSync(path.join(repo, "auth.ts"), "export const a = 2;\n");
    git(repo, "commit", "-q", "-am", "feat: change constant");
    const committed = git(repo, "rev-parse", "HEAD");
    await captureKnowledgeAfterRun(runInput(l, repo, "r1", head0));

    const db = getKnowledgeDb(l)!;
    const fix = listEpisodesWithVectors(db, "p1", { withVectors: false }).find(
      (card) => card.kind === "fix",
    );
    expect(fix?.outcome).toBe("verified");
    expect(fix?.commitShas[0]).toBe(committed);
    expect(fix?.files).toContain("auth.ts");

    git(repo, "revert", "--no-edit", "HEAD");
    await captureKnowledgeAfterRun(runInput(l, repo, "r2", committed));

    const cards = db
      .prepare("SELECT kind, outcome, takeaway FROM episodes")
      .all() as {
      kind: string;
      outcome: string;
      takeaway: string;
    }[];
    expect(cards.find((c) => c.kind === "fix")?.outcome).toBe("superseded");
    expect(
      cards.some(
        (c) => c.kind === "mistake" && c.takeaway.includes("reverted"),
      ),
    ).toBe(true);
  });

  it("keeps an uncommitted fix unverified, then attaches the SHA once the user commits", async () => {
    const l = layout();
    const repo = makeRepo();
    const head0 = git(repo, "rev-parse", "HEAD");

    fs.writeFileSync(path.join(repo, "auth.ts"), "export const a = 3;\n");
    await captureKnowledgeAfterRun(runInput(l, repo, "r1", head0));

    const db = getKnowledgeDb(l)!;
    const read = () =>
      listEpisodesWithVectors(db, "p1", { withVectors: false }).find(
        (card) => card.kind === "fix",
      );
    expect(read()?.outcome).toBe("unverified");
    expect(read()?.commitShas).toEqual([]);

    await new Promise((resolve) => setTimeout(resolve, 1_100));
    git(repo, "commit", "-q", "-am", "manual commit");
    const manual = git(repo, "rev-parse", "HEAD");
    await reconcileUnverifiedKnowledgeFixes({
      db,
      projectKey: "p1",
      projectFolderPath: repo,
    });
    expect(read()?.outcome).toBe("verified");
    expect(read()?.commitShas).toEqual([manual]);
  });

  it("does not record a fix for pre-existing dirty files", async () => {
    const l = layout();
    const repo = makeRepo();
    const head0 = git(repo, "rev-parse", "HEAD");
    fs.writeFileSync(path.join(repo, "notes.txt"), "scratch\n");
    await captureKnowledgeAfterRun(runInput(l, repo, "r1", head0, 1));
    const db = getKnowledgeDb(l)!;
    expect(
      listEpisodesWithVectors(db, "p1", { withVectors: false }),
    ).toHaveLength(0);
  });
});
