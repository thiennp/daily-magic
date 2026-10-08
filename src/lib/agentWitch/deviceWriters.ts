/** A coding tool on a computer, as reported in the AWL heartbeat. */
export type AgentWitchDeviceWriter = {
  readonly writerAgent: string;
  readonly ready: boolean;
  /** null = unknown (no trustworthy login check for that tool). */
  readonly loggedIn?: boolean | null;
};

/** One agent seat under a computer: a coding tool on that machine. */
export type ComputerAgentView = {
  readonly writerAgent: string;
  readonly label: string;
  readonly isOnline: boolean;
  /** True only when the tool reported it is signed out. */
  readonly needsSignIn: boolean;
};

const WRITER_LABELS: Readonly<Record<string, string>> = {
  "claude-cli": "Claude Code",
  codex: "Codex",
  cursor: "Cursor",
  antigravity: "Antigravity",
};

const MAX_WRITERS = 8;

export const parseHeartbeatWriters = (
  value: unknown,
): readonly AgentWitchDeviceWriter[] | null => {
  if (!Array.isArray(value)) return null;
  return value.slice(0, MAX_WRITERS).flatMap((item) => {
    if (typeof item !== "object" || item === null) return [];
    const { writerAgent, ready, loggedIn } = item as Record<string, unknown>;
    return typeof writerAgent === "string" && writerAgent.length <= 40
      ? [
          {
            writerAgent,
            ready: ready === true,
            loggedIn: typeof loggedIn === "boolean" ? loggedIn : null,
          },
        ]
      : [];
  });
};

export const parseStoredDeviceWriters = (
  value: unknown,
): readonly AgentWitchDeviceWriter[] =>
  parseHeartbeatWriters(typeof value === "string" ? safeJson(value) : value) ??
  [];

const safeJson = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

/** A computer offline means every agent on it is offline. */
export const buildComputerAgents = (
  writers: readonly AgentWitchDeviceWriter[],
  computerOnline: boolean,
): readonly ComputerAgentView[] =>
  writers
    .filter((writer) => writer.ready)
    .map((writer) => ({
      writerAgent: writer.writerAgent,
      label: WRITER_LABELS[writer.writerAgent] ?? writer.writerAgent,
      isOnline: computerOnline,
      needsSignIn: writer.loggedIn === false,
    }));
