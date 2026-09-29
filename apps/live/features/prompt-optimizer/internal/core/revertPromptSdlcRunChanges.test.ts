import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  capturePromptSdlcRestorePoint,
  revertPromptSdlcRunChanges,
} from "./revertPromptSdlcRunChanges";

const git = (cwd: string, args: readonly string[]): void => {
  execFileSync("git", [...args], { cwd, stdio: "ignore" });
};

describe("revertPromptSdlcRunChanges", () => {
  it("puts a git folder back, including a dirty file and a new cache", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-revert-"));
    git(cwd, ["init"]);
    git(cwd, ["config", "user.email", "test@agentwitch.com"]);
    git(cwd, ["config", "user.name", "Test"]);
    fs.writeFileSync(path.join(cwd, ".gitignore"), ".cache/\n");
    fs.writeFileSync(path.join(cwd, "notes.md"), "before\n");
    git(cwd, ["add", ".gitignore", "notes.md"]);
    git(cwd, ["commit", "-m", "start"]);
    fs.writeFileSync(path.join(cwd, "keep.md"), "keep\n");
    const point = capturePromptSdlcRestorePoint({
      workingDirectory: cwd,
      git: true,
      namedPaths: ["notes.md"],
    });
    fs.appendFileSync(path.join(cwd, "notes.md"), "round one\n");
    fs.writeFileSync(path.join(cwd, "keep.md"), "changed\n");
    fs.writeFileSync(path.join(cwd, "new.md"), "new\n");
    fs.mkdirSync(path.join(cwd, ".cache"));
    fs.writeFileSync(path.join(cwd, ".cache", "warm.txt"), "warm\n");

    expect(revertPromptSdlcRunChanges(point).ok).toBe(true);
    expect(fs.readFileSync(path.join(cwd, "notes.md"), "utf8")).toBe(
      "before\n",
    );
    expect(fs.readFileSync(path.join(cwd, "keep.md"), "utf8")).toBe("keep\n");
    expect(fs.existsSync(path.join(cwd, "new.md"))).toBe(false);
    expect(fs.existsSync(path.join(cwd, ".cache"))).toBe(false);
  });

  it("restores a cache that already existed so the next round is not warmer", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-cache-"));
    fs.mkdirSync(path.join(cwd, ".cache"));
    fs.writeFileSync(path.join(cwd, ".cache", "old.txt"), "old\n");
    const point = capturePromptSdlcRestorePoint({
      workingDirectory: cwd,
      git: false,
      namedPaths: [],
    });
    fs.writeFileSync(path.join(cwd, ".cache", "old.txt"), "new\n");
    fs.writeFileSync(path.join(cwd, ".cache", "extra.txt"), "extra\n");

    expect(revertPromptSdlcRunChanges(point).ok).toBe(true);
    expect(fs.readFileSync(path.join(cwd, ".cache", "old.txt"), "utf8")).toBe(
      "old\n",
    );
    expect(fs.existsSync(path.join(cwd, ".cache", "extra.txt"))).toBe(false);
  });

  it("undoes a commit the round made and keeps the earlier dirty file", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-commit-"));
    git(cwd, ["init"]);
    git(cwd, ["config", "user.email", "test@agentwitch.com"]);
    git(cwd, ["config", "user.name", "Test"]);
    fs.writeFileSync(path.join(cwd, "notes.md"), "before\n");
    git(cwd, ["add", "notes.md"]);
    git(cwd, ["commit", "-m", "start"]);
    const head = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd,
      encoding: "utf8",
    }).trim();
    fs.writeFileSync(path.join(cwd, "keep.md"), "keep\n");
    const point = capturePromptSdlcRestorePoint({
      workingDirectory: cwd,
      git: true,
      namedPaths: [],
    });
    fs.appendFileSync(path.join(cwd, "notes.md"), "round one\n");
    fs.writeFileSync(path.join(cwd, "new.md"), "new\n");
    git(cwd, ["add", "notes.md", "new.md", "keep.md"]);
    git(cwd, ["commit", "-m", "round"]);

    expect(revertPromptSdlcRunChanges(point).ok).toBe(true);
    expect(
      execFileSync("git", ["rev-parse", "HEAD"], {
        cwd,
        encoding: "utf8",
      }).trim(),
    ).toBe(head);
    expect(fs.readFileSync(path.join(cwd, "notes.md"), "utf8")).toBe(
      "before\n",
    );
    expect(fs.readFileSync(path.join(cwd, "keep.md"), "utf8")).toBe("keep\n");
    expect(fs.existsSync(path.join(cwd, "new.md"))).toBe(false);
  });

  it("puts a non-git folder back, including a file the prompt did not name", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-plain-"));
    fs.writeFileSync(path.join(cwd, "latest.md"), "old\n");
    const point = capturePromptSdlcRestorePoint({
      workingDirectory: cwd,
      git: false,
      namedPaths: ["latest.md"],
    });
    fs.writeFileSync(path.join(cwd, "latest.md"), "new\n");
    fs.writeFileSync(path.join(cwd, "extra.txt"), "extra\n");

    expect(revertPromptSdlcRunChanges(point).ok).toBe(true);
    expect(fs.readFileSync(path.join(cwd, "latest.md"), "utf8")).toBe("old\n");
    expect(fs.existsSync(path.join(cwd, "extra.txt"))).toBe(false);
  });
});
