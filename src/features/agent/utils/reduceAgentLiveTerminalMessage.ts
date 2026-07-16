import { isRecord } from "@/features/agent/utils/agentLiveTerminalMessageUtils";
import { reduceAgentLiveTerminalControlMessage } from "@/features/agent/utils/reduceAgentLiveTerminalControlMessage";
import { reduceAgentLiveTerminalStreamMessage } from "@/features/agent/utils/reduceAgentLiveTerminalStreamMessage";
import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { finishAgentLiveTerminalSession } from "@/features/agent/utils/agentLiveTerminalState.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export {
  beginAgentLiveTerminalSession,
  continueAgentLiveTerminalSession,
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
    return finishAgentLiveTerminalSession();
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
