import { describe, expect, it } from "vitest";

import {
  AGENT_LIVE_BASH_PROMPT,
  formatAgentLiveTerminalCommandLine,
} from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import {
  beginAgentLiveTerminalSession,
  reduceAgentLiveTerminalMessage,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("reduceAgentLiveTerminalMessage", () => {
  it("renders a command line when a run is dispatched", () => {
    const commandLine = formatAgentLiveTerminalCommandLine("run lint");
    const next = reduceAgentLiveTerminalMessage(
      beginAgentLiveTerminalSession(commandLine),
      {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: {
          dispatched: true,
          agentRunId: "run-1",
        },
      },
    );

    expect(next.output).toBe(`${AGENT_LIVE_BASH_PROMPT}${commandLine}\n`);
    expect(next.status).toBe("streaming");
  });

  it("appends stream chunks for the active run", () => {
    const commandLine = formatAgentLiveTerminalCommandLine("run lint");
    const dispatched = reduceAgentLiveTerminalMessage(
      beginAgentLiveTerminalSession(commandLine),
      {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: {
          dispatched: true,
          agentRunId: "run-1",
        },
      },
    );

    const streamed = reduceAgentLiveTerminalMessage(dispatched, {
      type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK,
      payload: {
        runId: "run-1",
        chunk: "hello\n",
      },
    });

    expect(streamed.output).toContain("hello");
  });

  it("appends final result output after the rendered command line", () => {
    const commandLine = formatAgentLiveTerminalCommandLine("run lint");
    const dispatched = reduceAgentLiveTerminalMessage(
      beginAgentLiveTerminalSession(commandLine),
      {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: {
          dispatched: true,
          agentRunId: "run-1",
        },
      },
    );

    const finished = reduceAgentLiveTerminalMessage(dispatched, {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT,
      payload: {
        agentRunId: "run-1",
        exitCode: 127,
        output: "zsh: command not found: claude\n",
      },
    });

    expect(finished.output).toContain("command not found");
    expect(finished.status).toBe("finished");
  });
});
