import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildGitSubprocessEnv } from "@agent-witch/shared";

import {
  describePromptSdlcRunEvidence,
  readPromptSdlcWorkspaceSnapshot,
} from "./collectPromptSdlcRunEvidence";

const git = (cwd: string, args: readonly string[]): void => {
  execFileSync("git", [...args], {
    cwd,
    env: buildGitSubprocessEnv(),
    stdio: "ignore",
  });
};

describe("collectPromptSdlcRunEvidence", () => {
  it("reads git changes made after the snapshot and ignores the earlier commit", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-git-"));
    git(cwd, ["init"]);
    git(cwd, ["config", "user.email", "test@agentwitch.com"]);
    git(cwd, ["config", "user.name", "Test"]);
    fs.writeFileSync(path.join(cwd, "notes.md"), "before\n");
    git(cwd, ["add", "notes.md"]);
    git(cwd, ["commit", "-m", "start"]);
    const before = readPromptSdlcWorkspaceSnapshot({
      workingDirectory: cwd,
      promptText: "Update notes.md with the refund facts.",
    });
    fs.appendFileSync(
      path.join(cwd, "notes.md"),
      "The ticket has no refund.\n",
    );

    const evidence = describePromptSdlcRunEvidence({
      workingDirectory: cwd,
      before,
      writerReply: "",
    });

    expect(evidence.lookedAt).toContain("git changes");
    expect(evidence.evidence).toContain("The ticket has no refund.");
    expect(evidence.evidence).toContain("notes.md");
    expect(evidence.evidence).not.toContain("commit");
  });

  it("reads a named file when the folder is not a git repo", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-file-"));
    fs.writeFileSync(path.join(cwd, "latest.md"), "old\n");
    const before = readPromptSdlcWorkspaceSnapshot({
      workingDirectory: cwd,
      promptText: "Rewrite latest.md.",
    });
    fs.writeFileSync(
      path.join(cwd, "latest.md"),
      "The ticket has no refund.\n",
    );

    const evidence = describePromptSdlcRunEvidence({
      workingDirectory: cwd,
      before,
      writerReply: "done",
    });

    expect(evidence.lookedAt).toBe("files named in the prompt");
    expect(evidence.evidence).toContain("latest.md changed.");
    expect(evidence.evidence).toContain("The ticket has no refund.");
  });

  it("says it only has the writer reply when nothing names a file", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-reply-"));
    const before = readPromptSdlcWorkspaceSnapshot({
      workingDirectory: cwd,
      promptText: "Be helpful.",
    });

    const evidence = describePromptSdlcRunEvidence({
      workingDirectory: cwd,
      before,
      writerReply: "A guessed paragraph.",
    });

    expect(evidence.lookedAt).toContain("not a git repo");
    expect(evidence.evidence).toContain("A guessed paragraph.");
  });
});
