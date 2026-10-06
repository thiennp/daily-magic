import { describe, expect, it } from "vitest";

import { isAgentLiveTerminalSessionActive } from "@/features/agent/utils/isAgentLiveTerminalSessionActive";

describe("isAgentLiveTerminalSessionActive", () => {
  it("returns false before a computer task is delegated", () => {
    expect(isAgentLiveTerminalSessionActive(null)).toBe(false);
  });

  it("returns true while a computer session is open", () => {
    expect(isAgentLiveTerminalSessionActive("claude-cli")).toBe(true);
  });
});
