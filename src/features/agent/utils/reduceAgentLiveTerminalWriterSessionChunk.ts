import type { AgentLiveTerminalState } from "./agentLiveTerminalState.type";
import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const reduceAgentLiveTerminalWriterSessionChunk = (
  state: AgentLiveTerminalState,
  payload: Record<string, unknown>,
): AgentLiveTerminalState => {
  const writerAgent = payload.writerAgent;
  const chunk = typeof payload.chunk === "string" ? payload.chunk : "";

  if (
    chunk.length === 0 ||
    !isHarnessWriterAgent(writerAgent) ||
    writerAgent !== state.sessionWriterAgent ||
    (state.status !== "starting" && state.status !== "streaming")
  ) {
    return state;
  }

  return {
    ...state,
    status: "streaming",
    output: `${state.output}${chunk}`,
  };
};

export const isWriterSessionChunkMessage = (
  parsed: Record<string, unknown>,
): boolean =>
  parsed.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_CHUNK;
