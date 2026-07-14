import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { initialAgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { setAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";

const TERMINAL_STORE_KEY = "daily-magic.agent-live-terminal.v1";

interface PersistedTerminalSession {
  readonly activeRunId: string | null;
  readonly output: string;
  readonly status: AgentLiveTerminalState["status"];
  readonly pendingCommandLine: string | null;
  readonly updatedAt: string;
}

interface TerminalStore {
  readonly current: PersistedTerminalSession | null;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readTerminalStore = (): TerminalStore => {
  if (typeof window === "undefined") {
    return { current: null };
  }

  const raw = window.localStorage.getItem(TERMINAL_STORE_KEY);
  if (raw === null) {
    return { current: null };
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || !isRecord(parsed.current)) {
      return { current: null };
    }

    const current = parsed.current;
    if (
      typeof current.output !== "string" ||
      typeof current.status !== "string" ||
      typeof current.updatedAt !== "string"
    ) {
      return { current: null };
    }

    return {
      current: {
        activeRunId:
          typeof current.activeRunId === "string" ? current.activeRunId : null,
        output: current.output,
        status: current.status as AgentLiveTerminalState["status"],
        pendingCommandLine:
          typeof current.pendingCommandLine === "string"
            ? current.pendingCommandLine
            : null,
        updatedAt: current.updatedAt,
      },
    };
  } catch {
    return { current: null };
  }
};

const writeTerminalStore = (store: TerminalStore): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TERMINAL_STORE_KEY, JSON.stringify(store));
};

const isRestorableStatus = (
  status: AgentLiveTerminalState["status"],
): boolean =>
  status === "starting" ||
  status === "waiting_approval" ||
  status === "streaming" ||
  status === "finished";

export const loadPersistedAgentLiveTerminalState =
  (): AgentLiveTerminalState => {
    const session = readTerminalStore().current;
    if (session === null || !isRestorableStatus(session.status)) {
      return initialAgentLiveTerminalState();
    }

    return {
      activeRunId: session.activeRunId,
      output: session.output,
      status: session.status,
      pendingInput: null,
      pendingCommandLine: session.pendingCommandLine,
    };
  };

export const persistAgentLiveTerminalState = (
  state: AgentLiveTerminalState,
): void => {
  if (state.status === "idle" && state.output.length === 0) {
    writeTerminalStore({ current: null });
    return;
  }

  writeTerminalStore({
    current: {
      activeRunId: state.activeRunId,
      output: state.output,
      status: state.status,
      pendingCommandLine: state.pendingCommandLine,
      updatedAt: new Date().toISOString(),
    },
  });

  if (state.activeRunId !== null && state.output.length > 0) {
    setAgentRunTerminalOutput(state.activeRunId, state.output);
  }
};
