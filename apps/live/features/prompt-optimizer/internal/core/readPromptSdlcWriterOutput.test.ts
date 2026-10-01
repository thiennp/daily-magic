import { describe, expect, it } from "vitest";

import {
  buildPromptSdlcWriterArgs,
  describePromptSdlcWriterTerminalFailure,
  readPromptSdlcWriterOutput,
} from "./readPromptSdlcWriterOutput";

describe("readPromptSdlcWriterOutput", () => {
  it("does not treat a Codex terminal error as a prompt", () => {
    const raw =
      "Reading additional input from stdin...\nNot inside a trusted directory and --skip-git-repo-check was not specified.";
    expect(describePromptSdlcWriterTerminalFailure(raw)).toMatch(
      /did not return a prompt/,
    );
    expect(
      readPromptSdlcWriterOutput({
        writerAgent: "codex",
        stdout: raw,
        stderr: "",
        replyFileText: null,
      }),
    ).toEqual({
      ok: false,
      errorMessage: expect.stringMatching(/trusted git directory/),
    });
  });

  it("does not treat prompt text that mentions billing as a terminal failure", () => {
    expect(
      describePromptSdlcWriterTerminalFailure("Never discuss billing."),
    ).toBeNull();
  });

  it("does not treat a writer login error as a prompt", () => {
    const raw =
      "Error: Authentication required. Please run 'cursor agent login' first, or set CURSOR_API_KEY environment variable.";
    expect(
      readPromptSdlcWriterOutput({
        writerAgent: "cursor",
        stdout: raw,
        stderr: "",
        replyFileText: raw,
      }),
    ).toEqual({
      ok: false,
      errorMessage: raw,
      errorKind: "action_required",
    });
  });

  it("asks Codex to run outside a git repo and keeps the last message", () => {
    expect(
      buildPromptSdlcWriterArgs({
        writerAgent: "codex",
        baseArgs: ["exec", "-s", "danger-full-access", "Rewrite the prompt."],
        replyPath: "/tmp/reply.txt",
      }),
    ).toEqual([
      "exec",
      "--skip-git-repo-check",
      "--ephemeral",
      "--color",
      "never",
      "--json",
      "--output-last-message",
      "/tmp/reply.txt",
      "-s",
      "danger-full-access",
      "Rewrite the prompt.",
    ]);
    expect(
      readPromptSdlcWriterOutput({
        writerAgent: "codex",
        stdout: "Reading additional input from stdin...",
        stderr: "",
        replyFileText: "Use only the facts in the thread.",
      }).ok,
    ).toBe(true);
  });

  it("keeps the prompt text and the last reported token total", () => {
    const result = readPromptSdlcWriterOutput({
      writerAgent: "codex",
      stdout:
        '{"input_tokens":4,"output_tokens":1}\n{"input_tokens":100,"output_tokens":25}',
      stderr: "",
      replyFileText: "Use only the facts in the thread.",
    });

    expect(result).toEqual({
      ok: true,
      text: "Use only the facts in the thread.",
      tokens: 125,
    });
  });
});
