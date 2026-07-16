import { describe, expect, it } from "vitest";

import { isAgentLiveTerminalWorking } from "@/features/agent/utils/isAgentLiveTerminalWorking";

describe("isAgentLiveTerminalWorking", () => {
  it("returns true while the Mac agent is actively processing", () => {
    expect(isAgentLiveTerminalWorking("starting")).toBe(true);
    expect(isAgentLiveTerminalWorking("streaming")).toBe(true);
    expect(isAgentLiveTerminalWorking("waiting_approval")).toBe(true);
  });

  it("returns false when the terminal is idle or finished", () => {
    expect(isAgentLiveTerminalWorking("idle")).toBe(false);
    expect(isAgentLiveTerminalWorking("finished")).toBe(false);
  });
});
