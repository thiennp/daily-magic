import { describe, expect, it } from "vitest";

import { buildAgentWakeTerminalLine } from "./buildAgentWakeTerminalLine";

describe("buildAgentWakeTerminalLine", () => {
  it("formats kind and summary", () => {
    expect(
      buildAgentWakeTerminalLine({
        kind: "task.updated",
        summary: "Task moved",
      }),
    ).toBe(
      "[AgentWitch] task.updated: Task moved — check your AgentWitch inbox",
    );
  });

  it("strips control characters, escapes and newlines", () => {
    const sep = String.fromCharCode(0x2028);
    const line = buildAgentWakeTerminalLine({
      kind: "task\n.updated\u001b",
      summary: `a\r\nrm -rf /\u001b[31m\u0007b${sep}c`,
    });
    const hasControl = Array.from(line).some((char) => {
      const code = char.charCodeAt(0);
      return code <= 0x1f || (code >= 0x7f && code <= 0x9f) || code === 0x2028;
    });
    expect(hasControl).toBe(false);
    expect(line).toBe(
      "[AgentWitch] task.updated: a rm -rf / [31m b c — check your AgentWitch inbox",
    );
  });

  it("caps the summary length and falls back for empty parts", () => {
    const line = buildAgentWakeTerminalLine({
      kind: "!!!",
      summary: "x".repeat(500),
    });
    expect(line.startsWith(`[AgentWitch] message: ${"x".repeat(200)} —`)).toBe(
      true,
    );
    expect(buildAgentWakeTerminalLine({ kind: "ping", summary: " \n " })).toBe(
      "[AgentWitch] ping — check your AgentWitch inbox",
    );
  });
});
