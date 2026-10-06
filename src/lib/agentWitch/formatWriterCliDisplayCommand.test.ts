import { describe, expect, it } from "vitest";

import {
  formatWriterCliDisplayCommand,
  formatWriterSessionStartDisplayCommand,
} from "@/lib/agentWitch/formatWriterCliDisplayCommand";

describe("formatWriterCliDisplayCommand", () => {
  it("shows the workspace-write claude invocation for claude-cli", () => {
    expect(formatWriterCliDisplayCommand("claude-cli", "run tests")).toBe(
      'claude -p --permission-mode dontAsk --max-turns 30 "run tests"',
    );
  });

  it("never shows a full-bypass flag for any writer", () => {
    for (const writer of ["claude-cli", "codex", "cursor", "antigravity"] as const) {
      const shown = formatWriterCliDisplayCommand(writer, "task");
      expect(shown).not.toMatch(
        /dangerously-skip-permissions|danger-full-access|--force|sandbox disabled/,
      );
    }
  });

  it("shows --continue on claude follow-up turns", () => {
    expect(
      formatWriterCliDisplayCommand("claude-cli", "follow up", "continue"),
    ).toBe(
      'claude --continue -p --permission-mode dontAsk --max-turns 30 "follow up"',
    );
  });

  it("shows the cursor agent session command without a prompt", () => {
    expect(formatWriterSessionStartDisplayCommand("cursor")).toBe(
      "cursor agent",
    );
  });

  it("shows claude -v for claude-cli session start", () => {
    expect(formatWriterSessionStartDisplayCommand("claude-cli")).toBe(
      "claude -v",
    );
  });

  it("orders antigravity flags so -p is not followed by another flag", () => {
    expect(formatWriterCliDisplayCommand("antigravity", "plan")).toBe(
      'agy --sandbox -p "plan"',
    );
  });
});
