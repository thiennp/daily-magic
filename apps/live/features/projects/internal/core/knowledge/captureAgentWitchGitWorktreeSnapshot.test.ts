import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { afterEach, describe, expect, it } from "vitest";

import { captureAgentWitchGitWorktreeSnapshot } from "./captureAgentWitchGitWorktreeSnapshot";
import { formatAgentWitchGitWorktreeVerdict } from "./formatAgentWitchGitWorktreeVerdict";

const tempDirs: string[] = [];

const gitEnv = (): NodeJS.ProcessEnv => {
  const env = { ...process.env };
  delete env.GIT_DIR;
  delete env.GIT_WORK_TREE;
  delete env.GIT_INDEX_FILE;
  return env;
};

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

const git = (dir: string, args: readonly string[]): void => {
  execFileSync("git", args, { cwd: dir, env: gitEnv() });
};

const initGitRepo = (dir: string): void => {
  git(dir, ["init"]);
  git(dir, ["config", "user.email", "test@agentwitch.com"]);
  git(dir, ["config", "user.name", "Agent Witch Test"]);
  fs.writeFileSync(path.join(dir, "README.md"), "hello\n");
  git(dir, ["add", "README.md"]);
  git(dir, ["commit", "-m", "init"]);
};

describe("captureAgentWitchGitWorktreeSnapshot", () => {
  it("returns isGitRepo false for a non-repository folder", async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-git-none-"));
    tempDirs.push(dir);

    const snapshot = await captureAgentWitchGitWorktreeSnapshot(dir);

    expect(snapshot.isGitRepo).toBe(false);
    expect(snapshot.branch).toBeNull();
  });

  it("captures branch and shortstat after a file change", async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-git-repo-"));
    tempDirs.push(dir);
    initGitRepo(dir);

    const before = await captureAgentWitchGitWorktreeSnapshot(dir);
    fs.writeFileSync(path.join(dir, "delta.txt"), "change\n");

    const after = await captureAgentWitchGitWorktreeSnapshot(dir);
    const verdict = formatAgentWitchGitWorktreeVerdict({ before, after });

    expect(before.isGitRepo).toBe(true);
    expect(before.branch === "main" || before.branch === "master").toBe(true);
    expect(after.porcelainLineCount).toBeGreaterThan(0);
    expect(verdict).toContain("Git verdict:");
    expect(verdict).toContain("dirty path(s) after run");
  });
});
