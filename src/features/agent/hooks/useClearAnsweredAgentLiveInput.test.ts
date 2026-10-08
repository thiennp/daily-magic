import { describe, expect, it } from "vitest";

import { clearAnsweredAgentLiveInput } from "@/features/agent/hooks/useClearAnsweredAgentLiveInput";
import { initialAgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";

const waiting = {
  ...initialAgentLiveTerminalState(),
  activeRunId: "run-1",
  status: "streaming" as const,
  pendingInput: { agentRunId: "run-1", question: "Go?", partialOutput: "" },
};

/** a6053d1c: "Waiting for your answer" lingered 30–40 s after Send. */
describe("clearAnsweredAgentLiveInput", () => {
  it("clears the ask for the answered run", () => {
    expect(clearAnsweredAgentLiveInput(waiting, "run-1").pendingInput).toBe(
      null,
    );
  });

  it("keeps another run's ask", () => {
    expect(clearAnsweredAgentLiveInput(waiting, "run-2")).toBe(waiting);
  });
});
