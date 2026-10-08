import { isSafeAgentWakeId } from "./parseAgentWakePayload";

export type AgentRunArgs = {
  readonly projectId: string;
  readonly membershipId: string;
  readonly command: string;
  readonly args: readonly string[];
};

export const AGENT_RUN_USAGE =
  "Usage: agent-witch agent run --project <projectId> --seat <membershipId> -- <cli> [args...]";

const readFlag = (argv: readonly string[], flag: string): string | null => {
  const inline = argv.find((arg) => arg.startsWith(`${flag}=`));
  if (inline !== undefined) return inline.slice(flag.length + 1);
  const index = argv.indexOf(flag);
  return index >= 0 ? (argv[index + 1] ?? null) : null;
};

/**
 * Parse the argv after `agent run`. Flags come before `--`; everything after
 * `--` is the CLI to launch. Returns an error string when invalid.
 */
export const parseAgentRunArgs = (
  argv: readonly string[],
): AgentRunArgs | string => {
  const separator = argv.indexOf("--");
  const flags = separator >= 0 ? argv.slice(0, separator) : argv;
  const [command, ...args] = separator >= 0 ? argv.slice(separator + 1) : [];
  const projectId = readFlag(flags, "--project");
  const membershipId = readFlag(flags, "--seat");
  if (projectId === null || membershipId === null) return AGENT_RUN_USAGE;
  if (!isSafeAgentWakeId(projectId) || !isSafeAgentWakeId(membershipId)) {
    return "--project and --seat may only contain letters, digits, - and _.";
  }
  if (command === undefined || command.length === 0) return AGENT_RUN_USAGE;
  return { projectId, membershipId, command, args };
};
