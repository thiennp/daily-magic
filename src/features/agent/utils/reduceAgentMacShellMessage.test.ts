import { describe, expect, it } from "vitest";

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import {
  initialAgentMacShellState,
  reduceAgentMacShellMessage,
} from "@/features/agent/utils/reduceAgentMacShellMessage";

describe("reduceAgentMacShellMessage", () => {
  it("opens from system ack and appends shell data chunks", () => {
    const opened = reduceAgentMacShellMessage(
      initialAgentMacShellState(),
      JSON.stringify({
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: { shellSessionId: "shell-1", opened: true },
      }),
    );
    expect(opened).toMatchObject({
      status: "opening",
      shellSessionId: "shell-1",
    });

    const withData = reduceAgentMacShellMessage(
      opened,
      JSON.stringify({
        type: AGENT_WITCH_MESSAGE_TYPES.SHELL_DATA,
        payload: { shellSessionId: "shell-1", chunk: "hi" },
      }),
    );
    expect(withData).toMatchObject({
      status: "open",
      latestChunk: "hi",
      chunkSeq: 1,
    });
  });
});
