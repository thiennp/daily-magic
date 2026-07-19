import {
  loadPersistedAgentLiveTerminalState,
  persistAgentLiveTerminalState,
} from "@/features/agent/utils/agentLiveTerminalLocalStore";
import {
  initialAgentLiveTerminalState,
  type AgentLiveTerminalState,
} from "@/features/agent/utils/agentLiveTerminalState.type";

export const resolveInitialAgentLiveTerminalState = (
  shouldRestore: boolean,
): AgentLiveTerminalState => {
  if (typeof window === "undefined" || !shouldRestore) {
    return initialAgentLiveTerminalState();
  }

  return loadPersistedAgentLiveTerminalState();
};

/** Skip idle writes until a session starts so Start cannot wipe a restorable run. */
export const shouldPersistAgentLiveTerminalState = (input: {
  readonly allowPersist: boolean;
  readonly state: AgentLiveTerminalState;
}): boolean => {
  if (input.allowPersist) {
    return true;
  }

  return !(
    input.state.status === "idle" &&
    input.state.output.length === 0 &&
    input.state.activeRunId === null
  );
};

export const persistAgentLiveTerminalStateIfAllowed = (input: {
  readonly allowPersist: boolean;
  readonly state: AgentLiveTerminalState;
}): boolean => {
  if (
    !shouldPersistAgentLiveTerminalState({
      allowPersist: input.allowPersist,
      state: input.state,
    })
  ) {
    return false;
  }

  persistAgentLiveTerminalState(input.state);
  return true;
};
