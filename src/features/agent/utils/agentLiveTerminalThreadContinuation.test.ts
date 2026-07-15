import { describe, expect, it } from "vitest";

import { formatAgentLiveTerminalCommandLine } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import {
  beginAgentLiveTerminalSession,
  reduceAgentLiveTerminalMessage,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("agentLiveTerminalThreadContinuation", () => {
  it("appends a follow-up command without clearing prior output", () => {
    const firstCommand = formatAgentLiveTerminalCommandLine("run lint");
    const firstFinished = reduceAgentLiveTerminalMessage(
      beginAgentLiveTerminalSession(firstCommand),
      {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: {
          dispatched: true,
          agentRunId: "run-1",
        },
      },
    );
    const afterFirstResult = reduceAgentLiveTerminalMessage(firstFinished, {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT,
      payload: {
        agentRunId: "run-1",
        exitCode: 0,
        output: "lint passed\n",
      },
    });

    const secondCommand = formatAgentLiveTerminalCommandLine("run test");
    const secondStarting = reduceAgentLiveTerminalMessage(
      {
        ...afterFirstResult,
        activeRunId: null,
        status: "starting",
        pendingCommandLine: secondCommand,
      },
      {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: {
          dispatched: true,
          agentRunId: "run-2",
        },
      },
    );

    expect(secondStarting.output).toContain("lint passed");
    expect(secondStarting.output).toContain(secondCommand);
    expect(secondStarting.status).toBe("streaming");
  });
});
