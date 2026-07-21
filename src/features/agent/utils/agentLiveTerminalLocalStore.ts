import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { initialAgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import {
  readTerminalStore,
  writeTerminalStore,
  type PersistedTerminalSession,
  type TerminalStore,
} from "@/features/agent/utils/agentLiveTerminalLocalStoreIO";
import { isRestorableAgentLiveTerminalStatus } from "@/features/agent/utils/isRestorableAgentLiveTerminalStatus";
import { restoreAgentLiveTerminalSession } from "@/features/agent/utils/restoreAgentLiveTerminalSession";
import { shouldPersistAgentLiveTerminalOutput } from "@/features/agent/utils/shouldPersistAgentLiveTerminalOutput";
import { setAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";

const toPersistedSession = (
  state: AgentLiveTerminalState,
): PersistedTerminalSession => ({
  activeRunId: state.activeRunId,
  output: shouldPersistAgentLiveTerminalOutput() ? state.output : "",
  status: state.status,
  pendingCommandLine: state.pendingCommandLine,
  sessionWriterAgent: state.sessionWriterAgent,
  sessionDeviceId: state.sessionDeviceId,
  sessionWriterSessionId: state.sessionWriterSessionId,
  updatedAt: new Date().toISOString(),
});

const withArchivedCurrent = (
  store: TerminalStore,
  session: PersistedTerminalSession | null,
): Readonly<Record<string, PersistedTerminalSession>> => {
  if (session?.activeRunId === null || session?.activeRunId === undefined) {
    return store.byRunId;
  }

  return { ...store.byRunId, [session.activeRunId]: session };
};

export const loadPersistedAgentLiveTerminalState =
  (): AgentLiveTerminalState => {
    const session = readTerminalStore().current;
    if (
      session === null ||
      !isRestorableAgentLiveTerminalStatus(session.status)
    ) {
      return initialAgentLiveTerminalState();
    }

    return restoreAgentLiveTerminalSession(session);
  };

/** Archive the focused session, then clear focus so Start can open a new task. */
export const clearPersistedAgentLiveTerminalState = (): void => {
  const store = readTerminalStore();
  writeTerminalStore({
    current: null,
    byRunId: withArchivedCurrent(store, store.current),
  });
};

export const persistAgentLiveTerminalState = (
  state: AgentLiveTerminalState,
): void => {
  if (
    state.activeRunId !== null &&
    state.output.length > 0 &&
    shouldPersistAgentLiveTerminalOutput()
  ) {
    setAgentRunTerminalOutput(state.activeRunId, state.output);
  }

  const store = readTerminalStore();
  if (state.status === "idle" && state.output.length === 0) {
    writeTerminalStore({
      current: null,
      byRunId: store.byRunId,
    });
    return;
  }

  const session = toPersistedSession(state);
  writeTerminalStore({
    current: session,
    byRunId: withArchivedCurrent(store, session),
  });
};
