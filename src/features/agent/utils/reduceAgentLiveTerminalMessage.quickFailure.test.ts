import { describe, expect, it } from "vitest";

import { formatAgentLiveTerminalCommandLine } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import {
  beginAgentLiveTerminalSession,
  reduceAgentLiveTerminalMessage,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import { resolveAgentLiveRunOutcome } from "@/features/agent/utils/resolveAgentLiveRunOutcome";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

/** Testi recheck @300, run ec563160: agy died in 5 s on a 429, exit 3. */
const AGY_429 = [
  "error: Individual quota reached. Resets in 44m20s.",
  'AGY_ERROR: {"error":{"code":429,"status":"RESOURCE_EXHAUSTED"}}',
].join("\n");

const streamingRun = () =>
  reduceAgentLiveTerminalMessage(
    beginAgentLiveTerminalSession(
      formatAgentLiveTerminalCommandLine("add feature"),
      "antigravity",
    ),
    {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: { dispatched: true, agentRunId: "run-1" },
    },
  );

const outcomeKind = (state: { status: string; output: string }) =>
  resolveAgentLiveRunOutcome({
    status: state.status as never,
    output: state.output,
  }).kind;

describe("floater quick failure (74408099)", () => {
  it("an agy 429 result ends in error, not Success", () => {
    const next = reduceAgentLiveTerminalMessage(streamingRun(), {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT,
      payload: { agentRunId: "run-1", output: AGY_429, exitCode: 3 },
    });
    expect(next.status).toBe("error");
    expect(outcomeKind(next)).not.toBe("passed");
  });

  it("a non-zero exit with unknown output still ends in error", () => {
    const next = reduceAgentLiveTerminalMessage(streamingRun(), {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT,
      payload: { agentRunId: "run-1", output: "boom", exitCode: 3 },
    });
    expect(next.status).toBe("error");
  });

  it("exit 0 stays finished", () => {
    const next = reduceAgentLiveTerminalMessage(streamingRun(), {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT,
      payload: { agentRunId: "run-1", output: "All done.", exitCode: 0 },
    });
    expect(next.status).toBe("finished");
  });

  it("a finished floater follows a Failed run record (stream ended first)", () => {
    const ended = reduceAgentLiveTerminalMessage(streamingRun(), {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT,
      payload: { agentRunId: "run-1", output: "All done.", exitCode: 0 },
    });
    const next = reduceAgentLiveTerminalMessage(ended, {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD,
      payload: {
        run: {
          id: "run-1",
          status: "failed",
          resultOutput: AGY_429,
          resultExitCode: 3,
          denialReason: null,
        },
      },
    });
    expect(next.status).toBe("error");
    expect(outcomeKind(next)).not.toBe("passed");
  });

  it("a finished floater follows an Expired run record to timed out", () => {
    const ended = reduceAgentLiveTerminalMessage(streamingRun(), {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT,
      payload: { agentRunId: "run-1", output: "All done.", exitCode: 0 },
    });
    const next = reduceAgentLiveTerminalMessage(ended, {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD,
      payload: {
        run: { id: "run-1", status: "expired", resultOutput: null },
      },
    });
    expect(next.status).toBe("timed_out");
  });
});
