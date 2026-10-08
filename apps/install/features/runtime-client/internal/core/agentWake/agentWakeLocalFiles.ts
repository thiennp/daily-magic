import fs from "node:fs";
import path from "node:path";

export const AGENT_TERMINALS_FILE = "agent-terminals.json";
export const AGENT_TASKS_FILE = "agent-tasks.json";

export type AgentTerminalEntry = {
  readonly shellSessionId: string;
  readonly projectId: string;
  readonly registeredAt: string;
};

export type AgentPendingWake = {
  readonly count: number;
  readonly lastMessageId: string;
  readonly lastKind: string;
  readonly at: string;
};

/** membershipId → live terminal; membershipId → wakes that found no terminal. */
export type AgentTerminalRegistry = {
  readonly terminals: Readonly<Record<string, AgentTerminalEntry>>;
  readonly pending: Readonly<Record<string, AgentPendingWake>>;
};

/** taskId → meta only (never bodies). */
export type AgentTaskState = Readonly<
  Record<
    string,
    {
      readonly status?: string;
      readonly priority?: string;
      readonly updatedAt: string;
    }
  >
>;

export const EMPTY_AGENT_TERMINAL_REGISTRY: AgentTerminalRegistry = {
  terminals: {},
  pending: {},
};

export const readJsonFile = <T>(file: string, fallback: T): T => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return fallback;
  }
};

export const writeJsonFileAtomic = (file: string, value: unknown): void => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2), { mode: 0o600 });
  fs.renameSync(tmp, file);
};

export const readAgentTerminalRegistry = (
  installDir: string,
): AgentTerminalRegistry => {
  const raw = readJsonFile<Partial<AgentTerminalRegistry>>(
    path.join(installDir, AGENT_TERMINALS_FILE),
    {},
  );
  return { terminals: raw.terminals ?? {}, pending: raw.pending ?? {} };
};

export const writeAgentTerminalRegistry = (
  installDir: string,
  registry: AgentTerminalRegistry,
): void => {
  writeJsonFileAtomic(path.join(installDir, AGENT_TERMINALS_FILE), registry);
};
