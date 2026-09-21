import { describe, expect, it } from "vitest";

import {
  beginAgentLiveTerminalSession,
  reduceAgentLiveTerminalMessage,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("reduceAgentLiveTerminalMessage session limit (AGENT-126)", () => {
  it("surfaces session limit as a terminal error outcome", () => {
    const dispatched = reduceAgentLiveTerminalMessage(
      beginAgentLiveTerminalSession("claude -p run", "claude-cli"),
      {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: {
          dispatched: true,
          agentRunId: "run-limit",
        },
      },
    );

    const finished = reduceAgentLiveTerminalMessage(dispatched, {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT,
      payload: {
        agentRunId: "run-limit",
        exitCode: 1,
        output: "You've hit your session limit · resets 1:30am (Europe/Berlin)",
      },
    });

    expect(finished.status).toBe("error");
    expect(finished.output).toContain("Session limit reached");
    expect(finished.output).toContain(
      "That is a hard stop — not a missed estimate.",
    );
  });
});
