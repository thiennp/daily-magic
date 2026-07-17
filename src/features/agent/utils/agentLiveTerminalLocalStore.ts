import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { initialAgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import {
  readTerminalStore,
  writeTerminalStore,
} from "@/features/agent/utils/agentLiveTerminalLocalStoreIO";
import { isRestorableAgentLiveTerminalStatus } from "@/features/agent/utils/isRestorableAgentLiveTerminalStatus";
import { shouldPersistAgentLiveTerminalOutput } from "@/features/agent/utils/shouldPersistAgentLiveTerminalOutput";
import { setAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";

export const loadPersistedAgentLiveTerminalState =
  (): AgentLiveTerminalState => {
    const session = readTerminalStore().current;
    if (
      session === null ||
      !isRestorableAgentLiveTerminalStatus(session.status)
    ) {
      return initialAgentLiveTerminalState();
    }

    return {
      activeRunId: session.activeRunId,
      output: shouldPersistAgentLiveTerminalOutput(session.status)
        ? session.output
        : "",
      status: session.status,
      pendingInput: null,
      pendingCommandLine: session.pendingCommandLine,
      sessionWriterAgent: session.sessionWriterAgent,
      sessionDeviceId: session.sessionDeviceId,
      sessionWriterSessionId: session.sessionWriterSessionId ?? null,
    };
  };

export const persistAgentLiveTerminalState = (
  state: AgentLiveTerminalState,
): void => {
  if (
    state.activeRunId !== null &&
    state.output.length > 0 &&
    shouldPersistAgentLiveTerminalOutput(state.status)
  ) {
    setAgentRunTerminalOutput(state.activeRunId, state.output);
  }

  if (
    state.status === "finished" ||
    (state.status === "idle" && state.output.length === 0)
  ) {
    writeTerminalStore({ current: null });
    return;
  }

  writeTerminalStore({
    current: {
      activeRunId: state.activeRunId,
      output: shouldPersistAgentLiveTerminalOutput(state.status)
        ? state.output
        : "",
      status: state.status,
      pendingCommandLine: state.pendingCommandLine,
      sessionWriterAgent: state.sessionWriterAgent,
      sessionDeviceId: state.sessionDeviceId,
      sessionWriterSessionId: state.sessionWriterSessionId,
      updatedAt: new Date().toISOString(),
    },
  });
};
