/** A coding tool on a computer, as reported in the AWL heartbeat. */
export type AgentWitchDeviceWriter = {
  readonly writerAgent: string;
  readonly ready: boolean;
};

/** One agent seat under a computer: a coding tool on that machine. */
export type ComputerAgentView = {
  readonly writerAgent: string;
  readonly label: string;
  readonly isOnline: boolean;
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
    const { writerAgent, ready } = item as Record<string, unknown>;
    return typeof writerAgent === "string" && writerAgent.length <= 40
      ? [{ writerAgent, ready: ready === true }]
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
    }));
