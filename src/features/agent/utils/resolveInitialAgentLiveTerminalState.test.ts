import { describe, expect, it } from "vitest";

import { initialAgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { shouldPersistAgentLiveTerminalState } from "@/features/agent/utils/resolveInitialAgentLiveTerminalState";

describe("shouldPersistAgentLiveTerminalState", () => {
  it("AGENT-032: skips idle writes before a Start session begins", () => {
    expect(
      shouldPersistAgentLiveTerminalState({
        allowPersist: false,
        state: initialAgentLiveTerminalState(),
      }),
    ).toBe(false);
  });

  it("AGENT-032: persists once a session is allowed", () => {
    expect(
      shouldPersistAgentLiveTerminalState({
        allowPersist: true,
        state: initialAgentLiveTerminalState(),
      }),
    ).toBe(true);
  });
});
