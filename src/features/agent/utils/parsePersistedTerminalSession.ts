import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";

export interface PersistedTerminalSession {
  readonly activeRunId: string | null;
  readonly output: string;
  readonly status: AgentLiveTerminalState["status"];
  readonly pendingCommandLine: string | null;
  readonly sessionWriterAgent: AgentLiveTerminalState["sessionWriterAgent"];
  readonly sessionDeviceId: string | null;
  readonly sessionWriterSessionId: string | null;
  readonly updatedAt: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const isTerminalStoreRecord = isRecord;

export const parsePersistedTerminalSession = (
  current: Record<string, unknown>,
): PersistedTerminalSession | null => {
  if (
    typeof current.output !== "string" ||
    typeof current.status !== "string" ||
    typeof current.updatedAt !== "string"
  ) {
    return null;
  }

  return {
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
    sessionWriterSessionId:
      typeof current.sessionWriterSessionId === "string"
        ? current.sessionWriterSessionId
        : null,
    updatedAt: current.updatedAt,
  };
};

export const parsePersistedTerminalSessionsByRunId = (
  value: unknown,
): Readonly<Record<string, PersistedTerminalSession>> => {
  if (!isRecord(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).flatMap(([runId, session]) => {
      if (!isRecord(session)) {
        return [];
      }
      const parsed = parsePersistedTerminalSession(session);
      return parsed === null ? [] : [[runId, parsed]];
    }),
  );
};
