import { describe, expect, it } from "vitest";

import { resolveShouldRestoreAgentLiveTerminalSession } from "@/features/agent/utils/resolveShouldRestoreAgentLiveTerminalSession";

describe("resolveShouldRestoreAgentLiveTerminalSession", () => {
  it("AGENT-032: Start does not restore a prior live session into the picker", () => {
    expect(
      resolveShouldRestoreAgentLiveTerminalSession({
        continueSession: false,
        resumeLiveSession: false,
      }),
    ).toBe(false);
  });

  it("AGENT-032: continue or dock expand restores the live session", () => {
    expect(
      resolveShouldRestoreAgentLiveTerminalSession({
        continueSession: true,
        resumeLiveSession: false,
      }),
    ).toBe(true);
    expect(
      resolveShouldRestoreAgentLiveTerminalSession({
        continueSession: false,
        resumeLiveSession: true,
      }),
    ).toBe(true);
  });

  it("AGENT-038: sourceRunId alone restores the scoped job session", () => {
    expect(
      resolveShouldRestoreAgentLiveTerminalSession({
        continueSession: false,
        resumeLiveSession: false,
        sourceRunId: "run-1",
      }),
    ).toBe(true);
  });
});
