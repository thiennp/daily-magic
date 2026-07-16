import { describe, expect, it } from "vitest";

import { isAgentLiveTerminalSessionActive } from "@/features/agent/utils/isAgentLiveTerminalSessionActive";

describe("isAgentLiveTerminalSessionActive", () => {
  it("returns false before a Mac task is delegated", () => {
    expect(isAgentLiveTerminalSessionActive(null)).toBe(false);
  });

  it("returns true while a Mac session is open", () => {
    expect(isAgentLiveTerminalSessionActive("claude-cli")).toBe(true);
  });
});
