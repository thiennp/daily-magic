import { isRecord } from "@/features/agent/utils/agentLiveTerminalMessageUtils";
import { reduceAgentLiveTerminalControlMessage } from "@/features/agent/utils/reduceAgentLiveTerminalControlMessage";
import { reduceAgentLiveTerminalStreamMessage } from "@/features/agent/utils/reduceAgentLiveTerminalStreamMessage";
import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { failAgentLiveTerminalSession } from "@/features/agent/utils/agentLiveTerminalState.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export {
  beginAgentLiveTerminalSession,
  continueAgentLiveTerminalSession,
  failAgentLiveTerminalSession,
  finishAgentLiveTerminalSession,
  initialAgentLiveTerminalState,
  isAgentLiveTerminalSessionOpen,
  shouldContinueAgentLiveTerminalThread,
  type AgentLiveTerminalState,
  type AgentLiveTerminalStatus,
} from "@/features/agent/utils/agentLiveTerminalState.type";

export const reduceAgentLiveTerminalMessage = (
  state: AgentLiveTerminalState,
  parsed: unknown,
): AgentLiveTerminalState => {
  if (!isRecord(parsed) || typeof parsed.type !== "string") {
    return state;
  }

  if (
    parsed.type === AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR &&
    state.sessionWriterAgent !== null
  ) {
    const payload = isRecord(parsed.payload) ? parsed.payload : {};
    const errorMessage =
      typeof payload.errorMessage === "string"
        ? payload.errorMessage
        : "Something went wrong.";
    return failAgentLiveTerminalSession(state, errorMessage);
  }

  const payload = isRecord(parsed.payload) ? parsed.payload : {};
  const afterControl = reduceAgentLiveTerminalControlMessage(
    state,
    parsed,
    payload,
  );

  if (afterControl !== state) {
    return afterControl;
  }

  return reduceAgentLiveTerminalStreamMessage(state, parsed, payload);
};
