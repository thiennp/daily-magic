import { describe, expect, it } from "vitest";

import { formatWriterCliDisplayCommand } from "@/lib/agentWitch/formatWriterCliDisplayCommand";

describe("formatWriterCliDisplayCommand", () => {
  it("shows the real claude invocation for claude-cli", () => {
    expect(formatWriterCliDisplayCommand("claude-cli", "run tests")).toBe(
      'claude -p --dangerously-skip-permissions "run tests"',
    );
  });
});
