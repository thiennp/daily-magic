import { loadAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";

const firstNonEmptyOutput = (
  ...candidates: readonly (string | null | undefined)[]
): string => {
  for (const candidate of candidates) {
    const trimmed = (candidate ?? "").trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
  }
  return "";
};

/** Prefer persisted run output; fall back to browser terminal cache (live stream). */
export const resolveAgentRunDetailResultOutputForHonesty = (
  runId: string,
  resultOutput: string | null,
  injectedTerminalOutput?: string | null,
): string =>
  firstNonEmptyOutput(
    resultOutput,
    injectedTerminalOutput,
    loadAgentRunTerminalOutput(runId),
  );
