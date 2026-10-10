import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { COMMIT_CHANGES_CAP, readCommitChanges } from "./readCommitChanges";

const git = (cwd: string, ...args: string[]): string =>
  execFileSync("git", args, { cwd, encoding: "utf8" }).trim();

describe("readCommitChanges", () => {
  const state: { dir: string; sha: string; bigSha: string } = {
    dir: "",
    sha: "",
    bigSha: "",
  };
  beforeAll(() => {
    state.dir = fs.mkdtempSync(path.join(os.tmpdir(), "commit-changes-"));
    git(state.dir, "init", "-q");
    git(state.dir, "config", "user.email", "t@example.com");
    git(state.dir, "config", "user.name", "T");
    fs.writeFileSync(path.join(state.dir, "a.ts"), "export const a = 1;\n");
    fs.writeFileSync(path.join(state.dir, ".env.local"), "TOKEN=hunter2\n");
    fs.writeFileSync(path.join(state.dir, "yarn.lock"), "lock\n");
    git(state.dir, "add", "-A");
    git(state.dir, "commit", "-qm", "first");
    state.sha = git(state.dir, "rev-parse", "HEAD");
    fs.writeFileSync(path.join(state.dir, "big.txt"), "x\n".repeat(20_000));
    git(state.dir, "add", "-A");
    git(state.dir, "commit", "-qm", "big");
    state.bigSha = git(state.dir, "rev-parse", "HEAD");
  });
  afterAll(() => fs.rmSync(state.dir, { recursive: true, force: true }));

  it("returns the commit's own changes and leaves out secrets and lockfiles", async () => {
    const changes = (await readCommitChanges(state.dir, state.sha)) ?? "";
    expect(changes).toContain("a.ts");
    expect(changes).not.toContain("hunter2");
    expect(changes).not.toContain(".env");
    expect(changes).not.toContain("yarn.lock");
  });

  it("trims a huge diff to a fixed size", async () => {
    const changes = (await readCommitChanges(state.dir, state.bigSha)) ?? "";
    expect(changes.length).toBeLessThanOrEqual(COMMIT_CHANGES_CAP + 40);
    expect(changes).toContain("diff trimmed");
  });

  it("refuses anything that is not a commit id", async () => {
    expect(await readCommitChanges(state.dir, "HEAD; rm -rf /")).toBeNull();
    expect(await readCommitChanges(state.dir, "--output=x")).toBeNull();
  });
});
