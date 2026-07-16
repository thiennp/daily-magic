import { describe, expect, it } from "vitest";

import {
  formatWriterCliDisplayCommand,
  formatWriterSessionStartDisplayCommand,
} from "@/lib/agentWitch/formatWriterCliDisplayCommand";

describe("formatWriterCliDisplayCommand", () => {
  it("shows the real claude invocation for claude-cli", () => {
    expect(formatWriterCliDisplayCommand("claude-cli", "run tests")).toBe(
      'claude -p --dangerously-skip-permissions "run tests"',
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
});
