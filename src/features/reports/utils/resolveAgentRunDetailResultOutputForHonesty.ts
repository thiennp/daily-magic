import { loadAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";
import { AGENT_RUN_NEON_META_MAX_CHARS } from "@/lib/dispatch/toAgentRunNeonMetaText";

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
): string => {
  const browserOutput = firstNonEmptyOutput(
    injectedTerminalOutput,
    loadAgentRunTerminalOutput(runId),
  );
  const trimmedResultOutput = (resultOutput ?? "").trim();

  if (
    trimmedResultOutput.length > 0 &&
    trimmedResultOutput.length <= AGENT_RUN_NEON_META_MAX_CHARS &&
    browserOutput.length > trimmedResultOutput.length
  ) {
    return browserOutput;
  }

  return firstNonEmptyOutput(
    resultOutput,
    injectedTerminalOutput,
    loadAgentRunTerminalOutput(runId),
  );
};
