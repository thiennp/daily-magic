import { describe, expect, it } from "vitest";

import { formatAgentLiveTerminalCommandLine } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import {
  beginAgentLiveTerminalSession,
  reduceAgentLiveTerminalMessage,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import { resolveAgentLiveRunOutcome } from "@/features/agent/utils/resolveAgentLiveRunOutcome";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AGENT_RUN_LOST_CONNECTION_REASONS } from "@/lib/dispatch/agentRunLostConnectionReasons.constant";

const streamingRun = () =>
  reduceAgentLiveTerminalMessage(
    beginAgentLiveTerminalSession(
      formatAgentLiveTerminalCommandLine("run lint"),
      "claude-cli",
    ),
    {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: { dispatched: true, agentRunId: "run-1" },
    },
  );

describe("reduceAgentLiveTerminalMessage stale run record (S2/S7)", () => {
  it("ends the floater with the lost-connection line when the server stale-fails the run", () => {
    const next = reduceAgentLiveTerminalMessage(streamingRun(), {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD,
      payload: {
        run: {
          id: "run-1",
          status: "failed",
          resultOutput: null,
          denialReason: AGENT_RUN_LOST_CONNECTION_REASONS.STALE,
        },
      },
    });

    expect(next.status).toBe("error");
    expect(next.output).toContain(
      "Lost connection to your computer — this task stopped.",
    );
    expect(
      resolveAgentLiveRunOutcome({ status: next.status, output: next.output })
        .kind,
    ).not.toBe("passed");
  });

  it("keeps a user-stopped run on the Stopped path", () => {
    const next = reduceAgentLiveTerminalMessage(streamingRun(), {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD,
      payload: {
        run: {
          id: "run-1",
          status: "failed",
          resultOutput: "error: interrupted\nStopped by user.",
          denialReason: null,
        },
      },
    });

    expect(next.status).toBe("finished");
    expect(
      resolveAgentLiveRunOutcome({ status: next.status, output: next.output })
        .kind,
    ).toBe("stopped");
  });
});
