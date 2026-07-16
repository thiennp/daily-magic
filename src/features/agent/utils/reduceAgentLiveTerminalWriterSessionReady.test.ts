import { describe, expect, it } from "vitest";

import { reduceAgentLiveTerminalWriterSessionReady } from "@/features/agent/utils/reduceAgentLiveTerminalWriterSessionReady";
import { beginAgentLiveTerminalSession } from "@/features/agent/utils/agentLiveTerminalState.type";

describe("reduceAgentLiveTerminalWriterSessionReady", () => {
  it("appends the ready message for the active writer session", () => {
    const state = beginAgentLiveTerminalSession(
      "cursor agent",
      "cursor",
      "device-1",
    );

    const next = reduceAgentLiveTerminalWriterSessionReady(state, {
      writerAgent: "cursor",
      output: "Cursor is ready on your Mac.\n",
    });

    expect(next.status).toBe("finished");
    expect(next.output).toContain("cursor agent");
    expect(next.output).toContain("Cursor is ready on your Mac.");
  });
});
