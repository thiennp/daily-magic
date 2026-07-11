import { describe, expect, it } from "vitest";

import buildClaudeCliCommand from "./buildClaudeCliCommand";

describe("buildClaudeCliCommand", () => {
  it("builds claude -p invocation for non-empty prompts", () => {
    expect(buildClaudeCliCommand("  summarize README  ")).toEqual({
      command: "claude",
      args: ["-p", "summarize README"],
    });
  });

  it("uses custom claude command when provided", () => {
    expect(buildClaudeCliCommand("run tests", "/usr/local/bin/claude")).toEqual(
      {
        command: "/usr/local/bin/claude",
        args: ["-p", "run tests"],
      },
    );
  });

  it("returns null for empty prompts", () => {
    expect(buildClaudeCliCommand("")).toBeNull();
    expect(buildClaudeCliCommand("   ")).toBeNull();
  });
});
