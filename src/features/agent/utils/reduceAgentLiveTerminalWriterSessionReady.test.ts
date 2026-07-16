import { describe, expect, it } from "vitest";

import { reduceAgentLiveTerminalWriterSessionReady } from "@/features/agent/utils/reduceAgentLiveTerminalWriterSessionReady";
import { beginAgentLiveTerminalSession } from "@/features/agent/utils/agentLiveTerminalState.type";
import { AGENT_LIVE_BASH_PROMPT } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";

describe("reduceAgentLiveTerminalWriterSessionReady", () => {
  it("shows the command line immediately when the session begins", () => {
    const state = beginAgentLiveTerminalSession(
      "cursor agent status",
      "cursor",
      "device-1",
    );

    expect(state.output).toBe(`${AGENT_LIVE_BASH_PROMPT}cursor agent status\n`);
    expect(state.status).toBe("starting");
  });

  it("appends the ready message for the active writer session", () => {
    const state = beginAgentLiveTerminalSession(
      "cursor agent status",
      "cursor",
      "device-1",
    );

    const next = reduceAgentLiveTerminalWriterSessionReady(state, {
      writerAgent: "cursor",
      output: "Cursor is ready on your Mac.\n",
    });

    expect(next.status).toBe("finished");
    expect(next.output).toContain("cursor agent status");
    expect(next.output).toContain("Cursor is ready on your Mac.");
  });

  it("does not duplicate the command line when it was already shown", () => {
    const state = beginAgentLiveTerminalSession(
      "cursor agent status",
      "cursor",
      "device-1",
    );

    const next = reduceAgentLiveTerminalWriterSessionReady(state, {
      writerAgent: "cursor",
      output: "Cursor is ready on your Mac.\n",
    });

    const commandOccurrences =
      next.output.split("cursor agent status").length - 1;
    expect(commandOccurrences).toBe(1);
  });
});
