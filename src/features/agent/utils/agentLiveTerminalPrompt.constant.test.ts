import { describe, expect, it } from "vitest";

import { formatAgentLiveTerminalCommandLine } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";

describe("formatAgentLiveTerminalCommandLine", () => {
  it("formats a single-line shell command", () => {
    expect(formatAgentLiveTerminalCommandLine("run lint", "claude-cli")).toBe(
      'claude-cli "run lint"',
    );
  });

  it("truncates very long prompts", () => {
    const longPrompt = "a".repeat(150);
    const formatted = formatAgentLiveTerminalCommandLine(longPrompt);
    expect(formatted.length).toBeLessThan(160);
    expect(formatted).toContain("…");
  });
});
