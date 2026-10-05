import { isAgentRunSpawnFailureLine } from "@/lib/dispatch/isAgentRunTerminalChromeLine";

export const isAgentRunSpawnFailureInOutput = (output: string): boolean =>
  output.split("\n").some((line) => isAgentRunSpawnFailureLine(line.trim()));
