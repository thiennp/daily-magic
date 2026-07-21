import type { PersistedTerminalSession } from "@/features/agent/utils/parsePersistedTerminalSession";
import {
  isTerminalStoreRecord,
  parsePersistedTerminalSession,
  parsePersistedTerminalSessionsByRunId,
} from "@/features/agent/utils/parsePersistedTerminalSession";

export const AGENT_LIVE_TERMINAL_STORE_KEY =
  "daily-magic.agent-live-terminal.v1";

export type { PersistedTerminalSession };

export interface TerminalStore {
  readonly current: PersistedTerminalSession | null;
  readonly byRunId: Readonly<Record<string, PersistedTerminalSession>>;
}

export const readTerminalStore = (): TerminalStore => {
  if (typeof window === "undefined") {
    return { current: null, byRunId: {} };
  }

  const raw = window.localStorage.getItem(AGENT_LIVE_TERMINAL_STORE_KEY);
  if (raw === null) {
    return { current: null, byRunId: {} };
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isTerminalStoreRecord(parsed)) {
      return { current: null, byRunId: {} };
    }

    const current = isTerminalStoreRecord(parsed.current)
      ? parsePersistedTerminalSession(parsed.current)
      : null;
    const byRunId = parsePersistedTerminalSessionsByRunId(parsed.byRunId);

    return {
      current,
      byRunId:
        current?.activeRunId !== null &&
        current?.activeRunId !== undefined &&
        byRunId[current.activeRunId] === undefined
          ? { ...byRunId, [current.activeRunId]: current }
          : byRunId,
    };
  } catch {
    return { current: null, byRunId: {} };
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
