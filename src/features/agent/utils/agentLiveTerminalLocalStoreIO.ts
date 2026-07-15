import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";

export const AGENT_LIVE_TERMINAL_STORE_KEY =
  "daily-magic.agent-live-terminal.v1";

export interface PersistedTerminalSession {
  readonly activeRunId: string | null;
  readonly output: string;
  readonly status: AgentLiveTerminalState["status"];
  readonly pendingCommandLine: string | null;
  readonly sessionWriterAgent: AgentLiveTerminalState["sessionWriterAgent"];
  readonly sessionDeviceId: string | null;
  readonly updatedAt: string;
}

export interface TerminalStore {
  readonly current: PersistedTerminalSession | null;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const readTerminalStore = (): TerminalStore => {
  if (typeof window === "undefined") {
    return { current: null };
  }

  const raw = window.localStorage.getItem(AGENT_LIVE_TERMINAL_STORE_KEY);
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
        sessionWriterAgent: isHarnessWriterAgent(current.sessionWriterAgent)
          ? current.sessionWriterAgent
          : null,
        sessionDeviceId:
          typeof current.sessionDeviceId === "string"
            ? current.sessionDeviceId
            : null,
        updatedAt: current.updatedAt,
      },
    };
  } catch {
    return { current: null };
  }
};

export const writeTerminalStore = (store: TerminalStore): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    AGENT_LIVE_TERMINAL_STORE_KEY,
    JSON.stringify(store),
  );
};
